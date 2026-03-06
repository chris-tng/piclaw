/**
 * runtime.ts – Application lifecycle: startup, polling loop, and shutdown.
 *
 * This is the top-level orchestrator that wires together all subsystems:
 *   - Initialises the database (db/connection.ts).
 *   - Creates the AgentPool, AgentQueue, and RuntimeState.
 *   - Starts the WhatsApp channel (if configured), web channel, Pushover, IPC.
 *   - Runs the main message-polling loop and task scheduler.
 *   - Handles graceful shutdown (SIGINT/SIGTERM).
 *
 * Consumers:
 *   - index.ts calls startRuntime() as the entry point.
 */
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { ASSISTANT_NAME, DATA_DIR, POLL_INTERVAL, PUSHOVER_APP_TOKEN, PUSHOVER_DEVICE, PUSHOVER_PRIORITY, PUSHOVER_SOUND, PUSHOVER_USER_KEY, STORE_DIR, TRIGGER_PATTERN, WORKSPACE_DIR, TOOL_OUTPUT_RETENTION_DAYS, TOOL_OUTPUT_CLEANUP_INTERVAL_MS, WHATSAPP_PHONE, } from "./core/config.js";
import { initDatabase, storeMessage, storeChatMetadata } from "./db.js";
import { AgentPool } from "./agent-pool.js";
import { AgentQueue } from "./queue.js";
import { startIpcWatcher } from "./ipc.js";
import { startSchedulerLoop } from "./task-scheduler.js";
import { WhatsAppChannel } from "./channels/whatsapp.js";
import { WebChannel } from "./channels/web.js";
import { PushoverChannel } from "./channels/pushover.js";
import { startToolOutputCleanup } from "./tool-output.js";
import { createUuid } from "./utils/ids.js";
import { RuntimeState } from "./runtime/state.js";
import { processMessages, runMessageLoop } from "./runtime/message-loop.js";
const queue = new AgentQueue();
const agentPool = new AgentPool();
let whatsapp;
let web;
let pushover = null;
const state = new RuntimeState(DATA_DIR);
/** Boot all subsystems (DB, channels, agent pool, scheduler) and enter the main loop. */
export async function main() {
    // Ensure directories
    mkdirSync(STORE_DIR, { recursive: true });
    mkdirSync(DATA_DIR, { recursive: true });
    mkdirSync(WORKSPACE_DIR, { recursive: true });
    initDatabase();
    startToolOutputCleanup(TOOL_OUTPUT_RETENTION_DAYS, TOOL_OUTPUT_CLEANUP_INTERVAL_MS);
    state.loadTimestamps();
    state.loadChats();
    // Ensure Azure providers are visible in /model listing at startup.
    // This is metadata-only registration for discovery; the extension still
    // registers API streaming handlers for real requests.
    const splitCsv = (value) => (value ?? "")
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);
    const registry = agentPool.modelRegistry;
    const aoaiToken = process.env.AOAI_API_KEY;
    const aoaiBaseUrl = process.env.AOAI_BASE_URL;
    if (registry && aoaiToken && aoaiBaseUrl) {
        const hasAzure = registry.getAll?.().some((model) => model.provider === "azure-openai");
        if (!hasAzure) {
            const ids = splitCsv(process.env.AOAI_MODEL_IDS);
            const names = splitCsv(process.env.AOAI_MODEL_NAMES);
            const defaultIds = ["gpt-5-2-codex", "gpt-5-3-codex", "gpt-5-1-codex-mini", "gpt-5-1", "gpt-5-mini"];
            const modelIds = ids.length > 0 ? ids : defaultIds;
            const models = modelIds.map((id, idx) => ({
                id,
                name: names[idx] || `Azure ${id}`,
                api: "azure-openai-responses-mi",
                reasoning: true,
                input: ["text"],
                contextWindow: 200000,
                maxTokens: 64000,
                cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            }));
            registry.registerProvider("azure-openai", {
                baseUrl: aoaiBaseUrl,
                api: "azure-openai-responses-mi",
                apiKey: aoaiToken,
                models,
            });
        }
    }
    const foundryToken = process.env.FOUNDRY_API_KEY || process.env.AOAI_API_KEY;
    const foundryBaseUrl = process.env.FOUNDRY_BASE_URL;
    if (registry && foundryToken && foundryBaseUrl) {
        const hasFoundry = registry.getAll?.().some((model) => model.provider === "azure-foundry");
        if (!hasFoundry) {
            const ids = splitCsv(process.env.FOUNDRY_MODEL_IDS);
            const names = splitCsv(process.env.FOUNDRY_MODEL_NAMES);
            const modelIds = ids.length > 0 ? ids : ["mistral-large-3"];
            const models = modelIds.map((id, idx) => ({
                id,
                name: names[idx] || `Azure Foundry ${id}`,
                api: "azure-foundry-openai-completions-mi",
                reasoning: false,
                input: ["text"],
                contextWindow: 200000,
                maxTokens: 64000,
                cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
            }));
            registry.registerProvider("azure-foundry", {
                baseUrl: foundryBaseUrl,
                api: "azure-foundry-openai-completions-mi",
                apiKey: foundryToken,
                models,
            });
        }
    }
    console.log("=== Piclaw - Pi Coding Agent Assistant ===");
    let shuttingDown = false;
    const withTimeout = async (promise, ms, label) => {
        let timeoutId = null;
        const timeout = new Promise((resolve) => {
            timeoutId = setTimeout(() => {
                console.warn(`[piclaw] ${label} timed out after ${ms}ms`);
                resolve(null);
            }, ms);
        });
        try {
            const result = await Promise.race([promise.then((value) => ({ value })), timeout]);
            if (result && typeof result === "object" && "value" in result) {
                return result.value;
            }
            return null;
        }
        catch (err) {
            console.error(`[piclaw] ${label} failed:`, err);
            return null;
        }
        finally {
            if (timeoutId)
                clearTimeout(timeoutId);
        }
    };
    const shutdown = async (signal) => {
        if (shuttingDown)
            return;
        shuttingDown = true;
        console.log(`[piclaw] ${signal} received, shutting down...`);
        const forceExit = setTimeout(() => {
            console.warn("[piclaw] Forcing shutdown after 15000ms");
            process.exit(0);
        }, 15000);
        await withTimeout(queue.shutdown(5000), 7000, "queue shutdown");
        await withTimeout(agentPool.shutdown(), 8000, "agent pool shutdown");
        await withTimeout(whatsapp.disconnect(), 8000, "whatsapp disconnect");
        await withTimeout(web?.stop() ?? Promise.resolve(), 4000, "web stop");
        await withTimeout(pushover?.stop() ?? Promise.resolve(), 4000, "pushover stop");
        clearTimeout(forceExit);
        process.exit(0);
    };
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
    web = new WebChannel({ queue, agentPool });
    await web.start();
    if (PUSHOVER_APP_TOKEN && PUSHOVER_USER_KEY) {
        pushover = new PushoverChannel({
            appToken: PUSHOVER_APP_TOKEN,
            userKey: PUSHOVER_USER_KEY,
            device: PUSHOVER_DEVICE || undefined,
            priority: PUSHOVER_PRIORITY,
            sound: PUSHOVER_SOUND || undefined,
        });
        await pushover.start();
    }
    whatsapp = new WhatsAppChannel({
        chatJids: () => state.chatJids,
        phoneNumber: WHATSAPP_PHONE || undefined,
        onPairingCode: (code) => {
            try {
                const ipcDir = join(DATA_DIR, "ipc", "messages");
                mkdirSync(ipcDir, { recursive: true });
                const payload = {
                    type: "message",
                    chatJid: "web:default",
                    text: code,
                };
                const filePath = join(ipcDir, `${createUuid("pairing")}.json`);
                writeFileSync(filePath, JSON.stringify(payload));
            }
            catch (err) {
                console.error("[whatsapp] Failed to write pairing code IPC message:", err);
            }
        },
        onMessage: (chatJid, msg) => {
            if (!state.chatJids.has(chatJid) && msg.is_from_me) {
                state.chatJids.add(chatJid);
                state.saveChats();
            }
            storeMessage(msg);
        },
        onChatMetadata: (chatJid, timestamp) => storeChatMetadata(chatJid, timestamp),
    });
    const sendMessage = async (jid, text) => {
        if (jid.startsWith("web:")) {
            await web.sendMessage(jid, text);
            return;
        }
        await whatsapp.sendMessage(jid, text);
    };
    const sendNudge = pushover
        ? async (text) => {
            await pushover.sendMessage("", text).catch((err) => console.error("[pushover] Failed to send nudge:", err));
        }
        : undefined;
    startIpcWatcher({
        sendMessage,
        sendNudge,
        resolveModel: (input) => agentPool.resolveModelInput(input),
        resumeChat: async (data) => {
            const chatJid = typeof data.chatJid === "string" && data.chatJid.trim()
                ? data.chatJid.trim()
                : "web:default";
            const prevTimestamp = typeof data.prevTimestamp === "string" ? data.prevTimestamp : undefined;
            const threadRootId = typeof data.threadRootId === "number" ? data.threadRootId : null;
            web.resumeChat(chatJid, prevTimestamp, threadRootId);
        },
        resumePending: async (data) => {
            const chatJid = typeof data?.chatJid === "string" && data.chatJid.trim()
                ? data.chatJid.trim()
                : undefined;
            web.resumePendingChats(chatJid);
        },
    });
    startSchedulerLoop({
        queue,
        agentPool,
        sendMessage,
        sendNudge,
    });
    await whatsapp.connect();
    runMessageLoop({
        queue,
        state,
        assistantName: ASSISTANT_NAME,
        pollIntervalMs: POLL_INTERVAL,
        processMessages: (chatJid) => processMessages(chatJid, {
            agentPool,
            whatsapp,
            state,
            assistantName: ASSISTANT_NAME,
            triggerPattern: TRIGGER_PATTERN,
        }),
    });
}

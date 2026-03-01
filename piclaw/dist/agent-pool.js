import { mkdirSync } from "fs";
import { join } from "path";
import { AuthStorage, createBashTool, createEditTool, createReadTool, createWriteTool, ModelRegistry, SettingsManager, getAgentDir, } from "@mariozechner/pi-coding-agent";
import { applyControlCommand } from "./agent-control.js";
import { AGENT_TIMEOUT, SESSIONS_DIR, WORKSPACE_DIR } from "./config.js";
import { storeTokenUsage } from "./db.js";
import { detectChannel } from "./router.js";
import { createTrackedBashOperations } from "./tools/tracked-bash.js";
import { getAttachmentRegistry } from "./agent-pool/attachments.js";
import { writeAgentLog } from "./agent-pool/logging.js";
import { createDefaultSession, ensureSessionDir } from "./agent-pool/session.js";
import { executeSlashCommand } from "./agent-pool/slash-command.js";
/** How long (ms) an idle session stays cached before being disposed. */
const IDLE_TTL = 10 * 60 * 1000; // 10 minutes
const CLEANUP_INTERVAL = 60 * 1000; // check every minute
/**
 * Manages a pool of persistent AgentSession instances keyed by chat JID.
 *
 * First invocation for a JID pays the warm-up cost (resource discovery,
 * model initialisation). Subsequent calls reuse the live session – no
 * process-spawn overhead, conversation context already loaded.
 */
export class AgentPool {
    pool = new Map();
    cleanupTimer = null;
    // Shared across all sessions (expensive to create, safe to reuse)
    authStorage;
    modelRegistry;
    settingsManager = SettingsManager.create(WORKSPACE_DIR, getAgentDir());
    logsDir = join(WORKSPACE_DIR, "logs");
    createSession;
    sessionBinder;
    bashOperations = createTrackedBashOperations();
    attachments = getAttachmentRegistry();
    constructor(options = {}) {
        this.createSession = options.createSession;
        this.authStorage = AuthStorage.create();
        this.modelRegistry = options.modelRegistry ?? new ModelRegistry(this.authStorage);
        mkdirSync(SESSIONS_DIR, { recursive: true });
        mkdirSync(this.logsDir, { recursive: true });
        this.cleanupTimer = setInterval(() => this.evictIdle(), CLEANUP_INTERVAL);
    }
    setSessionBinder(binder) {
        this.sessionBinder = binder;
        if (!binder)
            return;
        for (const [jid, entry] of this.pool) {
            try {
                void binder(entry.session, jid);
            }
            catch (err) {
                console.error(`[agent-pool] Failed to bind session ${jid}:`, err);
            }
        }
    }
    /** Run a prompt against the persistent session for `chatJid`. */
    async runAgent(prompt, chatJid, options = {}) {
        const startTime = Date.now();
        this.attachments.clear(chatJid);
        try {
            const session = await this.getOrCreate(chatJid);
            console.log(`[agent-pool] Prompting session ${chatJid} (${prompt.length} chars)`);
            // Track turns: each text_start begins a new turn
            let currentTurnText = "";
            let turnCount = 0;
            const recordUsage = (message) => {
                if (!message || message.role !== "assistant" || !message.usage)
                    return;
                const usage = message.usage || {};
                const input = typeof usage.input === "number" ? usage.input : 0;
                const output = typeof usage.output === "number" ? usage.output : 0;
                const cacheRead = typeof usage.cacheRead === "number" ? usage.cacheRead : 0;
                const cacheWrite = typeof usage.cacheWrite === "number" ? usage.cacheWrite : 0;
                const totalTokens = (typeof usage.totalTokens === "number" && usage.totalTokens) ||
                    (typeof usage.total === "number" && usage.total) ||
                    input + output + cacheRead + cacheWrite;
                const cost = usage.cost || {};
                const costInput = typeof cost.input === "number" ? cost.input : 0;
                const costOutput = typeof cost.output === "number" ? cost.output : 0;
                const costCacheRead = typeof cost.cacheRead === "number" ? cost.cacheRead : 0;
                const costCacheWrite = typeof cost.cacheWrite === "number" ? cost.cacheWrite : 0;
                const costTotal = (typeof cost.total === "number" && cost.total) ||
                    costInput + costOutput + costCacheRead + costCacheWrite;
                const runAt = message.timestamp
                    ? (() => {
                        const ts = new Date(message.timestamp);
                        return Number.isNaN(ts.getTime()) ? new Date().toISOString() : ts.toISOString();
                    })()
                    : new Date().toISOString();
                storeTokenUsage({
                    chat_jid: chatJid,
                    run_at: runAt,
                    input_tokens: input,
                    output_tokens: output,
                    cache_read_tokens: cacheRead,
                    cache_write_tokens: cacheWrite,
                    total_tokens: totalTokens,
                    cost_input: costInput,
                    cost_output: costOutput,
                    cost_cache_read: costCacheRead,
                    cost_cache_write: costCacheWrite,
                    cost_total: costTotal,
                    model: message.model ?? null,
                    provider: message.provider ?? null,
                    api: message.api ?? null,
                    turns: 1,
                });
            };
            const onEvent = options.onEvent;
            const onTurnComplete = options.onTurnComplete;
            const flushTurn = () => {
                const text = currentTurnText.trim();
                if (!text && !onTurnComplete)
                    return;
                if (text || turnCount > 0) {
                    const turnAttachments = this.attachments.take(chatJid);
                    onTurnComplete?.({
                        text,
                        attachments: turnAttachments,
                    });
                    turnCount++;
                }
                currentTurnText = "";
            };
            const unsub = session.subscribe((event) => {
                if (onEvent) {
                    try {
                        onEvent(event);
                    }
                    catch (err) {
                        console.warn("[agent-pool] Event handler error:", err);
                    }
                }
                if (event.type === "message_update") {
                    if (event.assistantMessageEvent.type === "text_start" && onTurnComplete) {
                        // A new text response is starting — flush the previous turn
                        flushTurn();
                    }
                    if (event.assistantMessageEvent.type === "text_delta") {
                        currentTurnText += event.assistantMessageEvent.delta;
                    }
                }
                if (event.type === "message_end") {
                    recordUsage(event.message);
                }
            });
            let timedOut = false;
            const timeoutId = setTimeout(async () => {
                timedOut = true;
                console.error(`[agent-pool] Timeout after ${AGENT_TIMEOUT}ms for ${chatJid}`);
                await session.abort();
            }, AGENT_TIMEOUT);
            process.env.PICLAW_CHAT_JID = chatJid;
            process.env.PICLAW_CHANNEL = detectChannel(chatJid);
            const phases = options.autoCompactPhases ?? ["pre", "post"];
            if (phases.includes("pre")) {
                await this.maybeAutoCompact(session, "pre", options.onAutoCompact);
            }
            try {
                await session.prompt(prompt);
            }
            finally {
                clearTimeout(timeoutId);
                unsub();
            }
            if (phases.includes("post")) {
                void this.maybeAutoCompact(session, "post", options.onAutoCompact).catch((err) => {
                    console.error("[agent-pool] Post auto-compaction failed:", err);
                });
            }
            const duration = Date.now() - startTime;
            // If onTurnComplete was used, intermediate turns were already flushed.
            // The final turn's text is in currentTurnText.
            const finalText = currentTurnText.trim();
            const finalAttachments = this.attachments.take(chatJid);
            writeAgentLog(this.logsDir, chatJid, duration, timedOut, finalText, null);
            if (timedOut) {
                return { status: "error", result: null, error: `Timed out after ${AGENT_TIMEOUT}ms` };
            }
            console.log(`[agent-pool] Done in ${duration}ms (${finalText.length} chars, ${turnCount + 1} turns, session ${chatJid})`);
            return {
                status: "success",
                result: finalText || null,
                attachments: finalAttachments.length ? finalAttachments : undefined,
            };
        }
        catch (err) {
            this.attachments.clear(chatJid);
            const duration = Date.now() - startTime;
            const errorMsg = err instanceof Error ? err.message : String(err);
            writeAgentLog(this.logsDir, chatJid, duration, false, null, errorMsg);
            console.error(`[agent-pool] Error for ${chatJid}:`, errorMsg);
            return { status: "error", result: null, error: errorMsg };
        }
    }
    async applyControlCommand(chatJid, command) {
        const session = await this.getOrCreate(chatJid);
        process.env.PICLAW_CHAT_JID = chatJid;
        process.env.PICLAW_CHANNEL = detectChannel(chatJid);
        return applyControlCommand(session, this.modelRegistry, command);
    }
    async getCurrentModelLabel(chatJid) {
        const session = await this.getOrCreate(chatJid);
        const model = session.model;
        return model ? `${model.provider}/${model.id}` : null;
    }
    resolveModelInput(input) {
        const trimmed = input.trim();
        if (!trimmed)
            return { error: "Model identifier is required." };
        const slash = trimmed.indexOf("/");
        const provider = slash > 0 ? trimmed.slice(0, slash) : undefined;
        const modelId = slash > 0 ? trimmed.slice(slash + 1) : trimmed;
        this.modelRegistry.refresh();
        const models = this.modelRegistry.getAll();
        if (provider) {
            const match = models.find((m) => m.provider.toLowerCase() === provider.toLowerCase() &&
                m.id.toLowerCase() === modelId.toLowerCase());
            if (!match)
                return { error: `Model not found: ${provider}/${modelId}.` };
            return { model: `${match.provider}/${match.id}` };
        }
        const matches = models.filter((m) => m.id.toLowerCase() === modelId.toLowerCase());
        if (matches.length === 0)
            return { error: `Model not found: ${modelId}.` };
        if (matches.length > 1) {
            const providers = matches.map((m) => `${m.provider}/${m.id}`).join(", ");
            return { error: `Model "${modelId}" matches multiple providers: ${providers}. Use provider/modelId.` };
        }
        return { model: `${matches[0].provider}/${matches[0].id}` };
    }
    async queueStreamingMessage(chatJid, text, behavior) {
        const session = await this.getOrCreate(chatJid);
        if (!session.isStreaming)
            return { queued: false };
        process.env.PICLAW_CHAT_JID = chatJid;
        process.env.PICLAW_CHANNEL = detectChannel(chatJid);
        try {
            await session.prompt(text, { streamingBehavior: behavior });
            return { queued: true };
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            return { queued: false, error: message };
        }
    }
    /** Execute a raw slash command in the AgentSession (extension commands). */
    async applySlashCommand(chatJid, rawText) {
        this.attachments.clear(chatJid);
        const session = await this.getOrCreate(chatJid);
        const result = await executeSlashCommand(session, chatJid, rawText);
        this.attachments.clear(chatJid);
        return result;
    }
    /** Gracefully shut down all sessions. */
    async shutdown() {
        if (this.cleanupTimer) {
            clearInterval(this.cleanupTimer);
            this.cleanupTimer = null;
        }
        for (const [jid, entry] of this.pool) {
            try {
                entry.session.dispose();
                console.log(`[agent-pool] Disposed session ${jid}`);
            }
            catch (err) {
                console.error(`[agent-pool] Error disposing ${jid}:`, err);
            }
        }
        this.pool.clear();
    }
    // ── internal ────────────────────────────────────────────
    async getOrCreate(chatJid) {
        const existing = this.pool.get(chatJid);
        if (existing) {
            existing.lastUsed = Date.now();
            return existing.session;
        }
        console.log(`[agent-pool] Creating new session for ${chatJid}`);
        const chatSessionDir = ensureSessionDir(chatJid);
        if (this.createSession) {
            const session = await this.createSession(chatJid, chatSessionDir);
            this.pool.set(chatJid, { session, lastUsed: Date.now() });
            await this.bindSession(session, chatJid);
            console.log(`[agent-pool] Session ready for ${chatJid} (pool size: ${this.pool.size})`);
            return session;
        }
        const tools = [
            createReadTool(WORKSPACE_DIR),
            createBashTool(WORKSPACE_DIR, { operations: this.bashOperations }),
            createEditTool(WORKSPACE_DIR),
            createWriteTool(WORKSPACE_DIR),
        ];
        const session = await createDefaultSession(chatJid, {
            authStorage: this.authStorage,
            modelRegistry: this.modelRegistry,
            settingsManager: this.settingsManager,
            tools,
        });
        this.pool.set(chatJid, { session, lastUsed: Date.now() });
        await this.bindSession(session, chatJid);
        console.log(`[agent-pool] Session ready for ${chatJid} (pool size: ${this.pool.size})`);
        return session;
    }
    async bindSession(session, chatJid) {
        if (!this.sessionBinder)
            return;
        try {
            await this.sessionBinder(session, chatJid);
        }
        catch (err) {
            console.error(`[agent-pool] Failed to bind session ${chatJid}:`, err);
        }
    }
    async maybeAutoCompact(session, phase, onAutoCompact) {
        if (!session.autoCompactionEnabled)
            return;
        if (session.isCompacting)
            return;
        const usage = session.getContextUsage();
        if (!usage || usage.tokens === null || usage.contextWindow <= 0)
            return;
        const settings = this.settingsManager.getCompactionSettings();
        if (!settings.enabled)
            return;
        const threshold = usage.contextWindow - settings.reserveTokens;
        if (usage.tokens <= threshold)
            return;
        const noticeBase = {
            phase,
            status: "start",
            tokens: usage.tokens,
            contextWindow: usage.contextWindow,
            percent: usage.percent ?? null,
            threshold,
        };
        onAutoCompact?.(noticeBase);
        try {
            await session.compact();
            onAutoCompact?.({ ...noticeBase, status: "end" });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            onAutoCompact?.({ ...noticeBase, status: "error", error: message });
        }
    }
    evictIdle() {
        const now = Date.now();
        for (const [jid, entry] of this.pool) {
            if (now - entry.lastUsed > IDLE_TTL) {
                console.log(`[agent-pool] Evicting idle session ${jid}`);
                try {
                    entry.session.dispose();
                }
                catch { }
                this.pool.delete(jid);
            }
        }
    }
}

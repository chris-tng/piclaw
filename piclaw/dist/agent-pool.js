/**
 * agent-pool.ts – Manages per-chat pi-agent sessions and orchestrates agent runs.
 *
 * The AgentPool is the central coordinator between inbound messages and the
 * pi-coding-agent SDK. It:
 *   - Maintains a map of chat JID → AgentSession (lazy-initialised).
 *   - Provides runAgent() which prompts the agent, streams events, records
 *     token usage, detects auto-compaction needs, and returns the result.
 *   - Handles slash commands by delegating to agent-pool/slash-command.ts.
 *   - Forwards agent-control commands (model switch, session management, etc.)
 *     to the agent-control module.
 *   - Manages session lifecycle: save/restore position (for scheduled tasks),
 *     clear sessions, reload resources.
 *   - Integrates the attachment registry for file-delivery tools.
 *
 * Consumers:
 *   - runtime.ts / runtime/message-loop.ts creates the AgentPool at startup
 *     and calls runAgent() for each inbound message.
 *   - task-scheduler.ts calls runAgent() for scheduled task execution.
 *   - channels/web.ts uses applyControlCommand() and agent status queries.
 *   - agent-control handlers call methods on AgentPool for session/model ops.
 */
import { mkdirSync } from "fs";
import { join } from "path";
import { AuthStorage, createBashTool, createEditTool, createReadTool, createWriteTool, ModelRegistry, SettingsManager, getAgentDir, } from "@mariozechner/pi-coding-agent";
import { applyControlCommand } from "./agent-control/index.js";
import { AGENT_TIMEOUT, SESSION_AUTO_ROTATE, SESSION_MAX_SIZE_BYTES, SESSIONS_DIR, WORKSPACE_DIR } from "./core/config.js";
import { detectChannel } from "./router.js";
import { createTrackedBashOperations } from "./tools/tracked-bash.js";
import { getAttachmentRegistry } from "./agent-pool/attachments.js";
import { writeAgentLog } from "./agent-pool/logging.js";
import { pruneOrphanToolResults } from "./agent-pool/orphan-tool-results.js";
import { createDefaultSession, ensureSessionDir } from "./agent-pool/session.js";
import { executeSlashCommand } from "./agent-pool/slash-command.js";
import { getProviderUsage } from "./agent-pool/provider-usage.js";
import { recordMessageUsage } from "./agent-pool/usage.js";
import { resolveModelLabel } from "./utils/model-utils.js";
import { withChatContext } from "./core/chat-context.js";
import { getSessionFileSize, rotateSession } from "./session-rotation.js";
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
    /** Attempt safe automatic session rotation before the next prompt when configured. */
    async maybeAutoRotateSession(session, chatJid) {
        const autoRotateEnabled = SESSION_AUTO_ROTATE
            || ["1", "true", "yes", "on"].includes((process.env.PICLAW_SESSION_AUTO_ROTATE || "").trim().toLowerCase());
        if (!autoRotateEnabled)
            return;
        const envThresholdMb = parseInt(process.env.PICLAW_SESSION_MAX_SIZE_MB || "", 10);
        const thresholdBytes = Number.isFinite(envThresholdMb) && envThresholdMb > 0
            ? envThresholdMb * 1024 * 1024
            : SESSION_MAX_SIZE_BYTES;
        const sessionFileSize = getSessionFileSize(session.sessionFile);
        if (sessionFileSize === null || sessionFileSize < thresholdBytes)
            return;
        const result = await rotateSession(session, { reason: "automatic" });
        if (result.status === "success") {
            console.log(`[agent-pool] Auto-rotated oversized session ${chatJid}: ${result.previousSize ?? sessionFileSize} -> ${result.nextSize ?? "unknown"}`);
            return;
        }
        console.warn(`[agent-pool] Auto-rotation skipped for ${chatJid}: ${result.message}`);
    }
    /** Run a prompt against the persistent session for `chatJid`. */
    async runAgent(prompt, chatJid, options = {}) {
        const startTime = Date.now();
        this.attachments.clear(chatJid);
        try {
            const session = await this.getOrCreate(chatJid);
            await this.maybeAutoRotateSession(session, chatJid);
            pruneOrphanToolResults(session, chatJid);
            console.log(`[agent-pool] Prompting session ${chatJid} (${prompt.length} chars)`);
            const tracker = this.createTurnTracker(chatJid, options.onTurnComplete);
            const unsub = this.subscribeToSession(session, chatJid, tracker, options.onEvent);
            const timeoutMs = typeof options.timeoutMs === "number" ? options.timeoutMs : AGENT_TIMEOUT;
            const { timeoutId, timedOutRef } = this.startPromptTimeout(session, chatJid, timeoutMs);
            const channel = detectChannel(chatJid);
            return await withChatContext(chatJid, channel, async () => {
                try {
                    await session.prompt(prompt);
                    // Guard against premature waitForRetry() resolution:
                    // agent-session._resolveRetry() fires at message_end (first successful LLM
                    // response during auto-retry), while the retry _runLoop may still be executing
                    // tool calls (isStreaming=true). The upstream design assumes human-paced TUI
                    // callers where this is harmless. In our queue-based context it causes the
                    // next processChat to call session.prompt() while isStreaming is still true,
                    // producing "already processing" errors. Poll until truly idle.
                    // Wait until the session is truly idle. Auto-compaction can start
                    // after the main response finishes and may kick off a follow-up
                    // continue() call (e.g., overflow recovery). Keep listening until
                    // streaming + compaction fully settle.
                    const idleSettleTicks = 10;
                    let idleTicks = 0;
                    while (idleTicks < idleSettleTicks) {
                        if (!session.isStreaming && !session.isCompacting && !session.isRetrying) {
                            idleTicks += 1;
                        }
                        else {
                            idleTicks = 0;
                        }
                        await Bun.sleep(50);
                    }
                }
                finally {
                    if (timeoutId)
                        clearTimeout(timeoutId);
                    unsub();
                }
                const duration = Date.now() - startTime;
                // If onTurnComplete was used, intermediate turns were already flushed.
                // The final turn's text is in tracker.getFinalText().
                const finalText = tracker.getFinalText();
                const finalAttachments = this.attachments.take(chatJid);
                const timedOut = timedOutRef.value;
                writeAgentLog(this.logsDir, chatJid, duration, timedOut, finalText, null);
                if (timedOut) {
                    return { status: "error", result: null, error: `Timed out after ${timeoutMs}ms` };
                }
                console.log(`[agent-pool] Done in ${duration}ms (${finalText.length} chars, ${tracker.getTurnCount() + 1} turns, session ${chatJid})`);
                return {
                    status: "success",
                    result: finalText || null,
                    attachments: finalAttachments.length ? finalAttachments : undefined,
                };
            });
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
        const channel = detectChannel(chatJid);
        const result = await withChatContext(chatJid, channel, () => applyControlCommand(session, this.modelRegistry, command));
        const shouldPersistModel = result.status === "success"
            && (command.type === "cycle_model" || (command.type === "model" && (command.modelId || command.provider)));
        if (shouldPersistModel) {
            this.persistDefaultModel(session);
        }
        return result;
    }
    async getCurrentModelLabel(chatJid) {
        const session = await this.getOrCreate(chatJid);
        const model = session.model;
        return model ? `${model.provider}/${model.id}` : null;
    }
    /** Return available model labels and current model for a chat session. */
    async getAvailableModels(chatJid) {
        const session = await this.getOrCreate(chatJid);
        const registry = session.modelRegistry ?? this.modelRegistry;
        const available = registry.getAvailable();
        const models = available.map((model) => `${model.provider}/${model.id}`);
        const currentModel = session.model ? `${session.model.provider}/${session.model.id}` : null;
        const thinkingLevel = session.thinkingLevel ?? null;
        const supportsThinking = typeof session.supportsThinking === "function"
            ? session.supportsThinking()
            : Boolean(session.model?.reasoning);
        const providerUsage = session.model?.provider
            ? await getProviderUsage(this.authStorage, session.model.provider)
            : null;
        return {
            current: currentModel,
            models,
            thinking_level: thinkingLevel,
            supports_thinking: supportsThinking,
            provider_usage: providerUsage,
        };
    }
    /** Return the current context token usage for a chat session, or null if unknown. */
    async getContextUsageForChat(chatJid) {
        const entry = this.pool.get(chatJid);
        if (!entry)
            return null;
        return entry.session.getContextUsage() ?? null;
    }
    /**
     * Save the current session tree position so it can be restored later.
     * Used by the scheduler to isolate task execution in a side branch.
     */
    async saveSessionPosition(chatJid) {
        const session = await this.getOrCreate(chatJid);
        return session.sessionManager.getLeafId();
    }
    /**
     * Restore the session tree to a previously saved position.
     * Navigates back to the saved leaf, leaving the task's output in a side branch.
     */
    async restoreSessionPosition(chatJid, leafId) {
        if (leafId === null)
            return;
        const session = await this.getOrCreate(chatJid);
        const currentLeaf = session.sessionManager.getLeafId();
        if (currentLeaf === leafId)
            return; // already there
        try {
            await session.navigateTree(leafId);
        }
        catch (err) {
            console.error(`[agent-pool] Failed to restore session position for ${chatJid}:`, err);
        }
    }
    hasProviderModels(provider) {
        return this.modelRegistry.getAll().some((model) => model.provider === provider);
    }
    registerModelProvider(providerName, config) {
        this.modelRegistry.registerProvider(providerName, config);
    }
    resolveModelInput(input) {
        return resolveModelLabel(this.modelRegistry, input);
    }
    isStreaming(chatJid) {
        return this.pool.get(chatJid)?.session.isStreaming ?? false;
    }
    async queueStreamingMessage(chatJid, text, behavior) {
        const session = await this.getOrCreate(chatJid);
        if (!session.isStreaming)
            return { queued: false };
        const channel = detectChannel(chatJid);
        try {
            return await withChatContext(chatJid, channel, async () => {
                await session.prompt(text, { streamingBehavior: behavior });
                return { queued: true };
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            return { queued: false, error: message };
        }
    }
    /** Remove one queued follow-up message (first content match) from an active session queue. */
    async removeQueuedFollowupMessage(chatJid, queuedContent) {
        const session = await this.getOrCreate(chatJid);
        if (!session.isStreaming)
            return false;
        const followups = [...session.getFollowUpMessages()];
        if (followups.length === 0)
            return false;
        const normalized = typeof queuedContent === "string" ? queuedContent.trim() : "";
        let removeIndex = -1;
        if (normalized) {
            removeIndex = followups.findIndex((item) => item === queuedContent || item.trim() === normalized);
        }
        if (removeIndex < 0)
            removeIndex = 0;
        const channel = detectChannel(chatJid);
        try {
            return await withChatContext(chatJid, channel, async () => {
                const cleared = session.clearQueue();
                const nextFollowups = cleared.followUp.filter((_, idx) => idx !== removeIndex);
                for (const steer of cleared.steering) {
                    await session.prompt(steer, { streamingBehavior: "steer" });
                }
                for (const followup of nextFollowups) {
                    await session.prompt(followup, { streamingBehavior: "followUp" });
                }
                return true;
            });
        }
        catch (error) {
            console.warn(`[agent-pool] Failed to remove queued follow-up for ${chatJid}:`, error);
            return false;
        }
    }
    /** Execute a raw slash command in the AgentSession (extension commands). */
    async applySlashCommand(chatJid, rawText) {
        this.attachments.clear(chatJid);
        const session = await this.getOrCreate(chatJid);
        const channel = detectChannel(chatJid);
        const result = await withChatContext(chatJid, channel, () => executeSlashCommand(session, chatJid, rawText));
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
            await this.applyDefaultModel(session);
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
        await this.applyDefaultModel(session);
        await this.bindSession(session, chatJid);
        console.log(`[agent-pool] Session ready for ${chatJid} (pool size: ${this.pool.size})`);
        return session;
    }
    async applyDefaultModel(session) {
        const provider = this.settingsManager.getDefaultProvider();
        const modelId = this.settingsManager.getDefaultModel();
        if (!provider || !modelId)
            return;
        const current = session.model;
        if (current && current.provider === provider && current.id === modelId)
            return;
        const sessionRegistry = session.modelRegistry ?? this.modelRegistry;
        const resolved = sessionRegistry.find(provider, modelId);
        if (!resolved)
            return;
        const setModel = session.setModel;
        if (typeof setModel !== "function")
            return;
        try {
            await setModel.call(session, resolved);
        }
        catch (err) {
            console.warn(`[agent-pool] Failed to restore model ${provider}/${modelId}:`, err);
        }
    }
    persistDefaultModel(session) {
        const model = session.model;
        if (!model)
            return;
        this.settingsManager.setDefaultModelAndProvider(model.provider, model.id);
    }
    createTurnTracker(chatJid, onTurnComplete) {
        let currentTurnText = "";
        let turnCount = 0;
        let messageHasDelta = false;
        const extractTextFromContent = (content) => {
            if (!content)
                return "";
            if (typeof content === "string")
                return content;
            if (Array.isArray(content)) {
                return content
                    .map((block) => {
                    const contentBlock = block;
                    if (contentBlock?.type !== "text")
                        return "";
                    return typeof contentBlock.text === "string" ? contentBlock.text : "";
                })
                    .join("");
            }
            return "";
        };
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
            messageHasDelta = false;
        };
        const handleMessageUpdate = (event) => {
            if (event.type === "message_update") {
                if (event.assistantMessageEvent.type === "text_start") {
                    if (onTurnComplete) {
                        // A new text response is starting — flush the previous turn
                        flushTurn();
                    }
                    else {
                        messageHasDelta = false;
                    }
                }
                if (event.assistantMessageEvent.type === "text_delta") {
                    messageHasDelta = true;
                    currentTurnText += event.assistantMessageEvent.delta;
                }
                return;
            }
            if (event.type === "message_end") {
                const message = event.message;
                if (message?.role === "assistant") {
                    const text = extractTextFromContent(message.content);
                    if (!messageHasDelta && text) {
                        currentTurnText = text;
                    }
                }
                messageHasDelta = false;
            }
        };
        return {
            handleMessageUpdate,
            getFinalText: () => currentTurnText.trim(),
            getTurnCount: () => turnCount,
        };
    }
    subscribeToSession(session, chatJid, tracker, onEvent) {
        return session.subscribe((event) => {
            const entry = this.pool.get(chatJid);
            if (entry)
                entry.lastUsed = Date.now();
            if (onEvent) {
                try {
                    onEvent(event);
                }
                catch (err) {
                    console.warn("[agent-pool] Event handler error:", err);
                }
            }
            tracker.handleMessageUpdate(event);
            if (event.type === "message_end") {
                recordMessageUsage(chatJid, event.message);
            }
        });
    }
    startPromptTimeout(session, chatJid, timeoutMs) {
        const timedOutRef = { value: false };
        if (!timeoutMs || timeoutMs <= 0) {
            return { timeoutId: null, timedOutRef };
        }
        const timeoutId = setTimeout(async () => {
            timedOutRef.value = true;
            console.error(`[agent-pool] Timeout after ${timeoutMs}ms for ${chatJid}`);
            await session.abort();
        }, timeoutMs);
        return { timeoutId, timedOutRef };
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
    evictIdle() {
        const now = Date.now();
        for (const [jid, entry] of this.pool) {
            const session = entry.session;
            if (session.isStreaming || session.isBashRunning || session.isCompacting) {
                entry.lastUsed = now;
                continue;
            }
            if (now - entry.lastUsed > IDLE_TTL) {
                console.log(`[agent-pool] Evicting idle session ${jid}`);
                try {
                    session.dispose();
                }
                catch { }
                this.pool.delete(jid);
            }
        }
    }
}

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
import {
  type AgentSession,
  type AgentSessionEvent,
  AuthStorage,
  createBashTool,
  createEditTool,
  createReadTool,
  createWriteTool,
  ModelRegistry,
  SettingsManager,
  getAgentDir,
} from "@mariozechner/pi-coding-agent";

import { applyControlCommand, type AgentControlCommand, type AgentControlResult } from "./agent-control/index.js";
import { AGENT_TIMEOUT, SESSIONS_DIR, WORKSPACE_DIR } from "./core/config.js";
import { detectChannel } from "./router.js";
import { createTrackedBashOperations } from "./tools/tracked-bash.js";
import { getAttachmentRegistry, type AttachmentInfo } from "./agent-pool/attachments.js";
import { writeAgentLog } from "./agent-pool/logging.js";
import { createDefaultSession, ensureSessionDir } from "./agent-pool/session.js";
import { executeSlashCommand } from "./agent-pool/slash-command.js";
import { recordMessageUsage } from "./agent-pool/usage.js";
import { resolveModelLabel } from "./utils/model-utils.js";
import { withChatContext } from "./core/chat-context.js";

/** Output from an agent run: response text, status, and token usage. */
export interface AgentOutput {
  status: "success" | "error";
  result: string | null;
  error?: string;
  attachments?: AttachmentInfo[];
}

/** A single turn's output within a multi-turn agent run. */
export interface TurnOutput {
  text: string;
  attachments: AttachmentInfo[];
}

/** Options for AgentPool.runAgent(): chatJid, messages, callbacks. */
export interface RunAgentOptions {
  onEvent?: (event: AgentSessionEvent) => void;
  /** Called when a turn completes (text_start → next text_start or end). */
  onTurnComplete?: (turn: TurnOutput) => void;
  /** Override the default timeout (ms). Use 0 or a negative value to disable. */
  timeoutMs?: number;
}

/** Construction options for creating an AgentPool. */
export interface AgentPoolOptions {
  createSession?: (chatJid: string, sessionDir: string) => Promise<AgentSession>;
  modelRegistry?: ModelRegistry;
}

interface PoolEntry {
  session: AgentSession;
  lastUsed: number;
}

interface TurnTracker {
  handleMessageUpdate: (event: AgentSessionEvent) => void;
  getFinalText: () => string;
  getTurnCount: () => number;
}

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
  private pool = new Map<string, PoolEntry>();
  private cleanupTimer: ReturnType<typeof setInterval> | null = null;

  // Shared across all sessions (expensive to create, safe to reuse)
  private authStorage: AuthStorage;
  private modelRegistry: ModelRegistry;
  private settingsManager = SettingsManager.create(WORKSPACE_DIR, getAgentDir());
  private logsDir = join(WORKSPACE_DIR, "logs");
  private createSession?: AgentPoolOptions["createSession"];
  private sessionBinder?: (session: AgentSession, chatJid: string) => Promise<void> | void;
  private bashOperations = createTrackedBashOperations();
  private attachments = getAttachmentRegistry();

  constructor(options: AgentPoolOptions = {}) {
    this.createSession = options.createSession;
    this.authStorage = AuthStorage.create();
    this.modelRegistry = options.modelRegistry ?? new ModelRegistry(this.authStorage);
    mkdirSync(SESSIONS_DIR, { recursive: true });
    mkdirSync(this.logsDir, { recursive: true });
    this.cleanupTimer = setInterval(() => this.evictIdle(), CLEANUP_INTERVAL);
  }

  setSessionBinder(binder?: (session: AgentSession, chatJid: string) => Promise<void> | void): void {
    this.sessionBinder = binder;
    if (!binder) return;
    for (const [jid, entry] of this.pool) {
      try {
        void binder(entry.session, jid);
      } catch (err) {
        console.error(`[agent-pool] Failed to bind session ${jid}:`, err);
      }
    }
  }

  /** Run a prompt against the persistent session for `chatJid`. */
  async runAgent(prompt: string, chatJid: string, options: RunAgentOptions = {}): Promise<AgentOutput> {
    const startTime = Date.now();
    this.attachments.clear(chatJid);

    try {
      const session = await this.getOrCreate(chatJid);
      this.pruneOrphanToolResults(session, chatJid);
      console.log(`[agent-pool] Prompting session ${chatJid} (${prompt.length} chars)`);

      const tracker = this.createTurnTracker(chatJid, options.onTurnComplete);
      const unsub = this.subscribeToSession(session, chatJid, tracker, options.onEvent);
      const timeoutMs = typeof options.timeoutMs === "number" ? options.timeoutMs : AGENT_TIMEOUT;
      const { timeoutId, timedOutRef } = this.startPromptTimeout(session, chatJid, timeoutMs);

      const channel = detectChannel(chatJid);
      return await withChatContext(chatJid, channel, async () => {
        try {
          await session.prompt(prompt);
        } finally {
          if (timeoutId) clearTimeout(timeoutId);
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

        console.log(
          `[agent-pool] Done in ${duration}ms (${finalText.length} chars, ${tracker.getTurnCount() + 1} turns, session ${chatJid})`
        );
        return {
          status: "success",
          result: finalText || null,
          attachments: finalAttachments.length ? finalAttachments : undefined,
        };
      });
    } catch (err) {
      this.attachments.clear(chatJid);
      const duration = Date.now() - startTime;
      const errorMsg = err instanceof Error ? err.message : String(err);
      writeAgentLog(this.logsDir, chatJid, duration, false, null, errorMsg);
      console.error(`[agent-pool] Error for ${chatJid}:`, errorMsg);
      return { status: "error", result: null, error: errorMsg };
    }
  }

  async applyControlCommand(chatJid: string, command: AgentControlCommand): Promise<AgentControlResult> {
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

  async getCurrentModelLabel(chatJid: string): Promise<string | null> {
    const session = await this.getOrCreate(chatJid);
    const model = session.model;
    return model ? `${model.provider}/${model.id}` : null;
  }

  /** Return available model labels and current model for a chat session. */
  async getAvailableModels(chatJid: string): Promise<{ current: string | null; models: string[] }> {
    const session = await this.getOrCreate(chatJid);
    const registry = (session as AgentSession & { modelRegistry?: ModelRegistry }).modelRegistry ?? this.modelRegistry;
    const available = registry.getAvailable();
    const models = available.map((model) => `${model.provider}/${model.id}`);
    const currentModel = session.model ? `${session.model.provider}/${session.model.id}` : null;
    return { current: currentModel, models };
  }

  /** Return the current context token usage for a chat session, or null if unknown. */
  async getContextUsageForChat(chatJid: string): Promise<{
    tokens: number | null;
    contextWindow: number;
    percent: number | null;
  } | null> {
    const entry = this.pool.get(chatJid);
    if (!entry) return null;
    return entry.session.getContextUsage() ?? null;
  }

  /**
   * Save the current session tree position so it can be restored later.
   * Used by the scheduler to isolate task execution in a side branch.
   */
  async saveSessionPosition(chatJid: string): Promise<string | null> {
    const session = await this.getOrCreate(chatJid);
    return session.sessionManager.getLeafId();
  }

  /**
   * Restore the session tree to a previously saved position.
   * Navigates back to the saved leaf, leaving the task's output in a side branch.
   */
  async restoreSessionPosition(chatJid: string, leafId: string | null): Promise<void> {
    if (leafId === null) return;
    const session = await this.getOrCreate(chatJid);
    const currentLeaf = session.sessionManager.getLeafId();
    if (currentLeaf === leafId) return; // already there
    try {
      await session.navigateTree(leafId);
    } catch (err) {
      console.error(`[agent-pool] Failed to restore session position for ${chatJid}:`, err);
    }
  }

  resolveModelInput(input: string): { model?: string; error?: string } {
    return resolveModelLabel(this.modelRegistry, input);
  }

  async queueStreamingMessage(
    chatJid: string,
    text: string,
    behavior: "steer" | "followUp"
  ): Promise<{ queued: boolean; error?: string }> {
    const session = await this.getOrCreate(chatJid);
    if (!session.isStreaming) return { queued: false };

    const channel = detectChannel(chatJid);

    try {
      return await withChatContext(chatJid, channel, async () => {
        await session.prompt(text, { streamingBehavior: behavior });
        return { queued: true };
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { queued: false, error: message };
    }
  }

  /** Execute a raw slash command in the AgentSession (extension commands). */
  async applySlashCommand(chatJid: string, rawText: string): Promise<AgentControlResult> {
    this.attachments.clear(chatJid);
    const session = await this.getOrCreate(chatJid);
    const channel = detectChannel(chatJid);
    const result = await withChatContext(chatJid, channel, () => executeSlashCommand(session, chatJid, rawText));
    this.attachments.clear(chatJid);
    return result;
  }

  /** Gracefully shut down all sessions. */
  async shutdown(): Promise<void> {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = null;
    }
    for (const [jid, entry] of this.pool) {
      try {
        entry.session.dispose();
        console.log(`[agent-pool] Disposed session ${jid}`);
      } catch (err) {
        console.error(`[agent-pool] Error disposing ${jid}:`, err);
      }
    }
    this.pool.clear();
  }

  // ── internal ────────────────────────────────────────────

  private async getOrCreate(chatJid: string): Promise<AgentSession> {
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

  private async applyDefaultModel(session: AgentSession): Promise<void> {
    const provider = this.settingsManager.getDefaultProvider();
    const modelId = this.settingsManager.getDefaultModel();
    if (!provider || !modelId) return;

    const current = session.model;
    if (current && current.provider === provider && current.id === modelId) return;

    const sessionRegistry = (session as AgentSession & { modelRegistry?: ModelRegistry }).modelRegistry ?? this.modelRegistry;
    const resolved = sessionRegistry.find(provider, modelId);
    if (!resolved) return;

    const setModel = (session as { setModel?: (model: typeof resolved) => Promise<void> }).setModel;
    if (typeof setModel !== "function") return;

    try {
      await setModel.call(session, resolved);
    } catch (err) {
      console.warn(`[agent-pool] Failed to restore model ${provider}/${modelId}:`, err);
    }
  }

  private persistDefaultModel(session: AgentSession): void {
    const model = session.model;
    if (!model) return;
    this.settingsManager.setDefaultModelAndProvider(model.provider, model.id);
  }

  private pruneOrphanToolResults(session: AgentSession, chatJid: string): void {
    const messages = (session as any).agent?.state?.messages as Array<Record<string, any>> | undefined;
    if (!Array.isArray(messages) || messages.length === 0) return;

    const toolCallIds = new Set<string>();
    for (const msg of messages) {
      if (msg?.role !== "assistant" || !Array.isArray(msg.content)) continue;
      for (const block of msg.content) {
        if (block && block.type === "toolCall" && typeof block.id === "string") {
          toolCallIds.add(block.id);
        }
      }
    }

    const shouldKeepToolResult = (msg: Record<string, any>) => {
      if (msg?.role !== "toolResult") return true;
      if (toolCallIds.size === 0) return false;
      const id = msg.toolCallId;
      return typeof id === "string" && toolCallIds.has(id);
    };

    const pruned = messages.filter(shouldKeepToolResult);

    if (pruned.length !== messages.length) {
      try {
        (session as any).agent?.replaceMessages(pruned as any);
        console.warn(`[agent-pool] Pruned ${messages.length - pruned.length} orphan tool result(s) for ${chatJid}`);
      } catch (err) {
        console.warn(`[agent-pool] Failed to prune orphan tool results for ${chatJid}:`, err);
      }
    }
  }

  private createTurnTracker(
    chatJid: string,
    onTurnComplete?: (turn: TurnOutput) => void
  ): TurnTracker {
    let currentTurnText = "";
    let turnCount = 0;
    let messageHasDelta = false;

    const extractTextFromContent = (content: any): string => {
      if (!content) return "";
      if (typeof content === "string") return content;
      if (Array.isArray(content)) {
        return content
          .filter((block) => block && block.type === "text")
          .map((block) => (typeof block.text === "string" ? block.text : ""))
          .join("");
      }
      return "";
    };

    const flushTurn = () => {
      const text = currentTurnText.trim();
      if (!text && !onTurnComplete) return;
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

    const handleMessageUpdate = (event: AgentSessionEvent) => {
      if (event.type === "message_update") {
        if (event.assistantMessageEvent.type === "text_start") {
          if (onTurnComplete) {
            // A new text response is starting — flush the previous turn
            flushTurn();
          } else {
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
        const message = event.message as { role?: string; content?: unknown } | undefined;
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

  private subscribeToSession(
    session: AgentSession,
    chatJid: string,
    tracker: TurnTracker,
    onEvent?: (event: AgentSessionEvent) => void
  ): () => void {
    return session.subscribe((event: AgentSessionEvent) => {
      const entry = this.pool.get(chatJid);
      if (entry) entry.lastUsed = Date.now();

      if (onEvent) {
        try {
          onEvent(event);
        } catch (err) {
          console.warn("[agent-pool] Event handler error:", err);
        }
      }

      tracker.handleMessageUpdate(event);

      if (event.type === "message_end") {
        recordMessageUsage(chatJid, (event as any).message);
      }
    });
  }

  private startPromptTimeout(
    session: AgentSession,
    chatJid: string,
    timeoutMs: number
  ): { timeoutId: ReturnType<typeof setTimeout> | null; timedOutRef: { value: boolean } } {
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

  private async bindSession(session: AgentSession, chatJid: string): Promise<void> {
    if (!this.sessionBinder) return;
    try {
      await this.sessionBinder(session, chatJid);
    } catch (err) {
      console.error(`[agent-pool] Failed to bind session ${chatJid}:`, err);
    }
  }

  private evictIdle(): void {
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
        } catch {}
        this.pool.delete(jid);
      }
    }
  }
}

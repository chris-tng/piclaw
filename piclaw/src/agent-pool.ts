import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import {
  type AgentSession,
  type AgentSessionEvent,
  AuthStorage,
  createAgentSession,
  createBashTool,
  createEditTool,
  createReadTool,
  createWriteTool,
  DefaultResourceLoader,
  getAgentDir,
  ModelRegistry,
  SessionManager,
  SettingsManager,
} from "@mariozechner/pi-coding-agent";
import { applyControlCommand, type AgentControlCommand, type AgentControlResult } from "./agent-control.js";
import { AGENT_TIMEOUT, DATA_DIR, SESSIONS_DIR, WORKSPACE_DIR } from "./config.js";
import { detectChannel } from "./router.js";
import { createTrackedBashOperations } from "./tools/tracked-bash.js";

export interface AgentOutput {
  status: "success" | "error";
  result: string | null;
  error?: string;
}

export interface RunAgentOptions {
  onEvent?: (event: AgentSessionEvent) => void;
}

export interface AgentPoolOptions {
  createSession?: (chatJid: string, sessionDir: string) => Promise<AgentSession>;
  modelRegistry?: ModelRegistry;
}

interface PoolEntry {
  session: AgentSession;
  lastUsed: number;
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

    try {
      const session = await this.getOrCreate(chatJid);
      console.log(`[agent-pool] Prompting session ${chatJid} (${prompt.length} chars)`);

      // Collect the assistant's final text from streaming events
      let result = "";
      const onEvent = options.onEvent;
      const unsub = session.subscribe((event: AgentSessionEvent) => {
        if (onEvent) {
          try {
            onEvent(event);
          } catch (err) {
            console.warn("[agent-pool] Event handler error:", err);
          }
        }
        if (
          event.type === "message_update" &&
          event.assistantMessageEvent.type === "text_delta"
        ) {
          result += event.assistantMessageEvent.delta;
        }
      });

      // Timeout handling
      let timedOut = false;
      const timeoutId = setTimeout(async () => {
        timedOut = true;
        console.error(`[agent-pool] Timeout after ${AGENT_TIMEOUT}ms for ${chatJid}`);
        await session.abort();
      }, AGENT_TIMEOUT);

      // Set chat context for IPC skills (skills read this env var)
      process.env.PICLAW_CHAT_JID = chatJid;
      process.env.PICLAW_CHANNEL = detectChannel(chatJid);

      try {
        await session.prompt(prompt);
      } finally {
        clearTimeout(timeoutId);
        unsub();
      }

      const duration = Date.now() - startTime;
      this.writeLog(chatJid, duration, timedOut, result, null);

      if (timedOut) {
        return { status: "error", result: null, error: `Timed out after ${AGENT_TIMEOUT}ms` };
      }

      console.log(`[agent-pool] Done in ${duration}ms (${result.length} chars, session ${chatJid})`);
      return { status: "success", result: result.trim() || null };
    } catch (err) {
      const duration = Date.now() - startTime;
      const errorMsg = err instanceof Error ? err.message : String(err);
      this.writeLog(chatJid, duration, false, null, errorMsg);
      console.error(`[agent-pool] Error for ${chatJid}:`, errorMsg);
      return { status: "error", result: null, error: errorMsg };
    }
  }

  async applyControlCommand(chatJid: string, command: AgentControlCommand): Promise<AgentControlResult> {
    const session = await this.getOrCreate(chatJid);
    return applyControlCommand(session, this.modelRegistry, command);
  }

  /** Execute a raw slash command in the AgentSession (extension commands).
   * Returns an AgentControlResult-like object with status/message.
   * This runs session.prompt(rawText) and collects emitted messages (assistant and custom)
   * to produce a text result suitable for returning to the web UI.
   */
  async applySlashCommand(chatJid: string, rawText: string): Promise<AgentControlResult> {
    const startTime = Date.now();
    try {
      const session = await this.getOrCreate(chatJid);
      console.log(`[agent-pool] Executing slash command for ${chatJid}: ${rawText}`);

      const trimmed = rawText.trim();
      if (!trimmed.startsWith("/")) {
        return { status: "error", message: "Not a slash command." };
      }

      const rawCommand = trimmed.slice(1);
      const spaceIndex = rawCommand.indexOf(" ");
      const commandName = spaceIndex === -1 ? rawCommand : rawCommand.slice(0, spaceIndex);

      const skills = session.resourceLoader.getSkills().skills;
      const templates = session.promptTemplates;
      const extensionRunner = session.extensionRunner;

      let known = false;
      if (rawCommand.startsWith("skill:")) {
        const skillName = rawCommand.slice(6).split(/\s+/)[0];
        known = skills.some((skill) => skill.name === skillName);
        if (!known) {
          return {
            status: "error",
            message: `Unknown skill: /skill:${skillName}. Use /commands to list available commands.`,
          };
        }
      } else if (templates.some((template) => template.name === commandName)) {
        known = true;
      } else if (extensionRunner?.getCommand(commandName)) {
        known = true;
      }

      if (!known) {
        return {
          status: "error",
          message: `Unknown command: /${commandName}. Use /commands to list available commands.`,
        };
      }

      // Collect textual output from events (both streaming deltas and final message_end)
      let assistantBuffer = "";
      const customBuffers: string[] = [];
      const capturedMessages: Array<{ role: string; text: string; customType?: string }> = [];

      const extractTextFromContent = (content: any): string => {
        if (!content) return "";
        if (typeof content === "string") return content;
        if (Array.isArray(content)) {
          return content
            .filter((b) => b && b.type === "text")
            .map((b) => b.text)
            .join("") || "";
        }
        return "";
      };

      const onEvent = (event: any) => {
        try {
          if (event.type === "message_update") {
            const me = event.assistantMessageEvent;
            if (me && me.type === "text_delta") {
              assistantBuffer += me.delta || "";
            }
          }
          if (event.type === "message_end") {
            const msg = event.message;
            const text = extractTextFromContent(msg.content);
            if (text) {
              capturedMessages.push({
                role: msg.role,
                text,
                customType: msg.customType,
              });
            }
            if (msg.role === "assistant") {
              // Prefer final assistant text when available
              assistantBuffer = text || assistantBuffer;
            } else if (msg.role === "custom" || msg.role === "toolResult" || msg.role === "user") {
              if (text) customBuffers.push(text);
            } else {
              if (text) customBuffers.push(text);
            }
          }
        } catch (err) {
          // ignore
        }
      };

      const unsub = session.subscribe(onEvent);

      // Timeout handling (mirror runAgent behaviour)
      let timedOut = false;
      const timeoutId = setTimeout(async () => {
        timedOut = true;
        console.error(`[agent-pool] Slash command timeout after ${AGENT_TIMEOUT}ms for ${chatJid}`);
        try { await session.abort(); } catch {};
      }, AGENT_TIMEOUT);

      try {
        // Set chat context env for skills
        process.env.PICLAW_CHAT_JID = chatJid;
        process.env.PICLAW_CHANNEL = detectChannel(chatJid);

        // Execute the raw slash command via session.prompt so extension commands run
        await session.prompt(rawText);
      } finally {
        clearTimeout(timeoutId);
        unsub();
      }

      if (timedOut) {
        return { status: "error", message: `Timed out after ${AGENT_TIMEOUT}ms` };
      }

      // Prefer assistant buffer, otherwise custom buffers joined
      const finalText = (assistantBuffer && assistantBuffer.trim())
        ? assistantBuffer.trim()
        : customBuffers.join("\n\n").trim();
      const message = finalText || capturedMessages.map((m) => m.text).join("\n\n").trim();

      console.log(`[agent-pool] Slash command completed in ${Date.now() - startTime}ms (${message.length} chars)`);
      return { status: "success", message, messages: capturedMessages };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[agent-pool] Slash command error for ${chatJid}:`, message);
      return { status: "error", message };
    }
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

    // Each chat gets its own session directory so history is per-conversation
    const chatSessionDir = join(SESSIONS_DIR, sanitiseJid(chatJid));
    mkdirSync(chatSessionDir, { recursive: true });

    if (this.createSession) {
      const session = await this.createSession(chatJid, chatSessionDir);
      this.pool.set(chatJid, { session, lastUsed: Date.now() });
      if (this.sessionBinder) {
        try { await this.sessionBinder(session, chatJid); } catch (err) {
          console.error(`[agent-pool] Failed to bind session ${chatJid}:`, err);
        }
      }
      console.log(`[agent-pool] Session ready for ${chatJid} (pool size: ${this.pool.size})`);
      return session;
    }

    // Use DefaultResourceLoader for full discovery (skills, extensions, context)
    const resourceLoader = new DefaultResourceLoader({
      cwd: WORKSPACE_DIR,
      agentDir: getAgentDir(),
      settingsManager: this.settingsManager,
    });
    await resourceLoader.reload();

    const { session } = await createAgentSession({
      cwd: WORKSPACE_DIR,
      agentDir: getAgentDir(),
      authStorage: this.authStorage,
      modelRegistry: this.modelRegistry,
      settingsManager: this.settingsManager,
      resourceLoader,
      sessionManager: SessionManager.continueRecent(WORKSPACE_DIR, chatSessionDir),
      tools: [
        createReadTool(WORKSPACE_DIR),
        createBashTool(WORKSPACE_DIR, { operations: this.bashOperations }),
        createEditTool(WORKSPACE_DIR),
        createWriteTool(WORKSPACE_DIR),
      ],
    });

    this.pool.set(chatJid, { session, lastUsed: Date.now() });
    if (this.sessionBinder) {
      try { await this.sessionBinder(session, chatJid); } catch (err) {
        console.error(`[agent-pool] Failed to bind session ${chatJid}:`, err);
      }
    }
    console.log(`[agent-pool] Session ready for ${chatJid} (pool size: ${this.pool.size})`);
    return session;
  }

  private evictIdle(): void {
    const now = Date.now();
    for (const [jid, entry] of this.pool) {
      if (now - entry.lastUsed > IDLE_TTL) {
        console.log(`[agent-pool] Evicting idle session ${jid}`);
        try { entry.session.dispose(); } catch {}
        this.pool.delete(jid);
      }
    }
  }

  private writeLog(
    chatJid: string,
    duration: number,
    timedOut: boolean,
    result: string | null,
    error: string | null,
  ): void {
    try {
      const ts = new Date().toISOString().replace(/[:.]/g, "-");
      const content = [
        `Chat: ${chatJid}`,
        `Duration: ${duration}ms`,
        `TimedOut: ${timedOut}`,
        error ? `Error: ${error}` : null,
        "",
        "=== result ===",
        result?.slice(0, 50000) ?? "(none)",
      ]
        .filter((l) => l !== null)
        .join("\n");
      writeFileSync(join(this.logsDir, `agent-${ts}.log`), content);
    } catch {}
  }
}

/** Turn a JID into a safe directory name. */
function sanitiseJid(jid: string): string {
  return jid.replace(/[^a-zA-Z0-9._-]/g, "_");
}

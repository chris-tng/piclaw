/**
 * test/agent-control/agent-control-handlers.test.ts – Tests for command handler dispatch.
 *
 * Exercises applyControlCommand() with various command types, verifying
 * correct handler selection, model registry interactions, state changes,
 * and error/success result formatting.
 */

import { afterEach, expect, test } from "bun:test";
import { withChatContext } from "../../src/core/chat-context.js";
import { getTestWorkspace, setEnv } from "../helpers.js";

let restoreEnv: (() => void) | null = null;

afterEach(() => {
  restoreEnv?.();
  restoreEnv = null;
});

const modelA = { provider: "openai", id: "gpt-test", reasoning: true } as any;

const registry = {
  refresh: () => {},
  getAvailable: () => [modelA],
  getAll: () => [modelA],
} as any;

class RichSession {
  model: any = modelA;
  thinkingLevel = "low" as const;
  isStreaming = false;
  isCompacting = false;
  isRetrying = false;
  autoCompactionEnabled = false;
  autoRetryEnabled = false;
  steeringMode: "all" | "one-at-a-time" = "one-at-a-time";
  followUpMode: "all" | "one-at-a-time" = "one-at-a-time";
  pendingMessageCount = 0;
  sessionId = "session-1";
  sessionName = "";
  sessionFile = "session.json";
  isBashRunning = false;
  abortCalls = 0;
  abortRetryCalls = 0;
  abortBashCalls = 0;
  reloadCalls = 0;
  followUpModeCalls: Array<"all" | "one-at-a-time"> = [];
  steeringModeCalls: Array<"all" | "one-at-a-time"> = [];
  promptCalls: Array<{ text: string; options?: any }> = [];
  labelChanges: Array<{ id: string; label: string }> = [];
  listeners: Array<(event: any) => void> = [];

  extensionRunner = {
    getRegisteredCommandsWithPaths: () => [
      { command: { name: "ext", description: "Extension command" }, extensionPath: "/ext" },
    ],
  };

  promptTemplates = [{ name: "template", description: "Template command" }];

  resourceLoader = {
    getSkills: () => ({ skills: [{ name: "demo", description: "Demo skill" }] }),
  };

  getSteeringMessages() {
    return ["steer"];
  }

  getFollowUpMessages() {
    return [];
  }

  setFollowUpMode(mode: "all" | "one-at-a-time") {
    this.followUpMode = mode;
    this.followUpModeCalls.push(mode);
  }

  setSteeringMode(mode: "all" | "one-at-a-time") {
    this.steeringMode = mode;
    this.steeringModeCalls.push(mode);
  }

  getSessionStats() {
    return {
      sessionId: this.sessionId,
      sessionFile: this.sessionFile,
      userMessages: 2,
      assistantMessages: 1,
      toolCalls: 1,
      toolResults: 0,
      totalMessages: 3,
      tokens: { input: 100, output: 50, cacheRead: 0, cacheWrite: 0, total: 150 },
      cost: 0.12,
    } as any;
  }

  getContextUsage() {
    return { tokens: 100, contextWindow: 200, percent: 50 } as any;
  }

  getLastAssistantText() {
    return "last response";
  }

  async compact() {
    return { tokensBefore: 1200, firstKeptEntryId: "entry-1", summary: "Summary" } as any;
  }

  setAutoCompactionEnabled(enabled: boolean) {
    this.autoCompactionEnabled = enabled;
  }

  setAutoRetryEnabled(enabled: boolean) {
    this.autoRetryEnabled = enabled;
  }

  abortRetry() {
    this.abortRetryCalls += 1;
  }

  abortBash() {
    this.abortBashCalls += 1;
  }

  cycleModel() {
    return { model: modelA, thinkingLevel: "low", isScoped: false } as any;
  }

  cycleThinkingLevel() {
    return "medium" as any;
  }

  supportsThinking() {
    return true;
  }

  getAvailableThinkingLevels() {
    return ["off", "low", "medium", "high"] as any;
  }

  setThinkingLevel(level: any) {
    this.thinkingLevel = level;
  }

  async setModel(model: any) {
    this.model = model;
  }

  async reload() {
    this.reloadCalls += 1;
  }

  async abort() {
    this.abortCalls += 1;
  }

  async executeBash() {
    return { output: "ok", exitCode: 0, truncated: false, cancelled: false } as any;
  }

  setSessionName(name: string) {
    this.sessionName = name;
  }

  async newSession() {
    return true;
  }

  async switchSession() {
    return true;
  }

  async fork() {
    return { cancelled: false, selectedText: "Selected" } as any;
  }

  getUserMessagesForForking() {
    return [{ entryId: "entry-1", text: "hello" }];
  }

  async exportToHtml(path?: string) {
    return path || "/tmp/session.html";
  }

  sessionManager = {
    getLeafId: () => "entry-1",
    getTree: () => [
      {
        entry: { id: "entry-1", type: "message", message: { role: "user", content: [{ type: "text", text: "hello" }] } },
        label: "milestone",
        children: [],
      },
    ],
    appendLabelChange: (id: string, label: string) => {
      this.labelChanges.push({ id, label });
    },
  };

  async navigateTree() {
    return { cancelled: false, aborted: false, editorText: "Navigation text" } as any;
  }

  subscribe(fn: (event: any) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== fn);
    };
  }

  async prompt(text: string, options?: any) {
    this.promptCalls.push({ text, options });
    for (const listener of this.listeners) {
      listener({
        type: "message_end",
        message: { role: "assistant", content: [{ type: "text", text: "queued reply" }] },
      });
    }
  }
}

async function getControl() {
  const mod = await import("../../src/agent-control/index.js");
  return mod.applyControlCommand as (session: any, registry: any, command: any) => Promise<any>;
}

test("agent control info and mode commands", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const applyControlCommand = await getControl();
  const session = new RichSession();

  const state = await applyControlCommand(session as any, registry, { type: "state", raw: "/state" });
  expect(state.message).toContain("Model:");

  const db = await import("../../src/db.js");
  db.initDatabase();
  db.storeTokenUsage({
    chat_jid: "web:default",
    run_at: new Date().toISOString(),
    input_tokens: 120,
    output_tokens: 30,
    cache_read_tokens: 0,
    cache_write_tokens: 0,
    total_tokens: 150,
    cost_input: 0,
    cost_output: 0,
    cost_cache_read: 0,
    cost_cache_write: 0,
    cost_total: 0.15,
    provider: "openai",
    model: "gpt-test",
  });

  const stats = await withChatContext("web:default", "web", () =>
    applyControlCommand(session as any, registry, { type: "stats", raw: "/stats" })
  );
  expect(stats.message).toContain("Session stats:");
  expect(stats.message).toContain("Tracked usage (persisted):");
  expect(stats.message).toContain("Per provider:");
  expect(stats.message).toContain("Per model:");

  const context = await applyControlCommand(session as any, registry, { type: "context", raw: "/context" });
  expect(context.message).toContain("Context usage:");

  const last = await applyControlCommand(session as any, registry, { type: "last", raw: "/last" });
  expect(last.message).toContain("last response");

  const commands = await applyControlCommand(session as any, registry, { type: "commands", raw: "/commands" });
  expect(commands.message).toContain("/model");
  expect(commands.message).toContain("/ext");
  expect(commands.message).toContain("/template");
  expect(commands.message).toContain("/skill:demo");

  const steering = await applyControlCommand(session as any, registry, { type: "steering_mode", mode: "all", raw: "/steering-mode all" });
  expect(steering.message).toContain("all");
  expect(session.steeringModeCalls).toContain("all");

  const followup = await applyControlCommand(session as any, registry, { type: "followup_mode", mode: "all", raw: "/followup-mode all" });
  expect(followup.message).toContain("all");
  expect(session.followUpModeCalls).toContain("all");
});

test("agent control session and tree commands", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const applyControlCommand = await getControl();
  const session = new RichSession();

  const sessionName = await applyControlCommand(session as any, registry, { type: "session_name", name: "My session", raw: "/session-name My session" });
  expect(sessionName.message).toContain("My session");

  const newSession = await applyControlCommand(session as any, registry, { type: "new_session", raw: "/new-session" });
  expect(newSession.message).toContain("new session");

  const switchSession = await applyControlCommand(session as any, registry, { type: "switch_session", path: "path/to/session", raw: "/switch-session path/to/session" });
  expect(switchSession.message).toContain("Switched to session");

  const fork = await applyControlCommand(session as any, registry, { type: "fork", entryId: "entry-1", raw: "/fork entry-1" });
  expect(fork.message).toContain("Selected");

  const forks = await applyControlCommand(session as any, registry, { type: "forks", raw: "/forks" });
  expect(forks.message).toContain("Forkable messages:");

  const exportHtml = await applyControlCommand(session as any, registry, { type: "export_html", raw: "/export-html" });
  expect(exportHtml.message).toContain("Exported session");

  const tree = await applyControlCommand(session as any, registry, { type: "tree", raw: "/tree" });
  expect(tree.message).toContain("Session tree:");

  const treeNav = await applyControlCommand(session as any, registry, { type: "tree", targetId: "entry-1", raw: "/tree entry-1" });
  expect(treeNav.message).toContain("Navigation complete");

  const label = await applyControlCommand(session as any, registry, { type: "label", targetId: "entry-1", label: "flag", raw: "/label entry-1 flag" });
  expect(label.message).toContain("Label set");
  expect(session.labelChanges.length).toBe(1);

  const labels = await applyControlCommand(session as any, registry, { type: "labels", raw: "/labels" });
  expect(labels.message).toContain("Labels:");
});

test("agent control queue, compact, and abort commands", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const applyControlCommand = await getControl();
  const session = new RichSession();

  const compact = await applyControlCommand(session as any, registry, { type: "compact", instructions: "shorten", raw: "/compact shorten" });
  expect(compact.message).toContain("Compaction complete.");

  const autoCompact = await applyControlCommand(session as any, registry, { type: "auto_compact", enabled: true, raw: "/auto-compact on" });
  expect(autoCompact.message).toContain("on");
  expect(session.autoCompactionEnabled).toBe(true);

  const autoRetry = await applyControlCommand(session as any, registry, { type: "auto_retry", enabled: true, raw: "/auto-retry on" });
  expect(autoRetry.message).toContain("on");
  expect(session.autoRetryEnabled).toBe(true);

  const abortRetry = await applyControlCommand(session as any, registry, { type: "abort_retry", raw: "/abort-retry" });
  expect(abortRetry.message).toContain("Retry aborted");
  expect(session.abortRetryCalls).toBe(1);

  const abortBashNone = await applyControlCommand(session as any, registry, { type: "abort_bash", raw: "/abort-bash" });
  expect(abortBashNone.message).toContain("No bash command");

  session.isBashRunning = true;
  const abortBash = await applyControlCommand(session as any, registry, { type: "abort_bash", raw: "/abort-bash" });
  expect(abortBash.message).toContain("aborted");
  expect(session.abortBashCalls).toBe(1);

  const queued = await applyControlCommand(session as any, registry, { type: "queue", message: "queued text", raw: "/queue queued text" });
  expect(queued.message).toContain("queued");
});

test("agent control cycle and agent identity commands", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const applyControlCommand = await getControl();
  const session = new RichSession();

  const cycleModel = await applyControlCommand(session as any, registry, { type: "cycle_model", direction: "forward", raw: "/cycle-model" });
  expect(cycleModel.message).toContain("Model set to");

  const cycleThinking = await applyControlCommand(session as any, registry, { type: "cycle_thinking", raw: "/cycle-thinking" });
  expect(cycleThinking.message).toContain("Thinking level set");

  const agentName = await applyControlCommand(session as any, registry, { type: "agent_name", name: "Pi", raw: "/agent-name Pi" });
  expect(agentName.message).toContain("Agent name set");

  const agentAvatar = await applyControlCommand(session as any, registry, { type: "agent_avatar", avatar: "https://example.com/avatar.png", raw: "/agent-avatar https://example.com/avatar.png" });
  expect(agentAvatar.message).toContain("Agent avatar set");
});

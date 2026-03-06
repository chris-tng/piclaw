/**
 * test/channels/web/web-channel.test.ts – Integration tests for WebChannel.
 *
 * Tests HTTP server startup, request routing, authentication,
 * SSE connections, and the full message lifecycle.
 */

import { expect, test, afterEach } from "bun:test";
import { createTempWorkspace, setEnv } from "../../helpers.js";

let restoreEnv: (() => void) | null = null;
let cleanupWorkspace: (() => void) | null = null;

afterEach(() => {
  restoreEnv?.();
  restoreEnv = null;
  cleanupWorkspace?.();
  cleanupWorkspace = null;
});

test("web channel timeline and search endpoints", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const makeMessage = (content: string, timestamp: string) => ({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content,
    timestamp,
    is_from_me: false,
    is_bot_message: false,
  });

  db.storeMessage(makeMessage("hello #world", "2024-01-01T00:00:00.000Z"));
  db.storeMessage(makeMessage("another message", "2024-01-01T00:01:00.000Z"));
  db.storeMessage(makeMessage("#world hello", "2024-01-01T00:02:00.000Z"));

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: { runAgent: async () => ({ status: "success", result: "ok" }), getContextUsageForChat: async () => null },
  });

  const timelineRes = await (web as any).handleRequest(new Request("http://test/timeline?limit=2"));
  const timelineJson = await timelineRes.json();
  expect(timelineJson.posts.length).toBe(2);

  const searchRes = await (web as any).handleRequest(new Request("http://test/search?q=hello&limit=10&offset=0"));
  const searchJson = await searchRes.json();
  expect(searchJson.results.length).toBe(2);

  const hashtagRes = await (web as any).handleRequest(new Request("http://test/hashtag/world?limit=10&offset=0"));
  const hashtagJson = await hashtagRes.json();
  expect(hashtagJson.posts.length).toBe(2);
});

test("web channel can create a post", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: { runAgent: async () => ({ status: "success", result: "ok" }), getContextUsageForChat: async () => null },
  });

  const req = new Request("http://test/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "hi" }),
  });

  const res = await (web as any).handleRequest(req);
  expect(res.status).toBe(201);
  const json = await res.json();
  expect(json.data.content).toBe("hi");
});

test("web channel handles /model command without queueing agent", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  let queued = false;
  let commandHandled = false;

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => { queued = true; } },
    agentPool: {
      runAgent: async () => ({ status: "success", result: "ok" }),
      applyControlCommand: async () => {
        commandHandled = true;
        return { status: "success", message: "Model set to openai/gpt-test." };
      },
      getContextUsageForChat: async () => null,
    },
  });

  const req = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "/model openai/gpt-test" }),
  });

  const res = await (web as any).handleRequest(req);
  expect(res.status).toBe(201);
  expect(commandHandled).toBe(true);
  expect(queued).toBe(false);

  const timeline = db.getTimeline("web:default", 10);
  expect(timeline.length).toBeGreaterThanOrEqual(2);
  expect(timeline[timeline.length - 1].data.content).toContain("Model set to openai/gpt-test.");
});

test("web channel queues follow-up placeholder for /queue", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  let queued = false;

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => { queued = true; } },
    agentPool: {
      applyControlCommand: async () => ({
        status: "success",
        message: "Queued as a follow-up (one-at-a-time).",
        queued_followup: true,
      }),
      getContextUsageForChat: async () => null,
    },
  });

  const req = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "/queue do this" }),
  });

  const res = await (web as any).handleRequest(req);
  expect(res.status).toBe(201);
  expect(queued).toBe(false);

  const placeholderId = web.consumeQueuedFollowupPlaceholder("web:default");
  expect(placeholderId).not.toBeNull();

  const timeline = db.getTimeline("web:default", 10);
  const last = timeline[timeline.length - 1];
  expect(last.data.content).toContain("Queued as a follow-up");
});

test("web channel reports active agent status", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: { runAgent: async () => ({ status: "success", result: "ok" }), getContextUsageForChat: async () => null },
  });

  web.updateAgentStatus("web:default", { type: "thinking", title: "Thinking...", turn_id: "turn-1" });

  const res = await (web as any).handleRequest(new Request("http://test/agent/status"));
  const json = await res.json();
  expect(json.status).toBe("active");
  expect(json.data.turn_id).toBe("turn-1");

  web.updateAgentStatus("web:default", { type: "done", turn_id: "turn-1" });
  const resIdle = await (web as any).handleRequest(new Request("http://test/agent/status"));
  const jsonIdle = await resIdle.json();
  expect(jsonIdle.status).toBe("idle");
});

test("web channel delete post cascades thread replies", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const rootRowId = db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "root",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
  });
  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "reply",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
    thread_id: rootRowId,
  });

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: { runAgent: async () => ({ status: "success", result: "ok" }), getContextUsageForChat: async () => null },
  });

  const res = await (web as any).handleRequest(
    new Request(`http://test/post/${rootRowId}?cascade=true`, { method: "DELETE" })
  );
  const json = await res.json();
  expect(json.deleted).toBe(2);

  const remaining = db.getTimeline("web:default", 10);
  expect(remaining.length).toBe(0);
});

test("web channel queues steering without advancing cursor", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const events: Array<{ type: string; data: any }> = [];

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      setSessionBinder: () => {},
      queueStreamingMessage: async () => ({ queued: true }),
      runAgent: async () => ({ status: "success", result: "ok" }),
      getContextUsageForChat: async () => null,
    },
  });
  web.broadcastEvent = (type: string, data: unknown) => {
    events.push({ type, data });
  };

  const req = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "steer this" }),
  });

  const res = await (web as any).handleRequest(req);
  expect(res.status).toBe(201);
  const json = await res.json();
  expect(json.queued).toBe("steer");
  expect(web.state.lastAgentTimestamp["web:default"]).toBeUndefined();
  const pending = (web as any).pendingSteering.get("web:default") ?? [];
  expect(pending.length).toBe(1);
  expect(events.some((event) => event.type === "agent_steer_queued")).toBe(true);
});

test("processChat advances cursor to pending steering timestamp", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const messageTs = "2024-01-01T00:00:00.000Z";
  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "hello",
    timestamp: messageTs,
    is_from_me: false,
    is_bot_message: false,
  });

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => ({ status: "success", result: "ok", attachments: [] }),
      getContextUsageForChat: async () => null,
    },
  });

  const pendingTs = "2024-01-01T00:00:10.000Z";
  web.queuePendingSteering("web:default", pendingTs);

  await web.processChat("web:default", "default");
  expect(web.state.lastAgentTimestamp["web:default"]).toBe(pendingTs);
});

test("web channel clears stale agent status on load", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const webMod = await import("../../../src/channels/web.js");
  const first = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: { runAgent: async () => ({ status: "success", result: "ok" }), getContextUsageForChat: async () => null },
  });

  first.updateAgentStatus("web:default", { type: "auto_compact", title: "Auto-compacting", turn_id: "turn-42" });

  // After a process restart (simulated by creating a new instance and
  // loading state), stale agent statuses should be cleared — no agent is
  // actually running in the new process.
  const second = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: { runAgent: async () => ({ status: "success", result: "ok" }), getContextUsageForChat: async () => null },
  });
  second.loadState();
  const restored = second.getAgentStatus("web:default");
  expect(restored).toBeNull();
});

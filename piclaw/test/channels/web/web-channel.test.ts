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
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
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
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
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
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
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

test("web channel defers /queue command into queue-state without placeholder row", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
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

  const queueStateRes = await (web as any).handleRequest(new Request("http://test/agent/queue-state"));
  const queueState = await queueStateRes.json();
  expect(queueState.count).toBe(1);
  expect(queueState.items[0].content).toBe("do this");

  const timeline = db.getTimeline("web:default", 10);
  expect(timeline.length).toBe(1);
  expect(timeline[0].data.content).toBe("/queue do this");
});

test("web channel queues normal message as follow-up when no mode is provided", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const rootMessageId = `msg-${Math.random()}`;
  const rootTimestamp = new Date().toISOString();
  const rootRowId = db.storeMessage({
    id: rootMessageId,
    chat_jid: "web:default",
    sender: "web-user",
    sender_name: "You",
    content: "root turn",
    timestamp: rootTimestamp,
    is_from_me: false,
    is_bot_message: false,
  });
  db.getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(rootRowId, rootRowId);
  db.beginChatRun("web:default", rootTimestamp, {
    prevTs: "",
    messageId: rootMessageId,
    startedAt: new Date().toISOString(),
  });

  let runCalls = 0;

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      isStreaming: () => true,
      runAgent: async () => {
        runCalls += 1;
        return { status: "success", result: "ok" };
      },
      getContextUsageForChat: async () => null,
    },
  });

  const req = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "Queue this while active" }),
  });

  const res = await (web as any).handleRequest(req);
  expect(res.status).toBe(201);
  const payload = await res.json();
  expect(payload.queued).toBe("followup");
  expect(payload.thread_id).toBe(rootRowId);

  expect(runCalls).toBe(0);

  const queueStateRes = await (web as any).handleRequest(new Request("http://test/agent/queue-state"));
  const queueState = await queueStateRes.json();
  expect(queueState.count).toBe(1);
  expect(queueState.items[0].content).toBe("Queue this while active");
  expect(queueState.items[0].row_id).toBeLessThan(0);
  expect(queueState.items[0].thread_id).toBe(rootRowId);

  // Deferred queued messages should not be persisted to the timeline until consumed.
  const timeline = db.getTimeline("web:default", 10);
  expect(timeline.length).toBe(1);
  expect(timeline[0].data.content).toBe("root turn");
});

test("web channel processes messages normally when a turn is inflight but not actively streaming", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const rootMessageId = `msg-${Math.random()}`;
  const rootTimestamp = new Date().toISOString();
  const rootRowId = db.storeMessage({
    id: rootMessageId,
    chat_jid: "web:default",
    sender: "web-user",
    sender_name: "You",
    content: "root turn",
    timestamp: rootTimestamp,
    is_from_me: false,
    is_bot_message: false,
    thread_id: null,
  });
  db.getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(rootRowId, rootRowId);
  // Set an inflight marker WITHOUT an active streaming session — simulates
  // a stale marker left after a restart or brief finalization gap.
  db.beginChatRun("web:default", rootTimestamp, {
    prevTs: "",
    messageId: rootMessageId,
    startedAt: new Date().toISOString(),
  });

  let processChatEnqueued = false;
  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => { processChatEnqueued = true; } },
    agentPool: {
      isStreaming: () => false,
      runAgent: async () => ({ status: "success", result: "ok" }),
      getContextUsageForChat: async () => null,
    },
  });

  const req = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "should process immediately despite stale inflight" }),
  });

  const res = await (web as any).handleRequest(req);
  const payload = await res.json();
  // Must NOT be queued — the stale DB inflight marker must not block processing
  expect(res.status).toBe(201);
  expect(payload.queued).toBeUndefined();
  expect(payload.user_message).toBeTruthy();
  expect(processChatEnqueued).toBe(true);

  // Message should be stored in the timeline (not deferred)
  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents).toContain("should process immediately despite stale inflight");
});

test("web channel exposes queued follow-up items from queue-state", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      applyControlCommand: async () => ({
        status: "success",
        message: "Queued as a follow-up (one-at-a-time).",
        queued_followup: true,
      }),
      removeQueuedFollowupMessage: async () => true,
      getContextUsageForChat: async () => null,
    },
  });

  const reqOne = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "/queue first followup" }),
  });
  const reqTwo = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "/queue second followup" }),
  });

  const resOne = await (web as any).handleRequest(reqOne);
  const resTwo = await (web as any).handleRequest(reqTwo);
  expect(resOne.status).toBe(201);
  expect(resTwo.status).toBe(201);

  const queueState = await (web as any).handleRequest(new Request("http://test/agent/queue-state"));
  const payload = await queueState.json();
  expect(payload.count).toBe(2);
  expect(Array.isArray(payload.items)).toBe(true);
  expect(payload.items.length).toBe(2);
  expect(payload.items[0].content).toContain("first followup");
  expect(payload.items[1].content).toContain("second followup");

  const removeReq = new Request("http://test/agent/queue-remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ row_id: payload.items[0].row_id }),
  });
  const removeRes = await (web as any).handleRequest(removeReq);
  const removeJson = await removeRes.json();
  expect(removeRes.status).toBe(200);
  expect(removeJson.removed).toBe(true);

  const queueStateAfter = await (web as any).handleRequest(new Request("http://test/agent/queue-state"));
  const payloadAfter = await queueStateAfter.json();
  expect(payloadAfter.count).toBe(1);
  expect(payloadAfter.items[0].content).toContain("second followup");
});

test("web channel reports active agent status", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
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
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
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
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
  db.getDb().exec("DELETE FROM chat_cursors;");
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
      applyControlCommand: async (_chatJid, command) => ({
        status: command?.type === "steer" ? "success" : "error",
        message: command?.type === "steer" ? "Steering queued: steer" : "Unsupported command.",
        queued_steer: command?.type === "steer" ? true : undefined,
      }),
    },
  });
  web.broadcastEvent = (type: string, data: unknown) => {
    events.push({ type, data });
  };

  const req = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "/steer this" }),
  });

  const res = await (web as any).handleRequest(req);
  expect(res.status).toBe(201);
  const json = await res.json();
  expect(json.queued).toBe("steer");
  expect(db.getChatCursor("web:default")).toBe("");
  const pending = (web as any).consumePendingSteering("web:default");
  expect(pending).toBeTruthy();
  expect(events.some((event) => event.type === "agent_steer_queued")).toBe(true);
});

test("web channel defers active /queue without creating a timeline message", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const events: Array<{ type: string; data: any }> = [];

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      isStreaming: () => true,
      getContextUsageForChat: async () => null,
    },
  });
  web.broadcastEvent = (type: string, data: unknown) => {
    events.push({ type, data });
  };

  const req = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "/queue later" }),
  });

  const res = await (web as any).handleRequest(req);
  const json = await res.json();
  expect(res.status).toBe(201);
  expect(json.queued).toBe("followup");

  const queueStateRes = await (web as any).handleRequest(new Request("http://test/agent/queue-state"));
  const queueState = await queueStateRes.json();
  expect(queueState.count).toBe(1);
  expect(queueState.items[0].content).toBe("later");

  const timeline = db.getTimeline("web:default", 10);
  expect(timeline.length).toBe(0);
  expect(events.some((event) => event.type === "agent_followup_queued")).toBe(true);
});

test("web channel defers active /steer command without creating a timeline message", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const events: Array<{ type: string; data: any }> = [];
  let applyCalls = 0;

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      isStreaming: () => true,
      queueStreamingMessage: async () => ({ queued: true }),
      applyControlCommand: async () => {
        applyCalls += 1;
        return { status: "success", message: "unexpected" };
      },
      getContextUsageForChat: async () => null,
    },
  });
  web.broadcastEvent = (type: string, data: unknown) => {
    events.push({ type, data });
  };

  const req = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "/steer now" }),
  });

  const res = await (web as any).handleRequest(req);
  const json = await res.json();
  expect(res.status).toBe(201);
  expect(json.queued).toBe("steer");
  expect(applyCalls).toBe(0);
  expect((web as any).consumePendingSteering("web:default")).toBeNull();

  const timeline = db.getTimeline("web:default", 10);
  expect(timeline.length).toBe(0);
  expect(events.some((event) => event.type === "agent_steer_queued")).toBe(true);
});

test("web channel atomically converts a queued item into steering when active", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const rootMessageId = `msg-${Math.random()}`;
  const rootTimestamp = new Date().toISOString();
  const rootRowId = db.storeMessage({
    id: rootMessageId,
    chat_jid: "web:default",
    sender: "web-user",
    sender_name: "You",
    content: "root turn",
    timestamp: rootTimestamp,
    is_from_me: false,
    is_bot_message: false,
  });
  db.getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(rootRowId, rootRowId);
  db.beginChatRun("web:default", rootTimestamp, {
    prevTs: "",
    messageId: rootMessageId,
    startedAt: new Date().toISOString(),
  });

  const events: Array<{ type: string; data: any }> = [];
  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      isStreaming: () => true,
      setSessionBinder: () => {},
      queueStreamingMessage: async () => ({ queued: true }),
      getContextUsageForChat: async () => null,
    },
  });
  web.broadcastEvent = (type: string, data: unknown) => {
    events.push({ type, data });
  };

  const queueReq = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "queued steer me" }),
  });
  const queueRes = await (web as any).handleRequest(queueReq);
  const queueJson = await queueRes.json();
  expect(queueRes.status).toBe(201);
  expect(queueJson.queued).toBe("followup");
  expect(queueJson.thread_id).toBe(rootRowId);

  const queueStateRes = await (web as any).handleRequest(new Request("http://test/agent/queue-state"));
  const queueState = await queueStateRes.json();
  expect(queueState.items[0].thread_id).toBe(rootRowId);
  const rowId = queueState.items[0].row_id;

  const res = await (web as any).handleRequest(new Request("http://test/agent/queue-steer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ row_id: rowId }),
  }));
  const json = await res.json();

  expect(res.status).toBe(201);
  expect(json.queued).toBe("steer");
  expect(json.user_message?.data?.content).toBe("queued steer me");
  expect(json.thread_id).toBe(rootRowId);
  expect(web.getQueuedFollowupCount("web:default")).toBe(0);
  expect(events.some((event) => event.type === "agent_followup_removed")).toBe(true);
  expect(events.some((event) => event.type === "new_post" && event.data?.data?.content === "queued steer me")).toBe(true);
  expect(events.some((event) => event.type === "agent_steer_queued" && event.data?.thread_id === rootRowId)).toBe(true);

  const timeline = db.getTimeline("web:default", 10);
  const steerMessage = timeline.find((item: any) => item.data.content === "queued steer me");
  expect(steerMessage?.data?.thread_id).toBe(rootRowId);
});

test("web channel atomically converts a queued item into an immediate send when inactive", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: async (fn: () => Promise<void>) => fn() },
    agentPool: {
      isStreaming: () => false,
      setSessionBinder: () => {},
      queueStreamingMessage: async () => ({ queued: false }),
      runAgent: async () => ({ status: "success", result: "ok", attachments: [] }),
      getContextUsageForChat: async () => null,
    },
  });

  const rowId = web.enqueueQueuedFollowupItem("web:default", 0, "queued send me now");
  const res = await (web as any).handleRequest(new Request("http://test/agent/queue-steer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ row_id: rowId }),
  }));
  const json = await res.json();

  expect(res.status).toBe(201);
  expect(json.user_message?.data?.content).toBe("queued send me now");
  expect(web.getQueuedFollowupCount("web:default")).toBe(0);

  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents).toContain("queued send me now");
  expect(contents).toContain("ok");
});

test("web channel defers active compose steer without creating a timeline message", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const events: Array<{ type: string; data: any }> = [];

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      isStreaming: () => true,
      queueStreamingMessage: async () => ({ queued: true }),
      getContextUsageForChat: async () => null,
    },
  });
  web.broadcastEvent = (type: string, data: unknown) => {
    events.push({ type, data });
  };

  const req = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "steer now", mode: "steer" }),
  });

  const res = await (web as any).handleRequest(req);
  const json = await res.json();
  expect(res.status).toBe(201);
  expect(json.queued).toBe("steer");
  expect(db.getChatCursor("web:default")).toBe("");
  expect((web as any).consumePendingSteering("web:default")).toBeNull();

  const timeline = db.getTimeline("web:default", 10);
  expect(timeline.length).toBe(0);
  expect(events.some((event) => event.type === "agent_steer_queued")).toBe(true);
});

test("web channel defers /steer without active stream into queue-state", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
  db.getDb().exec("DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const events: Array<{ type: string; data: any }> = [];
  let sendCalls = 0;

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => ({ status: "success", result: "ok" }),
      getContextUsageForChat: async () => null,
      applyControlCommand: async (_chatJid, command) => ({
        status: command?.type === "steer" ? "success" : "error",
        message: command?.type === "steer" ? "Queued as a follow-up (one-at-a-time)." : "Unsupported command.",
        queued_followup: command?.type === "steer" ? true : undefined,
      }),
    },
  });
  web.sendMessage = async () => {
    sendCalls += 1;
  };
  web.broadcastEvent = (type: string, data: unknown) => {
    events.push({ type, data });
  };

  const req = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "/steer this" }),
  });

  const res = await (web as any).handleRequest(req);
  expect(res.status).toBe(201);
  const json = await res.json();
  expect(json?.queued).toBe("followup");
  expect(sendCalls).toBe(0);

  const queueStateRes = await (web as any).handleRequest(new Request("http://test/agent/queue-state"));
  const queueState = await queueStateRes.json();
  expect(queueState.count).toBe(1);
  expect(queueState.items[0].content).toBe("this");
  expect(events.some((event) => event.type === "agent_followup_queued")).toBe(true);
});

test("processChat advances cursor to pending steering timestamp", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
  db.getDb().exec("DELETE FROM chat_cursors;");
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
  expect(db.getChatCursor("web:default")).toBe(pendingTs);
});

test("processChat rolls back cursor when agent is already processing", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
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
      runAgent: async () => ({ status: "error", error: "already processing", result: null }),
      getContextUsageForChat: async () => null,
    },
  });

  let error: Error | null = null;
  try {
    await web.processChat("web:default", "default");
  } catch (err) {
    error = err as Error;
  }

  expect(error).toBeTruthy();
  expect(error?.message).toContain("already processing");
  expect(db.getChatCursor("web:default")).toBe("");
  expect(db.getInflightRuns().some((run: any) => run.chatJid === "web:default")).toBe(false);
});

test("web channel clears stale agent status on load", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
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

// --- New coverage: agent status lifecycle ---

test("processChat publishes draft fallback when final result is missing", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "hello",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
  });

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async (_prompt: string, _chatJid: string, options: any) => {
        options.onEvent?.({
          type: "message_update",
          assistantMessageEvent: { type: "text_start" },
        });
        options.onEvent?.({
          type: "message_update",
          assistantMessageEvent: { type: "text_delta", delta: "draft only" },
        });
        return { status: "success", result: null, attachments: [] };
      },
      getContextUsageForChat: async () => null,
    },
  });

  await web.processChat("web:default", "default");

  const timeline = db.getTimeline("web:default", 10);
  const last = timeline[timeline.length - 1];
  expect(last.data.content).toContain("draft only");
});

test("processChat final first turn does not consume a queued placeholder", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "hello",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
  });

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => ({ status: "success", result: "first reply", attachments: [] }),
      getContextUsageForChat: async () => null,
    },
  });

  web.queueFollowupPlaceholder("web:default", "\u2063", 123, "queued later");
  expect(web.getQueuedFollowupCount("web:default")).toBe(1);

  await web.processChat("web:default", "default");

  expect(web.getQueuedFollowupCount("web:default")).toBe(1);
  expect(web.consumeQueuedFollowupPlaceholder("web:default")).not.toBeNull();

  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents).toContain("first reply");
});

test("processChat records an explicit failed run when terminal persistence fails", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "hello",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
  });

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => ({ status: "success", result: "final reply", attachments: [] }),
      getContextUsageForChat: async () => null,
    },
  });

  const originalStoreMessage = web.storeMessage.bind(web);
  web.storeMessage = (chatJid: string, content: string, isBot: boolean, mediaIds: number[], options?: any) => {
    if (isBot) return null;
    return originalStoreMessage(chatJid, content, isBot, mediaIds, options);
  };

  await web.processChat("web:default", "default");

  const failedRun = db.getFailedRun("web:default");
  expect(failedRun).toBeTruthy();

  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents).toEqual(["hello"]);
});

test("processChat records an explicit failed run when draft fallback persistence fails", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "hello",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
  });

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async (_prompt: string, _chatJid: string, options: any) => {
        options.onEvent?.({
          type: "message_update",
          assistantMessageEvent: { type: "text_start" },
        });
        options.onEvent?.({
          type: "message_update",
          assistantMessageEvent: { type: "text_delta", delta: "draft only" },
        });
        return { status: "success", result: null, attachments: [] };
      },
      getContextUsageForChat: async () => null,
    },
  });

  const originalStoreMessage = web.storeMessage.bind(web);
  web.storeMessage = (chatJid: string, content: string, isBot: boolean, mediaIds: number[], options?: any) => {
    if (isBot) return null;
    return originalStoreMessage(chatJid, content, isBot, mediaIds, options);
  };

  await web.processChat("web:default", "default");

  const failedRun = db.getFailedRun("web:default");
  expect(failedRun).toBeTruthy();

  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents).toEqual(["hello"]);
});

test("processChat records an explicit failed run when no terminal output can be persisted", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "hello",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
  });

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => ({ status: "success", result: null, attachments: [] }),
      getContextUsageForChat: async () => null,
    },
  });

  await web.processChat("web:default", "default");

  const failedRun = db.getFailedRun("web:default");
  expect(failedRun).toBeTruthy();

  const timeline = db.getTimeline("web:default", 10);
  const botMessages = timeline.filter((item: any) => item.data.type === "agent_response");
  expect(botMessages.length).toBe(0);
});

test("processChat drains queued follow-ups after a persisted timeout fallback", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "hello",
    timestamp: "2024-01-01T00:00:00.000Z",
    is_from_me: false,
    is_bot_message: false,
  });

  let runCount = 0;
  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: async (fn: () => Promise<void>) => fn() },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async (_prompt: string, _chatJid: string, options: any) => {
        runCount += 1;
        if (runCount === 1) {
          options.onEvent?.({
            type: "message_update",
            assistantMessageEvent: { type: "text_start" },
          });
          options.onEvent?.({
            type: "message_update",
            assistantMessageEvent: { type: "text_delta", delta: "draft before timeout" },
          });
          return { status: "error", result: null, error: "Timed out after 1000ms" };
        }
        return { status: "success", result: "reply after fallback", attachments: [] };
      },
      getContextUsageForChat: async () => null,
    },
  });

  web.enqueueQueuedFollowupItem("web:default", 0, "queued after timeout");
  await web.processChat("web:default", "default");

  expect(runCount).toBe(2);
  expect(web.getQueuedFollowupCount("web:default")).toBe(0);
  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents.some((content: string) => content.includes("draft before timeout"))).toBe(true);
  expect(contents).toContain("queued after timeout");
  expect(contents).toContain("reply after fallback");
});

test("processChat treats a persisted timeout fallback as a terminal completion", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "hello",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
  });

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async (_prompt: string, _chatJid: string, options: any) => {
        options.onEvent?.({
          type: "message_update",
          assistantMessageEvent: { type: "text_start" },
        });
        options.onEvent?.({
          type: "message_update",
          assistantMessageEvent: { type: "text_delta", delta: "draft only" },
        });
        return { status: "error", result: null, error: "Timed out after 1000ms" };
      },
      getContextUsageForChat: async () => null,
    },
  });

  await web.processChat("web:default", "default");

  expect(db.getFailedRun("web:default")).toBeUndefined();

  const timeline = db.getTimeline("web:default", 10);
  const last = timeline[timeline.length - 1];
  expect(last.data.content).toContain("draft only");
  expect(last.data.content).toContain("timed out before finalization");
});

test("processChat publishes final draft fallback even after an intermediate turn", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "hello",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
  });

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async (_prompt: string, _chatJid: string, options: any) => {
        options.onEvent?.({
          type: "message_update",
          assistantMessageEvent: { type: "text_start" },
        });
        options.onEvent?.({
          type: "message_update",
          assistantMessageEvent: { type: "text_delta", delta: "first draft" },
        });
        options.onTurnComplete?.({ text: "first reply", attachments: [] });
        options.onEvent?.({
          type: "message_update",
          assistantMessageEvent: { type: "text_start" },
        });
        options.onEvent?.({
          type: "message_update",
          assistantMessageEvent: { type: "text_delta", delta: "second draft" },
        });
        return { status: "success", result: null, attachments: [] };
      },
      getContextUsageForChat: async () => null,
    },
  });

  await web.processChat("web:default", "default");

  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents).toContain("first reply");
  expect(contents).toContain("second draft");
});

test("processChat publishes queued follow-up only after current turn completes", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const firstUserRowId = db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "first user",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
    thread_id: null,
  });
  db.getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(firstUserRowId, firstUserRowId);

  let runCount = 0;
  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: async (fn: () => Promise<void>) => fn() },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => {
        runCount += 1;
        return { status: "success", result: runCount === 1 ? "first reply" : "second reply", attachments: [] };
      },
      getContextUsageForChat: async () => null,
    },
  });

  web.enqueueQueuedFollowupItem("web:default", 0, "queued user", firstUserRowId, new Date().toISOString());

  await web.processChat("web:default", "default");
  await Bun.sleep(20);

  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents).toContain("first reply");
  expect(contents).toContain("queued user");
  expect(runCount).toBeGreaterThanOrEqual(1);

  const firstUser = timeline.find((item: any) => item.data.content === "first user");
  const queuedUser = timeline.find((item: any) => item.data.content === "queued user");
  const firstReply = timeline.find((item: any) => item.data.content === "first reply");
  expect(firstUser).toBeTruthy();
  expect(queuedUser).toBeTruthy();
  expect(firstReply).toBeTruthy();
  expect(queuedUser.data.thread_id).toBe(firstUserRowId);
  expect(firstReply.data.thread_id).toBe(firstUser.id);
});

test("deferred queued follow-ups survive a new WebChannel instance", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const webMod = await import("../../../src/channels/web.js");
  const createWeb = () => new (webMod.WebChannel as any)({
    queue: { enqueue: async (fn: () => Promise<void>) => fn() },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => ({ status: "success", result: "unused", attachments: [] }),
      getContextUsageForChat: async () => null,
    },
  });

  const first = createWeb();
  first.enqueueQueuedFollowupItem("web:default", 0, "survives restart");

  const second = createWeb();
  expect(second.getQueuedFollowupCount("web:default")).toBe(1);
  expect(second.getQueuedFollowupItems("web:default")[0]?.queuedContent).toBe("survives restart");
});

test("processChat can materialize a deferred queued follow-up when resumed idle", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  let runCount = 0;
  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: async (fn: () => Promise<void>) => fn() },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => {
        runCount += 1;
        return { status: "success", result: "reply after materialize", attachments: [] };
      },
      getContextUsageForChat: async () => null,
    },
  });

  web.enqueueQueuedFollowupItem("web:default", 0, "queued idle item");
  await web.processChat("web:default", "default");

  expect(runCount).toBe(1);
  expect(web.getQueuedFollowupCount("web:default")).toBe(0);
  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents).toContain("queued idle item");
  expect(contents).toContain("reply after materialize");
});

test("processChat preserves a deferred queued follow-up if materialization fails", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: async (fn: () => Promise<void>) => fn() },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => ({ status: "success", result: "should not run", attachments: [] }),
      getContextUsageForChat: async () => null,
    },
  });

  web.enqueueQueuedFollowupItem("web:default", 0, "queued idle item");
  const originalStoreMessage = web.storeMessage.bind(web);
  web.storeMessage = (chatJid: string, content: string, isBot: boolean, mediaIds: number[], options?: any) => {
    if (!isBot) return null;
    return originalStoreMessage(chatJid, content, isBot, mediaIds, options);
  };

  await web.processChat("web:default", "default");

  expect(web.getQueuedFollowupCount("web:default")).toBe(1);
  const queueItems = web.getQueuedFollowupItems("web:default");
  expect(queueItems[0]?.queuedContent).toBe("queued idle item");
  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents).not.toContain("queued idle item");
});

test("processChat handles persisted user messages one at a time", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const t1 = "2024-01-01T00:00:00.000Z";
  const t2 = "2024-01-01T00:00:01.000Z";
  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "first user",
    timestamp: t1,
    is_from_me: false,
    is_bot_message: false,
  });
  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "second user",
    timestamp: t2,
    is_from_me: false,
    is_bot_message: false,
  });

  let runCount = 0;
  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: async (fn: () => Promise<void>) => fn() },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => {
        runCount += 1;
        return { status: "success", result: runCount === 1 ? "reply one" : "reply two", attachments: [] };
      },
      getContextUsageForChat: async () => null,
    },
  });

  await web.processChat("web:default", "default");
  await Bun.sleep(20);

  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents).toContain("first user");
  expect(contents).toContain("second user");
  expect(contents).toContain("reply one");
  expect(contents).toContain("reply two");
  expect(runCount).toBe(2);

  const firstUser = timeline.find((item: any) => item.data.content === "first user");
  const secondUser = timeline.find((item: any) => item.data.content === "second user");
  const firstReply = timeline.find((item: any) => item.data.content === "reply one");
  const secondReply = timeline.find((item: any) => item.data.content === "reply two");
  expect(firstReply.data.thread_id).toBe(firstUser.id);
  expect(secondReply.data.thread_id).toBe(secondUser.id);
});

test("web channel status transitions from thinking to idle during a run", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "hello",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
  });

  let resolveRun: (() => void) | null = null;
  const runGate = new Promise<void>((resolve) => { resolveRun = resolve; });

  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => {
        await runGate;
        return { status: "success", result: "ok", attachments: [] };
      },
      getContextUsageForChat: async () => null,
    },
  });

  const runPromise = web.processChat("web:default", "default");
  await Bun.sleep(10);

  const activeRes = await web.handleRequest(new Request("http://test/agent/status"));
  const activeJson = await activeRes.json();
  expect(activeJson.status).toBe("active");

  resolveRun?.();
  await runPromise;

  const idleRes = await web.handleRequest(new Request("http://test/agent/status"));
  const idleJson = await idleRes.json();
  expect(idleJson.status).toBe("idle");
});

// --- New coverage: inflight recovery ---

test("recoverInflightRuns rolls back cursor and retries the run", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const ts = "2024-01-01T00:00:00.000Z";
  const messageId = `msg-${Math.random()}`;
  db.storeMessage({
    id: messageId,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "hello",
    timestamp: ts,
    is_from_me: false,
    is_bot_message: false,
  });

  // Simulate a crash mid-run: inflight marker exists, cursor advanced.
  db.beginChatRun("web:default", ts, {
    prevTs: "",
    messageId,
    startedAt: ts,
  });

  let ran = 0;
  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: async (fn: () => Promise<void>) => fn() },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => {
        ran += 1;
        return { status: "success", result: "ok", attachments: [] };
      },
      getContextUsageForChat: async () => null,
    },
  });

  web.recoverInflightRuns();
  await Bun.sleep(20);
  expect(ran).toBe(1);
  expect(db.getInflightRuns().filter((r: any) => r.chatJid === "web:default").length).toBe(0);
  expect(db.getChatCursor("web:default")).toBe(ts);

  const timeline = db.getTimeline("web:default", 10);
  expect(timeline.length).toBeGreaterThanOrEqual(2); // user + agent response
});

test("recoverInflightRuns replays runs with only non-terminal assistant output", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const ts = "2024-01-01T00:00:00.000Z";
  const partialTs = "2024-01-01T00:00:01.000Z";
  const messageId = `msg-${Math.random()}`;
  db.storeMessage({
    id: messageId,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "hello",
    timestamp: ts,
    is_from_me: false,
    is_bot_message: false,
  });
  db.beginChatRun("web:default", ts, {
    prevTs: "",
    messageId,
    startedAt: ts,
  });
  db.storeMessage({
    id: `bot-${Math.random()}`,
    chat_jid: "web:default",
    sender: "web-agent",
    sender_name: "Pi",
    content: "partial reply",
    timestamp: partialTs,
    is_from_me: false,
    is_bot_message: true,
    is_terminal_agent_reply: false,
  });

  let ran = 0;
  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: async (fn: () => Promise<void>) => fn() },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => {
        ran += 1;
        return { status: "success", result: "final reply", attachments: [] };
      },
      getContextUsageForChat: async () => null,
    },
  });

  web.recoverInflightRuns();
  await Bun.sleep(20);
  expect(ran).toBe(1);
  expect(db.getInflightRuns().filter((r: any) => r.chatJid === "web:default").length).toBe(0);

  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents).not.toContain("partial reply");
  expect(contents).toContain("final reply");
});

test("recoverInflightRuns ignores older terminal replies before the inflight start", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const prevUserTs = "2024-01-01T00:00:00.000Z";
  const prevReplyTs = "2024-01-01T00:00:01.000Z";
  const currentUserTs = "2024-01-01T00:00:02.000Z";
  const startedAt = "2024-01-01T00:00:03.000Z";
  const currentMessageId = `msg-${Math.random()}`;

  db.storeMessage({
    id: `user-prev-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "previous",
    timestamp: prevUserTs,
    is_from_me: false,
    is_bot_message: false,
  });
  db.storeMessage({
    id: `bot-prev-${Math.random()}`,
    chat_jid: "web:default",
    sender: "web-agent",
    sender_name: "Pi",
    content: "previous final",
    timestamp: prevReplyTs,
    is_from_me: false,
    is_bot_message: true,
    is_terminal_agent_reply: true,
  });
  db.storeMessage({
    id: currentMessageId,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "current",
    timestamp: currentUserTs,
    is_from_me: false,
    is_bot_message: false,
  });
  db.beginChatRun("web:default", currentUserTs, {
    prevTs: prevUserTs,
    messageId: currentMessageId,
    startedAt,
  });

  let ran = 0;
  const webMod = await import("../../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: async (fn: () => Promise<void>) => fn() },
    agentPool: {
      setSessionBinder: () => {},
      runAgent: async () => {
        ran += 1;
        return { status: "success", result: "recovered final", attachments: [] };
      },
      getContextUsageForChat: async () => null,
    },
  });

  web.recoverInflightRuns();
  await Bun.sleep(20);
  expect(ran).toBe(1);

  const timeline = db.getTimeline("web:default", 10);
  const contents = timeline.map((item: any) => item.data.content);
  expect(contents).toContain("previous final");
  expect(contents).toContain("recovered final");
});

// --- New coverage: /model error path ---

test("web channel reports /model errors without queueing agent", async () => {
  const ws = createTempWorkspace("piclaw-web-channel-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.getDb().exec("DELETE FROM message_media; DELETE FROM messages; DELETE FROM chats; DELETE FROM chat_cursors; DELETE FROM chat_cursors;");
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
        return { status: "error", message: "Model not found" };
      },
      getContextUsageForChat: async () => null,
    },
  });

  const req = new Request("http://test/agent/default/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "/model nope/unknown" }),
  });

  const res = await (web as any).handleRequest(req);
  expect(res.status).toBe(201);
  expect(commandHandled).toBe(true);
  expect(queued).toBe(false);

  const timeline = db.getTimeline("web:default", 10);
  const last = timeline[timeline.length - 1];
  expect(last.data.content).toContain("Model not found");
});

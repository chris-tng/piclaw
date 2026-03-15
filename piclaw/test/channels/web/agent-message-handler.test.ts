import { describe, expect, test } from "bun:test";
import "../../helpers.ts";
import { initDatabase } from "../../../src/db.js";
import { handleAgentMessage } from "../../../src/channels/web/handlers/agent.ts";

describe("web agent message handler", () => {
  test("handles /theme as a pure UI command without queueing, timeline writes, or replies", async () => {
    const queuedFollowups: Array<{ chatJid: string; content: string }> = [];
    const broadcasts: Array<{ event: string; payload: unknown }> = [];
    const sentMessages: Array<{ chatJid: string; content: string; threadId: number | null }> = [];
    let storeMessageCalls = 0;

    const channel = {
      agentPool: {
        isStreaming: () => true,
      },
      json: (payload: unknown, status = 200) =>
        new Response(JSON.stringify(payload), {
          status,
          headers: { "Content-Type": "application/json" },
        }),
      enqueueQueuedFollowupItem: (chatJid: string, _rowId: number, content: string) => {
        queuedFollowups.push({ chatJid, content });
        return 999;
      },
      broadcastEvent: (event: string, payload: unknown) => {
        broadcasts.push({ event, payload });
      },
      storeMessage: () => {
        storeMessageCalls += 1;
        return null;
      },
      sendMessage: async (chatJid: string, content: string, threadId: number | null) => {
        sentMessages.push({ chatJid, content, threadId });
      },
    } as any;

    const req = new Request("https://example.com/agent/default/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "/theme gruvbox" }),
    });

    const response = await handleAgentMessage(channel, req, "/agent/default/message", "web:default", "default");
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.ui_only).toBe(true);
    expect(body.thread_id).toBeNull();
    expect(body.command?.status).toBe("success");
    expect(queuedFollowups).toHaveLength(0);
    expect(storeMessageCalls).toBe(0);
    expect(broadcasts.some((entry) => entry.event === "ui_theme")).toBe(true);
    expect(broadcasts.some((entry) => entry.event === "new_post")).toBe(false);
    expect(sentMessages).toHaveLength(0);
  });

  test("does not defer /session-rotate while streaming and returns the command error immediately", async () => {
    initDatabase();

    const queuedFollowups: Array<{ chatJid: string; content: string }> = [];
    const sentMessages: Array<{ chatJid: string; content: string; threadId: number | null }> = [];
    const broadcasts: Array<{ event: string; payload: unknown }> = [];
    let applyCalls = 0;

    const channel = {
      agentPool: {
        isStreaming: () => true,
        applyControlCommand: async (_chatJid: string, command: { type: string; raw: string }) => {
          applyCalls += 1;
          expect(command.type).toBe("session_rotate");
          return {
            status: "error",
            message: "Cannot rotate the session while a response, compaction, or retry is active.",
          };
        },
      },
      json: (payload: unknown, status = 200) =>
        new Response(JSON.stringify(payload), {
          status,
          headers: { "Content-Type": "application/json" },
        }),
      enqueueQueuedFollowupItem: (chatJid: string, _rowId: number, content: string) => {
        queuedFollowups.push({ chatJid, content });
        return 111;
      },
      broadcastEvent: (event: string, payload: unknown) => {
        broadcasts.push({ event, payload });
      },
      updateAgentStatus: () => {},
      skipFailedOnModelSwitch: () => {},
      storeMessage: (_chatJid: string, content: string) => ({
        id: 321,
        timestamp: "2026-03-14T21:10:00.000Z",
        data: { thread_id: null },
        content,
      }),
      sendMessage: async (chatJid: string, content: string, threadId: number | null) => {
        sentMessages.push({ chatJid, content, threadId });
      },
    } as any;

    const req = new Request("https://example.com/agent/default/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "/session-rotate keep active context" }),
    });

    const response = await handleAgentMessage(channel, req, "/agent/default/message", "web:default", "default");
    expect(response.status).toBe(201);

    const body = await response.json();
    expect(body.queued).toBeUndefined();
    expect(body.command?.status).toBe("error");
    expect(body.command?.message).toContain("Cannot rotate the session while a response");
    expect(applyCalls).toBe(1);
    expect(queuedFollowups).toHaveLength(0);
    expect(sentMessages).toHaveLength(1);
    expect(sentMessages[0]?.content).toContain("Cannot rotate the session while a response");
    expect(broadcasts.some((entry) => entry.event === "new_post")).toBe(true);
  });

  test("handles /test-card as a local card emission without queueing or agent execution", async () => {
    const queuedFollowups: Array<{ chatJid: string; content: string }> = [];
    const sentMessages: Array<{ chatJid: string; content: string; options: unknown }> = [];
    let storeMessageCalls = 0;
    let applyCalls = 0;

    const channel = {
      agentPool: {
        isStreaming: () => true,
        applyControlCommand: async () => {
          applyCalls += 1;
          return { status: "success", message: "should not run" };
        },
      },
      json: (payload: unknown, status = 200) =>
        new Response(JSON.stringify(payload), {
          status,
          headers: { "Content-Type": "application/json" },
        }),
      enqueueQueuedFollowupItem: (chatJid: string, _rowId: number, content: string) => {
        queuedFollowups.push({ chatJid, content });
        return 999;
      },
      broadcastEvent: () => {},
      storeMessage: () => {
        storeMessageCalls += 1;
        return null;
      },
      sendMessage: async (chatJid: string, content: string, options: unknown) => {
        sentMessages.push({ chatJid, content, options });
      },
    } as any;

    const req = new Request("https://example.com/agent/default/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "/test-card choices" }),
    });

    const response = await handleAgentMessage(channel, req, "/agent/default/message", "web:default", "default");
    expect(response.status).toBe(201);

    const body = await response.json();
    expect(body.emitted).toBe(true);
    expect(body.command?.status).toBe("success");
    expect(body.command?.variant).toBe("choices");
    expect(queuedFollowups).toHaveLength(0);
    expect(storeMessageCalls).toBe(0);
    expect(applyCalls).toBe(0);
    expect(sentMessages).toHaveLength(1);
    expect(sentMessages[0]?.content).toContain("Adaptive Card test: choices");
    expect((sentMessages[0]?.options as any)?.forceRoot).toBe(true);
    expect((sentMessages[0]?.options as any)?.contentBlocks?.[0]?.type).toBe("adaptive_card");
  });

  test("handles /test-card list locally without emitting a card", async () => {
    const sentMessages: Array<unknown> = [];

    const channel = {
      agentPool: {
        isStreaming: () => true,
      },
      json: (payload: unknown, status = 200) =>
        new Response(JSON.stringify(payload), {
          status,
          headers: { "Content-Type": "application/json" },
        }),
      enqueueQueuedFollowupItem: () => 999,
      broadcastEvent: () => {},
      storeMessage: () => null,
      sendMessage: async (_chatJid: string, _content: string, options: unknown) => {
        sentMessages.push(options);
      },
    } as any;

    const req = new Request("https://example.com/agent/default/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "/test-card list" }),
    });

    const response = await handleAgentMessage(channel, req, "/agent/default/message", "web:default", "default");
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.emitted).toBe(false);
    expect(body.command?.message).toContain("Available /test-card variants");
    expect(sentMessages).toHaveLength(0);
  });

  test("defers a normal user turn while the chat is still active even if streaming already settled", async () => {
    const queuedFollowups: Array<{ chatJid: string; content: string }> = [];
    let storeMessageCalls = 0;

    const channel = {
      agentPool: {
        isStreaming: () => false,
        isActive: () => true,
      },
      json: (payload: unknown, status = 200) =>
        new Response(JSON.stringify(payload), {
          status,
          headers: { "Content-Type": "application/json" },
        }),
      enqueueQueuedFollowupItem: (chatJid: string, _rowId: number, content: string) => {
        queuedFollowups.push({ chatJid, content });
        return 777;
      },
      broadcastEvent: () => {},
      storeMessage: () => {
        storeMessageCalls += 1;
        return null;
      },
      sendMessage: async () => {},
    } as any;

    const req = new Request("https://example.com/agent/default/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "follow up while compacting" }),
    });

    const response = await handleAgentMessage(channel, req, "/agent/default/message", "web:default", "default");
    expect(response.status).toBe(201);
    const body = await response.json();
    expect(body.queued).toBe("followup");
    expect(queuedFollowups).toEqual([{ chatJid: "web:default", content: "follow up while compacting" }]);
    expect(storeMessageCalls).toBe(0);
  });
});

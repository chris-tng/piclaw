import { describe, expect, test } from "bun:test";
import { handleAgentRoutes } from "../../../src/channels/web/http/dispatch-agent.js";

describe("web http agent dispatch", () => {
  test("returns null for non-agent routes", async () => {
    const channel = {} as any;
    const req = new Request("https://example.com/timeline", { method: "GET" });
    const response = await handleAgentRoutes(channel, req, "/timeline", new URL(req.url));
    expect(response).toBeNull();
  });

  test("dispatches thought route with query params", async () => {
    const channel = {
      handleThought: (panel: string | null, turnId: string | null) => new Response(`${panel}:${turnId}`),
    } as any;

    const req = new Request("https://example.com/agent/thought?panel=main&turn_id=t1", { method: "GET" });
    const response = await handleAgentRoutes(channel, req, "/agent/thought", new URL(req.url));
    expect(await response?.text()).toBe("main:t1");
  });

  test("dispatches remaining agent endpoints", async () => {
    const channel = {
      handleThoughtVisibility: async () => new Response("thought-vis", { status: 201 }),
      handleAgentMessage: async () => new Response("message", { status: 202 }),
      handleAgentStatus: () => new Response("status"),
      handleAgentContext: async () => new Response("context"),
      handleAgentQueueState: async () => new Response("queue-state"),
      handleAgentQueueRemove: async () => new Response("queue-remove", { status: 203 }),
      handleAgentQueueSteer: async () => new Response("queue-steer", { status: 204 }),
      handleAgentModels: async () => new Response("models"),
      handleAgentRespond: async () => new Response("respond"),
      handleAdaptiveCardAction: async () => new Response("card-action", { status: 205 }),
      json: (_payload: unknown, status: number) => new Response("err", { status }),
    } as any;

    const thoughtVisReq = new Request("https://example.com/agent/thought/visibility", { method: "POST" });
    expect((await handleAgentRoutes(channel, thoughtVisReq, "/agent/thought/visibility", new URL(thoughtVisReq.url)))?.status).toBe(201);

    const messageReq = new Request("https://example.com/agent/abc/message", { method: "POST" });
    expect((await handleAgentRoutes(channel, messageReq, "/agent/abc/message", new URL(messageReq.url)))?.status).toBe(202);

    const statusReq = new Request("https://example.com/agent/status", { method: "GET" });
    expect(await (await handleAgentRoutes(channel, statusReq, "/agent/status", new URL(statusReq.url)))?.text()).toBe("status");

    const contextReq = new Request("https://example.com/agent/context", { method: "GET" });
    expect(await (await handleAgentRoutes(channel, contextReq, "/agent/context", new URL(contextReq.url)))?.text()).toBe("context");

    const queueStateReq = new Request("https://example.com/agent/queue-state", { method: "GET" });
    expect(await (await handleAgentRoutes(channel, queueStateReq, "/agent/queue-state", new URL(queueStateReq.url)))?.text()).toBe("queue-state");

    const queueRemoveReq = new Request("https://example.com/agent/queue-remove", { method: "POST" });
    expect((await handleAgentRoutes(channel, queueRemoveReq, "/agent/queue-remove", new URL(queueRemoveReq.url)))?.status).toBe(203);

    const queueSteerReq = new Request("https://example.com/agent/queue-steer", { method: "POST" });
    expect((await handleAgentRoutes(channel, queueSteerReq, "/agent/queue-steer", new URL(queueSteerReq.url)))?.status).toBe(204);

    const modelsReq = new Request("https://example.com/agent/models", { method: "GET" });
    expect(await (await handleAgentRoutes(channel, modelsReq, "/agent/models", new URL(modelsReq.url)))?.text()).toBe("models");

    const respondReq = new Request("https://example.com/agent/respond", { method: "POST" });
    expect(await (await handleAgentRoutes(channel, respondReq, "/agent/respond", new URL(respondReq.url)))?.text()).toBe("respond");

    const cardReq = new Request("https://example.com/agent/card-action", { method: "POST" });
    expect((await handleAgentRoutes(channel, cardReq, "/agent/card-action", new URL(cardReq.url)))?.status).toBe(205);

    const whitelistReq = new Request("https://example.com/agent/whitelist", { method: "POST" });
    expect((await handleAgentRoutes(channel, whitelistReq, "/agent/whitelist", new URL(whitelistReq.url)))?.status).toBe(404);
  });
});

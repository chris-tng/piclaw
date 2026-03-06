/**
 * test/channels/web/agents-service.test.ts
 *
 * Covers /agents response shaping, including model lookup fallback behavior.
 */

import { expect, test } from "bun:test";

import { getAgentsResponse } from "../../../src/channels/web/agents-service.js";

test("getAgentsResponse includes model label when available", async () => {
  const pool = {
    getCurrentModelLabel: async (jid: string) => {
      expect(jid).toBe("web:default");
      return "azure-openai/gpt-5-3-codex";
    },
  } as any;

  const response = await getAgentsResponse(pool, {
    chatJid: "web:default",
    agentId: "default",
    agentName: "Pi",
    agentAvatar: "https://example.com/avatar.png",
    userName: "Rui",
    userAvatar: "https://example.com/user.png",
    userAvatarBackground: "clear",
  });

  expect(response.status).toBe(200);
  const body = response.body as any;
  expect(body.agents[0].model).toBe("azure-openai/gpt-5-3-codex");
  expect(body.user.name).toBe("Rui");
});

test("getAgentsResponse falls back to null model when lookup throws", async () => {
  const pool = {
    getCurrentModelLabel: async () => {
      throw new Error("boom");
    },
  } as any;

  const response = await getAgentsResponse(pool, {
    chatJid: "web:default",
    agentId: "default",
    agentName: "Pi",
  });

  expect(response.status).toBe(200);
  const body = response.body as any;
  expect(body.agents[0].model).toBeNull();
  expect(body.user.avatar_url).toBeNull();
});

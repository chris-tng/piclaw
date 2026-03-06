/**
 * test/agent-control/user-handler.test.ts
 *
 * Covers /user-name, /user-avatar, and /user-github handler branches.
 */

import { afterEach, expect, test } from "bun:test";

import { createTempWorkspace, importFresh, setEnv } from "../helpers.js";

let restoreEnv: (() => void) | null = null;
let cleanupWorkspace: (() => void) | null = null;
const originalFetch = globalThis.fetch;

afterEach(() => {
  restoreEnv?.();
  restoreEnv = null;
  cleanupWorkspace?.();
  cleanupWorkspace = null;
  globalThis.fetch = originalFetch;
});

async function setup() {
  const ws = createTempWorkspace("piclaw-user-handler-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({
    PICLAW_WORKSPACE: ws.workspace,
    PICLAW_STORE: ws.store,
    PICLAW_DATA: ws.data,
  });

  return importFresh<typeof import("../src/agent-control/handlers/user.js")>(
    "../src/agent-control/handlers/user.js"
  );
}

test("handleUserName sets, reads, and clears user name", async () => {
  const mod = await setup();

  const read = await mod.handleUserName({} as any, { type: "user_name", raw: "/user-name" } as any);
  expect(read.status).toBe("success");

  const set = await mod.handleUserName({} as any, { type: "user_name", name: "Rui", raw: "/user-name Rui" } as any);
  expect(set.message).toContain("Rui");

  const cleared = await mod.handleUserName({} as any, { type: "user_name", name: "clear", raw: "/user-name clear" } as any);
  expect(cleared.message).toContain("reset to default");
});

test("handleUserAvatar sets and clears avatar", async () => {
  const mod = await setup();

  const set = await mod.handleUserAvatar(
    {} as any,
    { type: "user_avatar", avatar: "https://example.com/u.png", raw: "/user-avatar https://example.com/u.png" } as any
  );
  expect(set.message).toContain("set to");

  const cleared = await mod.handleUserAvatar({} as any, { type: "user_avatar", avatar: "none", raw: "/user-avatar none" } as any);
  expect(cleared.message).toContain("reset to default");
});

test("handleUserGithub validates and handles fetch failures", async () => {
  const mod = await setup();

  const invalid = await mod.handleUserGithub({} as any, { type: "user_github", profile: "https://example.com/not-github" } as any);
  expect(invalid.status).toBe("error");

  globalThis.fetch = (async () => {
    throw new Error("network down");
  }) as any;
  const networkError = await mod.handleUserGithub({} as any, { type: "user_github", profile: "rcarmo" } as any);
  expect(networkError.message).toContain("Failed to fetch GitHub profile");

  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 404 }) as any;
  const httpError = await mod.handleUserGithub({} as any, { type: "user_github", profile: "rcarmo" } as any);
  expect(httpError.message).toContain("HTTP 404");
});

test("handleUserGithub stores profile on success", async () => {
  const mod = await setup();

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        login: "rcarmo",
        name: "Rui Carmo",
        avatar_url: "https://avatars.example/rcarmo.png",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    ) as any;

  const result = await mod.handleUserGithub({} as any, { type: "user_github", profile: "@rcarmo" } as any);
  expect(result.status).toBe("success");
  expect(result.message).toContain("Rui Carmo");
});

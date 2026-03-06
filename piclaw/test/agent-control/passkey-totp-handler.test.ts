/**
 * test/agent-control/passkey-totp-handler.test.ts
 *
 * Covers passkey/totp command handlers for help/list/delete and missing-secret
 * safeguards.
 */

import { afterEach, expect, test } from "bun:test";

import { createTempWorkspace, setEnv } from "../helpers.js";

let restoreEnv: (() => void) | null = null;
let cleanupWorkspace: (() => void) | null = null;

afterEach(() => {
  restoreEnv?.();
  restoreEnv = null;
  cleanupWorkspace?.();
  cleanupWorkspace = null;
});

async function setup(extraEnv: Record<string, string | undefined> = {}) {
  const ws = createTempWorkspace("piclaw-passkey-handler-");
  cleanupWorkspace = ws.cleanup;
  restoreEnv = setEnv({
    PICLAW_WORKSPACE: ws.workspace,
    PICLAW_STORE: ws.store,
    PICLAW_DATA: ws.data,
    PICLAW_WEB_TOTP_SECRET: undefined,
    ...extraEnv,
  });

  const token = `?t=${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const db = (await import(`../../src/db.js${token}`)) as typeof import("../../src/db.js");
  db.initDatabase();

  const passkey = (await import(`../../src/agent-control/handlers/passkey.js${token}`)) as typeof import("../../src/agent-control/handlers/passkey.js");
  const totp = (await import(`../../src/agent-control/handlers/totp.js${token}`)) as typeof import("../../src/agent-control/handlers/totp.js");

  return { db, passkey, totp };
}

test("handlePasskey returns help, list, and delete validation errors", async () => {
  const { passkey } = await setup();

  const help = await passkey.handlePasskey({} as any, { type: "passkey", raw: "/passkey" } as any);
  expect(help.status).toBe("success");
  expect(help.message).toContain("/passkey enrol");

  const listEmpty = await passkey.handlePasskey({} as any, { type: "passkey", action: "list" } as any);
  expect(listEmpty.status).toBe("success");
  expect(listEmpty.message).toContain("No passkeys");

  const deleteNoTarget = await passkey.handlePasskey({} as any, { type: "passkey", action: "delete" } as any);
  expect(deleteNoTarget.status).toBe("error");
  expect(deleteNoTarget.message).toContain("Usage: /passkey delete");

  const deleteNoMatch = await passkey.handlePasskey(
    {} as any,
    { type: "passkey", action: "delete", target: "does-not-exist" } as any
  );
  expect(deleteNoMatch.status).toBe("error");
  expect(deleteNoMatch.message).toContain("No passkey matches");
});

test("handlePasskey enrol requires configured TOTP secret", async () => {
  const { passkey } = await setup();

  const enrol = await passkey.handlePasskey({} as any, { type: "passkey", action: "enrol" } as any);
  expect(enrol.status).toBe("error");
  expect(enrol.message).toContain("TOTP is not configured");
});

test("handleTotp validates action and rejects when secret missing", async () => {
  const { totp } = await setup();

  const badAction = await totp.handleTotp({} as any, { type: "totp", action: "noop" } as any);
  expect(badAction.status).toBe("error");
  expect(badAction.message).toContain("Usage: /totp enrol");

  const missingSecret = await totp.handleTotp({} as any, { type: "totp", action: "enrol" } as any);
  expect(missingSecret.status).toBe("error");
  expect(missingSecret.message).toContain("TOTP is not configured");
});

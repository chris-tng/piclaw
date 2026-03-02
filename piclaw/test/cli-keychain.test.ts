import { afterAll, expect, test } from "bun:test";
import { createTempWorkspace, setEnv, importFresh } from "./helpers.js";

const ws = createTempWorkspace("piclaw-cli-keychain-");
const restore = setEnv({
  PICLAW_WORKSPACE: ws.workspace,
  PICLAW_STORE: ws.store,
  PICLAW_DATA: ws.data,
  PICLAW_KEYCHAIN_KEY: "cli-key",
});

const { handleCliOptions } = await importFresh<typeof import("../src/cli.js")>("../src/cli.js");
const { getKeychainEntry } = await importFresh<typeof import("../src/secure/keychain.js")>(
  "../src/secure/keychain.js"
);

afterAll(() => {
  restore();
  ws.cleanup();
});

test("cli keychain set and delete", async () => {
  const handledSet = await handleCliOptions([
    "keychain",
    "set",
    "cli/foo/bar",
    "--type",
    "token",
    "--secret",
    "cli-secret",
    "--username",
    "cli-user",
  ]);

  expect(handledSet).toBe(true);
  const entry = await getKeychainEntry("cli/foo/bar");
  expect(entry.secret).toBe("cli-secret");
  expect(entry.username).toBe("cli-user");

  const handledDelete = await handleCliOptions(["keychain", "delete", "cli/foo/bar"]);
  expect(handledDelete).toBe(true);

  await expect(getKeychainEntry("cli/foo/bar")).rejects.toThrow("Keychain entry not found");
});

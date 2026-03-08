/**
 * test/extensions/extensions-keychain-tools.test.ts – Tests for keychain-tools extension.
 */

import { beforeEach, afterEach, describe, expect, test } from "bun:test";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { createTempWorkspace, importFresh, setEnv } from "../helpers.js";

function makeFakeApi() {
  const tools = new Map<string, any>();
  return {
    api: {
      on() {},
      registerTool(tool: any) { tools.set(tool.name, tool); },
      registerCommand() {},
      registerShortcut() {},
      registerFlag() {},
      getFlag() { return undefined; },
      registerMessageRenderer() {},
      sendMessage() {},
      sendUserMessage() {},
      appendEntry() {},
      setSessionName() {},
      getSessionName() { return undefined; },
      setLabel() {},
      exec: async () => ({ exitCode: 0, stdout: "", stderr: "" }),
      getActiveTools: () => [],
      getAllTools: () => [],
      setActiveTools() {},
      getCommands: () => [],
      setModel: async () => true,
      getThinkingLevel: () => "off" as any,
      setThinkingLevel() {},
      registerProvider() {},
      unregisterProvider() {},
    } as unknown as ExtensionAPI,
    tools,
  };
}

describe("keychain-tools extension", () => {
  let ws: ReturnType<typeof createTempWorkspace>;
  let restoreEnv: (() => void) | null = null;

  beforeEach(async () => {
    ws = createTempWorkspace("piclaw-keychain-tools-");
    restoreEnv = setEnv({
      PICLAW_WORKSPACE: ws.workspace,
      PICLAW_STORE: ws.store,
      PICLAW_DATA: ws.data,
      PICLAW_KEYCHAIN_KEY: "test-keychain-tools",
    });

    const db = await importFresh<typeof import("../src/db.js")>("../src/db.js");
    db.initDatabase();
    const keychain = await importFresh<typeof import("../src/secure/keychain.js")>("../src/secure/keychain.js");
    await keychain.setKeychainEntry({
      name: "ssh/piclaw",
      type: "secret",
      secret: "PRIVATE_KEY_DATA",
      username: "git",
    });
  });

  afterEach(() => {
    restoreEnv?.();
    restoreEnv = null;
    ws.cleanup();
  });

  async function getTool() {
    const { keychainTools } = await importFresh<typeof import("../src/extensions/keychain-tools.js")>(
      "../src/extensions/keychain-tools.js",
    );
    const fake = makeFakeApi();
    keychainTools(fake.api);
    return fake.tools.get("keychain");
  }

  test("registers keychain tool", async () => {
    const tool = await getTool();
    expect(tool).toBeDefined();
    expect(tool.name).toBe("keychain");
  });

  test("lists keychain entries", async () => {
    const tool = await getTool();
    const result = await tool.execute("k1", { action: "list" });
    expect(result.content[0].text).toContain("Keychain entries");
    expect(result.content[0].text).toContain("ssh/piclaw");
    expect(result.details.count).toBe(1);
  });

  test("retrieves secret and username fields", async () => {
    const tool = await getTool();

    const secretResult = await tool.execute("k2", { action: "get", name: "ssh/piclaw" });
    expect(secretResult.content[0].text).toBe("PRIVATE_KEY_DATA");

    const userResult = await tool.execute("k3", { action: "get", name: "ssh/piclaw", field: "username" });
    expect(userResult.content[0].text).toBe("git");
  });

  test("sets a keychain entry and can read it back", async () => {
    const tool = await getTool();

    const setResult = await tool.execute("k4", {
      action: "set",
      name: "proxmox/piclaw",
      type: "token",
      secret: "tok_123",
      username: "root@pam!piclaw",
    });
    expect(setResult.content[0].text).toContain("Stored keychain entry proxmox/piclaw (token).");

    const secretResult = await tool.execute("k5", { action: "get", name: "proxmox/piclaw" });
    expect(secretResult.content[0].text).toBe("tok_123");

    const userResult = await tool.execute("k6", { action: "get", name: "proxmox/piclaw", field: "username" });
    expect(userResult.content[0].text).toBe("root@pam!piclaw");
  });

  test("set action validates required fields", async () => {
    const tool = await getTool();

    const missingName = await tool.execute("k7", { action: "set", secret: "abc" });
    expect(missingName.content[0].text).toContain("Provide name for action=set");

    const missingSecret = await tool.execute("k8", { action: "set", name: "foo/bar" });
    expect(missingSecret.content[0].text).toContain("Provide secret for action=set");
  });
});

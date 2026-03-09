/**
 * test/agent-pool/agent-pool-tools.test.ts – Tests for built-in extension tool registration.
 *
 * Verifies that builtinExtensionFactories register the expected tools
 * (attach_file, search_messages/get_message, model control, tool discovery, keychain, SQL introspection, workspace search)
 * and slash commands (/tasks, /scheduled) on a mock ExtensionAPI.
 */

import { describe, expect, test } from "bun:test";
import "../helpers.js";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { builtinExtensionFactories } from "../../src/extensions/index.js";

function makeFakeApi() {
  const tools = new Map<string, any>();
  const commands = new Map<string, any>();
  return {
    api: {
      on() {},
      registerTool(tool: any) { tools.set(tool.name, tool); },
      registerCommand(name: string, opts: any) { commands.set(name, opts); },
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
    commands,
  };
}

describe("builtin extension factories", () => {
  test("register all expected tools and commands", () => {
    const fake = makeFakeApi();
    for (const factory of builtinExtensionFactories) {
      factory(fake.api);
    }

    // Tools from extensions
    expect(fake.tools.has("attach_file")).toBe(true);
    expect(fake.tools.has("search_messages")).toBe(true);
    expect(fake.tools.has("get_message")).toBe(true);
    expect(fake.tools.has("search_workspace")).toBe(true);
    expect(fake.tools.has("get_model_state")).toBe(true);
    expect(fake.tools.has("list_models")).toBe(true);
    expect(fake.tools.has("switch_model")).toBe(true);
    expect(fake.tools.has("switch_thinking")).toBe(true);
    expect(fake.tools.has("list_internal_tools")).toBe(true);
    expect(fake.tools.has("keychain")).toBe(true);
    expect(fake.tools.has("sql_introspect")).toBe(true);

    // Commands from scheduled-tasks
    expect(fake.commands.has("tasks")).toBe(true);
    expect(fake.commands.has("scheduled")).toBe(true);
  });

  test("factories array has expected length", () => {
    expect(builtinExtensionFactories.length).toBe(8);
  });
});

/**
 * test/extensions/extensions-internal-tools.test.ts – Tests for internal-tools extension.
 */

import { describe, expect, test } from "bun:test";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

function makeFakeApi(initialTools: Array<{ name: string; description?: string; parameters?: unknown }>) {
  const tools = new Map<string, any>();
  let allTools = [...initialTools];
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
      getAllTools: () => allTools,
      setActiveTools() {},
      getCommands: () => [],
      setModel: async () => true,
      getThinkingLevel: () => "off" as any,
      setThinkingLevel() {},
      registerProvider() {},
      unregisterProvider() {},
    } as unknown as ExtensionAPI,
    tools,
    setAllTools(next: Array<{ name: string; description?: string; parameters?: unknown }>) {
      allTools = [...next];
    },
  };
}

describe("internal-tools extension", () => {
  test("registers list_internal_tools tool", async () => {
    const { internalTools } = await import("../../src/extensions/internal-tools.js");
    const fake = makeFakeApi([]);
    internalTools(fake.api);

    const tool = fake.tools.get("list_internal_tools");
    expect(tool).toBeDefined();
    expect(tool.name).toBe("list_internal_tools");
  });

  test("lists tools with brief descriptions and query filter", async () => {
    const { internalTools } = await import("../../src/extensions/internal-tools.js");
    const fake = makeFakeApi([
      { name: "bash", description: "Run a shell command and return output." },
      { name: "search_messages", description: "Search chat history by FTS or hashtag." },
      { name: "list_internal_tools", description: "List available internal tools." },
    ]);
    internalTools(fake.api);

    const tool = fake.tools.get("list_internal_tools");
    const all = await tool.execute("t1", {});
    expect(all.content[0].text).toContain("Available tools:");
    expect(all.content[0].text).toContain("• bash — Run a shell command and return output.");

    const filtered = await tool.execute("t2", { query: "search" });
    expect(filtered.content[0].text).toContain("filtered");
    expect(filtered.content[0].text).toContain("search_messages");
    expect(filtered.content[0].text).not.toContain("• bash —");
  });

  test("includes parameter schemas when requested", async () => {
    const { internalTools } = await import("../../src/extensions/internal-tools.js");
    const fake = makeFakeApi([
      {
        name: "read",
        description: "Read a file.",
        parameters: { type: "object", properties: { path: { type: "string" } } },
      },
    ]);
    internalTools(fake.api);

    const tool = fake.tools.get("list_internal_tools");
    const result = await tool.execute("t3", { include_parameters: true });
    expect(result.details.count).toBe(1);
    expect(result.details.tools[0].parameters).toBeDefined();
  });
});

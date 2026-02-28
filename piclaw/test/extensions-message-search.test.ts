import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { getTestWorkspace, setEnv } from "./helpers.js";

let restoreEnv: (() => void) | null = null;

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

describe("message-search extension", () => {
  let ws: ReturnType<typeof getTestWorkspace>;

  beforeEach(() => {
    ws = getTestWorkspace();
    restoreEnv = setEnv({
      PICLAW_WORKSPACE: ws.workspace,
      PICLAW_STORE: ws.store,
      PICLAW_DATA: ws.data,
      PICLAW_CHAT_JID: "web:test",
    });
    const db = require("../src/db.js");
    db.initDatabase();
    db.storeChatMetadata("web:test", new Date().toISOString(), "Web");
  });

  afterEach(() => {
    restoreEnv?.();
    restoreEnv = null;
  });

  function insertMessage(content: string, overrides: Record<string, any> = {}) {
    const db = require("../src/db.js");
    db.storeMessage({
      id: `msg-${Math.random()}`,
      chat_jid: "web:test",
      sender: "user",
      sender_name: "Alice",
      content,
      timestamp: new Date().toISOString(),
      is_from_me: false,
      is_bot_message: false,
      ...overrides,
    });
  }

  async function getSearchTool() {
    const { messageSearch } = await import("../src/extensions/message-search.js");
    const fake = makeFakeApi();
    messageSearch(fake.api);
    return fake.tools.get("search_messages")!;
  }

  test("registers search_messages tool", async () => {
    const tool = await getSearchTool();
    expect(tool).toBeDefined();
    expect(tool.name).toBe("search_messages");
  });

  test("returns empty when no query or row_id", async () => {
    const tool = await getSearchTool();
    const result = await tool.execute("c1", {});
    expect(result.content[0].text).toContain("Provide a query or row_id");
    expect(result.details.count).toBe(0);
  });

  test("searches by FTS query", async () => {
    insertMessage("The weather is sunny today");
    insertMessage("It might rain tomorrow");

    const tool = await getSearchTool();
    const result = await tool.execute("c1", { query: "sunny" });
    expect(result.details.count).toBe(1);
    expect(result.content[0].text).toContain("sunny");
  });

  test("searches by hashtag", async () => {
    insertMessage("Working on #project-alpha");
    insertMessage("Just a normal message");

    const tool = await getSearchTool();
    const result = await tool.execute("c1", { query: "#project-alpha" });
    expect(result.details.count).toBe(1);
    expect(result.content[0].text).toContain("project-alpha");
  });

  test("returns no match message", async () => {
    const tool = await getSearchTool();
    const result = await tool.execute("c1", { query: "nonexistent-xyz-99" });
    expect(result.content[0].text).toContain("No matching messages");
    expect(result.details.count).toBe(0);
  });

  test("fetches by row_id", async () => {
    insertMessage("Specific message for lookup");

    const tool = await getSearchTool();
    // First search to get a rowid
    const searchResult = await tool.execute("c1", { query: "Specific message" });
    expect(searchResult.details.count).toBe(1);
    const rowid = searchResult.details.results[0].rowid;

    // Now fetch by row_id
    const result = await tool.execute("c2", { row_id: rowid });
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].content).toContain("Specific message");
  });

  test("row_id not found", async () => {
    const tool = await getSearchTool();
    const result = await tool.execute("c1", { row_id: 999999 });
    expect(result.content[0].text).toContain("No message found");
    expect(result.details.count).toBe(0);
  });

  test("respects limit and offset", async () => {
    for (let i = 0; i < 5; i++) {
      insertMessage(`Message number ${i}`);
    }

    const tool = await getSearchTool();
    const result = await tool.execute("c1", { query: "Message number", limit: 2, offset: 0 });
    expect(result.details.count).toBe(2);
    expect(result.content[0].text).toContain("limit 2");
  });

  test("details_max_chars truncates content", async () => {
    const longContent = "The quick brown fox ".repeat(25);
    insertMessage(longContent);

    const tool = await getSearchTool();
    const result = await tool.execute("c1", { query: "quick brown fox", details_max_chars: 50 });
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].content.length).toBeLessThanOrEqual(51);
    expect(result.details.results[0].content_truncated).toBe(true);
    expect(result.details.results[0].content_full_length).toBeGreaterThan(50);
    expect(result.details.details_max_chars).toBe(50);
  });

  test("details_max_chars 0 omits content", async () => {
    insertMessage("Some content here");

    const tool = await getSearchTool();
    const result = await tool.execute("c1", { query: "Some content", details_max_chars: 0 });
    expect(result.details.results[0].content).toBe("");
    expect(result.details.results[0].content_truncated).toBe(true);
  });

  test("chat_jid 'all' searches across chats", async () => {
    insertMessage("In test chat");

    const db = require("../src/db.js");
    db.storeChatMetadata("web:other", new Date().toISOString(), "Web");
    db.storeMessage({
      id: `msg-other-${Math.random()}`,
      chat_jid: "web:other",
      sender: "user",
      sender_name: "Bob",
      content: "In other chat",
      timestamp: new Date().toISOString(),
      is_from_me: false,
      is_bot_message: false,
    });

    const tool = await getSearchTool();
    const result = await tool.execute("c1", { query: "In", chat_jid: "all" });
    expect(result.details.count).toBe(2);
  });

  test("chat_jid '*' searches across chats", async () => {
    insertMessage("Wildcard test");

    const tool = await getSearchTool();
    const result = await tool.execute("c1", { query: "Wildcard", chat_jid: "*" });
    expect(result.details.count).toBe(1);
  });

  test("defaults to PICLAW_CHAT_JID from env", async () => {
    insertMessage("Default chat message");

    const tool = await getSearchTool();
    const result = await tool.execute("c1", { query: "Default chat" });
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].chat_jid).toBe("web:test");
  });

  test("empty hashtag returns nothing", async () => {
    const tool = await getSearchTool();
    const result = await tool.execute("c1", { query: "#" });
    expect(result.content[0].text).toContain("No matching messages");
  });

  test("FTS syntax error falls back to LIKE", async () => {
    insertMessage("Special chars: foo(bar)");

    const tool = await getSearchTool();
    // Invalid FTS5 syntax should fall back to LIKE
    const result = await tool.execute("c1", { query: "foo(bar)" });
    expect(result.details.count).toBe(1);
  });
});

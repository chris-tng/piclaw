/**
 * test/extensions/extensions-message-search.test.ts – Tests for the message-search extension.
 *
 * Verifies search_messages tool queries against the messages DB, including
 * full-text search, role filtering, and result formatting.
 */

import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { createTempWorkspace, importFresh, setEnv } from "../helpers.js";
import { withChatContext } from "../../src/core/chat-context.js";

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
  let ws: ReturnType<typeof createTempWorkspace>;
  let db: typeof import("../../src/db.js");
  let chatJid = "web:test";

  beforeEach(async () => {
    ws = createTempWorkspace("piclaw-message-search-");
    chatJid = `web:test-${Math.random().toString(36).slice(2, 10)}`;
    restoreEnv = setEnv({
      PICLAW_WORKSPACE: ws.workspace,
      PICLAW_STORE: ws.store,
      PICLAW_DATA: ws.data,
      PICLAW_DB_IN_MEMORY: "1",
    });
    db = await importFresh<typeof import("../src/db.js")>("../src/db.js");
    db.initDatabase();
    db.storeChatMetadata(chatJid, new Date().toISOString(), "Web");
  });

  afterEach(() => {
    restoreEnv?.();
    restoreEnv = null;
    ws.cleanup();
  });

  function insertMessage(content: string, overrides: Record<string, any> = {}) {
    db.storeMessage({
      id: `msg-${Math.random()}`,
      chat_jid: chatJid,
      sender: "user",
      sender_name: "Alice",
      content,
      timestamp: new Date().toISOString(),
      is_from_me: false,
      is_bot_message: false,
      ...overrides,
    });
  }

  async function getTools() {
    const { messageSearch } = await importFresh<typeof import("../src/extensions/message-search.js")>("../src/extensions/message-search.js");
    const fake = makeFakeApi();
    messageSearch(fake.api);
    return {
      search: fake.tools.get("search_messages")!,
      getMessage: fake.tools.get("get_message")!,
    };
  }

  async function executeWithContext(tool: any, id: string, params: Record<string, unknown>) {
    return withChatContext(chatJid, "web", () => tool.execute(id, params));
  }

  test("registers search_messages and get_message tools", async () => {
    const tools = await getTools();
    expect(tools.search).toBeDefined();
    expect(tools.search.name).toBe("search_messages");
    expect(tools.getMessage).toBeDefined();
    expect(tools.getMessage.name).toBe("get_message");
  });

  test("returns empty when no query or row_id", async () => {
    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", {});
    expect(result.content[0].text).toContain("Provide a query or row_id");
    expect(result.details.count).toBe(0);
  });

  test("searches by FTS query", async () => {
    insertMessage("The weather is sunny today");
    insertMessage("It might rain tomorrow");

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "sunny" });
    expect(result.details.count).toBe(1);
    expect(result.content[0].text).toContain("sunny");
  });

  test("searches by hashtag", async () => {
    insertMessage("Working on #project-alpha");
    insertMessage("Just a normal message");

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "#project-alpha" });
    expect(result.details.count).toBe(1);
    expect(result.content[0].text).toContain("project-alpha");
  });

  test("returns no match message", async () => {
    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "nonexistent-xyz-99" });
    expect(result.content[0].text).toContain("No matching messages");
    expect(result.details.count).toBe(0);
  });

  test("fetches by row_id", async () => {
    insertMessage("Specific message for lookup");

    const { search: tool } = await getTools();
    // First search to get a rowid
    const searchResult = await executeWithContext(tool, "c1", { query: "Specific message" });
    expect(searchResult.details.count).toBe(1);
    const rowid = searchResult.details.results[0].rowid;

    // Now fetch by row_id
    const result = await executeWithContext(tool, "c2", { row_id: rowid });
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].content).toContain("Specific message");
  });

  test("row_id not found", async () => {
    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { row_id: 999999 });
    expect(result.content[0].text).toContain("No message found");
    expect(result.details.count).toBe(0);
  });

  test("respects limit and offset", async () => {
    for (let i = 0; i < 5; i++) {
      insertMessage(`Message number ${i}`);
    }

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "Message number", limit: 2, offset: 0 });
    expect(result.details.count).toBe(2);
    expect(result.content[0].text).toContain("limit 2");
  });

  test("details_max_chars truncates content", async () => {
    const longContent = "The quick brown fox ".repeat(25);
    insertMessage(longContent);

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "quick brown fox", details_max_chars: 50 });
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].content.length).toBeLessThanOrEqual(51);
    expect(result.details.results[0].content_truncated).toBe(true);
    expect(result.details.results[0].content_full_length).toBeGreaterThan(50);
    expect(result.details.details_max_chars).toBe(50);
  });

  test("details_max_chars 0 omits content", async () => {
    insertMessage("Some content here");

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "Some content", details_max_chars: 0 });
    expect(result.details.results[0].content).toBe("");
    expect(result.details.results[0].content_truncated).toBe(true);
  });

  test("chat_jid 'all' searches across chats", async () => {
    insertMessage("In test chat");

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

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "In", chat_jid: "all" });
    expect(result.details.count).toBe(2);
  });

  test("chat_jid '*' searches across chats", async () => {
    insertMessage("Wildcard test");

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "Wildcard", chat_jid: "*" });
    expect(result.details.count).toBe(1);
  });

  test("defaults to chat context", async () => {
    insertMessage("Default chat message");

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "Default chat" });
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].chat_jid).toBe(chatJid);
  });

  test("empty hashtag returns nothing", async () => {
    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "#" });
    expect(result.content[0].text).toContain("No matching messages");
  });

  test("FTS syntax error falls back to LIKE", async () => {
    insertMessage("Special chars: foo(bar)");

    const { search: tool } = await getTools();
    // Invalid FTS5 syntax should fall back to LIKE
    const result = await executeWithContext(tool, "c1", { query: "foo(bar)" });
    expect(result.details.count).toBe(1);
  });

  test("filters by role", async () => {
    insertMessage("User says hello", { sender: "user" });
    insertMessage("Assistant says hello", { sender: "assistant", is_bot_message: true, sender_name: "Pi" });

    const { search: tool } = await getTools();
    const userOnly = await executeWithContext(tool, "c1", { query: "hello", role: "user" });
    expect(userOnly.details.count).toBe(1);
    expect(userOnly.details.results[0].is_bot_message).toBe(0);

    const assistantOnly = await executeWithContext(tool, "c1", { query: "hello", role: "assistant" });
    expect(assistantOnly.details.count).toBe(1);
    expect(assistantOnly.details.results[0].is_bot_message).toBe(1);
  });

  test("chat_jid all includes assistant messages", async () => {
    insertMessage("Local user message");

    db.storeChatMetadata("web:other", new Date().toISOString(), "Web");
    db.storeMessage({
      id: `msg-other-${Math.random()}`,
      chat_jid: "web:other",
      sender: "assistant",
      sender_name: "Pi",
      content: "Assistant in other chat unique",
      timestamp: new Date().toISOString(),
      is_from_me: true,
      is_bot_message: true,
    });

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "other chat unique", chat_jid: "all", role: "assistant" });
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].chat_jid).toBe("web:other");
  });

  test("get_message returns full content and context", async () => {
    insertMessage("before message one");
    insertMessage("before message two");
    insertMessage("target body content");
    insertMessage("after message one");

    const { search, getMessage } = await getTools();
    const lookup = await executeWithContext(search, "c1", { query: "target body content" });
    const rowid = lookup.details.results[0].rowid;

    const result = await executeWithContext(getMessage, "c2", { row_id: rowid, before: 2, after: 1 });
    expect(result.details.found).toBe(true);
    expect(result.details.result?.content).toContain("target body content");
    expect(result.details.context_before.length).toBe(2);
    expect(result.details.context_after.length).toBe(1);
  });

  test("get_message supports larger details_max_chars", async () => {
    const longContent = "longtoken ".repeat(7000); // 70k chars
    insertMessage(longContent);

    const { search, getMessage } = await getTools();
    const lookup = await executeWithContext(search, "c1", { query: "longtoken" });
    const rowid = lookup.details.results[0].rowid;

    const result = await executeWithContext(getMessage, "c2", { row_id: rowid, details_max_chars: 40000 });
    expect(result.details.found).toBe(true);
    expect(result.details.result?.content.length).toBeGreaterThan(20000);
    expect(result.details.result?.content_truncated).toBe(true);
    expect(result.details.details_max_chars).toBe(40000);
  });

  test("search_messages results include created_at", async () => {
    insertMessage("Timestamped message content");

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "Timestamped message" });
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].created_at).toBeDefined();
    expect(result.details.results[0].created_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  test("get_message result includes created_at", async () => {
    insertMessage("Get message timestamp test");

    const { search, getMessage } = await getTools();
    const lookup = await executeWithContext(search, "c1", { query: "Get message timestamp" });
    const rowid = lookup.details.results[0].rowid;

    const result = await executeWithContext(getMessage, "c2", { row_id: rowid });
    expect(result.details.found).toBe(true);
    expect(result.details.result?.created_at).toBeDefined();
    expect(result.details.result?.created_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  test("get_message context rows include created_at", async () => {
    insertMessage("context before msg");
    insertMessage("target msg for context ts");
    insertMessage("context after msg");

    const { search, getMessage } = await getTools();
    const lookup = await executeWithContext(search, "c1", { query: "target msg for context" });
    const rowid = lookup.details.results[0].rowid;

    const result = await executeWithContext(getMessage, "c2", { row_id: rowid, before: 1, after: 1 });
    expect(result.details.context_before.length).toBe(1);
    expect(result.details.context_after.length).toBe(1);
    expect(result.details.context_before[0].created_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(result.details.context_after[0].created_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  test("search_messages filters by after timestamp", async () => {
    const oldTs = "2020-01-01T00:00:00.000Z";
    const newTs = "2026-06-01T00:00:00.000Z";
    insertMessage("Old message for after filter", { timestamp: oldTs });
    insertMessage("New message for after filter", { timestamp: newTs });

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", {
      query: "message for after filter",
      after: "2025-01-01T00:00:00.000Z",
    });
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].content).toContain("New message");
  });

  test("search_messages filters by before timestamp", async () => {
    const oldTs = "2020-01-01T00:00:00.000Z";
    const newTs = "2026-06-01T00:00:00.000Z";
    insertMessage("Old message for before filter", { timestamp: oldTs });
    insertMessage("New message for before filter", { timestamp: newTs });

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", {
      query: "message for before filter",
      before: "2025-01-01T00:00:00.000Z",
    });
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].content).toContain("Old message");
  });

  test("search_messages filters by both after and before", async () => {
    const ts1 = "2020-01-01T00:00:00.000Z";
    const ts2 = "2024-06-15T12:00:00.000Z";
    const ts3 = "2026-12-01T00:00:00.000Z";
    insertMessage("Very old range msg", { timestamp: ts1 });
    insertMessage("Middle range msg", { timestamp: ts2 });
    insertMessage("Very new range msg", { timestamp: ts3 });

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", {
      query: "range msg",
      after: "2023-01-01T00:00:00.000Z",
      before: "2025-01-01T00:00:00.000Z",
    });
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].content).toContain("Middle");
  });

  test("search_messages without after/before returns all (backward compat)", async () => {
    insertMessage("Compat test one");
    insertMessage("Compat test two");

    const { search: tool } = await getTools();
    const result = await executeWithContext(tool, "c1", { query: "Compat test" });
    expect(result.details.count).toBe(2);
  });
});

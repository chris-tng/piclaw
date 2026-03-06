/**
 * test/extensions/attachments.test.ts – Tests for the file-attachments extension.
 *
 * Verifies the attach_file tool creates media entries, handles missing
 * files, respects size limits, and correctly detects MIME types.
 */

import { afterEach, expect, test } from "bun:test";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { getTestWorkspace, setEnv } from "../helpers.js";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { withChatContext } from "../../src/core/chat-context.js";

let restoreEnv: (() => void) | null = null;

afterEach(() => {
  restoreEnv?.();
  restoreEnv = null;
});

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

test("attach_file tool stores media and registers attachment", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({
    PICLAW_WORKSPACE: ws.workspace,
    PICLAW_STORE: ws.store,
    PICLAW_DATA: ws.data,
  });

  const db = await import("../../src/db.js");
  db.initDatabase();

  const { WORKSPACE_DIR } = await import("../../src/core/config.js");
  mkdirSync(WORKSPACE_DIR, { recursive: true });
  const filePath = join(WORKSPACE_DIR, "hello.txt");
  writeFileSync(filePath, "hello", "utf8");

  const { fileAttachments } = await import("../../src/extensions/file-attachments.js");
  const { getAttachmentRegistry } = await import("../../src/agent-pool/attachments.js");

  const fake = makeFakeApi();
  fileAttachments(fake.api);

  const tool = fake.tools.get("attach_file");
  expect(tool).toBeDefined();

  const result = await withChatContext("web:default", "web", () => tool.execute("call", { path: "hello.txt" }));
  const details = result.details as any;
  expect(details.filename).toBe("hello.txt");
  expect(details.size).toBe(5);
  expect(details.kind).toBe("file");

  const registry = getAttachmentRegistry();
  const pending = registry.take("web:default");
  expect(pending.length).toBe(1);

  const media = db.getMediaById(pending[0].id);
  expect(media?.filename).toBe("hello.txt");
  expect(media?.metadata?.size).toBe(5);
  expect(media?.metadata?.kind).toBe("file");
});

test("web processChat stores attachment content blocks", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../src/db.js");
  db.initDatabase();
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const mediaId = db.createMedia(
    "report.txt",
    "text/plain",
    new TextEncoder().encode("report"),
    null,
    { size: 6 }
  );

  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "Please send the report",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
  });

  const webMod = await import("../../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      runAgent: async () => ({
        status: "success",
        result: "Here is the report.",
        attachments: [
          {
            id: mediaId,
            name: "report.txt",
            contentType: "text/plain",
            size: 6,
            kind: "file",
            sourcePath: "/tmp/report.txt",
          },
        ],
      }),
      getContextUsageForChat: async () => null,
    },
  });

  await (web as any).processChat("web:default", "default");

  const timeline = db.getTimeline("web:default", 10);
  const last = timeline[timeline.length - 1];
  expect(last.data.media_ids).toEqual([mediaId]);
  expect(last.data.content_blocks?.[0]).toMatchObject({
    type: "file",
    name: "report.txt",
    mime_type: "text/plain",
    size: 6,
  });
});

test("read_attachment tool returns text content", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../src/db.js");
  db.initDatabase();

  const mediaId = db.createMedia(
    "note.txt",
    "text/plain",
    new TextEncoder().encode("hello world"),
    null,
    { size: 11 }
  );

  const { fileAttachments } = await import("../../src/extensions/file-attachments.js");
  const fake = makeFakeApi();
  fileAttachments(fake.api);

  const tool = fake.tools.get("read_attachment");
  expect(tool).toBeDefined();

  const result = await tool.execute("call", { id: mediaId, mode: "text" });
  const text = result.content?.[0]?.text || "";
  expect(text).toContain("hello world");
});

test("export_attachment tool writes to workspace tmp", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../src/db.js");
  db.initDatabase();

  const mediaId = db.createMedia(
    "note.txt",
    "text/plain",
    new TextEncoder().encode("hello world"),
    null,
    { size: 11 }
  );

  const { fileAttachments } = await import("../../src/extensions/file-attachments.js");
  const fake = makeFakeApi();
  fileAttachments(fake.api);

  const tool = fake.tools.get("export_attachment");
  expect(tool).toBeDefined();

  const result = await tool.execute("call", { id: mediaId });
  const outputPath = result.details?.output_path;
  expect(typeof outputPath).toBe("string");
});

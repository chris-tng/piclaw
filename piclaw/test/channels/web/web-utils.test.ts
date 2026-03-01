import { expect, test } from "bun:test";
import { existsSync } from "fs";
import { join } from "path";

import { clampInt, jsonResponse, parseOptionalInt } from "../../../src/channels/web/http/http-utils.js";
import { buildPreview, createToolTitleTracker } from "../../../src/channels/web/agent-utils.js";
import { handleSse, broadcastEvent } from "../../../src/channels/web/sse.js";
import { serveDocsStatic, serveStatic } from "../../../src/channels/web/http/static.js";
import { UiBridge } from "../../../src/channels/web/ui-bridge.js";
import { createUiContext } from "../../../src/channels/web/ui-context.js";
import { handleMedia, handleMediaInfo, handleMediaUpload } from "../../../src/channels/web/handlers/media.js";
import { getTestWorkspace, setEnv, waitFor } from "../../helpers.js";

import type { WebChannel } from "../../../src/channels/web.js";

function makeJsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("http utils clamp and parse", async () => {
  const res = jsonResponse({ ok: true }, 201);
  expect(res.status).toBe(201);
  expect(await res.json()).toEqual({ ok: true });
  expect(clampInt("5", 1, 1, 4)).toBe(4);
  expect(parseOptionalInt("12")).toBe(12);
  expect(parseOptionalInt(null)).toBeNull();
});

test("agent utils preview and tool titles", () => {
  const { preview, totalLines } = buildPreview("one\nline two", 1, 10);
  expect(preview).toBe("one");
  expect(totalLines).toBe(2);

  const tracker = createToolTitleTracker();
  const title = tracker.remember("call-1", "bash", { command: "echo hi" });
  expect(title).toContain("bash: echo hi");
  expect(tracker.lookup("call-1", "bash")).toBe(title);
  tracker.forget("call-1");
});

test("sse helper streams connection and broadcasts", async () => {
  const channel = { clients: new Set() } as unknown as WebChannel;
  const res = handleSse(channel);
  expect(res.headers.get("Content-Type")).toContain("text/event-stream");

  const reader = res.body?.getReader();
  expect(reader).not.toBeNull();
  const first = await reader!.read();
  const text = new TextDecoder().decode(first.value);
  expect(text).toContain("connected");
  await reader!.cancel();
  await waitFor(() => channel.clients.size === 0);

  let payload = "";
  const controller = { enqueue: (value: Uint8Array) => { payload = new TextDecoder().decode(value); } };
  const heartbeat = setInterval(() => {}, 1000);
  (channel.clients as Set<any>).add({ controller, heartbeat });
  broadcastEvent(channel, "ping", { ok: true });
  clearInterval(heartbeat);
  expect(payload).toContain("event: ping");
});

test("static helpers serve files and not-found", async () => {
  const root = join(import.meta.dir, "..", "..", "..");
  const indexPath = join(root, "web", "static", "index.html");
  expect(existsSync(indexPath)).toBe(true);

  const okRes = await serveStatic("index.html", () => new Response("nope", { status: 404 }));
  expect(okRes.status).toBe(200);
  expect(okRes.headers.get("Content-Type")).toContain("text/html");

  const notFound = await serveDocsStatic("missing.html", () => new Response("nope", { status: 404 }));
  expect(notFound.status).toBe(404);
});

test("ui context emits requests and resolves", async () => {
  const events: Array<{ type: string; payload: any }> = [];
  const channel = {
    broadcastEvent: (type: string, payload: any) => events.push({ type, payload }),
  } as any;
  const uiBridge = new UiBridge(channel);
  channel.uiBridge = uiBridge;

  const ui = createUiContext(channel, "web:default");
  const selectPromise = ui.select("Pick", ["a", "b"]);
  const [requestId] = uiBridge.pendingUiRequests.keys();
  const pending = uiBridge.pendingUiRequests.get(requestId)!;
  clearTimeout(pending.timeoutId);
  uiBridge.pendingUiRequests.delete(requestId);
  pending.resolve("a");
  expect(await selectPromise).toBe("a");

  ui.notify("Hello", "info");
  expect(events.some((event) => event.type === "extension_ui_notify")).toBe(true);

  ui.pasteToEditor("test");
  expect(uiBridge.editorTextByChat.get("web:default")).toBe("test");
});

test("media handlers store and retrieve files", async () => {
  const ws = getTestWorkspace();
  const restore = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();

  const channel = { json: makeJsonResponse } as any;
  const form = new FormData();
  const file = new File(["hello"], "hello.txt", { type: "text/plain" });
  form.append("file", file);
  const req = new Request("http://test/media/upload", { method: "POST", body: form });
  const uploadRes = await handleMediaUpload(channel, req);
  const uploadJson = await uploadRes.json();
  expect(uploadJson.id).toBeDefined();

  const infoRes = handleMediaInfo(channel, uploadJson.id);
  const infoJson = await infoRes.json();
  expect(infoJson.filename).toBe("hello.txt");

  const mediaRes = handleMedia(channel, uploadJson.id, false);
  expect(mediaRes.headers.get("Content-Type")).toContain("text/plain");

  restore();
});

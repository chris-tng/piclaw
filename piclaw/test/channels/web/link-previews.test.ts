import { afterEach, expect, test } from "bun:test";
import { getTestWorkspace, setEnv, waitFor } from "../../helpers.js";

let restoreEnv: (() => void) | null = null;

afterEach(() => {
  restoreEnv?.();
  restoreEnv = null;
});

test("extractUrls trims punctuation and limits", async () => {
  const { extractUrls } = await import("../../../src/channels/web/link-previews.js");
  const urls = extractUrls("Check https://example.com, and https://example.org/path).", 1);
  expect(urls).toEqual(["https://example.com"]);
});

test("scheduleLinkPreviews stores metadata and broadcasts update", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../../../src/db.js");
  db.initDatabase();
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const message = {
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "See https://example.com/docs.",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
  };

  const rowId = db.storeMessage(message);

  const { scheduleLinkPreviews } = await import("../../../src/channels/web/link-previews.js");

  const html = `
    <html>
      <head>
        <meta property="og:title" content="Example Docs" />
        <meta property="og:description" content="Docs for testing." />
        <meta property="og:image" content="https://example.com/image.png" />
        <meta property="og:site_name" content="Example" />
      </head>
      <body>Test</body>
    </html>
  `;

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(html, {
      status: 200,
      headers: { "content-type": "text/html; charset=utf-8" },
    });

  const events: Array<{ type: string; data: unknown }> = [];
  const channel = {
    pendingLinkPreviews: new Set<number>(),
    broadcastEvent: (type: string, data: unknown) => {
      events.push({ type, data });
    },
  };

  try {
    scheduleLinkPreviews(channel as any, "web:default", rowId, message.content);
    await waitFor(() => events.some((event) => event.type === "interaction_updated"));

    const updated = db.getMessageByRowId("web:default", rowId);
    expect(updated?.data.link_previews?.length).toBe(1);
    const preview = updated?.data.link_previews?.[0] as any;
    expect(preview.title).toBe("Example Docs");
    expect(preview.site_name).toBe("Example");
    expect(preview.image).toBe("https://example.com/image.png");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

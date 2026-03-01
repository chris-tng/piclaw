import { beforeAll, expect, test } from "bun:test";
import { getTestWorkspace, setEnv } from "../helpers.js";

let db: typeof import("../../src/db.js");

beforeAll(async () => {
  const ws = getTestWorkspace();
  setEnv({
    PICLAW_WORKSPACE: ws.workspace,
    PICLAW_STORE: ws.store,
    PICLAW_DATA: ws.data,
  });

  db = await import("../../src/db.js");
  db.initDatabase();
});

function makeMessage(chatJid: string, content: string, timestamp: string, isBot = false) {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    chat_jid: chatJid,
    sender: isBot ? "bot" : "user",
    sender_name: isBot ? "Bot" : "User",
    content,
    timestamp,
    is_from_me: false,
    is_bot_message: isBot,
  };
}

test("timeline returns oldest-first and hasOlderMessages works", () => {
  const chatJid = `test:${Date.now()}-timeline`;
  db.storeChatMetadata(chatJid, new Date().toISOString(), "Test");

  db.storeMessage(makeMessage(chatJid, "first", "2024-01-01T00:00:00.000Z"));
  db.storeMessage(makeMessage(chatJid, "second", "2024-01-01T00:01:00.000Z"));
  db.storeMessage(makeMessage(chatJid, "third", "2024-01-01T00:02:00.000Z"));

  const timeline = db.getTimeline(chatJid, 2);
  expect(timeline.length).toBe(2);
  expect(timeline[0].data.content).toBe("second");
  expect(timeline[1].data.content).toBe("third");

  const oldestId = timeline[0].id;
  expect(db.hasOlderMessages(chatJid, oldestId)).toBe(true);
});

test("search and hashtag filters return matching messages", () => {
  const chatJid = `test:${Date.now()}-search`;
  db.storeChatMetadata(chatJid, new Date().toISOString(), "Test");

  db.storeMessage(makeMessage(chatJid, "hello #world", "2024-02-01T00:00:00.000Z"));
  db.storeMessage(makeMessage(chatJid, "another message", "2024-02-01T00:01:00.000Z"));
  db.storeMessage(makeMessage(chatJid, "#world with hello", "2024-02-01T00:02:00.000Z"));

  const hashtag = db.getMessagesByHashtag(chatJid, "world", 10, 0);
  expect(hashtag.length).toBe(2);

  const results = db.searchMessages(chatJid, "hello", 10, 0);
  expect(results.length).toBe(2);
});

test("media attachments are stored and returned", () => {
  const chatJid = `test:${Date.now()}-media`;
  db.storeChatMetadata(chatJid, new Date().toISOString(), "Test");

  const mediaId = db.createMedia(
    "note.txt",
    "text/plain",
    new TextEncoder().encode("hello"),
    null,
    { size: 5 }
  );

  const rowId = db.storeMessage(makeMessage(chatJid, "with media", "2024-03-01T00:00:00.000Z"));
  db.attachMediaToMessage(rowId, [mediaId]);

  const interaction = db.getMessageByRowId(chatJid, rowId);
  expect(interaction).not.toBeNull();
  expect(interaction?.data.media_ids).toEqual([mediaId]);
});

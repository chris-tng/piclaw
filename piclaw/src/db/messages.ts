import { getDb } from "./connection.js";
import { clampWebContent } from "./web-content.js";
import type { InteractionRow } from "./types.js";
import type { NewMessage } from "../types.js";
import { attachMediaToMessage, getMediaIdsForMessage } from "./media.js";

interface StoredMessageRow {
  rowid: number;
  chat_jid: string;
  sender: string;
  sender_name: string;
  content: string;
  content_blocks: string | null;
  link_previews: string | null;
  thread_id: number | null;
  timestamp: string;
  is_bot_message: number;
}

const MESSAGE_COLUMNS = "rowid, chat_jid, sender, sender_name, content, content_blocks, link_previews, thread_id, timestamp, is_bot_message";

function parseJsonArray(value: string | null | undefined): unknown[] | undefined {
  if (!value) return undefined;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

function buildInteraction(row: StoredMessageRow, mediaIds: number[] = []): InteractionRow {
  const { content, meta } = clampWebContent(row.content);
  const contentBlocks = parseJsonArray(row.content_blocks);
  const linkPreviews = parseJsonArray(row.link_previews);
  const data: InteractionRow["data"] = {
    type: row.is_bot_message ? "agent_response" : "user_message",
    content,
    content_meta: meta,
    agent_id: "default",
    media_ids: mediaIds,
  };
  if (contentBlocks?.length) data.content_blocks = contentBlocks;
  if (linkPreviews?.length) data.link_previews = linkPreviews;
  if (row.thread_id !== null && row.thread_id !== undefined) data.thread_id = row.thread_id;
  return {
    id: row.rowid,
    timestamp: row.timestamp,
    data,
  };
}

export function storeChatMetadata(chatJid: string, timestamp: string, name?: string): void {
  const db = getDb();
  if (name) {
    db.prepare(
      `INSERT INTO chats (jid, name, last_message_time) VALUES (?, ?, ?)
       ON CONFLICT(jid) DO UPDATE SET
         name = excluded.name,
         last_message_time = MAX(last_message_time, excluded.last_message_time)`
    ).run(chatJid, name, timestamp);
  } else {
    db.prepare(
      `INSERT INTO chats (jid, name, last_message_time) VALUES (?, ?, ?)
       ON CONFLICT(jid) DO UPDATE SET
         last_message_time = MAX(last_message_time, excluded.last_message_time)`
    ).run(chatJid, chatJid, timestamp);
  }
}

export function storeMessage(msg: NewMessage): number {
  const db = getDb();
  const contentBlocks = msg.content_blocks ? JSON.stringify(msg.content_blocks) : null;
  const linkPreviews = msg.link_previews ? JSON.stringify(msg.link_previews) : null;

  db.prepare(
    `INSERT OR REPLACE INTO messages (id, chat_jid, sender, sender_name, content, content_blocks, link_previews, thread_id, timestamp, is_from_me, is_bot_message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    msg.id,
    msg.chat_jid,
    msg.sender,
    msg.sender_name,
    msg.content,
    contentBlocks,
    linkPreviews,
    msg.thread_id ?? null,
    msg.timestamp,
    msg.is_from_me ? 1 : 0,
    msg.is_bot_message ? 1 : 0
  );

  const row = db
    .prepare("SELECT rowid as rowid FROM messages WHERE id = ? AND chat_jid = ?")
    .get(msg.id, msg.chat_jid) as { rowid: number } | undefined;
  return row?.rowid ?? 0;
}

export function getMessageRowIdById(chatJid: string, messageId: string): number | null {
  const db = getDb();
  const row = db
    .prepare("SELECT rowid as rowid FROM messages WHERE chat_jid = ? AND id = ?")
    .get(chatJid, messageId) as { rowid: number } | undefined;
  return row?.rowid ?? null;
}

export function getMessageByRowId(chatJid: string, rowId: number): InteractionRow | undefined {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT ${MESSAGE_COLUMNS} FROM messages WHERE chat_jid = ? AND rowid = ?`
    )
    .get(chatJid, rowId) as StoredMessageRow | undefined;
  if (!row) return undefined;
  const mediaIds = getMediaIdsForMessage(row.rowid);
  return buildInteraction(row, mediaIds);
}

export function updateMessageLinkPreviews(
  chatJid: string,
  rowId: number,
  linkPreviews: unknown[]
): boolean {
  const db = getDb();
  const payload = linkPreviews.length > 0 ? JSON.stringify(linkPreviews) : null;
  const res = db
    .prepare("UPDATE messages SET link_previews = ? WHERE chat_jid = ? AND rowid = ?")
    .run(payload, chatJid, rowId);
  return res.changes > 0;
}

export function replaceMessageContent(
  chatJid: string,
  rowId: number,
  content: string,
  options: { contentBlocks?: unknown[]; linkPreviews?: unknown[]; mediaIds?: number[] } = {}
): InteractionRow | undefined {
  const db = getDb();
  const contentBlocks = options.contentBlocks ? JSON.stringify(options.contentBlocks) : null;
  const linkPreviews = options.linkPreviews ? JSON.stringify(options.linkPreviews) : null;
  const res = db
    .prepare(
      "UPDATE messages SET content = ?, content_blocks = ?, link_previews = ? WHERE chat_jid = ? AND rowid = ?"
    )
    .run(content, contentBlocks, linkPreviews, chatJid, rowId);

  if (res.changes <= 0) return undefined;

  db.prepare("DELETE FROM message_media WHERE message_rowid = ?").run(rowId);
  if (options.mediaIds && options.mediaIds.length > 0) {
    attachMediaToMessage(rowId, options.mediaIds);
  }

  return getMessageByRowId(chatJid, rowId);
}

export function deleteMessageByRowId(chatJid: string, rowId: number): boolean {
  const db = getDb();
  db.prepare("DELETE FROM message_media WHERE message_rowid = ?").run(rowId);
  const res = db.prepare("DELETE FROM messages WHERE chat_jid = ? AND rowid = ?").run(chatJid, rowId);
  return res.changes > 0;
}

export function getTimeline(chatJid: string, limit: number, beforeId?: number): InteractionRow[] {
  const db = getDb();
  const rows = beforeId
    ? (db
        .prepare(
          `SELECT ${MESSAGE_COLUMNS} FROM messages WHERE chat_jid = ? AND rowid < ? ORDER BY rowid DESC LIMIT ?`
        )
        .all(chatJid, beforeId, limit) as StoredMessageRow[])
    : (db
        .prepare(
          `SELECT ${MESSAGE_COLUMNS} FROM messages WHERE chat_jid = ? ORDER BY rowid DESC LIMIT ?`
        )
        .all(chatJid, limit) as StoredMessageRow[]);

  const interactions = rows.map((row) => buildInteraction(row, getMediaIdsForMessage(row.rowid)));
  return interactions.reverse();
}

export function hasOlderMessages(chatJid: string, oldestId: number): boolean {
  const db = getDb();
  const row = db
    .prepare("SELECT rowid FROM messages WHERE chat_jid = ? AND rowid < ? LIMIT 1")
    .get(chatJid, oldestId) as { rowid: number } | undefined;
  return Boolean(row);
}

export function getMessagesByHashtag(chatJid: string, hashtag: string, limit: number, offset: number): InteractionRow[] {
  const db = getDb();
  const pattern = `%#${hashtag}%`;
  const rows = db
    .prepare(
      `SELECT ${MESSAGE_COLUMNS} FROM messages WHERE chat_jid = ? AND content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`
    )
    .all(chatJid, pattern, limit, offset) as StoredMessageRow[];

  return rows.map((row) => buildInteraction(row, getMediaIdsForMessage(row.rowid)));
}

export function searchMessages(chatJid: string, query: string, limit: number, offset: number): InteractionRow[] {
  const db = getDb();
  if (query.startsWith("#")) {
    const tag = query.replace(/^#+/, "");
    if (!tag) return [];
    const pattern = `%#${tag}%`;
    const rows = db
      .prepare(
        `SELECT ${MESSAGE_COLUMNS} FROM messages WHERE chat_jid = ? AND content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`
      )
      .all(chatJid, pattern, limit, offset) as StoredMessageRow[];
    return rows.map((row) => buildInteraction(row, getMediaIdsForMessage(row.rowid)));
  }

  try {
    const rows = db
      .prepare(
        `SELECT messages.rowid, messages.chat_jid, messages.sender, messages.sender_name, messages.content, messages.content_blocks, messages.link_previews, messages.thread_id, messages.timestamp, messages.is_bot_message
         FROM messages
         JOIN messages_fts ON messages_fts.rowid = messages.rowid
         WHERE messages.chat_jid = ? AND messages_fts MATCH ?
         ORDER BY messages.rowid DESC
         LIMIT ? OFFSET ?`
      )
      .all(chatJid, query, limit, offset) as StoredMessageRow[];
    return rows.map((row) => buildInteraction(row, getMediaIdsForMessage(row.rowid)));
  } catch {
    const rows = db
      .prepare(
        `SELECT ${MESSAGE_COLUMNS} FROM messages WHERE chat_jid = ? AND content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`
      )
      .all(chatJid, `%${query}%`, limit, offset) as StoredMessageRow[];
    return rows.map((row) => buildInteraction(row, getMediaIdsForMessage(row.rowid)));
  }
}

export function getNewMessages(
  jids: string[],
  lastTimestamp: string,
  botPrefix: string
): { messages: NewMessage[]; newTimestamp: string } {
  if (jids.length === 0) return { messages: [], newTimestamp: lastTimestamp };
  const db = getDb();

  const placeholders = jids.map(() => "?").join(",");
  const sql = `
    SELECT id, chat_jid, sender, sender_name, content, timestamp
    FROM messages
    WHERE timestamp > ? AND chat_jid IN (${placeholders})
      AND is_bot_message = 0 AND content NOT LIKE ?
    ORDER BY timestamp
  `;

  const rows = db.prepare(sql).all(lastTimestamp, ...jids, `${botPrefix}:%`) as NewMessage[];

  let newTimestamp = lastTimestamp;
  for (const row of rows) {
    if (row.timestamp > newTimestamp) newTimestamp = row.timestamp;
  }

  return { messages: rows, newTimestamp };
}

export function getMessagesSince(
  chatJid: string,
  sinceTimestamp: string,
  botPrefix: string
): NewMessage[] {
  const db = getDb();
  const sql = `
    SELECT id, chat_jid, sender, sender_name, content, timestamp
    FROM messages
    WHERE chat_jid = ? AND timestamp > ?
      AND is_bot_message = 0 AND content NOT LIKE ?
    ORDER BY timestamp
  `;
  return db.prepare(sql).all(chatJid, sinceTimestamp, `${botPrefix}:%`) as NewMessage[];
}

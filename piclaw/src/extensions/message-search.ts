/**
 * message-search – registers the search_messages tool as an extension.
 *
 * Reads the current chat JID from AsyncLocalStorage/env at execution time so the default
 * chat scope follows the current agent invocation rather than being
 * captured at session-creation time.
 */
import { Type, type Static } from "@sinclair/typebox";
import type {
  AgentToolResult,
  ExtensionAPI,
  ExtensionContext,
  ExtensionFactory,
} from "@mariozechner/pi-coding-agent";

import { getDb } from "../db.js";
import { getChatJid } from "../core/chat-context.js";

// ── Schema ────────────────────────────────────────────────

const SearchMessagesSchema = Type.Object({
  query: Type.Optional(Type.String({ description: "FTS query text (matches message content)." })),
  row_id: Type.Optional(Type.Integer({ description: "Specific message rowid to retrieve." })),
  chat_jid: Type.Optional(
    Type.String({
      description: "Chat JID to search. Use 'all' or '*' to search across chats. Defaults to current chat.",
    }),
  ),
  limit: Type.Optional(Type.Integer({ description: "Max results (1-50).", minimum: 1, maximum: 50 })),
  offset: Type.Optional(Type.Integer({ description: "Offset for pagination.", minimum: 0 })),
  details_max_chars: Type.Optional(
    Type.Integer({
      description: "Limit content size in details.results (0 omits content).",
      minimum: 0,
      maximum: 20000,
    }),
  ),
});

type SearchMessagesParams = Static<typeof SearchMessagesSchema>;

// ── Types ─────────────────────────────────────────────────

type MessageRow = {
  rowid: number;
  chat_jid: string;
  sender: string;
  sender_name: string;
  content: string;
  timestamp: string;
  is_bot_message: number;
};

type MessageResultRow = MessageRow & {
  content_truncated?: boolean;
  content_full_length?: number;
};

type SearchMessagesDetails = {
  count: number;
  results: MessageResultRow[];
  details_max_chars?: number;
};

// ── Helpers ───────────────────────────────────────────────

function clampNumber(value: number | undefined, fallback: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return fallback;
  const num = Number(value);
  if (Number.isNaN(num)) return fallback;
  return Math.min(Math.max(num, min), max);
}

function normalizeDetailsMax(value: number | undefined): number | undefined {
  if (!Number.isFinite(value)) return undefined;
  const num = Number(value);
  if (Number.isNaN(num)) return undefined;
  return Math.min(Math.max(num, 0), 20000);
}

function applyDetailsLimit(row: MessageRow, maxChars: number | undefined): MessageResultRow {
  if (maxChars === undefined) return row;
  const fullLength = row.content?.length ?? 0;
  if (maxChars <= 0) {
    return { ...row, content: "", content_truncated: fullLength > 0, content_full_length: fullLength };
  }
  if (fullLength <= maxChars) return row;
  const sliceLength = Math.max(0, maxChars - 1);
  return { ...row, content: `${row.content.slice(0, sliceLength)}…`, content_truncated: true, content_full_length: fullLength };
}

function truncate(text: string, max = 180): string {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1)}…`;
}

function normalizeChatJid(input: string | undefined, defaultChat: string): string | null {
  if (!input) return defaultChat;
  const trimmed = input.trim();
  if (!trimmed || trimmed === "*") return null;
  if (trimmed.toLowerCase() === "all") return null;
  return trimmed;
}

function formatRow(row: MessageRow): string {
  const role = row.is_bot_message ? "assistant" : "user";
  const sender = row.sender_name || row.sender || role;
  const preview = truncate(row.content, 160);
  return `• [${row.rowid}] (${row.chat_jid}) ${sender} (${role}) — ${preview} (${row.timestamp})`;
}

function getDefaultChatJid(): string {
  return getChatJid("web:default");
}

// ── DB queries ────────────────────────────────────────────

function fetchByRowId(db: ReturnType<typeof getDb>, rowId: number, chatJid: string | null): MessageRow | null {
  const cols = "rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message";
  if (chatJid) {
    return (db.prepare(`SELECT ${cols} FROM messages WHERE rowid = ? AND chat_jid = ?`).get(rowId, chatJid) as MessageRow | undefined) ?? null;
  }
  return (db.prepare(`SELECT ${cols} FROM messages WHERE rowid = ?`).get(rowId) as MessageRow | undefined) ?? null;
}

function searchMessages(db: ReturnType<typeof getDb>, query: string, chatJid: string | null, limit: number, offset: number): MessageRow[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  if (trimmed.startsWith("#")) {
    const tag = trimmed.replace(/^#+/, "");
    if (!tag) return [];
    const pattern = `%#${tag}%`;
    const cols = "rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message";
    if (chatJid) {
      return db.prepare(`SELECT ${cols} FROM messages WHERE chat_jid = ? AND content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`).all(chatJid, pattern, limit, offset) as MessageRow[];
    }
    return db.prepare(`SELECT ${cols} FROM messages WHERE content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`).all(pattern, limit, offset) as MessageRow[];
  }

  try {
    const base = `SELECT messages.rowid, messages.chat_jid, messages.sender, messages.sender_name, messages.content, messages.timestamp, messages.is_bot_message
           FROM messages JOIN messages_fts ON messages_fts.rowid = messages.rowid`;
    if (chatJid) {
      return db.prepare(`${base} WHERE messages.chat_jid = ? AND messages_fts MATCH ? ORDER BY messages.rowid DESC LIMIT ? OFFSET ?`).all(chatJid, trimmed, limit, offset) as MessageRow[];
    }
    return db.prepare(`${base} WHERE messages_fts MATCH ? ORDER BY messages.rowid DESC LIMIT ? OFFSET ?`).all(trimmed, limit, offset) as MessageRow[];
  } catch {
    const pattern = `%${trimmed}%`;
    const cols = "rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message";
    if (chatJid) {
      return db.prepare(`SELECT ${cols} FROM messages WHERE chat_jid = ? AND content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`).all(chatJid, pattern, limit, offset) as MessageRow[];
    }
    return db.prepare(`SELECT ${cols} FROM messages WHERE content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`).all(pattern, limit, offset) as MessageRow[];
  }
}

// ── Tool execute ──────────────────────────────────────────

async function execute(
  _toolCallId: string,
  params: SearchMessagesParams,
  _signal?: AbortSignal,
  _onUpdate?: unknown,
  _ctx?: ExtensionContext,
): Promise<AgentToolResult<SearchMessagesDetails>> {
  const db = getDb();
  const limit = clampNumber(params.limit, 10, 1, 50);
  const offset = clampNumber(params.offset, 0, 0, 1000000);
  const chatJid = normalizeChatJid(params.chat_jid, getDefaultChatJid());
  const detailsMaxChars = normalizeDetailsMax(params.details_max_chars);

  // Single row lookup
  if (Number.isFinite(params.row_id)) {
    const rowId = Number(params.row_id);
    const row = fetchByRowId(db, rowId, chatJid);
    if (!row) {
      return { content: [{ type: "text", text: `No message found for rowid ${rowId}.` }], details: { count: 0, results: [] } };
    }
    const text = formatRow(row);
    const detailRow = applyDetailsLimit(row, detailsMaxChars);
    const details: SearchMessagesDetails = { count: 1, results: [detailRow] };
    if (detailsMaxChars !== undefined) details.details_max_chars = detailsMaxChars;
    return { content: [{ type: "text", text }], details };
  }

  // Text search
  const query = params.query?.trim() ?? "";
  if (!query) {
    return { content: [{ type: "text", text: "Provide a query or row_id." }], details: { count: 0, results: [] } };
  }

  const rows = searchMessages(db, query, chatJid, limit, offset);
  if (!rows.length) {
    return { content: [{ type: "text", text: "No matching messages found." }], details: { count: 0, results: [] } };
  }

  const lines = rows.map(formatRow);
  const header = `Found ${rows.length} message${rows.length === 1 ? "" : "s"} (limit ${limit}, offset ${offset}).`;
  const detailRows = detailsMaxChars === undefined ? rows : rows.map((row) => applyDetailsLimit(row, detailsMaxChars));
  const details: SearchMessagesDetails = { count: rows.length, results: detailRows };
  if (detailsMaxChars !== undefined) details.details_max_chars = detailsMaxChars;
  return { content: [{ type: "text", text: `${header}\n${lines.join("\n")}` }], details };
}

// ── System prompt hint ─────────────────────────────────────

const SEARCH_HINT = [
  "## Message Search",
  "Use search_messages to look up previous conversations, find messages by",
  "keyword, or retrieve messages by hashtag. Supports full-text search,",
  "#hashtag filtering, and row_id lookup for specific messages.",
].join("\n");

// ── Factory ───────────────────────────────────────────────

export const messageSearch: ExtensionFactory = (pi: ExtensionAPI) => {
  pi.on("before_agent_start", async (event) => {
    return { systemPrompt: `${event.systemPrompt}\n\n${SEARCH_HINT}` };
  });

  pi.registerTool({
    name: "search_messages",
    label: "search_messages",
    description: "Search piclaw message history using the FTS index and retrieve matching messages.",
    parameters: SearchMessagesSchema,
    execute,
  });
};

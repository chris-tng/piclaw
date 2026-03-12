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
  role: Type.Optional(
    Type.Union([
      Type.Literal("user"),
      Type.Literal("assistant"),
    ], {
      description: "Filter by sender role (user or assistant).",
    }),
  ),
  after: Type.Optional(
    Type.String({
      description: "Only return messages created after this ISO timestamp (exclusive).",
    }),
  ),
  before: Type.Optional(
    Type.String({
      description: "Only return messages created before this ISO timestamp (exclusive).",
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

const GetMessageSchema = Type.Object({
  row_id: Type.Integer({ description: "Message rowid to retrieve.", minimum: 1 }),
  chat_jid: Type.Optional(
    Type.String({
      description: "Optional chat scope. Use 'all' or '*' to disable chat filtering. Defaults to current chat.",
    }),
  ),
  role: Type.Optional(
    Type.Union([
      Type.Literal("user"),
      Type.Literal("assistant"),
    ], {
      description: "Optional sender role filter for the target/context rows.",
    }),
  ),
  before: Type.Optional(Type.Integer({ description: "Context rows before row_id (same chat, 0-20).", minimum: 0, maximum: 20 })),
  after: Type.Optional(Type.Integer({ description: "Context rows after row_id (same chat, 0-20).", minimum: 0, maximum: 20 })),
  details_max_chars: Type.Optional(
    Type.Integer({
      description: "Limit content size in details payload (0 omits content). Max 200000 for full retrieval.",
      minimum: 0,
      maximum: 200000,
    }),
  ),
});

type SearchMessagesParams = Static<typeof SearchMessagesSchema>;
type GetMessageParams = Static<typeof GetMessageSchema>;

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
  created_at: string | null;
  content_truncated?: boolean;
  content_full_length?: number;
};

type SearchMessagesDetails = {
  count: number;
  results: MessageResultRow[];
  details_max_chars?: number;
};

type GetMessageDetails = {
  found: boolean;
  result: MessageResultRow | null;
  context_before: MessageResultRow[];
  context_after: MessageResultRow[];
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

function normalizeGetMessageDetailsMax(value: number | undefined): number | undefined {
  if (!Number.isFinite(value)) return undefined;
  const num = Number(value);
  if (Number.isNaN(num)) return undefined;
  return Math.min(Math.max(num, 0), 200000);
}

function toCreatedAt(timestamp: string | null | undefined): string | null {
  if (!timestamp) return null;
  // Validate it looks like an ISO string; pass through as-is
  return timestamp;
}

function applyDetailsLimit(row: MessageRow, maxChars: number | undefined): MessageResultRow {
  const created_at = toCreatedAt(row.timestamp);
  if (maxChars === undefined) return { ...row, created_at };
  const fullLength = row.content?.length ?? 0;
  if (maxChars <= 0) {
    return { ...row, created_at, content: "", content_truncated: fullLength > 0, content_full_length: fullLength };
  }
  if (fullLength <= maxChars) return { ...row, created_at };
  const sliceLength = Math.max(0, maxChars - 1);
  return { ...row, created_at, content: `${row.content.slice(0, sliceLength)}…`, content_truncated: true, content_full_length: fullLength };
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

function normalizeRole(input: string | undefined): number | null {
  if (!input) return null;
  const trimmed = input.trim().toLowerCase();
  if (trimmed === "assistant" || trimmed === "bot") return 1;
  if (trimmed === "user") return 0;
  return null;
}

function roleLabel(row: MessageRow): "assistant" | "user" {
  return row.is_bot_message ? "assistant" : "user";
}

function formatRow(row: MessageRow): string {
  const role = roleLabel(row);
  const sender = row.sender_name || row.sender || role;
  const preview = truncate(row.content, 160);
  return `• [${row.rowid}] (${row.chat_jid}) ${sender} (${role}) — ${preview} (${row.timestamp})`;
}

function formatFullRow(row: MessageResultRow): string {
  const role = roleLabel(row);
  const sender = row.sender_name || row.sender || role;
  const meta = `[${row.rowid}] (${row.chat_jid}) ${sender} (${role}) — ${row.timestamp}`;
  const body = row.content?.length ? row.content : "(content omitted)";
  if (!row.content_truncated) return `${meta}\n\n${body}`;
  const fullLen = row.content_full_length ?? row.content.length;
  return `${meta}\n\n${body}\n\n[content truncated, original length ${fullLen} chars]`;
}

function getDefaultChatJid(): string {
  return getChatJid("web:default");
}

// ── DB queries ────────────────────────────────────────────

function fetchByRowId(
  db: ReturnType<typeof getDb>,
  rowId: number,
  chatJid: string | null,
  roleFilter: number | null
): MessageRow | null {
  const cols = "rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message";
  if (chatJid && roleFilter !== null) {
    return (db.prepare(`SELECT ${cols} FROM messages WHERE rowid = ? AND chat_jid = ? AND is_bot_message = ?`).get(rowId, chatJid, roleFilter) as MessageRow | undefined) ?? null;
  }
  if (chatJid) {
    return (db.prepare(`SELECT ${cols} FROM messages WHERE rowid = ? AND chat_jid = ?`).get(rowId, chatJid) as MessageRow | undefined) ?? null;
  }
  if (roleFilter !== null) {
    return (db.prepare(`SELECT ${cols} FROM messages WHERE rowid = ? AND is_bot_message = ?`).get(rowId, roleFilter) as MessageRow | undefined) ?? null;
  }
  return (db.prepare(`SELECT ${cols} FROM messages WHERE rowid = ?`).get(rowId) as MessageRow | undefined) ?? null;
}

function fetchContextRows(
  db: ReturnType<typeof getDb>,
  row: MessageRow,
  before: number,
  after: number,
  roleFilter: number | null
): { beforeRows: MessageRow[]; afterRows: MessageRow[] } {
  const cols = "rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message";
  let beforeRows: MessageRow[] = [];
  let afterRows: MessageRow[] = [];

  if (before > 0) {
    if (roleFilter !== null) {
      beforeRows = db.prepare(
        `SELECT ${cols} FROM messages
         WHERE chat_jid = ? AND rowid < ? AND is_bot_message = ?
         ORDER BY rowid DESC LIMIT ?`
      ).all(row.chat_jid, row.rowid, roleFilter, before) as MessageRow[];
    } else {
      beforeRows = db.prepare(
        `SELECT ${cols} FROM messages
         WHERE chat_jid = ? AND rowid < ?
         ORDER BY rowid DESC LIMIT ?`
      ).all(row.chat_jid, row.rowid, before) as MessageRow[];
    }
    beforeRows.reverse();
  }

  if (after > 0) {
    if (roleFilter !== null) {
      afterRows = db.prepare(
        `SELECT ${cols} FROM messages
         WHERE chat_jid = ? AND rowid > ? AND is_bot_message = ?
         ORDER BY rowid ASC LIMIT ?`
      ).all(row.chat_jid, row.rowid, roleFilter, after) as MessageRow[];
    } else {
      afterRows = db.prepare(
        `SELECT ${cols} FROM messages
         WHERE chat_jid = ? AND rowid > ?
         ORDER BY rowid ASC LIMIT ?`
      ).all(row.chat_jid, row.rowid, after) as MessageRow[];
    }
  }

  return { beforeRows, afterRows };
}

function searchMessages(
  db: ReturnType<typeof getDb>,
  query: string,
  chatJid: string | null,
  roleFilter: number | null,
  limit: number,
  offset: number,
  afterTs?: string,
  beforeTs?: string,
): MessageRow[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  // Build time-range WHERE clauses
  const timeConditions: string[] = [];
  const timeParams: string[] = [];
  if (afterTs) { timeConditions.push("timestamp > ?"); timeParams.push(afterTs); }
  if (beforeTs) { timeConditions.push("timestamp < ?"); timeParams.push(beforeTs); }
  const timeWhere = timeConditions.length > 0 ? ` AND ${timeConditions.join(" AND ")}` : "";

  if (trimmed.startsWith("#")) {
    const tag = trimmed.replace(/^#+/, "");
    if (!tag) return [];
    const pattern = `%#${tag}%`;
    const cols = "rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message";
    const conditions: string[] = [];
    const params: (string | number)[] = [];
    if (chatJid) { conditions.push("chat_jid = ?"); params.push(chatJid); }
    if (roleFilter !== null) { conditions.push("is_bot_message = ?"); params.push(roleFilter); }
    conditions.push("content LIKE ? COLLATE NOCASE");
    params.push(pattern);
    params.push(...timeParams);
    const where = conditions.join(" AND ") + timeWhere;
    return db.prepare(`SELECT ${cols} FROM messages WHERE ${where} ORDER BY rowid DESC LIMIT ? OFFSET ?`).all(...params, limit, offset) as MessageRow[];
  }

  try {
    const cols = `messages.rowid, messages.chat_jid, messages.sender, messages.sender_name, messages.content, messages.timestamp, messages.is_bot_message`;
    const base = `SELECT ${cols} FROM messages JOIN messages_fts ON messages_fts.rowid = messages.rowid`;
    const conditions: string[] = [];
    const params: (string | number)[] = [];
    if (chatJid) { conditions.push("messages.chat_jid = ?"); params.push(chatJid); }
    if (roleFilter !== null) { conditions.push("messages.is_bot_message = ?"); params.push(roleFilter); }
    conditions.push("messages_fts MATCH ?");
    params.push(trimmed);
    // Time conditions reference the messages table
    const timeConditionsPrefixed = timeConditions.map(c => c.replace("timestamp", "messages.timestamp"));
    const where = [...conditions, ...timeConditionsPrefixed].join(" AND ");
    params.push(...timeParams);
    return db.prepare(`${base} WHERE ${where} ORDER BY messages.rowid DESC LIMIT ? OFFSET ?`).all(...params, limit, offset) as MessageRow[];
  } catch {
    const pattern = `%${trimmed}%`;
    const cols = "rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message";
    const conditions: string[] = [];
    const params: (string | number)[] = [];
    if (chatJid) { conditions.push("chat_jid = ?"); params.push(chatJid); }
    if (roleFilter !== null) { conditions.push("is_bot_message = ?"); params.push(roleFilter); }
    conditions.push("content LIKE ? COLLATE NOCASE");
    params.push(pattern);
    params.push(...timeParams);
    const where = conditions.join(" AND ") + timeWhere;
    return db.prepare(`SELECT ${cols} FROM messages WHERE ${where} ORDER BY rowid DESC LIMIT ? OFFSET ?`).all(...params, limit, offset) as MessageRow[];
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
  const roleFilter = normalizeRole(params.role);
  const detailsMaxChars = normalizeDetailsMax(params.details_max_chars);

  // Single row lookup
  if (Number.isFinite(params.row_id)) {
    const rowId = Number(params.row_id);
    const row = fetchByRowId(db, rowId, chatJid, roleFilter);
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

  const rows = searchMessages(db, query, chatJid, roleFilter, limit, offset, params.after, params.before);
  if (!rows.length) {
    return { content: [{ type: "text", text: "No matching messages found." }], details: { count: 0, results: [] } };
  }

  const lines = rows.map(formatRow);
  const header = `Found ${rows.length} message${rows.length === 1 ? "" : "s"} (limit ${limit}, offset ${offset}).`;
  const detailRows = rows.map((row) => applyDetailsLimit(row, detailsMaxChars));
  const details: SearchMessagesDetails = { count: rows.length, results: detailRows };
  if (detailsMaxChars !== undefined) details.details_max_chars = detailsMaxChars;
  return { content: [{ type: "text", text: `${header}\n${lines.join("\n")}` }], details };
}

async function executeGetMessage(
  _toolCallId: string,
  params: GetMessageParams,
  _signal?: AbortSignal,
  _onUpdate?: unknown,
  _ctx?: ExtensionContext,
): Promise<AgentToolResult<GetMessageDetails>> {
  const db = getDb();
  const chatJid = normalizeChatJid(params.chat_jid, getDefaultChatJid());
  const roleFilter = normalizeRole(params.role);
  const before = clampNumber(params.before, 0, 0, 20);
  const after = clampNumber(params.after, 0, 0, 20);
  const detailsMaxChars = normalizeGetMessageDetailsMax(params.details_max_chars);
  const rowId = Number(params.row_id);

  const row = fetchByRowId(db, rowId, chatJid, roleFilter);
  if (!row) {
    return {
      content: [{ type: "text", text: `No message found for rowid ${rowId}.` }],
      details: { found: false, result: null, context_before: [], context_after: [] },
    };
  }

  const { beforeRows, afterRows } = fetchContextRows(db, row, before, after, roleFilter);
  const detailRow = applyDetailsLimit(row, detailsMaxChars);
  const detailBefore = beforeRows.map((contextRow) => applyDetailsLimit(contextRow, detailsMaxChars));
  const detailAfter = afterRows.map((contextRow) => applyDetailsLimit(contextRow, detailsMaxChars));

  const details: GetMessageDetails = {
    found: true,
    result: detailRow,
    context_before: detailBefore,
    context_after: detailAfter,
  };
  if (detailsMaxChars !== undefined) details.details_max_chars = detailsMaxChars;

  const chunks = [formatFullRow(detailRow)];
  if (beforeRows.length > 0) {
    chunks.push(`Context before (${beforeRows.length}):\n${beforeRows.map(formatRow).join("\n")}`);
  }
  if (afterRows.length > 0) {
    chunks.push(`Context after (${afterRows.length}):\n${afterRows.map(formatRow).join("\n")}`);
  }

  return { content: [{ type: "text", text: chunks.join("\n\n") }], details };
}

// ── System prompt hint ─────────────────────────────────────

const SEARCH_HINT = [
  "## Message Search",
  "Use search_messages to look up previous conversations, find messages by",
  "keyword, or retrieve messages by hashtag. Supports full-text search,",
  "#hashtag filtering, and row_id lookup for specific messages.",
  "Use get_message for direct full-content retrieval by row_id with optional context rows.",
].join("\n");

// ── Factory ───────────────────────────────────────────────

/** Extension factory that registers the search_messages tool. */
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

  pi.registerTool({
    name: "get_message",
    label: "get_message",
    description: "Retrieve a specific message by row_id with full content and optional context rows.",
    parameters: GetMessageSchema,
    execute: executeGetMessage,
  });
};

/**
 * message-search – registers the search_messages tool as an extension.
 *
 * Reads `process.env.PICLAW_CHAT_JID` at execution time so the default
 * chat scope follows the current agent invocation rather than being
 * captured at session-creation time.
 */
import { Type } from "@sinclair/typebox";
import { getDb } from "../db.js";
// ── Schema ────────────────────────────────────────────────
const SearchMessagesSchema = Type.Object({
    query: Type.Optional(Type.String({ description: "FTS query text (matches message content)." })),
    row_id: Type.Optional(Type.Integer({ description: "Specific message rowid to retrieve." })),
    chat_jid: Type.Optional(Type.String({
        description: "Chat JID to search. Use 'all' or '*' to search across chats. Defaults to current chat.",
    })),
    limit: Type.Optional(Type.Integer({ description: "Max results (1-50).", minimum: 1, maximum: 50 })),
    offset: Type.Optional(Type.Integer({ description: "Offset for pagination.", minimum: 0 })),
    details_max_chars: Type.Optional(Type.Integer({
        description: "Limit content size in details.results (0 omits content).",
        minimum: 0,
        maximum: 20000,
    })),
});
// ── Helpers ───────────────────────────────────────────────
function clampNumber(value, fallback, min, max) {
    if (!Number.isFinite(value))
        return fallback;
    const num = Number(value);
    if (Number.isNaN(num))
        return fallback;
    return Math.min(Math.max(num, min), max);
}
function normalizeDetailsMax(value) {
    if (!Number.isFinite(value))
        return undefined;
    const num = Number(value);
    if (Number.isNaN(num))
        return undefined;
    return Math.min(Math.max(num, 0), 20000);
}
function applyDetailsLimit(row, maxChars) {
    if (maxChars === undefined)
        return row;
    const fullLength = row.content?.length ?? 0;
    if (maxChars <= 0) {
        return { ...row, content: "", content_truncated: fullLength > 0, content_full_length: fullLength };
    }
    if (fullLength <= maxChars)
        return row;
    const sliceLength = Math.max(0, maxChars - 1);
    return { ...row, content: `${row.content.slice(0, sliceLength)}…`, content_truncated: true, content_full_length: fullLength };
}
function truncate(text, max = 180) {
    if (!text)
        return "";
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length <= max)
        return clean;
    return `${clean.slice(0, max - 1)}…`;
}
function normalizeChatJid(input, defaultChat) {
    if (!input)
        return defaultChat;
    const trimmed = input.trim();
    if (!trimmed || trimmed === "*")
        return null;
    if (trimmed.toLowerCase() === "all")
        return null;
    return trimmed;
}
function formatRow(row) {
    const role = row.is_bot_message ? "assistant" : "user";
    const sender = row.sender_name || row.sender || role;
    const preview = truncate(row.content, 160);
    return `• [${row.rowid}] (${row.chat_jid}) ${sender} (${role}) — ${preview} (${row.timestamp})`;
}
function getDefaultChatJid() {
    return process.env.PICLAW_CHAT_JID ?? "web:default";
}
// ── DB queries ────────────────────────────────────────────
function fetchByRowId(db, rowId, chatJid) {
    const cols = "rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message";
    if (chatJid) {
        return db.prepare(`SELECT ${cols} FROM messages WHERE rowid = ? AND chat_jid = ?`).get(rowId, chatJid) ?? null;
    }
    return db.prepare(`SELECT ${cols} FROM messages WHERE rowid = ?`).get(rowId) ?? null;
}
function searchMessages(db, query, chatJid, limit, offset) {
    const trimmed = query.trim();
    if (!trimmed)
        return [];
    if (trimmed.startsWith("#")) {
        const tag = trimmed.replace(/^#+/, "");
        if (!tag)
            return [];
        const pattern = `%#${tag}%`;
        const cols = "rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message";
        if (chatJid) {
            return db.prepare(`SELECT ${cols} FROM messages WHERE chat_jid = ? AND content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`).all(chatJid, pattern, limit, offset);
        }
        return db.prepare(`SELECT ${cols} FROM messages WHERE content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`).all(pattern, limit, offset);
    }
    try {
        const base = `SELECT messages.rowid, messages.chat_jid, messages.sender, messages.sender_name, messages.content, messages.timestamp, messages.is_bot_message
           FROM messages JOIN messages_fts ON messages_fts.rowid = messages.rowid`;
        if (chatJid) {
            return db.prepare(`${base} WHERE messages.chat_jid = ? AND messages_fts MATCH ? ORDER BY messages.rowid DESC LIMIT ? OFFSET ?`).all(chatJid, trimmed, limit, offset);
        }
        return db.prepare(`${base} WHERE messages_fts MATCH ? ORDER BY messages.rowid DESC LIMIT ? OFFSET ?`).all(trimmed, limit, offset);
    }
    catch {
        const pattern = `%${trimmed}%`;
        const cols = "rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message";
        if (chatJid) {
            return db.prepare(`SELECT ${cols} FROM messages WHERE chat_jid = ? AND content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`).all(chatJid, pattern, limit, offset);
        }
        return db.prepare(`SELECT ${cols} FROM messages WHERE content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`).all(pattern, limit, offset);
    }
}
// ── Tool execute ──────────────────────────────────────────
async function execute(_toolCallId, params, _signal, _onUpdate, _ctx) {
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
        const details = { count: 1, results: [detailRow] };
        if (detailsMaxChars !== undefined)
            details.details_max_chars = detailsMaxChars;
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
    const details = { count: rows.length, results: detailRows };
    if (detailsMaxChars !== undefined)
        details.details_max_chars = detailsMaxChars;
    return { content: [{ type: "text", text: `${header}\n${lines.join("\n")}` }], details };
}
// ── Factory ───────────────────────────────────────────────
export const messageSearch = (pi) => {
    pi.registerTool({
        name: "search_messages",
        label: "search_messages",
        description: "Search piclaw message history using the FTS index and retrieve matching messages.",
        parameters: SearchMessagesSchema,
        execute,
    });
};

/**
 * messages-crud – unified message CRUD tool for internal agent operations.
 */
import { Type } from "@sinclair/typebox";
import { attachMediaToMessage, deleteThreadByRowId, getDb, getMediaIdsForMessage, storeMessage, } from "../db.js";
import { getChatJid } from "../core/chat-context.js";
import { createUuid } from "../utils/ids.js";
import { prepareFtsQuery } from "../utils/fts-query.js";
const MessagesSchema = Type.Object({
    action: Type.Optional(Type.Union([
        Type.Literal("search"),
        Type.Literal("get"),
        Type.Literal("add"),
        Type.Literal("post"),
        Type.Literal("delete"),
    ])),
    query: Type.Optional(Type.String({ description: "Full-text query string (search action)." })),
    row_ids: Type.Optional(Type.Array(Type.Integer({ minimum: 1 }), {
        description: "Target row IDs (get/delete actions).",
        maxItems: 50,
    })),
    chat_jid: Type.Optional(Type.String({ description: "Chat JID. Use '*' or 'all' for all chats." })),
    role: Type.Optional(Type.Union([Type.Literal("user"), Type.Literal("assistant")], {
        description: "Optional role filter for read/search actions.",
    })),
    after: Type.Optional(Type.String({ description: "Filter messages with timestamp greater than this ISO value." })),
    before: Type.Optional(Type.String({ description: "Filter messages with timestamp less than this ISO value." })),
    since: Type.Optional(Type.String({ description: "Alias for `after`." })),
    limit: Type.Optional(Type.Integer({ description: "Max search results (1-50).", minimum: 1, maximum: 50 })),
    offset: Type.Optional(Type.Integer({ description: "Offset for search pagination.", minimum: 0 })),
    context_before: Type.Optional(Type.Integer({ description: "Context rows before each row (get action).", minimum: 0, maximum: 20 })),
    context_after: Type.Optional(Type.Integer({ description: "Context rows after each row (get action).", minimum: 0, maximum: 20 })),
    details_max_chars: Type.Optional(Type.Integer({
        description: "Limit content size in details payloads (0 omits content).",
        minimum: 0,
        maximum: 20_000,
    })),
    content: Type.Optional(Type.String({ description: "Message content to insert (add action)." })),
    type: Type.Optional(Type.Union([Type.Literal("user"), Type.Literal("agent")], {
        description: "Message type for add action.",
    })),
    media_ids: Type.Optional(Type.Array(Type.Integer({ minimum: 1 }), {
        description: "Media IDs to attach to a newly added message.",
    })),
    content_blocks: Type.Optional(Type.Array(Type.Unknown(), {
        description: "Structured content blocks (e.g. adaptive_card) for post action.",
    })),
    dry_run: Type.Optional(Type.Boolean({ description: "For delete action, report planned changes without applying." })),
    force: Type.Optional(Type.Boolean({ description: "For delete action, ignore attachment-safety checks." })),
});
function normalizeChatJid(input, defaultChat) {
    if (!input)
        return defaultChat;
    const trimmed = input.trim();
    if (!trimmed || trimmed === "*" || trimmed.toLowerCase() === "all")
        return null;
    return trimmed;
}
function normalizeRole(input) {
    if (!input)
        return null;
    const norm = input.trim().toLowerCase();
    if (norm === "assistant")
        return 1;
    if (norm === "user")
        return 0;
    return null;
}
function clipContent(row, limit) {
    const max = Number.isFinite(limit ?? NaN) ? Math.max(limit, 0) : undefined;
    if (max === undefined)
        return { ...row, created_at: row.timestamp };
    if (max <= 0) {
        return {
            ...row,
            created_at: row.timestamp,
            content: "",
            content_truncated: row.content.length > 0,
            content_full_length: row.content.length,
        };
    }
    if (row.content.length <= max)
        return { ...row, created_at: row.timestamp };
    return {
        ...row,
        created_at: row.timestamp,
        content: `${row.content.slice(0, Math.max(1, max - 1))}…`,
        content_truncated: true,
        content_full_length: row.content.length,
    };
}
function runSearch(query, chatJid, roleFilter, limit, offset, afterTs, beforeTs) {
    const db = getDb();
    const trimmed = query.trim();
    if (!trimmed)
        return [];
    const timeClauses = [];
    const timeValues = [];
    if (afterTs) {
        timeClauses.push("timestamp > ?");
        timeValues.push(afterTs);
    }
    if (beforeTs) {
        timeClauses.push("timestamp < ?");
        timeValues.push(beforeTs);
    }
    if (trimmed === "*") {
        const conditions = [];
        const params = [];
        if (chatJid) {
            conditions.push("chat_jid = ?");
            params.push(chatJid);
        }
        if (roleFilter !== null) {
            conditions.push("is_bot_message = ?");
            params.push(roleFilter);
        }
        for (const c of timeClauses)
            conditions.push(c);
        params.push(...timeValues);
        const whereClause = conditions.length > 0 ? ` WHERE ${conditions.join(" AND ")}` : "";
        const sql = `SELECT rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message
      FROM messages${whereClause} ORDER BY rowid DESC LIMIT ? OFFSET ?`;
        return db.prepare(sql).all(...params, limit, offset);
    }
    if (trimmed.startsWith("#")) {
        const tag = trimmed.replace(/^#+/, "");
        if (!tag)
            return [];
        const pattern = `%#${tag}%`;
        const conditions = ["content LIKE ? COLLATE NOCASE"];
        const params = [pattern];
        if (chatJid) {
            conditions.unshift("chat_jid = ?");
            params.unshift(chatJid);
        }
        if (roleFilter !== null) {
            conditions.push("is_bot_message = ?");
            params.push(roleFilter);
        }
        for (const c of timeClauses)
            conditions.push(c);
        params.push(...timeValues);
        const sql = `SELECT rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message
      FROM messages WHERE ${conditions.join(" AND ")} ORDER BY rowid DESC LIMIT ? OFFSET ?`;
        return db.prepare(sql).all(...params, limit, offset);
    }
    try {
        const conditions = ["messages_fts MATCH ?"];
        const params = [];
        const ftsQuery = prepareFtsQuery(trimmed) ?? trimmed;
        params.push(ftsQuery);
        if (chatJid) {
            conditions.unshift("messages.chat_jid = ?");
            params.unshift(chatJid);
        }
        if (roleFilter !== null) {
            conditions.push("messages.is_bot_message = ?");
            params.push(roleFilter);
        }
        for (const c of timeClauses)
            conditions.push(c);
        params.push(...timeValues);
        const sql = `SELECT messages.rowid, messages.chat_jid, messages.sender,
      messages.sender_name, messages.content, messages.timestamp, messages.is_bot_message
      FROM messages
      JOIN messages_fts ON messages_fts.rowid = messages.rowid
      WHERE ${conditions.join(" AND ")} ORDER BY messages.rowid DESC LIMIT ? OFFSET ?`;
        return db.prepare(sql).all(...params, limit, offset);
    }
    catch {
        const terms = trimmed
            .split(/\s+/)
            .filter(Boolean)
            .map((term) => `%${term}%`);
        if (terms.length === 0)
            return [];
        const clauses = terms.map(() => "content LIKE ? COLLATE NOCASE");
        const conditions = [`(${clauses.join(" AND ")})`];
        const params = [...terms];
        if (chatJid) {
            conditions.unshift("chat_jid = ?");
            params.unshift(chatJid);
        }
        if (roleFilter !== null) {
            conditions.push("is_bot_message = ?");
            params.push(roleFilter);
        }
        for (const c of timeClauses)
            conditions.push(c);
        params.push(...timeValues);
        const sql = `SELECT rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message
      FROM messages WHERE ${conditions.join(" AND ")} ORDER BY rowid DESC LIMIT ? OFFSET ?`;
        return db.prepare(sql).all(...params, limit, offset);
    }
}
function fetchByRowId(chatJid, roleFilter, rowId) {
    const db = getDb();
    const conditions = ["rowid = ?"];
    const params = [rowId];
    if (chatJid) {
        conditions.unshift("chat_jid = ?");
        params.unshift(chatJid);
    }
    if (roleFilter !== null) {
        conditions.push("is_bot_message = ?");
        params.push(roleFilter);
    }
    const sql = `SELECT rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message
      FROM messages WHERE ${conditions.join(" AND ")} LIMIT 1`;
    return db.prepare(sql).get(...params) ?? null;
}
function fetchContextRows(chatJid, rowId, roleFilter, before, after) {
    const db = getDb();
    const beforeParams = [chatJid, rowId, before];
    let beforeSql = "SELECT rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message\n      FROM messages WHERE chat_jid = ? AND rowid < ?";
    if (roleFilter !== null) {
        beforeSql += " AND is_bot_message = ?";
        beforeParams.splice(2, 0, roleFilter);
    }
    beforeSql += " ORDER BY rowid DESC LIMIT ?";
    const afterParams = [chatJid, rowId, after];
    let afterSql = "SELECT rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message\n      FROM messages WHERE chat_jid = ? AND rowid > ?";
    if (roleFilter !== null) {
        afterSql += " AND is_bot_message = ?";
        afterParams.splice(2, 0, roleFilter);
    }
    afterSql += " ORDER BY rowid ASC LIMIT ?";
    const beforeRows = before > 0 ? db.prepare(beforeSql).all(...beforeParams) : [];
    beforeRows.reverse();
    const afterRows = after > 0 ? db.prepare(afterSql).all(...afterParams) : [];
    return { context_before: beforeRows, context_after: afterRows };
}
function fetchCascadeRows(chatJid, rowId) {
    return getDb()
        .prepare("SELECT rowid, chat_jid, sender, sender_name, content, timestamp, is_bot_message FROM messages WHERE chat_jid = ? AND (rowid = ? OR thread_id = ?)")
        .all(chatJid, rowId, rowId);
}
function rowHasAttachments(rowId) {
    return getMediaIdsForMessage(rowId).length > 0;
}
function executeSearch(params, defaultChat) {
    const query = params.query?.trim() ?? "";
    if (!query) {
        return {
            content: [{ type: "text", text: "Provide query for action=search." }],
            details: { action: "search", count: 0, results: [] },
        };
    }
    const chatJid = normalizeChatJid(params.chat_jid, defaultChat);
    const roleFilter = normalizeRole(params.role);
    const limit = Math.min(Math.max(params.limit ?? 10, 1), 50);
    const offset = Math.max(params.offset ?? 0, 0);
    const detailsMaxChars = typeof params.details_max_chars === "number" ? Math.max(params.details_max_chars, 0) : undefined;
    const afterTs = params.since || params.after;
    const rows = runSearch(query, chatJid, roleFilter, limit, offset, afterTs, params.before);
    if (rows.length === 0) {
        return {
            content: [{ type: "text", text: "No matching messages found." }],
            details: { action: "search", count: 0, results: [] },
        };
    }
    const clipped = rows.map((row) => clipContent(row, detailsMaxChars));
    const preview = clipped
        .map((row) => `[${row.rowid}] ${row.sender_name || row.sender}: ${row.content}`)
        .join("\n");
    return {
        content: [{ type: "text", text: `Found ${clipped.length} message${clipped.length === 1 ? "" : "s"}.\n${preview}` }],
        details: {
            action: "search",
            count: clipped.length,
            query,
            results: clipped,
            limit,
            offset,
            chat_jid: chatJid,
            role: params.role,
            after: params.after || params.since,
            before: params.before,
            details_max_chars: detailsMaxChars,
        },
    };
}
function executeGet(params, defaultChat) {
    const rowIds = Array.from(new Set((params.row_ids ?? []).filter((rowId) => Number.isInteger(rowId) && rowId > 0)));
    if (rowIds.length === 0) {
        return {
            content: [{ type: "text", text: "Provide row_ids for action=get." }],
            details: { action: "get", count: 0, messages: [], missing_row_ids: [] },
        };
    }
    const chatJid = normalizeChatJid(params.chat_jid, defaultChat);
    const roleFilter = normalizeRole(params.role);
    const contextBefore = Math.min(Math.max(params.context_before ?? 0, 0), 20);
    const contextAfter = Math.min(Math.max(params.context_after ?? 0, 0), 20);
    const detailsMaxChars = typeof params.details_max_chars === "number" ? Math.max(params.details_max_chars, 0) : undefined;
    const messages = [];
    const missing = [];
    for (const rowId of rowIds) {
        const row = fetchByRowId(chatJid, roleFilter, rowId);
        if (!row) {
            missing.push(rowId);
            continue;
        }
        const { context_before, context_after } = fetchContextRows(row.chat_jid, row.rowid, roleFilter, contextBefore, contextAfter);
        messages.push({
            message: clipContent(row, detailsMaxChars),
            context_before: context_before.map((item) => clipContent(item, detailsMaxChars)),
            context_after: context_after.map((item) => clipContent(item, detailsMaxChars)),
        });
    }
    const output = messages
        .map((item) => {
        const header = `- [${item.message.rowid}] ${item.message.sender_name || item.message.sender}`;
        const before = item.context_before.map((r) => `  b${r.rowid}: ${r.sender_name || r.sender}`).join("\n");
        const after = item.context_after.map((r) => `  a${r.rowid}: ${r.sender_name || r.sender}`).join("\n");
        const parts = [header];
        if (before)
            parts.push(`  before:\n${before}`);
        if (after)
            parts.push(`  after:\n${after}`);
        return parts.join("\n");
    })
        .filter(Boolean)
        .join("\n\n");
    return {
        content: [{ type: "text", text: output || "No messages found for requested row IDs." }],
        details: {
            action: "get",
            count: messages.length,
            messages,
            missing_row_ids: missing,
            context_before: contextBefore,
            context_after: contextAfter,
            details_max_chars: detailsMaxChars,
        },
    };
}
function executeAdd(params, defaultChat) {
    const content = params.content?.trim() ?? "";
    if (!content) {
        return {
            content: [{ type: "text", text: "Provide content for action=add." }],
            details: { action: "add", inserted: 0 },
        };
    }
    const chatJid = normalizeChatJid(params.chat_jid, defaultChat);
    if (!chatJid) {
        return {
            content: [{ type: "text", text: "Cannot infer target chat. Provide chat_jid." }],
            details: { action: "add", inserted: 0 },
        };
    }
    const isBot = params.type === "agent";
    const timestamp = new Date().toISOString();
    const rowId = storeMessage({
        id: createUuid("msg"),
        chat_jid: chatJid,
        sender: isBot ? "web-agent" : "web-user",
        sender_name: isBot ? "Pi" : "You",
        content,
        timestamp,
        is_from_me: false,
        is_bot_message: isBot,
        content_blocks: undefined,
        link_previews: undefined,
        thread_id: null,
    });
    if (rowId <= 0) {
        return {
            content: [{ type: "text", text: "Failed to add message." }],
            details: { action: "add", inserted: 0 },
        };
    }
    const mediaIds = Array.from(new Set((params.media_ids ?? []).filter((id) => Number.isInteger(id) && id > 0)));
    if (mediaIds.length > 0) {
        attachMediaToMessage(rowId, mediaIds);
    }
    const inserted = {
        rowid: rowId,
        chat_jid: chatJid,
        sender: isBot ? "web-agent" : "web-user",
        sender_name: isBot ? "Pi" : "You",
        content,
        timestamp,
        is_bot_message: isBot ? 1 : 0,
        created_at: timestamp,
    };
    return {
        content: [{ type: "text", text: `Added message ${rowId} to ${chatJid}.` }],
        details: {
            action: "add",
            inserted: 1,
            row_id: rowId,
            chat_jid: chatJid,
            message: inserted,
        },
    };
}
function executePost(params, defaultChat, postFn) {
    const content = params.content?.trim() ?? "";
    if (!content) {
        return {
            content: [{ type: "text", text: "Provide content for action=post." }],
            details: { action: "post", posted: 0 },
        };
    }
    const chatJid = normalizeChatJid(params.chat_jid, defaultChat);
    if (!chatJid) {
        return {
            content: [{ type: "text", text: "Cannot infer target chat. Provide chat_jid." }],
            details: { action: "post", posted: 0 },
        };
    }
    const isBot = params.type === "agent";
    const mediaIds = Array.from(new Set((params.media_ids ?? []).filter((id) => Number.isInteger(id) && id > 0)));
    const contentBlocks = Array.isArray(params.content_blocks) ? params.content_blocks : undefined;
    if (postFn) {
        const rowId = postFn(chatJid, content, isBot, mediaIds, contentBlocks);
        if (!rowId) {
            return {
                content: [{ type: "text", text: "Failed to post message." }],
                details: { action: "post", posted: 0 },
            };
        }
        return {
            content: [{ type: "text", text: `Posted message ${rowId} to ${chatJid} (broadcast).` }],
            details: { action: "post", posted: 1, row_id: rowId, chat_jid: chatJid, broadcast: true },
        };
    }
    // Fallback: plain DB insert without broadcast (same as add but with content_blocks)
    const timestamp = new Date().toISOString();
    const rowId = storeMessage({
        id: createUuid("msg"),
        chat_jid: chatJid,
        sender: isBot ? "web-agent" : "web-user",
        sender_name: isBot ? "Pi" : "You",
        content,
        timestamp,
        is_from_me: false,
        is_bot_message: isBot,
        content_blocks: contentBlocks,
        link_previews: undefined,
        thread_id: null,
    });
    if (rowId <= 0) {
        return {
            content: [{ type: "text", text: "Failed to post message." }],
            details: { action: "post", posted: 0 },
        };
    }
    if (mediaIds.length > 0) {
        attachMediaToMessage(rowId, mediaIds);
    }
    return {
        content: [{ type: "text", text: `Posted message ${rowId} to ${chatJid} (no broadcast — channel not available).` }],
        details: { action: "post", posted: 1, row_id: rowId, chat_jid: chatJid, broadcast: false },
    };
}
function executeDelete(params, defaultChat) {
    const requested = Array.from(new Set((params.row_ids ?? []).filter((id) => Number.isInteger(id) && id > 0)));
    if (requested.length === 0) {
        return {
            content: [{ type: "text", text: "Provide row_ids for action=delete." }],
            details: { action: "delete", deleted_row_ids: [], skipped_row_ids: [] },
        };
    }
    const chatJid = normalizeChatJid(params.chat_jid, defaultChat);
    if (!chatJid) {
        return {
            content: [{ type: "text", text: "Cannot infer target chat. Provide chat_jid." }],
            details: { action: "delete", deleted_row_ids: [], skipped_row_ids: [] },
        };
    }
    const force = params.force === true;
    const dryRun = params.dry_run === true;
    const roleFilter = normalizeRole(params.role);
    const skipped = new Map();
    const rootDeletePlan = new Map();
    for (const rootId of requested) {
        const root = fetchByRowId(chatJid, roleFilter, rootId);
        if (!root) {
            skipped.set(rootId, ["not_found"]);
            continue;
        }
        const cascade = fetchCascadeRows(chatJid, root.rowid);
        const overlapsSkipped = cascade.some((row) => skipped.has(row.rowid));
        if (overlapsSkipped) {
            skipped.set(root.rowid, ["cascade_dependency_skipped"]);
            continue;
        }
        const hasAttachments = cascade.some((row) => rowHasAttachments(row.rowid));
        if (!force && hasAttachments) {
            for (const row of cascade) {
                skipped.set(row.rowid, ["media_attachments_present"]);
            }
            continue;
        }
        rootDeletePlan.set(root.rowid, cascade.map((row) => row.rowid));
    }
    const planned = new Set();
    for (const rowIds of rootDeletePlan.values()) {
        for (const id of rowIds)
            planned.add(id);
    }
    const finalDeleted = new Set();
    if (!dryRun) {
        for (const rootId of rootDeletePlan.keys()) {
            const removed = deleteThreadByRowId(chatJid, rootId);
            for (const removedRowId of removed) {
                if (!skipped.has(removedRowId))
                    finalDeleted.add(removedRowId);
            }
        }
    }
    else {
        for (const id of planned)
            finalDeleted.add(id);
    }
    const skippedRowIds = Array.from(skipped.keys()).sort((a, b) => a - b);
    const skippedReasons = Object.fromEntries(Array.from(skipped.entries()).map(([id, reasons]) => [String(id), reasons]));
    return {
        content: [
            {
                type: "text",
                text: dryRun
                    ? `Delete plan: ${finalDeleted.size} row(s) would be deleted, ${skippedRowIds.length} skipped.`
                    : `Deleted ${finalDeleted.size} row(s), skipped ${skippedRowIds.length}.`,
            },
        ],
        details: {
            action: "delete",
            requested_row_ids: requested,
            deleted_row_ids: Array.from(finalDeleted).sort((a, b) => a - b),
            skipped_row_ids: skippedRowIds,
            skipped_reasons: skippedReasons,
            dry_run: dryRun,
            force,
            count: finalDeleted.size,
            skipped_count: skippedRowIds.length,
            chat_jid: chatJid,
        },
    };
}
/**
 * Shared helper for external callers that want direct access to message-tool
 * semantics without an agent extension context.
 *
 * @param postFn Optional callback for action=post that stores + broadcasts
 *               a message through the web channel pipeline. If not provided,
 *               action=post falls back to a plain DB insert (like add).
 */
export function runMessagesTool(params, defaultChat = "web:default", postFn) {
    const action = params.action || "search";
    if (action === "search")
        return executeSearch(params, defaultChat);
    if (action === "get")
        return executeGet(params, defaultChat);
    if (action === "add")
        return executeAdd(params, defaultChat);
    if (action === "post")
        return executePost(params, defaultChat, postFn);
    if (action === "delete")
        return executeDelete(params, defaultChat);
    return {
        content: [{ type: "text", text: `Unknown action: ${action}` }],
        details: {
            error: `Unknown action: ${action}`,
            requested_action: action,
        },
    };
}
const MESSAGES_TOOL_HINT = [
    "## Messages",
    "Use the messages tool to search, retrieve, add, post, and delete chat messages.",
    "Read operations are safe by default; delete requires explicit action=delete and can be dry-run with dry_run=true.",
    "The post action stores a message with content_blocks and broadcasts it to connected clients.",
    "Example:",
    "- search: { action: \"search\", query: \"keyword\", limit: 10 }",
    "- get: { action: \"get\", row_ids: [123], context_before: 2, context_after: 1 }",
    "- add: { action: \"add\", type: \"agent\", content: \"Hello\" }",
    "- post: { action: \"post\", type: \"agent\", content: \"Card fallback\", content_blocks: [...] }",
    "- delete: { action: \"delete\", row_ids: [123, 124], dry_run: true, force: true }",
].join("\n");
/** Optional post function injected by the web channel for broadcast support. */
let registeredPostFn;
/** Set the post function for the messages tool. Called by web channel wiring. */
export function setMessagesPostFn(fn) {
    registeredPostFn = fn;
}
export const messagesCrud = (pi) => {
    pi.on("before_agent_start", async (event) => ({
        systemPrompt: `${event.systemPrompt}\n\n${MESSAGES_TOOL_HINT}`,
    }));
    pi.registerTool({
        name: "messages",
        label: "messages",
        description: "Search, retrieve, add, post, or delete messages via shared store.",
        parameters: MessagesSchema,
        async execute(_toolCallId, params) {
            const defaultChat = getChatJid("web:default");
            return runMessagesTool(params, defaultChat, registeredPostFn);
        },
    });
};

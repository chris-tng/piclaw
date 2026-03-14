/**
 * db/chat-cursors.ts – Per-chat cursor, inflight-run, and failed-run tracking.
 *
 * The `chat_cursors` table is the single source of truth for all per-chat
 * run state. Every state transition is a **single SQL statement**, so SQLite's
 * WAL guarantees automatic rollback on crash with no extra application logic:
 *
 *   cursor_ts      – ISO timestamp of the last fully-processed message.
 *                    `getMessagesSince()` uses this as the lower-bound filter.
 *
 *   inflight_*     – Set atomically with the cursor advance just before
 *                    `runAgent()` starts (beginChatRun). If the process is
 *                    killed mid-run these survive; the next startup rolls
 *                    the cursor back to inflight_prev_ts and retries.
 *
 *   failed_*       – Set atomically when a run errors (endChatRunWithError),
 *                    cleared atomically on success (endChatRun) or model
 *                    switch (clearFailedRun). By living in the same row as
 *                    the inflight columns, success and error completion are
 *                    each a single UPDATE – no window where inflight is
 *                    cleared but failedRun is not yet written, or vice versa.
 *
 * Multi-chat operations (startup rollback) are wrapped in an explicit
 * transaction by the caller so all chats succeed or none do.
 *
 * Consumers:
 *   - channels/web/handlers/agent.ts  beginChatRun / endChatRun /
 *                                     endChatRunWithError
 *   - channels/web.ts                 getChatCursor / getAllChatCursors /
 *                                     setChatCursor / getFailedRun /
 *                                     clearFailedRun / getInflightRuns /
 *                                     rollbackInflightRun
 *   - db/connection.ts                creates the table and runs migration
 */

import { getDb } from "./connection.js";

/** Shape returned by getInflightRuns(). */
export interface InflightRun {
  chatJid: string;
  /** Cursor value that was current *before* this run started. */
  prevTs: string;
  /** ID of the user message that triggered the run. */
  messageId: string;
  /** ISO timestamp when the run was started. */
  startedAt: string;
}

/** Shape of a permanently-failed run record stored in chat_cursors. */
export interface FailedRunRecord {
  prevTs: string;
  failedTs: string;
  messageId: string;
  threadRootId: number | null;
  createdAt: string;
}

/** Deferred queued follow-up items persisted outside the timeline. */
export interface DeferredQueuedFollowupRecord {
  rowId: number;
  queuedContent: string;
  threadId: number | null;
  queuedAt: string;
  mediaIds?: number[];
  contentBlocks?: unknown[];
  linkPreviews?: unknown[];
  /** Number of times materializeNextDeferredFollowup has failed for this item. */
  materializeRetries?: number;
}

// ---------------------------------------------------------------------------
// Cursor reads
// ---------------------------------------------------------------------------

/** Get the cursor timestamp for a chat. Returns '' if never processed. */
export function getChatCursor(chatJid: string): string {
  const db = getDb();
  const row = db
    .prepare("SELECT cursor_ts FROM chat_cursors WHERE chat_jid = ?")
    .get(chatJid) as { cursor_ts: string } | undefined;
  return row?.cursor_ts ?? "";
}

/** Get all chat cursors as { chatJid → cursor_ts }. */
export function getAllChatCursors(): Record<string, string> {
  const db = getDb();
  const rows = db
    .prepare("SELECT chat_jid, cursor_ts FROM chat_cursors")
    .all() as Array<{ chat_jid: string; cursor_ts: string }>;
  const result: Record<string, string> = {};
  for (const row of rows) result[row.chat_jid] = row.cursor_ts;
  return result;
}

/**
 * Get the inflight message id for a chat, if a run is currently active.
 * Used to attach steering messages to the original turn root.
 */
export function getInflightMessageId(chatJid: string): string | null {
  const db = getDb();
  const row = db
    .prepare("SELECT inflight_message_id FROM chat_cursors WHERE chat_jid = ?")
    .get(chatJid) as { inflight_message_id: string | null } | undefined;
  return row?.inflight_message_id ?? null;
}

function sanitizeDeferredQueuedFollowupRecord(value: unknown): DeferredQueuedFollowupRecord | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  if (!Number.isFinite(record.rowId) || typeof record.queuedContent !== "string") return null;
  return {
    rowId: Number(record.rowId),
    queuedContent: record.queuedContent,
    threadId: Number.isFinite(record.threadId) ? Number(record.threadId) : null,
    queuedAt: typeof record.queuedAt === "string" && record.queuedAt ? record.queuedAt : new Date(0).toISOString(),
    mediaIds: Array.isArray(record.mediaIds)
      ? record.mediaIds.map((id) => Number(id)).filter((id) => Number.isFinite(id))
      : undefined,
    contentBlocks: Array.isArray(record.contentBlocks) ? [...record.contentBlocks] : undefined,
    linkPreviews: Array.isArray(record.linkPreviews) ? [...record.linkPreviews] : undefined,
    materializeRetries: Number.isFinite(record.materializeRetries) ? Number(record.materializeRetries) : 0,
  };
}

/** Read deferred queued follow-ups for a chat from chat_cursors. */
export function getDeferredQueuedFollowups(chatJid: string): DeferredQueuedFollowupRecord[] {
  const db = getDb();
  const row = db
    .prepare("SELECT queued_followups_json FROM chat_cursors WHERE chat_jid = ?")
    .get(chatJid) as { queued_followups_json: string | null } | undefined;
  if (!row?.queued_followups_json) return [];
  try {
    const parsed = JSON.parse(row.queued_followups_json);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => sanitizeDeferredQueuedFollowupRecord(item))
      .filter((item): item is DeferredQueuedFollowupRecord => Boolean(item));
  } catch {
    return [];
  }
}

/** Persist the full deferred queued follow-up list for a chat. */
export function setDeferredQueuedFollowups(chatJid: string, items: DeferredQueuedFollowupRecord[]): void {
  const db = getDb();
  const payload = JSON.stringify(items.map((item) => ({
    rowId: item.rowId,
    queuedContent: item.queuedContent,
    threadId: item.threadId ?? null,
    queuedAt: item.queuedAt,
    mediaIds: item.mediaIds ? [...item.mediaIds] : undefined,
    contentBlocks: Array.isArray(item.contentBlocks) ? [...item.contentBlocks] : undefined,
    linkPreviews: Array.isArray(item.linkPreviews) ? [...item.linkPreviews] : undefined,
    materializeRetries: item.materializeRetries || 0,
  })));
  db.prepare(`
    INSERT INTO chat_cursors (chat_jid, cursor_ts, queued_followups_json)
    VALUES (?, '', ?)
    ON CONFLICT(chat_jid) DO UPDATE SET
      queued_followups_json = excluded.queued_followups_json
  `).run(chatJid, payload);
}

// ---------------------------------------------------------------------------
// Cursor writes
// ---------------------------------------------------------------------------

/**
 * Set the cursor without touching inflight or failed state.
 * Used by skipFailedOnModelSwitch() to advance past a permanently-failed
 * message when the user changes model.
 */
export function setChatCursor(chatJid: string, ts: string): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO chat_cursors (chat_jid, cursor_ts) VALUES (?, ?)
    ON CONFLICT(chat_jid) DO UPDATE SET cursor_ts = excluded.cursor_ts
  `).run(chatJid, ts);
}

// ---------------------------------------------------------------------------
// Run lifecycle – every function is a single SQL statement
// ---------------------------------------------------------------------------

/**
 * Atomically advance the cursor AND record the inflight marker.
 *
 * Called immediately before runAgent(). Because this is one INSERT OR REPLACE,
 * both the new cursor_ts and the inflight_* fields land together. If the
 * process is killed before endChatRun() / endChatRunWithError(), the next
 * startup finds the inflight marker and rolls the cursor back to prevTs.
 */
export function beginChatRun(
  chatJid: string,
  newCursorTs: string,
  inflight: { prevTs: string; messageId: string; startedAt: string }
): void {
  const db = getDb();
  db.prepare(`
    INSERT INTO chat_cursors
      (chat_jid, cursor_ts, inflight_prev_ts, inflight_message_id, inflight_started_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(chat_jid) DO UPDATE SET
      cursor_ts           = excluded.cursor_ts,
      inflight_prev_ts    = excluded.inflight_prev_ts,
      inflight_message_id = excluded.inflight_message_id,
      inflight_started_at = excluded.inflight_started_at
  `).run(chatJid, newCursorTs, inflight.prevTs, inflight.messageId, inflight.startedAt);
}

/**
 * Mark a run as successfully completed.
 *
 * Single UPDATE that clears the inflight marker AND any stale failed_run
 * record in one statement. No window exists where inflight is cleared but
 * failed_run is not yet wiped, or vice versa.
 */
export function endChatRun(chatJid: string): void {
  const db = getDb();
  db.prepare(`
    UPDATE chat_cursors
    SET inflight_prev_ts    = NULL,
        inflight_message_id = NULL,
        inflight_started_at = NULL,
        failed_prev_ts      = NULL,
        failed_ts           = NULL,
        failed_message_id   = NULL,
        failed_thread_root  = NULL,
        failed_created_at   = NULL
    WHERE chat_jid = ?
  `).run(chatJid);
}

/**
 * Mark a run as permanently failed.
 *
 * Single UPDATE that clears the inflight marker AND writes the failed_run
 * record atomically. There is no intermediate state where inflight is gone
 * but failed_run is not yet present (or the reverse).
 */
export function endChatRunWithError(chatJid: string, failed: FailedRunRecord): void {
  const db = getDb();
  db.prepare(`
    UPDATE chat_cursors
    SET inflight_prev_ts    = NULL,
        inflight_message_id = NULL,
        inflight_started_at = NULL,
        failed_prev_ts      = ?,
        failed_ts           = ?,
        failed_message_id   = ?,
        failed_thread_root  = ?,
        failed_created_at   = ?
    WHERE chat_jid = ?
  `).run(
    failed.prevTs,
    failed.failedTs,
    failed.messageId,
    failed.threadRootId ?? null,
    failed.createdAt,
    chatJid
  );
}

// ---------------------------------------------------------------------------
// Failed-run reads / writes
// ---------------------------------------------------------------------------

/** Return the failed-run record for a chat, or undefined if none. */
export function getFailedRun(chatJid: string): FailedRunRecord | undefined {
  const db = getDb();
  const row = db
    .prepare(`
      SELECT failed_prev_ts, failed_ts, failed_message_id,
             failed_thread_root, failed_created_at
      FROM chat_cursors
      WHERE chat_jid = ? AND failed_ts IS NOT NULL
    `)
    .get(chatJid) as {
      failed_prev_ts: string;
      failed_ts: string;
      failed_message_id: string;
      failed_thread_root: number | null;
      failed_created_at: string;
    } | undefined;

  if (!row) return undefined;
  return {
    prevTs: row.failed_prev_ts,
    failedTs: row.failed_ts,
    messageId: row.failed_message_id,
    threadRootId: row.failed_thread_root ?? null,
    createdAt: row.failed_created_at,
  };
}

/**
 * Clear the failed-run record without touching cursor or inflight.
 * Used by skipFailedOnModelSwitch() after advancing the cursor past the
 * failed message.
 */
export function clearFailedRun(chatJid: string): void {
  const db = getDb();
  db.prepare(`
    UPDATE chat_cursors
    SET failed_prev_ts    = NULL,
        failed_ts         = NULL,
        failed_message_id = NULL,
        failed_thread_root = NULL,
        failed_created_at = NULL
    WHERE chat_jid = ?
  `).run(chatJid);
}

// ---------------------------------------------------------------------------
// Crash recovery
// ---------------------------------------------------------------------------

/** Return every chat that has an active inflight marker. */
export function getInflightRuns(): InflightRun[] {
  const db = getDb();
  const rows = db
    .prepare(`
      SELECT chat_jid, inflight_prev_ts, inflight_message_id, inflight_started_at
      FROM chat_cursors
      WHERE inflight_prev_ts IS NOT NULL
    `)
    .all() as Array<{
      chat_jid: string;
      inflight_prev_ts: string;
      inflight_message_id: string;
      inflight_started_at: string;
    }>;
  return rows.map((r) => ({
    chatJid: r.chat_jid,
    prevTs: r.inflight_prev_ts,
    messageId: r.inflight_message_id,
    startedAt: r.inflight_started_at,
  }));
}

/**
 * Roll back the cursor to prevTs and clear the inflight marker.
 * Single UPDATE – atomically restores the pre-run cursor state.
 * Called inside the transaction in recoverInflightRuns().
 */
export function rollbackInflightRun(chatJid: string, prevTs: string): void {
  const db = getDb();
  // If a run died after streaming/storing intermediate assistant output but
  // before publishing a terminal reply, those partial bot messages must be
  // discarded before the user turn is replayed. Terminal assistant replies are
  // preserved by the recovery gate and never reach this rollback path.
  db.prepare(`
    DELETE FROM message_media
    WHERE message_rowid IN (
      SELECT rowid FROM messages
      WHERE chat_jid = ?
        AND timestamp > ?
        AND is_bot_message = 1
        AND COALESCE(is_terminal_agent_reply, 0) = 0
    )
  `).run(chatJid, prevTs);

  db.prepare(`
    DELETE FROM messages
    WHERE chat_jid = ?
      AND timestamp > ?
      AND is_bot_message = 1
      AND COALESCE(is_terminal_agent_reply, 0) = 0
  `).run(chatJid, prevTs);

  db.prepare(`
    UPDATE chat_cursors
    SET cursor_ts           = ?,
        inflight_prev_ts    = NULL,
        inflight_message_id = NULL,
        inflight_started_at = NULL
    WHERE chat_jid = ?
  `).run(prevTs, chatJid);
}

/**
 * Clear the inflight marker without rolling back the cursor.
 * Used when the run actually completed (agent replies exist in DB)
 * but endChatRun() wasn't reached before the process was killed.
 */
export function clearInflightMarker(chatJid: string): void {
  const db = getDb();
  db.prepare(`
    UPDATE chat_cursors
    SET inflight_prev_ts    = NULL,
        inflight_message_id = NULL,
        inflight_started_at = NULL
    WHERE chat_jid = ?
  `).run(chatJid);
}

/**
 * Check whether a terminal bot (agent) message exists after a given timestamp
 * for a chat. Recovery must not treat partial/intermediate assistant turns as
 * proof that the run fully completed, otherwise reloads can strand the final
 * response after a multi-turn/tool-using run.
 */
export function hasAgentRepliesAfter(chatJid: string, afterTs: string): boolean {
  const db = getDb();
  const row = db.prepare(`
    SELECT 1 FROM messages
    WHERE chat_jid = ?
      AND timestamp > ?
      AND is_bot_message = 1
      AND COALESCE(is_terminal_agent_reply, 0) = 1
    LIMIT 1
  `).get(chatJid, afterTs);
  return row != null;
}

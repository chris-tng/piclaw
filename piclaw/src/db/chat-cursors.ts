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
  db.prepare(`
    UPDATE chat_cursors
    SET cursor_ts           = ?,
        inflight_prev_ts    = NULL,
        inflight_message_id = NULL,
        inflight_started_at = NULL
    WHERE chat_jid = ?
  `).run(prevTs, chatJid);
}

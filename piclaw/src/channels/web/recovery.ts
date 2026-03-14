/**
 * channels/web/recovery.ts – crash recovery and pending-resume orchestration.
 */

import {
  clearInflightMarker,
  getAllChatCursors,
  getDb,
  getInflightRuns,
  getMessagesSince,
  hasAgentRepliesAfter,
  rollbackInflightRun,
  type InflightRun,
} from "../../db.js";

/** Runtime callbacks required for inflight recovery/pending resume orchestration. */
export interface WebRecoveryContext {
  assistantName: string;
  defaultAgentId: string;
  enqueue(task: () => Promise<void>, key: string): void;
  processChat(chatJid: string, agentId: string, threadRootId?: number): Promise<void>;
  now?: () => number;
}

/** Persistence contract used by web recovery helpers. */
export interface WebRecoveryStore {
  getInflightRuns(): InflightRun[];
  transaction(run: () => void): void;
  hasAgentRepliesAfter(chatJid: string, prevTs: string): boolean;
  clearInflightMarker(chatJid: string): void;
  rollbackInflightRun(chatJid: string, prevTs: string): void;
  getAllChatCursors(): Record<string, string>;
  getMessagesSince(chatJid: string, since: string, assistantName: string): unknown[];
}

const defaultStore: WebRecoveryStore = {
  getInflightRuns,
  transaction: (run) => {
    getDb().transaction(run)();
  },
  hasAgentRepliesAfter,
  clearInflightMarker,
  rollbackInflightRun,
  getAllChatCursors,
  getMessagesSince,
};

/** Maximum age (ms) of an inflight marker before recovery skips it.
 *  If the marker is older than this, the run already timed out on a
 *  previous boot and replaying it is unlikely to succeed.  Defaults to
 *  30 minutes — well above the 15-minute interactive timeout.  */
const MAX_INFLIGHT_AGE_MS = 30 * 60 * 1000;

/** Recover interrupted runs left inflight after a restart. */
export function recoverInflightRuns(
  ctx: WebRecoveryContext,
  store: WebRecoveryStore = defaultStore
): void {
  const inflights = store.getInflightRuns();
  if (inflights.length === 0) return;

  const now = typeof ctx.now === "function" ? ctx.now() : Date.now();

  try {
    store.transaction(() => {
      for (const inflight of inflights) {
        // Check if a terminal assistant reply already landed after this
        // inflight run started. Partial/intermediate assistant output is not
        // enough — those runs must be rolled back and replayed so restart
        // recovery does not strand the final response.
        //
        // If a terminal reply exists, the run completed successfully but
        // endChatRun() wasn't reached before the process was killed. In that
        // case, just clear the inflight marker — do NOT roll back the cursor,
        // as that would cause the same user message to be re-processed.
        if (store.hasAgentRepliesAfter(inflight.chatJid, inflight.startedAt)) {
          console.log(
            `[web] Inflight run for ${inflight.chatJid} (started ${inflight.startedAt}) ` +
              "already has agent replies — clearing marker without rollback"
          );
          store.clearInflightMarker(inflight.chatJid);
          continue;
        }

        // Skip stale inflight markers.  If the marker has survived multiple
        // restarts without producing a terminal reply, the message is unlikely
        // to succeed on replay (e.g. contextless recovery, stuck model).
        // Clear the marker WITHOUT rolling back the cursor so the next
        // `resumePendingChats` picks up the *next* pending message instead of
        // endlessly retrying the same one.
        const inflightAge = now - new Date(inflight.startedAt).getTime();
        if (inflightAge > MAX_INFLIGHT_AGE_MS) {
          console.warn(
            `[web] Inflight run for ${inflight.chatJid} is stale ` +
              `(${Math.round(inflightAge / 1000)}s old, started ${inflight.startedAt}) — ` +
              "clearing marker without rollback to avoid retry loop"
          );
          store.clearInflightMarker(inflight.chatJid);
          continue;
        }

        store.rollbackInflightRun(inflight.chatJid, inflight.prevTs);
      }
    });
  } catch (err) {
    console.error("[web] Failed to roll back inflight runs; will retry on next startup:", err);
    return;
  }

  for (const inflight of inflights) {
    // Re-enqueue a processChat task unless the run already completed
    // (terminal agent reply exists). For rolled-back inflights, this retries
    // the same message. For stale-cleared inflights (cursor not rolled back),
    // processChat will pick up the NEXT pending message from the cursor.
    if (!store.hasAgentRepliesAfter(inflight.chatJid, inflight.startedAt)) {
      console.log(`[web] Recovering interrupted run for ${inflight.chatJid} (started ${inflight.startedAt})`);
      // Reuse the same stable resume key used by resume_pending IPC so
      // immediate startup recovery and later IPC-driven recovery collapse to a
      // single queued task for the chat instead of racing duplicate replays.
      ctx.enqueue(async () => {
        await ctx.processChat(inflight.chatJid, ctx.defaultAgentId);
      }, `resume:${inflight.chatJid}`);
    }
  }
}

/** Resume chats with pending messages after a restart. */
export function resumePendingChats(
  ctx: WebRecoveryContext,
  chatJid?: string,
  store: WebRecoveryStore = defaultStore
): void {
  const cursors = store.getAllChatCursors();
  const jids = chatJid && chatJid !== "all" ? [chatJid] : Object.keys(cursors);

  for (const jid of jids) {
    const since = cursors[jid];
    if (since === undefined) continue; // No cursor → never processed, skip
    const messages = store.getMessagesSince(jid, since, ctx.assistantName);
    if (messages.length === 0) continue;
    // Use a stable per-chat key so repeated resume_pending triggers (for
    // example, reload IPC plus startup self-queued IPC) collapse to one queued
    // recovery task instead of duplicating the same chat turn.
    console.log(`[web] Queuing resume for ${jid}`);
    ctx.enqueue(async () => {
      await ctx.processChat(jid, ctx.defaultAgentId);
    }, `resume:${jid}`);
  }
}

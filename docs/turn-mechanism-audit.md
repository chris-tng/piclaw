# Turn Mechanism, Queue & Steering Audit — March 2026 (rev 2)

Full-stack audit of the turn lifecycle, follow-up queue system, and steering
mechanism. Covers server-side state machine, crash recovery, client-side
queue management, and data flow from compose box to agent session and back.

## Table of Contents

1. [State Machine](#1-state-machine)
2. [Message Ingestion — `handleAgentMessage`](#2-message-ingestion)
3. [Turn Execution — `processChat`](#3-turn-execution)
4. [Queue Storage — Two-Layer Design](#4-queue-storage)
5. [Queue Mutation Endpoints](#5-queue-mutation-endpoints)
6. [Steering Mechanism](#6-steering-mechanism)
7. [Crash Recovery](#7-crash-recovery)
8. [Serial Execution Queue — `AgentQueue`](#8-serial-execution-queue)
9. [Client-Side Architecture](#9-client-side-architecture)
10. [SSE Event Flow](#10-sse-event-flow)
11. [Data Flow Diagrams](#11-data-flow-diagrams)
12. [Findings & Risks](#12-findings-and-risks)

---

## 1. State Machine

Source: `db/chat-cursors.ts`

Each chat JID has a single row in `chat_cursors`. All state transitions are
single SQL statements — SQLite WAL guarantees atomicity with no application-level
rollback code.

```
IDLE
  │
  ├── beginChatRun(chatJid, newCursorTs, inflight{prevTs, messageId, startedAt})
  │     → Single INSERT … ON CONFLICT DO UPDATE
  │     → Sets: cursor_ts = newCursorTs
  │              inflight_prev_ts = prevTs
  │              inflight_message_id = messageId
  │              inflight_started_at = startedAt
  │
  ▼
IN-FLIGHT
  │
  ├── endChatRun(chatJid)
  │     → Single UPDATE
  │     → Clears: inflight_*, failed_* (all 10 fields NULLed)
  │     → Transitions to IDLE
  │
  ├── endChatRunWithError(chatJid, failed{prevTs, failedTs, messageId, threadRootId, createdAt})
  │     → Single UPDATE
  │     → Clears: inflight_*
  │     → Sets: failed_*
  │     → Transitions to FAILED
  │
  └── rollbackInflightRun(chatJid, prevTs)
        → DELETE partial bot messages after prevTs (non-terminal only)
        → DELETE their message_media join rows
        → Single UPDATE restoring cursor_ts = prevTs, clearing inflight_*
        → Transitions to IDLE
        → Note: NOT a single statement — 3 statements, but all within the same
                transaction in recovery context

FAILED
  │
  ├── clearFailedRun(chatJid)
  │     → Single UPDATE NULLing failed_* fields
  │     → Transitions to IDLE
  │
  └── endChatRun(chatJid)  [next successful run]
        → Also clears failed_* atomically with inflight_*
        → Transitions to IDLE
```

### Column inventory for `chat_cursors`

| Column | Type | Purpose |
|--------|------|---------|
| `chat_jid` | TEXT PK | Chat identity |
| `cursor_ts` | TEXT | ISO timestamp of last fully-processed message |
| `inflight_prev_ts` | TEXT NULL | Cursor value before the current run started |
| `inflight_message_id` | TEXT NULL | User message that triggered the run |
| `inflight_started_at` | TEXT NULL | When the run began (used for staleness checks) |
| `failed_prev_ts` | TEXT NULL | Pre-run cursor for the failed attempt |
| `failed_ts` | TEXT NULL | Timestamp of the message that failed |
| `failed_message_id` | TEXT NULL | ID of the message that failed |
| `failed_thread_root` | INT NULL | Thread root for the failed turn |
| `failed_created_at` | TEXT NULL | When the failure was recorded |
| `queued_followups_json` | TEXT NULL | JSON array of deferred follow-up items |

### Key invariant

At any instant, exactly one of these is true:
- Both `inflight_*` and `failed_*` are NULL → IDLE
- `inflight_*` is set, `failed_*` is NULL → IN-FLIGHT
- `inflight_*` is NULL, `failed_*` is set → FAILED

This is enforced by the fact that `endChatRun` clears both groups, and
`endChatRunWithError` clears inflight while setting failed — both in a
single UPDATE.

---

## 2. Message Ingestion

Source: `channels/web/handlers/agent.ts` → `handleAgentMessage()`

The HTTP handler is the entry point for all user messages from the web UI.
Decision tree:

```
POST /agent/:agentId/message
  │
  ├── Parse & validate payload (content, mediaIds, contentBlocks, linkPreviews)
  │
  ├── isStreaming = agentPool.isStreaming(chatJid)   [in-memory flag, not DB]
  │   inflightMessageId = getInflightMessageId(chatJid)  [DB read]
  │
  ├── Is it a control command? (parseControlCommand)
  │     ├── /queue while streaming → queueDeferredFollowup()
  │     ├── /steer while streaming → queueDeferredSteer()
  │     └── Other commands → execute inline, markCommandHandled()
  │
  ├── Should defer as follow-up?
  │   Condition: !command && isStreaming && (mode="queue" || mode="auto")
  │     → queueDeferredFollowup(content, extras)
  │     → Returns 201 { queued: "followup" }
  │     → Message is NOT stored in the timeline yet
  │
  ├── Should steer?
  │   Condition: !command && isStreaming && mode="steer"
  │     → agentPool.queueStreamingMessage(chatJid, content, "steer")
  │     → Returns 201 { queued: "steer" }
  │
  ├── Normal message (not streaming or mode=null)
  │     → storeAgentUserMessage() → persists to messages table
  │     → broadcastEvent("new_post", interaction)
  │     → queue.enqueue(processChat) → enqueues turn execution
  │     → Returns 201 { user_message }
  │
  └── Fallback: mode=queue/auto but not streaming
        → queueFollowupMessage() returns null (isStreaming=false)
        → Falls through to normal message path
```

### Critical design decision: `isStreaming` vs DB inflight marker

The handler uses `agentPool.isStreaming(chatJid)` — an in-memory flag on the
`AgentSession` — rather than the DB `inflight_message_id` to decide whether
to defer/queue. Rationale (documented in code comment):

> The DB marker survives restarts and can be stale (cleared only when recovery
> runs), so trusting it here would silently defer messages against ghost turns
> that no processChat is actively draining. isStreaming() resets on restart and
> accurately reflects whether the agent pool has an active run.

This is correct. The DB inflight marker is used **only** for crash recovery,
never for queueing decisions.

### `queueDeferredFollowup` detail

1. Allocates a synthetic negative row ID (decrements from -1)
2. Persists the item in `queued_followups_json` column of `chat_cursors`
3. Broadcasts `agent_followup_queued` SSE event with content preview
4. Returns 201 `{ queued: "followup" }`
5. The message is NOT stored in the `messages` table — no timeline row exists

---

## 3. Turn Execution

Source: `channels/web/handlers/agent.ts` → `processChat()`

This is the core agent turn function. It runs inside the `AgentQueue` (serial,
one at a time).

```
processChat(channel, chatJid, agentId, threadRootId?)
  │
  ├── Define materializeNextDeferredFollowup()
  │     → Pops next item from deferred queue
  │     → Stores it as a real message in the timeline
  │     → Broadcasts agent_followup_consumed + new_post
  │     → Calls resumeChat() → enqueues ANOTHER processChat for that message
  │     → On failure: prepends item back to queue
  │
  ├── Read messages since cursor
  │     getMessagesSince(chatJid, prevCursor, assistantName)
  │
  ├── No messages? → Try materializeNextDeferredFollowup() → return
  │
  ├── Process exactly ONE message (messages[0])
  │     → formatMessages([currentMessage], channelName) → prompt string
  │
  ├── beginChatRun() → atomically advance cursor + set inflight marker
  │
  ├── Set up streaming handlers:
  │     onEvent: streamingHandler (SSE events for thought/draft/status)
  │     onTurnComplete: store intermediate turns (first turn skips placeholder)
  │
  ├── agentPool.runAgent(prompt, chatJid, { timeoutMs, onEvent, onTurnComplete })
  │
  ├── Error handling:
  │     ├── "already processing" → rollback cursor, throw (queue retries)
  │     ├── "No API provider" → rollback cursor, throw (queue retries)
  │     ├── Timeout/error + draft exists → publishDraftFallback() → finalizeSuccessfulRun()
  │     └── Error, no draft → endChatRunWithError()
  │
  ├── Output handling:
  │     ├── hasOutput → storeAgentTurn() as terminal reply
  │     │     On failure → endChatRunWithError() (DB write error)
  │     ├── No output + draft exists → publishDraftFallback("empty-final")
  │     └── No output + no draft → log warning, finalizeSuccessfulRun() as no-op
  │
  └── finalizeSuccessfulRun()
        ├── endChatRun() → clear inflight + failed markers
        ├── consumePendingSteering() → advance cursor past steering messages
        ├── Check for remaining persisted messages → resumeChat() if any
        └── materializeNextDeferredFollowup() → pop + process next queued item
```

### One-message-per-turn rule

`processChat` always takes `messages[0]` — the earliest message after the cursor.
It never batches multiple messages. This ensures:
- Each user message gets its own agent response
- Thread IDs are correctly rooted
- Queue drain ordering is deterministic

### `finalizeSuccessfulRun` drain order

After a turn completes:
1. Clear inflight + failed markers (`endChatRun`)
2. Consume pending steering timestamps (advance cursor past them)
3. Check for persisted messages past cursor → if any, `resumeChat` (takes priority)
4. Only then check deferred queue → `materializeNextDeferredFollowup`

This ordering ensures **persisted messages always drain before deferred ones**.
A deferred item becomes persisted when materialized, then the next `processChat`
picks it up in step 3.

### `turnCount` and placeholder skip logic

```
turnCount = 0 (first turn)  → skipPlaceholder = true  → don't consume follow-up placeholder
turnCount > 0 (later turns) → skipPlaceholder = false → consume if available
```

This prevents the original response from stealing a placeholder that belongs
to a queued follow-up.

### No-op finalization

When the agent completes with zero output and no draft buffer:
- Logs a warning: `"Agent completed for ${chatJid} without output — finalizing as no-op to advance cursor"`
- Calls `finalizeSuccessfulRun()` → cursor advances, preventing infinite retry

**Risk**: Legitimate agent content could be lost if the agent produces output
that doesn't reach the `onTurnComplete` or final output path (e.g., all content
arrives as thought/draft but never as a final turn). This happened in the
incident at 07:58-07:59 on 2026-03-14: the Azure OpenAI model returned an
aborted/empty response, and the no-op path correctly advanced the cursor — but
the user's messages were consumed without responses.

The no-op path is still the correct design choice — the alternative (retrying
indefinitely) was the recovery loop bug that this fix resolved. The tradeoff
is explicit: lose one message vs. get stuck forever.

---

## 4. Queue Storage — Two-Layer Design

### Layer 1: Deferred Queue (persistent)

Storage: `queued_followups_json` column in `chat_cursors` table

- JSON array of `DeferredQueuedFollowupRecord` objects
- Each item has: `rowId` (negative synthetic), `queuedContent`, `threadId`,
  `queuedAt`, optional `mediaIds`, `contentBlocks`, `linkPreviews`
- Survives process restarts
- Written/read via `getDeferredQueuedFollowups()` / `setDeferredQueuedFollowups()`
- Consumed FIFO by `consumeQueuedFollowupItem()`

Negative row IDs are allocated by `allocateDeferredQueuedRowId()`:
```
existing min = -3 → next = -4
no existing items → first = -1
```

### Layer 2: Placeholder Store (in-memory)

Class: `FollowupPlaceholderStore` (channels/web/followup-placeholders.ts)

- In-memory Map<chatJid, QueuedFollowupItem[]>
- Items have positive real row IDs (from the stored message)
- Lost on restart (recovered via deferred queue)
- Used for the `/queue` command path (stores a real message, then queues the
  placeholder ID for replacement when the agent responds)

### Merge logic

`getQueuedFollowupItems(chatJid)` merges both layers:
```typescript
const rows = [
  ...this.getDeferredQueuedFollowupItems(chatJid),
  ...this.followupPlaceholderStore.peek(chatJid),
];
return rows.sort((a, b) => String(a.queuedAt).localeCompare(String(b.queuedAt)));
```

Items from both stores are sorted by `queuedAt` (chronological).

### Deduplication

No explicit deduplication by `rowId` on merge — the two stores use different
ID spaces (negative for deferred, positive for placeholder). A row ID can only
exist in one store at a time.

**Risk**: If the same item somehow ends up in both stores (e.g., a bug in the
consume/prepend path), it would appear twice in `getQueuedFollowupItems`. The
code does not guard against this. Probability: very low — the stores have
different insertion paths.

---

## 5. Queue Mutation Endpoints

### POST /agent/queue-remove

Source: `WebChannel.handleAgentQueueRemove()`

1. Parse `row_id` from request body
2. Call `removeQueuedFollowupForAction(chatJid, rowId)`:
   - Search deferred queue first → splice from array, persist
   - If not found, search placeholder store → `remove(chatJid, rowId)`
   - Delete backing message row if `rowId > 0` (real DB row)
   - If placeholder source, also call `agentPool.removeQueuedFollowupMessage()`
3. Broadcast `agent_followup_removed` SSE event
4. Return `{ removed: true, row_id, count }`

### POST /agent/queue-steer

Source: `WebChannel.handleAgentQueueSteer()`

1. Parse `row_id` from request body
2. Call `removeQueuedFollowupForAction(chatJid, rowId)` — same as above
3. Broadcast `agent_followup_removed`
4. Store a real user message in the timeline (with `isSteeringMessage` flag)
5. Broadcast `new_post` for the timeline
6. If streaming: `agentPool.queueStreamingMessage(chatJid, content, "steer")`
   - Queue pending steering timestamp
   - Broadcast `agent_steer_queued`
   - Return `{ queued: "steer" }`
7. If not streaming: enqueue `processChat` as a normal turn
   - Return without `queued` flag

### Failure recovery in steer

If `storeMessage` fails:
- The removed item is prepended back to the queue (`prependQueuedFollowupItem`)
- `agent_followup_queued` is re-broadcast to restore the UI
- Returns 500

This prevents message loss if the DB write fails after queue removal.

---

## 6. Steering Mechanism

### Two steering paths

1. **Compose-box steer** (`mode: "steer"`):
   - `handleAgentMessage` → `agentPool.queueStreamingMessage(chatJid, content, "steer")`
   - The content is passed to `session.prompt(text, { streamingBehavior: "steer" })`
   - The pi SDK injects it into the active session as a mid-turn user message

2. **Queue-item steer** (POST /agent/queue-steer):
   - Removes from server queue
   - Stores as timeline message
   - `agentPool.queueStreamingMessage(chatJid, content, "steer")`

### Pending steering timestamps

Source: `PendingSteeringStore`

When a steer message is stored in the timeline, its timestamp is queued in
the `PendingSteeringStore`. After `finalizeSuccessfulRun`:

```typescript
const pendingSteerTimestamp = channel.consumePendingSteering(chatJid);
if (pendingSteerTimestamp) {
  const current = getChatCursor(chatJid);
  if (!current || current < pendingSteerTimestamp) {
    setChatCursor(chatJid, pendingSteerTimestamp);
  }
}
```

This advances the cursor past the steering message so `getMessagesSince` doesn't
treat it as a new unprocessed message on the next turn.

`consumeLatest` returns the **latest** timestamp and clears all entries for the
chat. This handles multiple steers in the same turn correctly — the cursor is
advanced to the latest one.

**Risk**: `consumeLatest` sorts entries and returns `entries[entries.length - 1]`.
If steer timestamps are very close together (same millisecond), the ordering is
deterministic (string comparison on ISO timestamps). No risk in practice.

---

## 7. Crash Recovery

Source: `channels/web/recovery.ts`

### `recoverInflightRuns(ctx, store)`

Called once at startup by `web.recoverInflightRuns()`.

```
For each inflight marker in chat_cursors:
  │
  ├── hasAgentRepliesAfter(chatJid, startedAt)?
  │     → Terminal bot message exists after run started
  │     → clearInflightMarker() — don't rollback, run completed
  │
  ├── inflightAge > MAX_INFLIGHT_AGE_MS (30 min)?
  │     → clearInflightMarker() — don't rollback, avoid infinite retry
  │     → Log warning
  │
  └── Otherwise:
        → rollbackInflightRun(chatJid, prevTs)
        → Deletes non-terminal bot messages after prevTs
        → Restores cursor to prevTs
```

All rollbacks happen inside a single transaction (`store.transaction(run)`).

After the transaction, for each inflight that was NOT a terminal-reply case,
enqueue a `processChat` task with key `resume:${chatJid}`.

### `resumePendingChats(ctx, chatJid?, store)`

Called via IPC `resume_pending` task (queued at startup by
`queueStartupResumePendingIpc()`).

```
For each cursor in chat_cursors:
  │
  ├── getMessagesSince(jid, since, assistantName)
  │
  └── messages.length > 0?
        → enqueue processChat with key resume:${chatJid}
```

### Deduplication of recovery tasks

Both `recoverInflightRuns` and `resumePendingChats` use the key pattern
`resume:${chatJid}`. The `AgentQueue.enqueue()` deduplicates by key — if a
task with the same key is already pending or currently running, the new
enqueue is silently dropped.

This means:
- Startup recovery + IPC resume collapse to one task per chat
- Multiple IPC `resume_pending` events (e.g., rapid restarts) don't stack up

### `hasAgentRepliesAfter` — Terminal reply detection

```sql
SELECT 1 FROM messages
WHERE chat_jid = ? AND timestamp > ? AND is_bot_message = 1
  AND COALESCE(is_terminal_agent_reply, 0) = 1
LIMIT 1
```

Only terminal agent replies count. Intermediate turns (tool call results,
multi-turn outputs) are NOT sufficient to prove run completion. This prevents
the recovery from falsely clearing inflight markers when only partial output
was stored before a crash.

### Recovery sequence at startup

```
main()
  → initializeRuntimeEnvironment(state)
  → startWebChannel(queue, agentPool)
      → web.start()           ← HTTP server up
      → web.recoverInflightRuns()  ← immediate crash recovery
  → queueStartupResumePendingIpc()  ← IPC file for deferred resume
  → startOptionalPushoverChannel()
  → createWhatsAppChannel()   ← no-op stub if WHATSAPP_PHONE empty
  → startIpcWatcher()         ← picks up the resume_pending file
  → startSchedulerLoop()
  → whatsapp.connect()        ← no-op if stub
  → messageLoop()
```

The two-phase design ensures:
1. Inflight markers are handled immediately (before any new messages arrive)
2. Pending chats are resumed only after all channels are online (IPC path)

---

## 8. Serial Execution Queue

Source: `queue.ts`

The `AgentQueue` is a serial FIFO queue. Only one task runs at a time.

### Retry policy

- Max retries: 3 (`DEFAULT_MAX_RETRIES`)
- Base delay: 5 seconds (`DEFAULT_BASE_RETRY_MS`)
- Exponential backoff: `5s * 2^(retry-1)` → 5s, 10s, 20s

When `processChat` throws:
- "already processing" → rollback cursor, queue retries after backoff
- "No API provider" → rollback cursor, queue retries after backoff
- Other errors → NOT thrown; error path in `processChat` calls `endChatRunWithError`

So the queue retry mechanism is only used for transient concurrency/provider
errors, not for agent runtime failures.

### Deduplication

```typescript
if (id) {
  if (this.current?.id === id) return;  // skip if currently running
  if (this.pending.some((p) => p.id === id)) return;  // skip if queued
}
```

Key patterns:
- `chat:${chatJid}:${interactionId}` — normal message processing
- `resume:${chatJid}` — recovery/resume tasks
- `task:${taskId}` — scheduled tasks

---

## 9. Client-Side Architecture

Source: `web/src/app.ts`, `web/src/components/compose-box.ts`, `web/src/ui/*.ts`

### State ownership

| State | Location | Purpose |
|-------|----------|---------|
| `followupQueueItems` | `useState([])` | Array of `{ row_id, content, timestamp, thread_id }` |
| `isAgentTurnActive` | `useState(false)` | Whether an agent turn is in progress |
| `followupQueueRowIdsRef` | `useRef(new Set())` | Synced during render from `followupQueueItems` |
| `followupQueueItemsRef` | `useRef([])` | Synced during render from `followupQueueItems` |
| `dismissedQueueRowIdsRef` | `useRef(new Set())` | Row IDs optimistically removed from UI |

### Ref-sync pattern

```typescript
// Synced every render, available immediately in stable callbacks
followupQueueRowIdsRef.current = new Set(followupQueueItems.map(i => i.row_id));
followupQueueItemsRef.current = followupQueueItems;
```

This avoids recreating callbacks when queue state changes, which would
destabilize the SSE connection.

### `filterQueuedPosts` — Timeline filtering

```typescript
const filterQueuedPosts = useCallback((items) => {
  const queueRowIds = followupQueueRowIdsRef.current;
  const hiddenIds = new Set(queueRowIds);
  // Also hide parent user messages (thread roots) of queued items
  for (const qi of followupQueueItemsRef.current) {
    if (qi?.thread_id != null) hiddenIds.add(qi.thread_id);
  }
  return items.filter(post => {
    if (hiddenIds.has(post?.id)) return false;
    // Hide legacy placeholder markers
    if (post?.data?.is_bot_message) {
      if (content === LEGACY_QUEUE_STATUS || content === QUEUE_PLACEHOLDER_MARKER) return false;
    }
    return true;
  });
}, []);  // Empty deps — reads from refs
```

The callback identity is stable (empty deps). This is critical — it's used
in the `useMemo` that derives displayed posts:

```typescript
const posts = useMemo(
  () => filterQueuedPosts(rawPosts),
  [rawPosts, followupQueueItems, filterQueuedPosts]
);
```

`followupQueueItems` is listed as a dependency even though `filterQueuedPosts`
reads from refs. This ensures `useMemo` re-runs when the queue changes (the
refs are already updated by the sync pattern above).

### `dismissedQueueRowIdsRef` lifecycle

1. **Set on cancel/steer**: When user clicks × or Steer, the row ID is added
2. **Filtered in `refreshQueueState`**: Server response items are filtered
   against the dismissed set — prevents re-adding items that were just removed
3. **Cleared on turn completion**: `agent_status` done/error event clears the set
4. **Cleared when server queue empties**: If `refreshQueueState` returns zero
   items (after filtering), the set is cleared

### `handleInjectQueuedFollowup` (Steer button)

```typescript
1. Add rowId to dismissedQueueRowIdsRef
2. Remove from followupQueueItems (optimistic)
3. Call steerAgentQueueItem(rowId)
4. On success: refreshQueueState()
5. On failure: remove from dismissedSet, refreshQueueState()
```

### `handleRemoveQueuedFollowup` (× Cancel button)

```typescript
1. Add rowId to dismissedQueueRowIdsRef
2. Remove from followupQueueItems (optimistic)
3. Call removeAgentQueueItem(rowId)
4. On success: refreshQueueState()
5. On failure: remove from dismissedSet, refreshQueueState()
```

Both follow the same optimistic-removal pattern. The key difference is the
server endpoint called:
- Steer → `POST /agent/queue-steer` → message sent to agent
- Cancel → `POST /agent/queue-remove` → message discarded

### Submit flow

```typescript
ComposeBox.handleSubmit(content, submitMode)
  │
  ├── resolveSubmitMode(mode):
  │     mode = "queue"|"steer"|"auto" → use as-is
  │     mode = null/undefined → isAgentActive ? "queue" : null
  │
  ├── Clear compose box immediately (fire-and-forget)
  │
  └── async fire-and-forget:
        ├── Upload media files
        ├── Build message with file refs, message refs, media blocks
        ├── sendAgentMessage(agentId, message, null, mediaIds, resolvedMode)
        └── onMessageResponse(response)
              └── If response.queued → refreshQueueState()
```

The compose box NEVER blocks on the network response. The user can keep
typing immediately.

---

## 10. SSE Event Flow

Source: `web/src/app.ts` → `handleSseEvent()`

### Queue-related SSE events

| Event | Server Origin | Client Handler |
|-------|--------------|----------------|
| `agent_followup_queued` | `handleAgentMessage` | Add to `followupQueueItems` + `refreshQueueState()` |
| `agent_followup_consumed` | `processChat.materializeNextDeferredFollowup` | Remove from `followupQueueItems` + `refreshQueueState()` + `refreshTimeline()` |
| `agent_followup_removed` | `handleAgentQueueRemove/Steer` | Add to `dismissedQueueRowIdsRef` + remove from items + `refreshQueueState()` |
| `agent_steer_queued` | `handleAgentMessage/handleAgentQueueSteer` | Set `steerQueuedTurnId` |
| `agent_status` (done/error) | `processChat` | `clearAgentRunState()` + clear `dismissedQueueRowIdsRef` + `refreshQueueState()` |

### SSE connection stability

Source: `web/src/ui/use-sse-connection.ts`

All callbacks (`handleSseEvent`, `handleConnectionStatusChange`, `loadPosts`) are
stored in refs. The `useEffect` has an empty dependency array `[]`:

```typescript
useEffect(() => {
  loadPostsRef.current();
  const sse = new SSEClient(
    (type, data) => sseEventRef.current(type, data),
    (status) => statusChangeRef.current(status),
  );
  sse.connect();
  // ... focus/visibility handlers ...
  return () => { sse.disconnect(); };
}, []);
```

This means:
- SSE connection is created exactly once on mount
- Callback changes never trigger reconnection
- Focus/visibility handlers reconnect if needed (tab switch recovery)

### Backstop poller

A `setInterval` runs alongside SSE as a safety net:
- 15 seconds when agent is active → refreshes timeline, queue state, agent status
- 60 seconds when idle → refreshes timeline, agent status, context usage

---

## 11. Data Flow Diagrams

### Normal message (no queue)

```
User types → Enter
  │
  ComposeBox.handleSubmit(content, null)
    │  resolveSubmitMode(null) → null (not active) or "queue" (active)
    │
    ├── isAgentActive=false → mode=null
    │     │
    │     sendAgentMessage("default", message, null, [], null)
    │       │
    │       POST /agent/default/message { content, mode: null }
    │         │
    │         handleAgentMessage():
    │           isStreaming=false, shouldDeferQueuedFollowup=false
    │           → storeAgentUserMessage() → persisted
    │           → broadcastNewPost() → SSE new_post
    │           → queue.enqueue(processChat)
    │             │
    │             processChat():
    │               beginChatRun()
    │               agentPool.runAgent()
    │               storeAgentTurn() → SSE agent_response
    │               finalizeSuccessfulRun()
    │                 endChatRun()
    │                 SSE agent_status { type: "done" }
    │
    └── Response: { user_message }
```

### Queued follow-up (agent active)

```
User types → Enter (while agent is streaming)
  │
  ComposeBox.handleSubmit(content, null)
    │  resolveSubmitMode(null) → "queue" (isAgentActive=true)
    │
    sendAgentMessage("default", message, null, [], "queue")
      │
      POST /agent/default/message { content, mode: "queue" }
        │
        handleAgentMessage():
          isStreaming=true, mode="queue", shouldDeferQueuedFollowup=true
          → queueDeferredFollowup(content)
            → allocateDeferredQueuedRowId() → -1
            → setDeferredQueuedFollowups() → persist to chat_cursors
            → SSE agent_followup_queued { row_id: -1, content }
          → Returns 201 { queued: "followup" }
      │
      Client:
        onMessageResponse({ queued: "followup" }) → refreshQueueState()
        SSE agent_followup_queued → add to followupQueueItems
      │
      Later, when current turn completes:
        processChat.finalizeSuccessfulRun()
          → materializeNextDeferredFollowup()
            → consumeQueuedFollowupItem() → pop from deferred queue
            → storeMessage() → persist as real timeline row
            → SSE agent_followup_consumed { row_id: -1 }
            → SSE new_post { ... real message ... }
            → resumeChat() → enqueue processChat for this message
```

### Cancel queued item

```
User clicks × on queue stack item
  │
  handleRemoveQueuedFollowup({ row_id: -1 })
    │  dismissedQueueRowIdsRef.add(-1)
    │  setFollowupQueueItems(filter out -1)
    │
    removeAgentQueueItem(-1)
      │
      POST /agent/queue-remove { row_id: -1 }
        │
        handleAgentQueueRemove():
          removeQueuedFollowupForAction(chatJid, -1)
            → Search deferred queue → found at index 0
            → splice(0, 1) → persist remaining items
            → rowId = -1 (negative, so no DB message row to delete)
          → SSE agent_followup_removed { row_id: -1 }
          → Returns { removed: true, row_id: -1, count: 0 }
      │
      Client:
        SSE agent_followup_removed → add to dismissedSet, filter items
        refreshQueueState() → server returns 0 items → clear dismissedSet
```

### Steer queued item

```
User clicks Steer button on queue stack item
  │
  handleInjectQueuedFollowup({ row_id: -1, content: "..." })
    │  dismissedQueueRowIdsRef.add(-1)
    │  setFollowupQueueItems(filter out -1)
    │
    steerAgentQueueItem(-1)
      │
      POST /agent/queue-steer { row_id: -1 }
        │
        handleAgentQueueSteer():
          removeQueuedFollowupForAction(chatJid, -1) → removed
          → SSE agent_followup_removed
          → storeMessage(content, isSteeringMessage: true)
          → SSE new_post
          → agentPool.queueStreamingMessage(chatJid, content, "steer")
            → session.prompt(content, { streamingBehavior: "steer" })
          → queuePendingSteering(chatJid, timestamp)
          → SSE agent_steer_queued
          → Returns { removed: true, queued: "steer" }
```

---

## 12. Findings & Risks

### ✅ Verified correct

1. **Single-SQL state transitions**: All cursor/inflight/failed changes are
   atomic single-statement UPDATEs, crash-safe under WAL.

2. **`isStreaming` over DB marker for queueing**: Correct — prevents ghost
   turn deferral after restart.

3. **`dismissedQueueRowIdsRef` lifecycle**: Properly clears on turn completion
   and when server queue empties. Prevents re-appearance of steered/removed items.

4. **SSE connection stability**: Ref-based callbacks + empty deps on `useEffect`
   prevent reconnection cascade.

5. **Cancel vs Steer separation**: × button → `removeAgentQueueItem`,
   Steer → `steerAgentQueueItem`. Verified in `compose-box.ts`.

6. **Serial queue deduplication**: `resume:${chatJid}` key pattern prevents
   duplicate recovery tasks.

7. **Terminal reply detection**: `hasAgentRepliesAfter` checks
   `is_terminal_agent_reply = 1`, not just any bot message.

8. **Steer failure recovery**: If `storeMessage` fails during steer, the item
   is prepended back to the queue and the UI is notified via SSE.

### ⚠️ Low-risk concerns (resolved)

1. ~~**No deduplication on queue merge**~~ **Fixed**: `getQueuedFollowupItems`
   now deduplicates by `rowId` using a `Set` before sorting.

2. ~~**No retry counter on deferred items**~~ **Fixed**: Added
   `materializeRetries` field to `DeferredQueuedFollowupRecord`. The
   `materializeNextDeferredFollowup` function increments the counter on failure
   and drops the item after `MAX_MATERIALIZE_RETRIES` (5) attempts, broadcasting
   `agent_followup_consumed` so the client cleans up.

3. **`rollbackInflightRun` is not a single statement**: It's 3 statements
   (delete message_media, delete messages, update cursor). However, it's called
   inside a transaction, so it's atomic at the SQLite level. (Not a bug.)

4. ~~**No user-visible feedback for failed queue operations**~~ **Fixed**: Both
   `handleInjectQueuedFollowup` (steer) and `handleRemoveQueuedFollowup` (cancel)
   now call `showIntentToast` with a warning message on failure, using the existing
   intent toast pane system.

5. **`consumeLatest` pending steering clears ALL entries**: Correct behavior —
   all intermediate steering timestamps are implicitly covered by the latest one.
   (Not a bug.)

### 🔴 Active issues (resolved)

1. ~~**No-op turns consume messages silently**~~ **Fixed**: When the model returns
   zero output and no draft, a system notice is now stored in the timeline:
   `"⚠️ Your message was received but the agent produced no response. You may
   need to re-send it."` with a quoted preview of the original message content.
   Stored as a terminal bot message and broadcast via `agent_response`.

2. ~~**183 MB session file**~~ **Tracked**: Created kanban ticket
   `kanban/00-inbox/session-file-rotation.md` covering size monitoring, rotation,
   archival, and queue validation during rotation. Includes acceptance criteria
   to verify queued messages are preserved and that rotation does not occur
   during inflight turns.

---

## See also

- [Runtime flows](runtime-flows.md) — high-level message flow and recovery
- [Architecture](architecture.md) — component layout
- [Storage model](storage.md) — `chat_cursors` schema

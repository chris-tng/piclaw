# Turn Mechanism Audit — March 2026

## Architecture Overview

The turn mechanism processes one user message at a time per chat, using a serial
queue (`AgentQueue`) and a cursor-based state machine persisted in SQLite
(`chat_cursors` table). The flow:

```
User Input
    │
    ▼
handleAgentMessage (HTTP POST)
    ├── Command? → handle inline, markCommandHandled(), advance cursor
    ├── Streaming + auto/queue mode? → queueDeferredFollowup() (in-memory)
    ├── Streaming + steer mode? → queueDeferredSteer() (inject into session)
    └── Normal message → storeMessage(), broadcastNewPost(), enqueue processChat()

processChat (queue worker)
    ├── getMessagesSince(cursor) → pick currentMessage[0]
    ├── beginChatRun() → advance cursor + set inflight marker (1 SQL)
    ├── runAgent() → prompt session, stream events, track turns
    │   ├── onTurnComplete → storeAgentTurn() for intermediate turns
    │   └── return AgentOutput (final result)
    ├── On error:
    │   ├── "already processing" → rollback cursor, throw (queue retries)
    │   ├── "No API provider" → rollback cursor, throw
    │   ├── Timeout with draft → publishDraftFallback + finalizeSuccessfulRun
    │   └── Other error → endChatRunWithError()
    ├── On success with output → storeAgentTurn (terminal) + finalizeSuccessfulRun
    ├── On success with draft only → publishDraftFallback + finalizeSuccessfulRun
    └── On success with no output → finalizeSuccessfulRun (no-op, cursor advances)

finalizeSuccessfulRun
    ├── endChatRun() → clear inflight + clear failed markers (1 SQL)
    ├── consumePendingSteering → advance cursor past steer messages
    ├── Check remaining persisted messages → resumeChat() if any
    └── Otherwise → materializeNextDeferredFollowup()
```

## State Machine (chat_cursors row)

```
                      ┌──────────────────────────────┐
                      │         IDLE                  │
                      │  cursor_ts = last processed   │
                      │  inflight_* = NULL            │
                      │  failed_* = NULL              │
                      └──────────┬───────────────────┘
                                 │ beginChatRun()
                                 ▼
                      ┌──────────────────────────────┐
                      │       IN-FLIGHT               │
                      │  cursor_ts = new message ts   │
                      │  inflight_prev_ts = old cursor│
                      │  inflight_message_id = msg id │
                      │  inflight_started_at = now    │
                      └───┬────────────┬──────────────┘
                          │            │
            endChatRun()  │            │ endChatRunWithError()
                          ▼            ▼
                      ┌─────────┐  ┌──────────────────┐
                      │  IDLE   │  │     FAILED        │
                      │ all NULL│  │  failed_* = set   │
                      └─────────┘  │  inflight_* = NULL│
                                   └────────┬─────────┘
                                            │ skipFailedOnModelSwitch()
                                            │ or endChatRun() (on next success)
                                            ▼
                                   ┌─────────────────┐
                                   │      IDLE       │
                                   └─────────────────┘
```

On crash (process killed during IN-FLIGHT):
- `recoverInflightRuns()` finds inflight markers at startup
- If terminal agent reply exists after startedAt → clear marker (don't rollback)
- If marker is stale (>30 min) → clear marker without rollback
- Otherwise → rollback cursor to inflight_prev_ts, delete non-terminal bot messages, enqueue retry

## Queuing / Deferral

Two in-memory stores handle messages arriving during an active turn:

1. **FollowupPlaceholderStore** — FIFO queue of `QueuedFollowupItem` objects.
   User messages are held here (not yet persisted to DB) until the current turn
   completes. `materializeNextDeferredFollowup()` writes them to DB and calls
   `resumeChat()` to process them.

2. **PendingSteeringStore** — Timestamps of steering messages already injected
   into the active session. After the turn completes, `finalizeSuccessfulRun()`
   advances the cursor past these timestamps so they're not replayed.

## Findings

### ✅ Sound Design Patterns

1. **Single-SQL state transitions** — Every `beginChatRun`, `endChatRun`,
   `endChatRunWithError`, `rollbackInflightRun`, `clearInflightMarker` is exactly
   one SQL statement. SQLite WAL guarantees crash-safe atomicity.

2. **One message per turn** — `processChat` always picks `messages[0]` only.
   This prevents cross-thread batching and ordering issues.

3. **Queue deduplication** — `AgentQueue.enqueue()` skips items with matching
   `id` keys. Both `resumeChat()` and `resumePendingChats()` use `resume:${chatJid}`
   as the key, preventing duplicate replays.

4. **Idle settlement polling** — `runAgent()` polls 10 × 50ms ticks of truly-idle
   session state before returning. This prevents "already processing" errors from
   premature resolution after auto-compaction or auto-retry.

5. **Terminal reply distinction** — `is_terminal_agent_reply` column separates
   intermediate tool-use responses from the final answer. Recovery only clears
   inflight markers when a terminal reply exists, and rollback only deletes
   non-terminal bot messages.

6. **Staleness guard on recovery** — Inflight markers older than 30 minutes are
   cleared without rollback, breaking infinite retry loops.

7. **No-op finalization** — Empty agent output (no result, no draft) now calls
   `finalizeSuccessfulRun()` to advance cursor, preventing infinite recovery loops.

### ⚠️ Issues Found

#### Issue 1: `storeMessage` returning null is silently swallowed in `materializeNextDeferredFollowup`

**Severity:** Low  
**Location:** `processChat` → `materializeNextDeferredFollowup()`

When `storeMessage` returns null, the queued item is prepended back. But
`materializeNextDeferredFollowup` returns false and `processChat` returns void
without advancing the cursor. On the next `processChat` call (triggered by
`resumeChat`), the same pattern repeats. There's no error broadcast or retry limit.

**Risk:** If `storeMessage` persistently fails (e.g., disk full), the deferred
queue item is stuck in an infinite prepend loop. Each `resumeChat` call enqueues
a new `processChat` task, but the queue deduplication with `resume:${chatJid}`
should collapse them. Still, there's no backoff or error reporting.

**Recommendation:** Add a retry counter to `QueuedFollowupItem`. After N failures,
drop the item and broadcast an error event.

#### Issue 2: `rollbackInflightRun` cursor rollback uses timestamp comparison

**Severity:** Low  
**Location:** `db/chat-cursors.ts` → `rollbackInflightRun()`

Rollback deletes non-terminal bot messages with `timestamp > prevTs`. If two
messages have identical timestamps (extremely unlikely with ISO ms precision),
the rollback might delete messages from a different turn.

**Risk:** Near zero in practice. ISO timestamps with millisecond precision from
`Date.now()` are effectively unique per turn.

#### Issue 3: `onTurnComplete` intermediate turns bypass failed-run recording

**Severity:** Low  
**Location:** `processChat` → `onTurnComplete` callback

When `onTurnComplete` fires for intermediate turns, `storeAgentTurn` is called.
If it returns false (DB failure), the return value is silently ignored. The
intermediate turn's output is lost, and the agent continues.

**Recommendation:** At minimum, log a warning when intermediate `storeAgentTurn`
fails. Consider aborting the session on persistent intermediate store failures.

#### Issue 4: `consumePendingSteering` clears ALL pending steers at once

**Severity:** Low  
**Location:** `PendingSteeringStore.consumeLatest()`

`consumeLatest()` sorts all pending timestamps, returns the latest, and deletes
the entire map entry. This is correct for cursor advancement (cursor should be
at the latest steer timestamp), but if a steer's timestamp is somehow before
the current cursor, the cursor won't regress because of the `current < pendingSteerTimestamp`
check. Sound.

#### Issue 5: Queue retries use exponential backoff but no jitter

**Severity:** Informational  
**Location:** `queue/retry-policy.ts`

`getRetryDelay` uses `base * 2^(n-1)` without jitter. For a single-consumer
serial queue this is fine — there's no thundering herd. Just noting for
documentation.

#### Issue 6: `resumeChat` passes `threadRootId` through to `processChat` but `processChat` ignores it for cursor lookup

**Severity:** Informational  
**Location:** `chat-run-control.ts` → `resumeChat` / `processChat`

`resumeChat` accepts a `threadRootId` parameter and passes it to `processChat`.
But `processChat` computes its own `resolvedThreadRootId` from the first pending
message. The parameter is only used to set the initial `threadRootId` for the
`onTurnComplete` callback's `storeAgentTurn`. This is correct but the data flow
could be clearer.

### ✅ Recently Fixed Issues

1. **Empty-output recovery loop** (fixed this session) — `processChat` now
   distinguishes empty output from persistence failure, and finalizes no-ops
   as successes.

2. **Stale inflight loop** (fixed this session) — 30-minute staleness guard
   prevents infinite recovery of genuinely stuck messages.

3. **SSE/UI infinite redraw loop** (fixed earlier) — Ref-stabilized callbacks,
   `useMemo` for filtered posts, stopped broadcasting placeholders as `agent_response`.

## Sequence Diagrams

### Normal Turn

```
User ─POST─▶ handleAgentMessage
              │ storeMessage (user msg to DB)
              │ broadcastNewPost
              │ queue.enqueue(processChat)
              └─▶ 201

Queue picks up processChat:
    getMessagesSince(cursor) → [msg]
    beginChatRun() → cursor = msg.ts, inflight set
    runAgent(prompt) → stream events…
    onTurnComplete → storeAgentTurn (intermediate)
    …agent finishes…
    storeAgentTurn (terminal)
    finalizeSuccessfulRun:
        endChatRun()
        consumePendingSteering()
        check remaining → materializeNextDeferredFollowup()
```

### Queued Follow-up (agent is streaming)

```
User ─POST─▶ handleAgentMessage (isStreaming=true, mode=auto)
              │ queueDeferredFollowup() → in-memory store
              │ broadcast agent_followup_queued
              └─▶ 201 {queued: "followup"}

…current turn finishes…
finalizeSuccessfulRun:
    endChatRun()
    no remaining persisted → materializeNextDeferredFollowup()
        │ consumeQueuedFollowupItem()
        │ storeMessage (user msg to DB)
        │ broadcast agent_followup_consumed + new_post
        │ resumeChat() → enqueue processChat for this msg
```

### Steering (inject into active session)

```
User ─POST─▶ handleAgentMessage (isStreaming=true, mode=steer)
              │ storeMessage (user msg)
              │ agentPool.queueStreamingMessage()
              │ queuePendingSteering(timestamp)
              │ broadcast agent_steer_queued
              └─▶ 201 {queued: "steer"}

…current turn finishes (steer already consumed by session)…
finalizeSuccessfulRun:
    consumePendingSteering() → advance cursor past steer ts
```

### Crash Recovery

```
Startup:
    recoverInflightRuns():
        for each inflight marker:
            hasAgentRepliesAfter? → clearInflightMarker (no rollback)
            stale (>30min)? → clearInflightMarker (no rollback)
            else → rollbackInflightRun (cursor back, delete partial bot msgs)
                   enqueue processChat

    resumePendingChats():
        for each cursor:
            getMessagesSince(cursor) → any pending? → enqueue processChat
```

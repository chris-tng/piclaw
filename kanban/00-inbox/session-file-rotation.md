---
id: session-file-rotation
title: Add session file size monitoring and rotation
status: inbox
priority: medium
created: 2026-03-13
updated: 2026-03-13
estimate: L
risk: medium
tags:
  - work-item
  - kanban
  - reliability
  - performance
  - sessions
owner: pi
---

# Add session file size monitoring and rotation

## Summary

Session JSONL files grow unbounded. The `web:default` session file reached
183 MB, which may degrade `agentPool.runAgent` performance over time (file
I/O, memory, context parsing). Add monitoring, size-based warnings, and
optional rotation/archival.

## Current Behavior

- Session files are appended to indefinitely.
- The pi SDK's auto-compaction summarizes context to stay within the model's
  context window, but the underlying JSONL file still grows.
- No alerts or metrics surface session file size.
- No automated rotation, truncation, or archival exists.

## Desired Behavior

- Session file size is tracked and surfaced (e.g., in `/status` or context
  usage display).
- When a session file exceeds a configurable threshold (e.g., 100 MB), a
  warning is logged and optionally surfaced to the user.
- A `/session rotate` or `/session archive` command creates a new session
  file, keeping the compaction summary as context, and moves the old file
  to an archive directory.
- Automatic rotation can be enabled via config (e.g., `SESSION_MAX_SIZE_MB`).

## Acceptance Criteria

- [ ] Session file size is available via agent pool or status endpoint.
- [ ] Warning logged when session file exceeds threshold.
- [ ] Manual rotation command available (`/session rotate` or similar).
- [ ] Rotation preserves conversation continuity (compaction summary carried forward).
- [ ] Old session files archived, not deleted.
- [ ] Optional automatic rotation via config.
- [ ] **Queue validation**: Verify that messages queued in the deferred queue
      (`queued_followups_json`) and in-memory placeholder store are properly
      preserved and processed during rotation. The queue state lives in
      `chat_cursors` (DB) and `FollowupPlaceholderStore` (memory) — both are
      independent of the session file, but the rotation must not trigger a
      state where `processChat` or `materializeNextDeferredFollowup` sees
      stale data or loses items.
- [ ] **Inflight safety**: Rotation must not occur while a turn is in-flight
      (`inflight_*` markers set). Either block rotation during active turns
      or defer it until `finalizeSuccessfulRun` completes.
- [ ] Add test coverage for rotation with active queue items.

## Relevant Areas

- `piclaw/piclaw/src/agent-pool/session.ts` — session creation and directory management
- `piclaw/piclaw/src/agent-pool.ts` — session lifecycle, `getOrCreate`, idle eviction
- `@mariozechner/pi-coding-agent` — `SessionManager`, `findMostRecentSession`
- `piclaw/piclaw/src/channels/web/handlers/agent.ts` — `processChat` turn lifecycle
- `piclaw/piclaw/src/db/chat-cursors.ts` — cursor and queue state
- `piclaw/piclaw/src/channels/web.ts` — `FollowupPlaceholderStore`, `PendingSteeringStore`

## Notes

- The pi SDK's `SessionManager.continueRecent()` already picks up the most
  recent session file on restart, so rotation that creates a new file with
  the compaction summary should work naturally.
- This is distinct from context compaction — compaction reduces what the
  model sees, but the file keeps growing. Rotation reduces file I/O cost.
- Low urgency — 183 MB is large but functional. Priority increases if
  performance degradation is observed.

## Updates

### 2026-03-13
- Ticket created from turn mechanism audit finding.
- Added queue validation and inflight safety acceptance criteria per user
  request — rotation must not lose queued messages or conflict with active turns.

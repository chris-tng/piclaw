---
id: parallel-web-chat-windows-with-session-forks
title: Support multiple parallel web chat windows backed by resumable forked sessions
status: inbox
priority: high
created: 2026-03-14
updated: 2026-03-14
target_release: next
estimate: L
risk: high
tags:
  - work-item
  - kanban
  - web
  - sessions
  - sqlite
  - threading
  - ux
  - architecture
owner: pi
---

# Support multiple parallel web chat windows backed by resumable forked sessions

## Summary

Add support for opening and managing **multiple parallel web chat windows** that
share a common conversation ancestry but run as distinct, resumable session
forks.

The user should be able to duplicate or fork the current chat into a new window
or pane, continue independently there, and later resume that branch without
corrupting, reparenting, or interleaving history from sibling branches.

There should also be a clear **session picker** for reopening/resuming existing
branches, but it must remain extremely easy to start a **new pop-up chat
window** without navigating a heavy management flow first.

That pop-up should be a **chat-only window**: it should include the relevant
compose/timeline/session controls, but **not** the editor or workspace explorer.

This needs a design that fits both:

1. Pi upstream session semantics, especially the append-only JSONL **session
   tree** and explicit `/fork` vs `/tree` behavior.
2. PiClaw’s current SQLite-backed web timeline/runtime model, where per-chat run
   state is currently keyed primarily by `chat_jid` and timeline rows live in a
   shared `messages` table.

## Design Constraints

- Do **not** collapse parallel web branches into one shared monolithic active
  session.
- Reuse the **same SQLite database** for all parallel sessions/branches rather
  than inventing a separate side store.
- Isolation must come from **branch/session identity inside the existing DB
  model**, not from pretending all windows are one session with one shared leaf.
- Upstream Pi session-tree behavior should inform ancestry/resume design, but
  PiClaw’s web runtime should treat parallel branches as distinct resumable
  execution contexts.

## Why

Today the web UI effectively treats a chat like one active conversation lane.
That is good for a simple timeline, but it becomes limiting when the user wants
to:

- branch an investigation into multiple approaches in parallel
- keep one branch stable while experimenting in another
- open the same conversation context in multiple windows or panes
- start a fresh **chat-only** pop-up chat window with minimal friction
- resume a prior fork from a session picker without mixing its later turns into
  the main branch
- preserve accurate thread ancestry and recovery behavior per branch

The upstream Pi session model already supports tree navigation and forked
sessions. PiClaw should take advantage of that for ancestry, resume, and branch
semantics — but the web runtime should still persist and isolate **multiple
parallel sessions inside the same SQLite database**, not force them through one
shared live session.

## Problem Statement

PiClaw’s current schema and web runtime are optimized for a single active chat
stream per `chat_jid`:

- timeline rows live in `messages`
- per-chat run state lives in `chat_cursors`
- restart/recovery, deferred follow-ups, and inflight bookkeeping are keyed by
  `chat_jid`
- the web UI compose/timeline pair assumes one canonical live conversation
  stream for the chat

That creates several design problems for parallel windows/forks:

- two web windows should not race on the same `chat_cursors` row if they are
  logically different conversation branches
- a resumed fork must not pollute the main branch timeline or steal queued work
  from it
- recovery and queue semantics must remain exactly-once **per branch**, not just
  per top-level chat
- a copied compose/timeline pane or pop-up chat window needs a stable identity
  that survives reloads and restart
- the pop-up chat window should be intentionally **narrower in scope** than the
  main shell: chat/session UI only, with no editor or workspace explorer
- the UI needs both:
  - a lightweight “new pop-up chat” affordance for fast branching
  - a session picker for resuming older branches intentionally
- the storage model should preserve ancestry and enable resuming prior branches,
  not just ephemeral client-side tabs

The ticket is to investigate the best architecture and define an implementable
path, not to immediately code a speculative schema rewrite.

## Required Investigation

### 1) Upstream Pi session model
Investigate and document how Pi’s current session system should shape the web
branching design:

- JSONL session tree format and leaf-pointer behavior
- `/tree` navigation within one session file
- `/fork` creation of a new session file with `parentSession`
- session selector / resume semantics
- branch summaries / compaction interactions
- whether a PiClaw web branch should map to:
  - a new upstream session file,
  - SQLite-managed parallel session metadata that references upstream ancestry,
  - or a hybrid model
- which parts of upstream session trees are useful for ancestry/navigation, and
  which parts should **not** become the sole source of truth for concurrent web
  branches

### 2) Current Pi “multiplayer mode” / adjacent extensions
Investigate what upstream Pi already exposes that is adjacent to multi-window or
multi-actor usage, including:

- current session selector / resume UI behavior
- session metadata extensions such as `session-name.ts`
- tree navigation hooks and branch summarization hooks
- any existing extension or example that approximates “multiplayer mode”,
  collaborative session coordination, or multiple simultaneously visible
  session contexts

If no real multiplayer extension exists upstream, capture that explicitly and
use it to justify a PiClaw-specific design.

### 3) PiClaw SQLite design within the current schema direction
Define the best approach for representing multiple web-visible session branches
without breaking existing data/recovery guarantees.

The design should start from the current schema reality:

- `messages` stores the web-visible timeline rows
- `chat_cursors` is the current source of truth for per-chat run state
- `web_sessions` is authentication/session state, not conversation state

The investigation should compare at least these options:

#### Option A — synthetic branch-specific chat ids
Represent each parallel window as its own logical chat identity (for example,
`web:<root>:<branch>`), keeping current tables mostly intact.

**Pros:** reuses existing queue/recovery machinery keyed by chat id.  
**Cons:** risks awkward UX, duplicated chat metadata, and fuzzy relationship to
one human-visible conversation.

#### Option B — add a branch/session key alongside `chat_jid`
Keep one top-level chat, but introduce a stable branch/session key used by:

- timeline filtering
- compose submission routing
- `chat_cursors` / inflight state
- deferred queued follow-ups
- window/pane restoration
- per-branch resume/recovery

This is still one shared SQLite database, but no longer one shared runtime
session.

**Pros:** models one chat with multiple resumable branches more directly.  
**Cons:** requires schema and API widening across many code paths.

#### Option C — branch registry + materialized per-branch views
Add an explicit branch/session table that maps branch ids to:

- root chat
- upstream session file or ancestry reference
- display name
- parent branch
- active/archived state
- current leaf / last-visible message watermark
- branch-local queue/recovery/session state

Then keep `messages` as the common ledger while deriving branch timelines from
branch metadata.

**Pros:** strongest long-term model for multiple parallel sessions inside one DB.  
**Cons:** biggest design and migration surface.

## Desired Outcome

Pick and justify one recommended approach that:

- supports parallel compose/timeline surfaces safely
- preserves resumability across reload/restart
- keeps branch history isolated unless intentionally merged/navigated
- aligns with upstream Pi session-tree semantics instead of fighting them
- keeps **parallel sessions distinct inside the same SQLite database** instead
  of collapsing them into one live runtime session
- can be implemented incrementally without destabilizing the existing web chat
  loop

## Scope

### In scope
- Define the product and persistence model for parallel web chat windows / panes.
- Investigate how upstream Pi sessions, `/tree`, and `/fork` should map into web
  UX.
- Identify whether branch identity should live in current tables, new tables, or
  a hybrid layer.
- Define how resume/reload/recovery should work per branch.
- Define how copied compose/timeline panes or pop-up chat windows are created,
  named, restored, and closed.
- Define the UI contract for a pop-up chat window as a **chat-only surface**
  with no editor/workspace explorer chrome.
- Define the UX split between:
  - instant “new chat window” creation
  - deliberate resume/reopen via a session picker
- Decide whether branch state is primarily:
  - server-authoritative,
  - browser-restorable,
  - or both.

### Out of scope
- Implementing a full collaborative multi-user editing/chat product in this
  ticket
- True simultaneous shared typing/presence across remote users
- Merging divergent branches back into one transcript automatically
- Replacing upstream Pi session persistence entirely

## Acceptance Criteria

- [ ] A written design identifies the recommended persistence model for parallel
      chat windows/forks.
- [ ] The design explicitly maps PiClaw web branches to upstream Pi session
      concepts (`/tree`, `/fork`, session file, leaf, branch summary).
- [ ] The design explains how multiple compose/timeline panes can coexist
      without sharing or corrupting inflight state.
- [ ] The design explains how restart/reload recovery remains exactly-once per
      branch.
- [ ] The design explains how branch timelines are isolated in SQLite while
      remaining resumable.
- [ ] The design explains how a user reopens or resumes an older branch from a
      session picker UI.
- [ ] The design defines a low-friction affordance for starting a new pop-up
      chat window / branch.
- [ ] The design explicitly defines the pop-up as a **chat-only** window with
      no editor or workspace explorer.
- [ ] The design identifies whether current schema extension is sufficient or a
      new branch/session table is required.
- [ ] The design includes at least one incremental implementation path rather
      than an all-or-nothing rewrite.

## Investigation Questions

- Should a web branch correspond to an upstream **forked session file**, to a
  SQLite branch/session row, or to a hybrid of both?
- Which upstream session-tree semantics are useful for ancestry and resume,
  without forcing sibling web windows to share one active leaf pointer?
- If using forked session files underneath, how do we retain a coherent “same
  chat, new branch” experience in the web UI while still keeping one SQLite DB?
- Is `chat_jid` currently too coarse as the primary runtime key for parallel web
  branches?
- Can `chat_cursors` evolve from per-chat to per-chat-per-branch without
  destabilizing existing guarantees?
- Should branch-specific timeline visibility be represented by:
  - explicit branch ids on messages,
  - branch membership metadata elsewhere,
  - or separate logical chats?
- How should queued follow-ups, steering, and restart recovery behave when two
  sibling branches both have pending work?
- How should the UI show branch ancestry, labels, and resume targets in a
  session picker?
- What is the fastest acceptable UX for “new pop-up chat window”:
  - one-click button,
  - duplicate-current-branch action,
  - or keyboard shortcut?
- Which controls still belong in the pop-up chat-only window, and which remain
  exclusive to the main shell?
- What parts of upstream Pi already help here (session tree, session selector,
  session naming, branch summaries), and what is still missing?
- Is there any upstream “multiplayer mode” extension or prior art worth reusing,
  or is this fundamentally a PiClaw-specific orchestration layer?

## Proposed Work Plan

1. **Upstream capability audit**
   - Read and summarize upstream session docs, `/tree`, `/fork`, and session
     selector behavior.
   - Audit extension examples related to session naming, metadata, and branch
     hooks.
   - Confirm whether any real multiplayer/collaboration extension exists.

2. **Current-state PiClaw audit**
   - Trace how `messages`, `thread_id`, `chat_cursors`, deferred follow-ups, and
     recovery currently assume a single active branch per `chat_jid`.
   - Identify which APIs, SSE payloads, and UI stores would need a branch key.

3. **Schema/design options memo**
   - Compare Option A/B/C above against migration risk, UX clarity, and runtime
     safety.
   - Recommend one primary path and one fallback path.

4. **Incremental implementation proposal**
   - Define a smallest shippable slice, e.g.:
     - one-click open current branch in a second pane/window or pop-up
     - fork into new branch id
     - keep branch-local queue/recovery
     - add a basic session picker for reopen/resume
     - restore branch tabs/windows after reload

## Test Plan

- [ ] Add design notes or ADR-level documentation before code.
- [ ] If implementation starts, add DB tests covering branch-local inflight and
      deferred state.
- [ ] Add web tests for duplicated/forked chat panes that submit independently.
- [ ] Add restart/recovery tests proving branches do not steal each other’s
      queued or inflight turns.
- [ ] Run `cd /workspace/piclaw/piclaw && bun run quality` for any code-bearing
      follow-up.

## Definition of Done

- [ ] Recommended architecture documented and linked from the ticket
- [ ] Upstream Pi session-tree/fork behavior evaluated explicitly
- [ ] Current-state SQLite fit/gap analysis documented
- [ ] “Multiplayer mode” / adjacent upstream extensions investigated and
      summarized
- [ ] Incremental implementation plan identified
- [ ] Follow-up execution ticket(s) created if implementation is split

## Updates

### 2026-03-14
- Ticket created from a user request for multiple parallel chat windows with
  different session forks and resumable history isolation.
- Initial framing assumes the solution should build on upstream Pi session-tree
  semantics rather than invent an unrelated browser-only branch model.
- Current known constraint captured: PiClaw run/recovery state is keyed largely
  by `chat_jid` via `chat_cursors`, which is likely too coarse for safe parallel
  branch execution.
- Upstream session-tree/session-selector capabilities are known to exist, but no
  obvious first-party “multiplayer mode” extension has yet been identified.
- User clarified an important hard requirement: this should **not** become one
  shared monolithic session. The intended direction is **multiple parallel
  sessions reusing the same SQLite database**, with isolated branch/session run
  state inside that DB.
- User also clarified the desired UX shape: there should be a **session picker**
  for resume/reopen, but starting a **new pop-up chat window** should be very
  easy and should not require going through a heavy picker-first flow.
- User further clarified that the pop-up should be **chat-only** and should
  **not** include the editor or workspace explorer.

## Links

- `piclaw/piclaw/node_modules/@mariozechner/pi-coding-agent/docs/session.md`
- `piclaw/piclaw/node_modules/@mariozechner/pi-coding-agent/docs/tree.md`
- `piclaw/piclaw/node_modules/@mariozechner/pi-coding-agent/examples/sdk/11-sessions.ts`
- `piclaw/piclaw/node_modules/@mariozechner/pi-coding-agent/examples/extensions/session-name.ts`
- `piclaw/piclaw/src/db/connection.ts`
- `piclaw/piclaw/src/db/chat-cursors.ts`
- `piclaw/piclaw/src/channels/web/handlers/agent.ts`
- `piclaw/piclaw/src/channels/web/recovery.ts`
- `piclaw/piclaw/src/channels/web/timeline-service.ts`
- `piclaw/piclaw/web/src/app.ts`

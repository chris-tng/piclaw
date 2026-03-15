---
id: adaptive-cards-and-btw-side-conversations
title: Adaptive Cards rendering + /btw side conversations (phased)
status: doing
priority: high
created: 2026-03-15
updated: 2026-03-15
target_release: next
estimate: L
risk: medium
tags:
  - work-item
  - kanban
  - web
  - ui
  - adaptive-cards
  - btw
  - chat
  - extensions
  - architecture
owner: pi
---

# Adaptive Cards rendering + /btw side conversations (phased)

## Summary

Build Microsoft Adaptive Cards support in PiClaw's web chat, then use it as the
foundation for `/btw` side conversations. The two features share enough
infrastructure that designing them together avoids rework, while shipping in
phases keeps each delivery focused.

## Why

Adaptive Cards give the agent a structured, interactive UI surface in the
timeline beyond plain markdown. `/btw` gives the user a parallel side
conversation that doesn't interrupt the main agent. Building cards first means
`/btw` becomes a card-emitting side conversation that reuses the render +
action pipeline instead of inventing a separate UI.

## Phases

### Phase 1 — Adaptive Card rendering (read-only)
Render Adaptive Card JSON payloads inline in timeline posts.

### Phase 2 — Card actions (`Action.Submit` + `Action.OpenUrl`)
Wire card actions back into the agent/runtime as structured submissions.

### Phase 3 — Independent side-LLM call engine
Add the ability to make LLM calls outside the main agent loop, streaming
results to a dedicated web channel.

### Phase 4 — `/btw` as a card-based side conversation
Combine phases 1–3: `/btw` makes a side LLM call, renders the Q/A as an
Adaptive Card, and supports inject/summarize/clear via card actions.

## Phase 1 — Adaptive Card rendering (read-only)

### Goal
When an agent message contains an `adaptive_card` content block, render it
inline in the timeline using the official Microsoft `adaptivecards` SDK.

### Payload contract

Agent messages use the existing `content_blocks` JSON column:

```json
{
  "type": "adaptive_card",
  "card_id": "uuid",
  "schema_version": "1.5",
  "state": "active",
  "payload": {
    "type": "AdaptiveCard",
    "version": "1.5",
    "body": [
      { "type": "TextBlock", "text": "Hello from a card", "size": "Large" },
      { "type": "TextBlock", "text": "This is structured content." }
    ]
  },
  "fallback_text": "Hello from a card"
}
```

Normal `content` stays as human-readable fallback text for search/export.

### Implementation plan

1. **Vendor the `adaptivecards` SDK** as a web-side dependency
   - add to vendor manifests or lazy-load from a static bundle
   - keep it out of the main `app.bundle.js` — load on first card render

2. **Create a HostConfig** mapped from PiClaw CSS variables
   - light/dark theme support
   - font family, spacing, container styles matching existing timeline look
   - file: `web/src/ui/adaptive-card-host-config.ts`

3. **Add card detection in post rendering**
   - in `web/src/components/post.ts`, detect `content_blocks` entries with
     `type === "adaptive_card"`
   - mount a container div and render via `AdaptiveCard.parse()` + `.render()`
   - fall back to `fallback_text` / normal `content` if parsing fails
   - file: `web/src/ui/adaptive-card-renderer.ts`

4. **Add a test card tool** for development validation
   - register a temporary `emit_test_card` tool or `/test-card` command
   - emits a hardcoded Adaptive Card payload as an agent message
   - lets us validate rendering without teaching the real agent yet

5. **Pin schema version**
   - support `version: "1.5"` in v1
   - reject or fall back for unknown versions

### Acceptance criteria (Phase 1)
- [ ] `adaptivecards` SDK vendored and lazy-loaded
- [ ] `HostConfig` maps PiClaw light/dark theme
- [ ] Timeline posts with `adaptive_card` content blocks render cards
- [ ] Posts without cards render normally (no regression)
- [ ] Failed card parsing falls back to text content
- [ ] Schema version is checked and pinned
- [ ] At least one test card can be emitted and rendered
- [ ] `bun run quality` passes

### Files to create/modify
- `web/src/ui/adaptive-card-renderer.ts` (new)
- `web/src/ui/adaptive-card-host-config.ts` (new)
- `web/src/components/post.ts` (card detection + mount)
- `web/static/css/styles.css` (card container styling)
- vendor manifest or lazy-load entry for `adaptivecards`
- test tool/command for development

### Out of scope for Phase 1
- Card actions (Phase 2)
- Action endpoints (Phase 2)
- Side LLM calls (Phase 3)
- `/btw` commands (Phase 4)
- Templating (`adaptivecards-templating`)
- `Action.ShowCard`, `Action.ToggleVisibility`

## Phase 2 — Card actions (future)

- Add `POST /agent/card-action` endpoint
- Support `Action.Submit` → structured user submission → agent turn
- Support `Action.OpenUrl` → safe external link
- Persist submissions as `adaptive_card_submission` content blocks
- Card lifecycle: `active` → `completed` / `cancelled`
- Finished cards render read-only (no action buttons)

## Phase 3 — Side-LLM call engine (future)

- Server-side independent `streamSimple()` call outside main agent loop
- Dedicated SSE event channel for side-call streaming
- Web UI consumer for the side stream (panel or card)
- Thread state persistence (SQLite, filtered from main timeline)
- Runs even while main agent is busy

## Phase 4 — `/btw` as card-based side conversation (future)

- `/btw <question>` → side LLM call → render Q/A as Adaptive Card
- `/btw:inject` → `Action.Submit` that sends thread to main agent
- `/btw:summarize` → side LLM summarizes thread → inject summary
- `/btw:clear` → dismiss card widget
- `/btw:tangent` → contextless side thread variant
- Thread state persists across reload/restart
- BTW cards filtered from main agent LLM context

## Upstream reference

### Microsoft Adaptive Cards
- Schema: https://adaptivecards.io/schemas/adaptive-card.json
- JS SDK: `adaptivecards` npm package
- Explorer: https://adaptivecards.io/explorer/
- Designer: https://adaptivecards.io/designer/

### pi-btw (side conversation reference)
- Repo: https://github.com/dbachelder/pi-btw
- 670-line Pi extension using `streamSimple()` + TUI widget
- Key patterns: hidden thread state via `appendEntry()`, context filtering
  via `context` event, inject-back via `sendUserMessage()`

### OpenClaw (host integration reference)
- Repo: https://github.com/matvelloso/openclaw-ui
- Key patterns: card extraction from chat content, `HostConfig` mapping,
  SDK action pipeline, prompt guidance for card emission

## Supersedes

- `kanban/00-inbox/adopt-openclaw-ui.md` (folded into this ticket)

## Links

- `piclaw/piclaw/web/src/components/post.ts`
- `piclaw/piclaw/web/src/components/timeline.ts`
- `piclaw/piclaw/web/src/markdown.ts`
- `piclaw/piclaw/web/static/css/styles.css`
- `piclaw/piclaw/src/channels/web/message-write-flows.ts`
- `piclaw/piclaw/src/db/messages.ts`
- `piclaw/piclaw/src/channels/web/agent-events.ts`

## Updates

### 2026-03-15
- Created as combined design ticket superseding the separate Adaptive Cards
  (`adopt-openclaw-ui.md`) and `/btw` investigation.
- Phased plan: cards rendering → card actions → side-LLM engine → /btw.
- Phase 1 implementation started.
- Added a built-in web `/test-card` command with persistent `basic`,
  `choices`, `approval`, and `completed` variants so Adaptive Card
  rendering/action styling can be validated without relying on transient ad hoc
  test posts.
- `/test-card` is handled locally in the web message path (no LLM turn, no
  queued follow-up semantics) and emits agent timeline messages with
  `adaptive_card` content blocks.
- Promoted `/test-card` into core command discovery so `/commands` and parser /
  handler coverage recognize it consistently, while web still intercepts it
  locally for actual card emission.
- Expanded built-in validation variants to cover `failed`, `cancelled`,
  `bad-url`, `submit-error`, `stay-open`, `terminal-actions`, and `list`.
- Added inline notice validation paths for invalid `Action.OpenUrl` and failed
  `Action.Submit` flows.
- Action submission persistence now strips internal `__*` metadata from
  summaries and stored submission payloads.
- Added iterative card lifecycle support via `submit_behavior: keep_active` so
  a card can remain active after `Action.Submit`.
- Added submit-driven terminal state transitions so `Action.Submit` can end a
  card as `completed`, `cancelled`, or `failed`.
- Current Phase 2 status is effectively feature-complete enough to begin Phase
  3 groundwork for the independent side-LLM engine.

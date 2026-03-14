---
id: editor-zen-mode-and-focus-controls
title: Add editor zen mode and related focus controls
status: inbox
priority: medium
created: 2026-03-14
updated: 2026-03-14
tags:
  - work-item
  - kanban
  - web
  - editor
  - ux
  - focus
owner: pi
---

# Add editor zen mode and related focus controls

## Summary

Add a distraction-reduced **editor zen mode** for the web UI, plus the adjacent
focus/layout controls that make it actually useful in day-to-day editing.

This should cover more than just one toggle: the goal is a coherent “focus on
the current file” experience for the tabbed editor and docked-pane layout.

## Why

The editor is now a first-class tabbed pane, but the surrounding UI still keeps
chat, dock, splitters, headers, and other affordances visually present. That is
useful most of the time, but not ideal when doing longer writing/editing tasks.

A zen/focus mode should let the user temporarily prioritize the active editor
without losing the surrounding PiClaw workflow.

## Candidate scope

### In scope
- Add a user-facing **zen mode** for the editor area.
- Define which surfaces hide/collapse in zen mode, likely including some subset of:
  - workspace sidebar
  - chat timeline width/visibility
  - editor tab chrome density
  - docked terminal visibility
  - non-essential status/header affordances
- Add explicit enter/exit affordances:
  - button and/or command
  - keyboard shortcut if appropriate
- Preserve a reversible, low-surprise transition back to the normal layout.
- Decide whether zen mode is:
  - per-browser state,
  - per-chat state,
  - or purely ephemeral session UI state.

### Out of scope
- Full IDE-style window management
- Multi-monitor/popup editor windows
- Arbitrary custom workspace layout presets
- Mobile-first redesign of the entire shell

## Acceptance Criteria

- [ ] A clear editor zen mode can be toggled on and off.
- [ ] Zen mode behavior is deterministic and documented.
- [ ] The active editor remains fully usable for edit/save/tab-switch workflows.
- [ ] Entering zen mode does not lose unsaved changes or current tab state.
- [ ] Exiting zen mode restores the previous layout cleanly.
- [ ] Dock/terminal behavior in zen mode is explicitly defined.
- [ ] Keyboard/accessibility behavior is defined for the toggle.
- [ ] Manual validation covers entering, editing, saving, exiting, and reopening tabs.

## Implementation Paths

### Path A — UI state toggle in app shell (recommended)
1. Add a top-level zen-mode UI state in `web/src/app.ts`.
2. Apply shell/layout class changes to hide or compress surrounding panes.
3. Keep the editor extension itself unchanged except for any needed resize/focus hooks.
4. Persist only the minimal preference needed (if any).

**Pros:** smallest, safest slice; matches current shell architecture.
**Cons:** can become CSS-heavy if too many layout exceptions pile up.

### Path B — Pane capability / host-layout mode
1. Extend pane host concepts to support “focusable / immersive” layout states.
2. Let the editor pane request or drive the mode.
3. Reuse that capability later for draw.io, mind maps, or preview panes.

**Pros:** cleaner long-term abstraction.
**Cons:** more architecture work than needed for a first zen-mode feature.

## Recommended Path

Start with **Path A**.

Use a shell-level UI state and explicit CSS/layout transitions first. Only
promote it into a more general pane-layout abstraction if multiple pane types
need the same immersive behavior.

## Refinement questions

- What exactly should hide in zen mode vs merely shrink?
- Should chat remain visible as a narrow column, or disappear entirely?
- Should the terminal dock auto-close when entering zen mode?
- Should the tab strip remain visible, or collapse to a minimal single-line header?
- Should zen mode be available only when an editor tab is active?
- Do we want a matching command (e.g. `/zen`) or UI-only toggle first?

## Test Plan

- Add UI/state tests for zen-mode toggle behavior.
- Add manual validation for:
  1. open editor tab
  2. enter zen mode
  3. edit + save file
  4. switch tabs
  5. exit zen mode
  6. verify layout restoration
- Validate terminal/editor resize behavior when entering and leaving zen mode.
- Run:
  - `cd /workspace/piclaw/piclaw && bun run quality`

## Updates

### 2026-03-14
- Ticket created from user request for “editor zen mode and co”.
- Scoped as a focused editor UX/layout feature rather than a broad shell redesign.
- Initial recommendation: implement as app-shell UI state first, not a new pane framework.
- Quality: ★★★☆☆ 6/10 (problem: 2, scope: 1, test: 1, deps: 1, risk: 1)

## Links

- `piclaw/piclaw/web/src/app.ts`
- `piclaw/piclaw/extensions/editor/editor-extension.ts`
- `piclaw/piclaw/web/static/css/styles.css`
- `piclaw/piclaw/web/src/components/tab-strip.ts`
- `piclaw/piclaw/web/src/panes/terminal-pane.ts`
- `piclaw/piclaw/kanban/50-done/editor-as-standalone-extension.md`

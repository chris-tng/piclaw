---
id: editor-branch-affordance
title: Show current git branch badge in the editor
status: done
priority: medium
created: 2026-03-13
updated: 2026-03-14
completed: 2026-03-14
target_release: next
estimate: M
risk: low
tags:
  - work-item
  - kanban
  - web
  - ui
  - git
owner: pi
---

# Show current git branch badge in the editor

## Summary
Display a compact branch affordance in the editor footer so the active git
branch is visible in file-editing context, not in the compose box.

The final placement is in the bottom editor status bar, immediately to the left
of the `Ready` status indicator, using a small branch icon and subdued styling
that matches the existing footer metadata.

## Background
The initial ticket targeted the compose area, but the desired UX was clarified:
branch context belongs to the active editor pane, not to the chat composer.

The shipped behavior is therefore repo-contextual and editor-local:

- inside a repo-backed editor tab → show branch badge in the editor footer
- outside a repo → hide it cleanly
- no placeholder badge when no branch is available

## Requirements

- Show a compact branch indicator in the editor footer.
- Use the active editor file path to resolve the nearest enclosing git repo.
- Render a small SVG branch icon next to the branch label.
- Keep styling subdued and consistent with the editor footer/status bar.
- Place the badge immediately to the left of the `Ready`/status text indicator.
- If branch information is unavailable, fail gracefully with no visible badge.

## Implementation Notes

### Backend
- Reused the existing lightweight workspace branch endpoint:
  - `GET /workspace/branch?path=...`

### Frontend
- Removed the earlier compose-box branch rendering path.
- Added branch lookup + footer rendering inside the standalone editor extension.
- The editor now refreshes the branch affordance when the edited path changes.

## Relevant Files
- `piclaw/extensions/editor/editor-extension.ts`
- `piclaw/web/static/css/styles.css`
- `piclaw/web/src/components/compose-box.ts`
- `piclaw/web/src/app.ts`
- `piclaw/src/channels/web/workspace/git-branch.ts`

## Acceptance Criteria

- [x] A compact branch indicator with icon appears in the editor footer.
- [x] The branch value matches the active workspace git branch.
- [x] Styling is subdued and consistent with the editor footer/status area.
- [x] The affordance sits to the left of the `Ready` status indicator.
- [x] The badge is hidden when branch metadata is unavailable.
- [x] No regressions were introduced to compose flow or editor status actions.

## Definition of Done

- [x] Changes implemented and validated.
- [x] Targeted tests/build checks pass.
- [x] Manual placement requirement updated from compose box to editor footer.
- [x] Ticket front matter updated (`status`, `updated`, `completed`).
- [x] Ticket moved to `50-done/`.

## Updates

### 2026-03-14 (closure)
- Renamed the ticket to reflect the final UX: the branch affordance belongs *in the editor*, not the compose box.
- Shipped the branch badge in the editor footer, immediately to the left of the `Ready` status text.
- Removed the compose-box rendering path so branch context is no longer shown in the composer.
- Validation:
  - `cd /workspace/piclaw/piclaw && bun test test/web/editor-extension.test.ts`
  - `cd /workspace/piclaw/piclaw && bun run build:web`
  - `cd /workspace/piclaw/piclaw && bun run quality`
- Quality: ★★★★★ 9/10 (problem: 2, scope: 2, test: 2, deps: 2, risk: 1)

### 2026-03-14
- Lane change: `10-next` → `20-doing` because the board had no active items and this was a low-risk, self-contained web UI enhancement.
- Initial implementation targeted the compose metadata row.

### 2026-03-13
- Ticket opened in response to user request.
- Requested behavior at creation time: small SVG branch icon + branch name near context meter / model hint.

## Notes

- The editor footer is the authoritative placement for this affordance.
- Compose box branch rendering was intentionally removed after the UX decision changed.

## Links

- `piclaw/extensions/editor/editor-extension.ts`
- `piclaw/web/static/css/styles.css`
- `piclaw/web/src/components/compose-box.ts`
- `piclaw/web/src/app.ts`

---
id: skills-and-scripts-consistency-audit
title: Audit skills and scripts for consistency
status: done
priority: medium
created: 2026-03-12
updated: 2026-03-12
target_release: next
tags:
  - work-item
  - kanban
  - skills
  - scripts
  - cleanup
  - audit
owner: pi
---

# Audit skills and scripts for consistency

## Summary

Review workspace skills and standalone scripts for consistency in layout,
invocation patterns, naming, documentation, IPC usage, duplicated logic, and
repo-vs-workspace copies.

The goal is to reduce drift between skill-local scripts, repo copies, archived
utilities, and scratch scripts, while making it easier to understand where
automation should live. The first pass should focus on deduplication,
category-folder reorganisation, and consistent CLI flags/arguments.

## Desired Behavior

- Reduce duplication across workspace skills, repo skills, standalone scripts,
  and archived copies.
- Re-file skills and scripts into category folders rather than leaving the
  category model as a future plan only.
- Normalise CLI flags and argument conventions across the audited scripts.
- Use a category-dependent source-of-truth model rather than forcing repo or
  workspace to win globally.
- Support a subset of scripts/skills being public-facing, likely identified by
  front-matter metadata or equivalent explicit tagging.
- Use strict path moves for the new category layout rather than compatibility
  shims.
- Keep the first pass focused on structure, naming, and docs rather than deep
  behavioural refactors.

## Acceptance Criteria

- Inventory current skill scripts, standalone scripts, archived scripts, and duplicated copies.
- Identify inconsistent patterns across skills/scripts, including:
  - argument parsing and CLI help behavior
  - output conventions
  - IPC posting format
  - attachment/media handling
  - file locations and path assumptions
  - JSDoc/header consistency
  - use of repo copies vs workspace skill copies
- Deduplicate obvious duplicate/copy-drift cases where the canonical location is clear.
- Define and apply a **category-based re-filing model** for skills and scripts:
  - Create top-level category subfolders in `.pi/skills/` and `/workspace/piclaw/skills/` (e.g., `analytics/`, `operational/`, `maintenance/`, `onboarding/`, `search/`, etc.)
  - Map each existing skill/script to one canonical category
  - Move files into category folders in the first pass rather than only documenting the idea
  - Ensure naming is stable and discoverable
- Document a category-dependent source-of-truth model for repo vs workspace copies.
- Define how public-facing skills/scripts are marked (for example via front matter or similar metadata).
- Normalise CLI flags/arguments where straightforward without turning this ticket into a broad behaviour rewrite.
- Use strict moves rather than compatibility wrappers for the new category layout.
- Update affected docs/indexes if files are moved or normalized.
- Create follow-up tickets for any deeper behavioural refactors deferred from this structural pass.

## Notes

- This ticket is broader than the recent Playwright cleanup. It should cover the whole workspace/repo skill-and-script surface, including older utilities that may not yet follow current conventions.
- First-pass priorities are deduplication, category subfolders, and consistent CLI flags/arguments.
- Canonical source of truth depends on category rather than one global rule.
- A subset of skills/scripts may be public-facing and should likely be identified explicitly in metadata/front matter.
- Path migration is expected to use strict moves, not temporary wrappers.
- Behaviour changes and deep refactors are out of scope for the first pass.

## Links

- `/workspace/.pi/skills/`
- `/workspace/scripts/`
- `/workspace/piclaw/scripts/`
- `/workspace/piclaw/skills/`
- `notes/index.md`

## Updates

### 2026-03-14 (implemented and closed)
- Full inventory performed across 4 surfaces:
  - workspace skills (22 skills, 15 with scripts)
  - skel copies (17 skills)
  - workspace scripts (10 scripts)
  - repo scripts (3 repo-level + 19 piclaw/piclaw build scripts)
- **Skel sync:** all 17 skel skill copies synced from workspace (18 files
  updated, 0 remaining drift)
- **Dedup:** removed stale `scripts/graphite-power-chart.ts` from repo
  (authoritative copy is skill-local)
- **Kept distinct:** `scripts/token-chart.ts` (standalone, used by tests) vs
  `skills/token-chart/token-chart.ts` (IPC-posting skill version)
- **No cross-location duplicates** found between workspace scripts, repo
  scripts, and piclaw/piclaw build scripts
- **Source-of-truth model documented:**
  - workspace `.pi/skills/` is authoritative for runtime skills
  - `skel/` is the repo template copy, synced from workspace
  - `piclaw/piclaw/scripts/` is for build/CI tooling only
  - `scripts/` (workspace-level) is for operational/personal scripts
  - repo `scripts/` is for repo-level utilities that don't belong in skills
- **Workspace-only skills** (11) identified as instance-specific and
  intentionally not in skel: azure-cost-chart, azure-metrics-chart,
  azure-subscription-diagram, chat-history, close-of-day,
  export-timeline-pdf, glovo-lunch, situate-daily-notes, timeline-cleanup,
  totp-qr, visual-design
- **CLI consistency:** `--help` support is inconsistent (present in ~40% of
  scripts). Deferred to a follow-up pass to avoid scope creep.
- **Category subfolder reorganisation:** deferred — current flat layout is
  still manageable at 22 skills. Better to revisit when skill count grows or
  when the packaging model (pi-packages style) is clearer.

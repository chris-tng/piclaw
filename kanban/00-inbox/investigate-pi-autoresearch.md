---
id: investigate-pi-autoresearch
title: Investigate pi-autoresearch for autonomous experiment-loop ideas
status: inbox
priority: medium
created: 2026-03-14
updated: 2026-03-14
target_release: later
estimate: S
risk: low
tags:
  - work-item
  - kanban
  - research
  - extensions
  - automation
  - benchmarking
  - autoresearch
owner: pi
---

# Investigate pi-autoresearch for autonomous experiment-loop ideas

## Summary

Review `pi-autoresearch` as a later research item for PiClaw and related Pi
workflows.

The goal is not to adopt it blindly, but to understand whether its autonomous
experiment-loop model offers reusable ideas for:

- iterative benchmark-driven code changes
- restart-resumable research sessions
- status widgets / dashboards for long-running agent work
- append-only experiment logs and explicit keep/revert decisions

## Why

`pi-autoresearch` appears to package a coherent loop around:

- editing
- running a benchmark
- logging results
- auto-committing successful candidates
- reverting failed or losing changes
- resuming after restart from persisted state files

That could be relevant later for:

- performance tuning workflows in PiClaw
- controlled autonomous optimization experiments
- benchmarking vendor/build/runtime changes
- UI ideas for long-running background research or tuning jobs

## What to investigate

- How the extension/tool split is structured.
- How the always-visible status widget is implemented.
- How the `/autoresearch` dashboard is rendered and updated.
- How session continuity works across restart/context resets.
- How append-only experiment logs are stored and consumed.
- How keep/revert decisions are enforced safely.
- Whether any of its ideas should inform PiClaw:
  - experiment dashboards
  - long-running optimization jobs
  - benchmark harness integration
  - resumable autonomous workflows

## Known upstream notes

Based on the current upstream README:

- it provides an **extension** plus live **widget** and `/autoresearch`
  dashboard
- it uses files such as:
  - `autoresearch.md`
  - `autoresearch.sh`
  - `autoresearch.checks.sh`
  - `autoresearch.jsonl`
- it is explicitly designed to **survive restarts** and resume from persisted
  files
- it logs every run in an append-only JSONL file and distinguishes passing,
  failed, and `checks_failed` states

## Acceptance Criteria

- [ ] Read the upstream repo/docs and summarize the architecture.
- [ ] Identify which parts are directly reusable vs merely inspirational.
- [ ] Document any good ideas for PiClaw in a short notes file or ticket update.
- [ ] Decide whether a follow-up implementation ticket is warranted.

## Test / Research Plan

- Review upstream README and package structure.
- If useful, inspect widget/dashboard implementation details.
- Compare its persistence model with current PiClaw long-running task/session
  patterns.
- Capture any actionable ideas without committing to adoption.

## Updates

### 2026-03-14
- Ticket created after the Tao of Mac Pi ecosystem page was updated with a new
  `pi-autoresearch` entry.
- Initial relevance: autonomous benchmark loop, restart-resumable state,
  widget/dashboard UX, and append-only experiment logging.

## Links

- `https://github.com/davebcn87/pi-autoresearch`
- `https://taoofmac.com/space/ai/agentic/pi`

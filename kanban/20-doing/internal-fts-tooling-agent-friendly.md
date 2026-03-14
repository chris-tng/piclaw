---
id: internal-fts-tooling-agent-friendly
title: Make internal FTS-backed search tooling more agent-friendly
status: doing
priority: medium
created: 2026-03-14
updated: 2026-03-14
target_release: next
estimate: M
risk: medium
tags:
  - work-item
  - kanban
  - tools
  - search
  - fts
  - agent-ux
  - sqlite
owner: pi
---

# Make internal FTS-backed search tooling more agent-friendly

## Summary

Improve PiClaw’s internal FTS-backed search tools so agents can use them more
reliably without needing to guess raw SQLite FTS syntax, result-shape quirks, or
which search surface to reach for first.

This is about the **agent/tool UX** of search, not the web UI. The current tools
work, but they are still relatively brittle and low-level for routine agent use.

## Why

PiClaw already exposes several useful search surfaces:

- `search_workspace` for workspace/notes/skills content
- `messages` with `action: "search"` for chat history
- `tool_output_search` for stored tool output blobs/snippets

However, these are not yet as agent-friendly as they could be. Likely pain
points include:

- needing exact or near-exact FTS query syntax to get good results
- uncertainty about when to use which search tool
- limited query normalization / phrase escaping / fallback behavior
- no consistent cross-tool result shape or ranking cues
- weak guidance when a query returns no results because of syntax vs indexing vs
  true absence
- friction in iterating from broad search to precise retrieval

The goal is to reduce failed or awkward searches during normal agent work.

## Problem Statement

Today the search tools are individually useful, but not fully optimized for
agent ergonomics:

- the agent may need to know too much about SQLite FTS matching behavior
- similar search tasks across workspace/messages/tool outputs are split across
  tools with different semantics and affordances
- search results may not expose enough structured hints for the next step
  (follow-up retrieval, file read, row fetch, pagination, broader/narrower
  reformulation)
- “no matches” may hide whether the problem is query construction, index state,
  or genuine absence

This makes search feel more like raw plumbing than a dependable reasoning aid.

## Scope

### In scope
- Review the current agent-facing search experience for:
  - `search_workspace`
  - `messages` search mode
  - `tool_output_search`
- Identify the most common failure/awkwardness patterns for agent usage.
- Improve query handling, defaults, or result details so the tools are easier to
  use correctly.
- Consider whether a higher-level search helper or unified search affordance is
  warranted.
- Improve tool descriptions / prompt hints if that materially helps.

### Out of scope
- Replacing SQLite FTS with a different search backend
- Building the full web UI for workspace/chat search
- Large-scale semantic/vector search infrastructure
- Rewriting every search-related feature into one monolithic tool without a
  clear migration case

## Candidate improvements

### Query ergonomics
- Accept more natural query text and normalize/escape it safely.
- Define better default behavior for plain multi-word user text.
- Add phrase / token fallback strategies where raw FTS matching is too brittle.
- Return clearer errors or hints for malformed/surprising query syntax.

### Result ergonomics
- Standardize structured details where possible:
  - result count
  - pagination info
  - path/row identifiers for next-step retrieval
  - snippet/highlight quality
  - freshness/index-state hints where relevant
- Improve ranking or tie-break behavior where current ordering is not useful.
- Make the recommended follow-up action obvious from the result payload.

### Tool-selection ergonomics
- Clarify when the agent should use:
  - `search_workspace`
  - `messages` search
  - `tool_output_search`
- Consider whether a meta-search or helper pattern would reduce uncertainty.
- Consider whether `list_internal_tools` / prompt hints should include a more
  actionable search decision guide.

### Failure-mode ergonomics
- Distinguish clearly between:
  - no true matches
  - stale/missing index state
  - malformed FTS query
  - scope mismatch / pagination exhaustion
- Make it easier for an agent to recover from a failed search attempt without
  switching to SQL introspection too quickly.

## Acceptance Criteria

- [ ] The main FTS-backed internal search tools are reviewed from an agent-usage
      perspective.
- [ ] At least the top query-construction pain points are identified and
      addressed or documented.
- [ ] Search results expose enough structure for an agent to take the next step
      reliably.
- [ ] No-result outcomes are more diagnosable than a generic empty result.
- [ ] Tool-selection guidance between workspace/messages/tool-output search is
      clearer.
- [ ] Changes do not break existing tool contracts unless explicitly justified
      and documented.

## Investigation Questions

- What search patterns currently fail most often for agents in practice?
- How much raw FTS syntax knowledge should the tools require?
- Should plain text queries be automatically rewritten into safer FTS forms?
- Should one or more tools offer fallback substring/tokenized search behavior?
- Would a new helper tool be better than widening existing tools?
- Can result payloads be made more uniform without overfitting the tools?
- Should index/freshness status be surfaced directly in tool responses where
  relevant?
- How should the agent know when to escalate from search to `sql_introspect`?

## Test Plan

- [ ] Add/extend tests for common natural-language and multi-word query inputs.
- [ ] Add/extend tests for malformed or awkward query syntax.
- [ ] Add/extend tests for empty-result diagnostics.
- [ ] Add/extend tests for result detail shape and follow-up identifiers.
- [ ] Run `cd /workspace/piclaw/piclaw && bun run quality`.

## Definition of Done

- [ ] Agent-facing FTS/search ergonomics reviewed across the main internal tools
- [ ] Chosen improvements implemented or explicitly deferred with rationale
- [ ] Regression coverage added for the selected changes
- [ ] Related search tickets linked clearly to avoid overlap with web UI work
- [ ] `bun run quality` passes

## Notes

- This ticket is distinct from workspace FTS **UI** work such as indexing status
  badges or explorer feedback.
- Prefer incremental improvements to current tools before inventing a giant new
  search abstraction.
- Keep compatibility with current tool contracts unless there is a strong reason
  to extend them.

## Updates

### 2026-03-14
- Created from user request to make internal FTS tooling more agent-friendly.
- Initial scope includes the main SQLite-backed search surfaces already exposed
  to agents: workspace search, message search, and tool-output search.
- Explicitly separated from the existing workspace-FTS UI/status ticket.

### 2026-03-14 (implementation)
- Added shared `src/utils/fts-query.ts` with:
  - `sanitizeFtsQuery()` — strips FTS special chars, quotes reserved keywords,
    handles leading hyphens
  - `isFtsOperatorQuery()` — detects intentional power-user FTS syntax
  - `prepareFtsQuery()` — combines detection + sanitization in one call
- Applied `prepareFtsQuery()` to all three FTS-backed search surfaces:
  - `db/tool-outputs.ts` (`searchToolOutputSnippets`) — added sanitization +
    LIKE fallback on FTS failure
  - `workspace-search.ts` (`searchWorkspace`) — added sanitization + LIKE
    fallback on FTS failure
  - `extensions/messages-crud.ts` (`runSearch`) — replaced inline normalization
    with shared utility
- Added test coverage: `test/utils/fts-query.test.ts` (19 tests including
  reproduction of real-world failures from today's session)
- Quality: 854 pass, 0 fail

## Links

- `piclaw/piclaw/src/extensions/workspace-search.ts`
- `piclaw/piclaw/src/extensions/messages-crud.ts`
- `piclaw/piclaw/src/extensions/internal-tools.ts`
- `piclaw/piclaw/src/workspace-search.ts`
- `piclaw/piclaw/src/db/messages.ts`
- `piclaw/piclaw/src/db/tool-outputs.ts`
- `piclaw/kanban/00-inbox/workspace-fts-indexing-status-feedback.md`

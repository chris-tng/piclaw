---
id: api-sse-naming-consistency-security-audit
title: Audit API endpoints and SSE events for naming, consistency, formats, and security
status: inbox
priority: medium
created: 2026-03-14
updated: 2026-03-14
target_release: next
estimate: M
risk: medium
tags:
  - work-item
  - kanban
  - web
  - api
  - sse
  - naming
  - security
  - audit
owner: pi
---

# Audit API endpoints and SSE events for naming, consistency, formats, and security

## Summary

Perform a structured audit of all HTTP API endpoints and SSE event types
exposed by PiClaw's web channel. The audit should cover naming conventions,
payload consistency, response format standardization, and security posture.

This is the API-surface counterpart to the internal-tools naming audit that was
just completed. The internal tools are now verb-first and consistent; the HTTP
endpoints and SSE events should receive the same treatment.

## Why

The web channel has grown organically across many features (agent, workspace,
media, auth, shell, terminal, theme). As a result:

- endpoint path naming may not follow a single consistent convention
- SSE event names may mix different naming styles
- response payload shapes may vary across similar operations
- some endpoints may lack proper auth checks, rate limiting, or input
  validation
- error response formats may be inconsistent across dispatch modules
- the security review scope has expanded with terminal, shell, and workspace
  file write endpoints

A single structured pass would surface these issues and produce concrete
fixes or follow-up tickets.

## Scope

### In scope

#### 1) API endpoint naming
- Inventory all HTTP routes across dispatch modules:
  - `dispatch-agent.ts`
  - `dispatch-auth.ts`
  - `dispatch-content.ts`
  - `dispatch-media.ts`
  - `dispatch-shell.ts`
  - `dispatch-workspace.ts`
  - static/terminal routes
- Check for consistent path conventions:
  - noun vs verb in paths
  - plural vs singular resources
  - kebab-case vs camelCase vs snake_case
  - nesting depth consistency
- Check HTTP method usage (GET for reads, POST for mutations, etc.)

#### 2) SSE event naming
- Inventory all SSE event types emitted to clients
- Check for consistent naming convention across:
  - agent status events
  - timeline/post events
  - workspace events
  - theme events
  - queue/steering events
- Check whether event payloads follow a standard shape or vary per event

#### 3) Response format consistency
- Check whether success responses use a consistent envelope (or not)
- Check whether error responses use a consistent shape
- Check content-type headers
- Check whether JSON responses are consistently structured

#### 4) Security posture
- Verify auth checks on all mutation endpoints
- Verify auth checks on sensitive read endpoints (keychain, workspace files,
  terminal, shell)
- Check rate limiting coverage
- Check input validation / request guard coverage
- Check CSP, CORS, and origin validation for all endpoint families
- Flag any endpoints that should be auth-gated but are not
- Review terminal and shell endpoints specifically for escalation risk

### Out of scope
- Rewriting the entire HTTP layer
- Changing the SSE transport mechanism
- Adding OpenAPI/Swagger spec generation (could be a follow-up)
- Full penetration testing

## Acceptance Criteria

- [ ] Full inventory of HTTP endpoints with method, path, auth requirement, and
      dispatch module
- [ ] Full inventory of SSE event types with payload shape summary
- [ ] Naming inconsistencies identified and categorized
- [ ] Response format inconsistencies identified
- [ ] Security gaps identified (missing auth, missing rate limit, missing
      validation)
- [ ] Concrete renames or fixes implemented for the clearest issues
- [ ] Follow-up tickets created for larger structural changes if needed
- [ ] No regressions — existing tests pass after any changes

## Investigation Questions

- Is there a dominant path naming convention already, or is it truly mixed?
- Are SSE events namespaced by domain (agent/workspace/theme) or flat?
- Do error responses currently follow any common shape?
- Which endpoints were added most recently and may have skipped review?
- Are terminal and shell endpoints adequately isolated from the rest of the
  API surface?
- Is the rate-limit rule set complete for all write/mutation endpoints?

## Proposed Work Plan

1. **Inventory pass** — enumerate all routes and SSE events with metadata
2. **Naming analysis** — identify convention(s) and inconsistencies
3. **Security scan** — check auth/rate-limit/validation coverage per endpoint
4. **Fix pass** — implement concrete renames, add missing guards
5. **Follow-up tickets** — capture anything too large for this ticket

## Test Plan

- [ ] Existing endpoint tests continue to pass after any renames
- [ ] Add/extend tests for any newly identified security gaps
- [ ] Run `cd /workspace/piclaw/piclaw && bun run quality`

## Definition of Done

- [ ] Endpoint and SSE inventory documented
- [ ] Naming convention defined and major inconsistencies resolved
- [ ] Security gaps identified and either fixed or tracked
- [ ] Response format inconsistencies documented and either fixed or tracked
- [ ] `bun run quality` passes

## Relevant Areas

- `piclaw/piclaw/src/channels/web/http/dispatch-agent.ts`
- `piclaw/piclaw/src/channels/web/http/dispatch-auth.ts`
- `piclaw/piclaw/src/channels/web/http/dispatch-content.ts`
- `piclaw/piclaw/src/channels/web/http/dispatch-media.ts`
- `piclaw/piclaw/src/channels/web/http/dispatch-shell.ts`
- `piclaw/piclaw/src/channels/web/http/dispatch-workspace.ts`
- `piclaw/piclaw/src/channels/web/http/security.ts`
- `piclaw/piclaw/src/channels/web/http/rate-limit-rules.ts`
- `piclaw/piclaw/src/channels/web/http/request-guards.ts`
- `piclaw/piclaw/src/channels/web/http/static.ts`
- `piclaw/piclaw/src/channels/web/agent-events.ts`
- `piclaw/piclaw/src/channels/web/web-channel-contracts.ts`
- `piclaw/piclaw/src/channels/web/terminal/terminal-session-service.ts`

## Updates

### 2026-03-14
- Created from user request to audit API endpoints and SSE events for naming,
  consistency, formats, and security.
- Scoped as a structured audit with concrete fixes, not just a report.

## Links

- `piclaw/kanban/50-done/internal-tools-naming-consistency-audit.md`
- `piclaw/kanban/10-next/audit-proxy-sensitive-web-flows.md`

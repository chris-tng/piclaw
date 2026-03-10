# piclaw code quality improvement plan

Date: 2026-03-09
Scope reviewed: `piclaw/piclaw/src`, `piclaw/piclaw/extensions`, `piclaw/piclaw/web/src`, packaging/build config.

## Review snapshot (updated)

- Backend size: **184 TS files / 24,278 LOC** (`src/`)
- Frontend size: **7,574 LOC** (`web/src/`)
- Tests: **629 passing, 0 failing**
- Lint: passing
- Coverage (line): **77.76%** (`coverage/lcov.info`)
- Review comment coverage: Added focused regression/unit tests for each recent extraction seam (`web/recovery.ts`, `web/agent-buffers.ts`, `web/auth-runtime.ts`, `web/auth-gateway.ts`, `web/auth-endpoints.ts`, `web/channel-endpoint-context-factory.ts`, `web/endpoint-contexts.ts`, `web/agent-status-store.ts`, `web/pending-steering.ts`, `web/interaction-broadcaster.ts`, `web/followup-placeholders.ts`, `web/chat-run-control.ts`, `web/message-write-flows.ts`, `web/handlers/workspace.ts`, `web/http/dispatch-workspace.ts`, `web/http/dispatch-media.ts`, `web/http/dispatch-auth.ts`, `web/http/request-guards.ts`, `runtime/composition.ts`, `runtime/bootstrap.ts`, runtime wiring/provider bootstrap, `agent-pool/orphan-tool-results.ts`, `remote/execute-concurrency.ts`, and `utils/totp-qr.ts`) so refactors remain behavior-preserving.
- Commenting standards coverage: New extraction seams include module headers plus exported type/function JSDoc, and this remains an explicit tracked goal (see checklist + quality bars below). Re-audit (2026-03-09, completion sweep): module headers are present across `src/**/*.ts` (shebang-aware check) and exported-JSDoc heuristic reports **0** uncovered exports across **0** files after completing the remaining hotspot/doc sweeps in web/auth/runtime/agent-control support modules.

---

## Progress summary

### Completed tranches

- Security + packaging hardening (P0)
  - cwd boundary validation hardened
  - trusted-proxy support + request client helper centralization
  - strict CSRF origin tuple check (scheme+host+port)
  - SSRF callback DNS/IP private-range protections
  - package hygiene + stale-dist quality scripts
- Runtime lifecycle hardening
  - stoppable IPC and scheduler loops with explicit shutdown hooks
- Test quality hygiene (P1, inventory phase)
  - added redundancy inventory for web/runtime suites (`docs/testing/test-redundancy-inventory.md`) with concrete dedupe candidates and non-goals to preserve security/behavior regression signal
- Runtime decomposition (ongoing, non-destructive)
  - extracted provider bootstrap and shutdown orchestration from `runtime.ts`
  - extracted startup/wiring helpers (`runtime/startup.ts`, `runtime/wiring.ts`)
  - extracted message-loop orchestration coordinator (`runtime/coordinator.ts`)
  - extracted runtime bootstrap orchestration and default dependency wiring into `runtime/bootstrap.ts`
  - narrowed runtime coordinator/wiring to interface-based contracts (message-loop/scheduler/IPC deps) and localized channel instances inside `main()` composition
  - extracted runtime core composition + signal binding helpers into `runtime/composition.ts` and removed module-level runtime singletons from `runtime.ts`
  - maintained module headers + JSDoc coverage for newly extracted runtime seams (`runtime/composition.ts`, `runtime/bootstrap.ts`) as part of refactor acceptance criteria
  - removed provider-bootstrap access to private `AgentPool` internals by introducing typed provider registration methods on `AgentPool`
  - tightened runtime bootstrap core contracts (`RuntimeBootstrapCoreServices`) and removed bootstrap orchestration casts from runtime startup ordering path
  - decoupled runtime bootstrap default dependency factory from `runtime/composition.ts` concrete core type via `RuntimeBootstrapDefaultCoreServices`
- Web architecture decomposition (P1, non-destructive)
  - `src/channels/web/http/` modular namespace introduced and standardized
  - extracted route/security helpers:
    - `client.ts`, `security.ts`, `rate-limit.ts`, `rate-limit-rules.ts`, `route-flags.ts`, `request-guards.ts`
  - extracted route dispatchers:
    - `dispatch-auth.ts`, `dispatch-shell.ts`, `dispatch-content.ts`, `dispatch-workspace.ts`, `dispatch-agent.ts`, `dispatch-media.ts`
  - extracted auth lockout bookkeeping from `web.ts` into `web/totp-failure-tracker.ts`
  - extracted session cookie/auth checks from `web.ts` into `web/session-auth.ts`
  - extracted internal-secret request verification from `web.ts` into `web/internal-secret.ts`
  - extracted WebAuthn challenge/rp/base64 helpers from `web.ts` into `web/webauthn-challenges.ts`
  - extracted WebAuthn login/register endpoint orchestration from `web.ts` into `web/webauthn-auth.ts`
  - extracted passkey enrol page response from `web.ts` into `web/webauthn-enrol-page.ts`
  - extracted TOTP verify endpoint orchestration from `web.ts` into `web/totp-auth.ts`
  - extracted manifest generation/headers logic from `web.ts` into `web/manifest.ts`
  - extracted post update/internal-post endpoint orchestration from `web.ts` into `web/post-mutations.ts`
  - extracted agent status/context/models endpoint orchestration from `web.ts` into `web/agent-status.ts`
  - extracted workspace/thought visibility + agent respond endpoint orchestration from `web.ts` into `web/ui-endpoints.ts`
  - extracted timeline/hashtag/search/thread/thought endpoint orchestration from `web.ts` into `web/content-endpoints.ts`
  - extracted agents/avatar endpoint orchestration from `web.ts` into `web/identity-endpoints.ts`
  - extracted thought/draft buffer + panel expansion state from `web.ts` into `web/agent-buffers.ts`
  - extracted inflight-recovery and pending-resume orchestration from `web.ts` into `web/recovery.ts`
  - extracted auth mode evaluation/session-cookie + auth-context builders from `web.ts` into `web/auth-runtime.ts`
  - extracted auth/session/passkey request-surface orchestration from `web.ts` into `web/auth-gateway.ts`
  - extracted auth endpoint delegation helpers from `web.ts` into `web/auth-endpoints.ts`
  - extracted endpoint context builders (post/agent/content/ui/identity/avatar) from `web.ts` into `web/endpoint-contexts.ts`
  - extracted in-memory + persisted agent status lifecycle from `web.ts` into `web/agent-status-store.ts`
  - extracted pending steering timestamp queue from `web.ts` into `web/pending-steering.ts`
  - extracted profile-aware interaction broadcast context wiring from `web.ts` into `web/interaction-broadcaster.ts`
  - extracted queued follow-up placeholder row-id queue from `web.ts` into `web/followup-placeholders.ts` (and narrowed `web/channel-state.ts` to persisted state concerns)
  - extracted thread-root lookup + resume enqueue + failed-run cursor skip helpers from `web.ts` into `web/chat-run-control.ts`
  - moved workspace/media route execution out of `WebChannel` method wrappers and into `web/http/dispatch-workspace.ts` + `web/http/dispatch-media.ts` direct handler dispatch (with typed fallback overrides for tests)
  - narrowed workspace/media handler contracts to minimal interfaces (`WorkspaceWatcherChannel`, `MediaResponseContext`) instead of concrete `WebChannel` coupling
  - extracted message write orchestration (`sendMessage`, follow-up placeholder queue/replace flows) from `web.ts` into `web/message-write-flows.ts`
  - extracted endpoint-context assembly plumbing from `web.ts` into `web/channel-endpoint-context-factory.ts` and switched handlers to use shared factory accessors
  - refactored auth guard/dispatch modules to depend on `authGateway` + `auth-endpoints` context contracts directly, removing redundant auth passthrough wrappers from `web.ts`
  - narrowed message-store/link-preview coupling by introducing `LinkPreviewChannel` contract and removing direct `WebChannel` type dependency from `web/message-store.ts` and `web/link-previews.ts`
  - removed per-request dynamic imports in `web.ts` by statically wiring `RequestRouterService`, post handlers, and agent handlers
  - replaced `as any` session-binder bridge with typed helper `web/agent-pool-binder.ts`
  - removed `any` from web UI bridge pending/custom flow and narrowed UI-context channel typing
  - tightened slash-command event/content parsing in `src/agent-pool/slash-command.ts` by replacing `any` callbacks/content parsing with typed `AgentSessionEvent` handling and guarded message/content extraction helpers
  - extracted orphan tool-result pruning logic from `src/agent-pool.ts` into `src/agent-pool/orphan-tool-results.ts` with dedicated unit coverage, reducing `agent-pool.ts` below the 600 LOC architecture bar while preserving behavior
  - hardened remote interop JSON/body parsing in `src/remote/service.ts` by replacing `any`-typed payload parsing with `Record<string, unknown>` DTO guards and shared field access helpers, preserving endpoint behavior while tightening contracts
  - decomposed remote interop endpoint orchestration by extracting shared HTTP helpers (`src/remote/http-utils.ts`), callback/audit security helpers (`src/remote/service-security.ts`), pairing handlers (`src/remote/service-pairing.ts`), signed-operation handlers (`src/remote/service-operations.ts`), and execute admission tracking (`src/remote/execute-concurrency.ts`), reducing `src/remote/service.ts` to router/state composition responsibilities
  - decomposed `src/utils/totp-qr.ts` by extracting QR lookup tables (`src/utils/qr/tables.ts`), low-level encoding engine (`src/utils/qr/engine.ts`), mask-loss scoring (`src/utils/qr/lost-point.ts`), and SVG rendering (`src/utils/qr/svg.ts`), leaving `totp-qr.ts` focused on TOTP payload assembly + public export surface
  - reduced control/tooling type looseness by removing `any` from context tool execution wrappers (`src/tools/context-tools.ts`), tree rendering walkers (`src/agent-control/handlers/tree.ts`), command parser action/scope casting (`src/agent-control/command-parsers.ts`), model helper generics (`src/utils/model-utils.ts`, `src/extensions/model-control.ts`, `src/agent-control/handlers/model.ts`), Azure bridge base options (`src/extensions/azure-openai-api.ts`), session tool registration (`src/agent-pool/session.ts`), media metadata/FTS row typing (`src/db/media.ts`, `src/db/types.ts`), and Baileys logging/disconnect parsing (`src/channels/whatsapp.ts`)
  - added CI-grade import/export hygiene checks (`scripts/check-import-boundaries.ts`, `scripts/check-unused-exports.ts`) with dedicated tests and integrated scripts in `package.json` quality gates
  - completed full TypeScript reliability-gate remediation tranche for previously reproduced `make build-piclaw` failures (session option typing, web endpoint-context nullability contracts, cron parser nullable ISO handling, provider bootstrap API constraints, deep-import typing declaration seam) and restored green `make build-piclaw`/`tsc` status
  - completed 24h web-route audit: extracted route path literals for `request-router-service` + `web/http/dispatch-*` and compared against baseline commit `f31c6e8` (no added/removed route paths); runtime smoke matrix confirms canonical endpoints remain `/timeline`, `/search`, `/hashtag/:tag`, `/agents`, `/agent/status`, `/agent/context`, `/agent/models`, `/manifest.json`, `/sse/stream` with expected 404s on deprecated/non-canonical paths (`/api/*`, `/agent-status`, `/events`, `/manifest.webmanifest`)
  - removed unused `src/db/auto-compaction.ts` and retired stale compiled artifact `dist/db/auto-compaction.js` as part of dead-code burn-down
  - completed stale-dist artifact retirement by removing legacy `dist/*` leftovers and switching `check:stale-dist` to strict mode (no allowlisted stale entries)
  - tightened Azure tool-call limit utilities in `src/utils/azure-tool-call-limit.ts` by removing `any` from message/item handling and introducing guarded record access helpers for reasoning/function-call parsing
  - removed residual `as [any, ...any[]]` SQL update spread casts in `src/db/tasks.ts` and `src/db/remote-interop.ts` by using unknown-value spread arrays directly
  - tightened control helper typing in `src/agent-control/agent-control-helpers.ts` by replacing `any` event/content parameters with `AgentSessionEvent` + guarded unknown content parsing and `Model<unknown>` model matching signatures
  - enforced commenting standards on recently hardened src seams by adding module-purpose headers and exported API JSDoc in `src/remote/service.ts` and `src/utils/azure-tool-call-limit.ts`
  - expanded exported JSDoc coverage for remote persistence contracts in `src/db/remote-interop.ts` (types/interfaces + exported CRUD/audit helpers)
  - expanded remote interop module documentation coverage in `src/remote/auth.ts`, `src/remote/identity.ts`, `src/remote/signature.ts`, and `src/remote/ssrf.ts` with module-purpose headers plus exported contract/function JSDoc
  - added module header + exported JSDoc coverage for replay/limit primitives in `src/remote/nonce-cache.ts` and `src/remote/limits.ts`
  - added module header and exported JSDoc coverage for `src/utils/totp-qr.ts` (QR/TOTP options/results and generator APIs)
  - expanded exported contract JSDoc coverage in runtime orchestration seams (`src/runtime/wiring.ts`, `src/runtime/shutdown.ts`) for worker/send/shutdown dependency interfaces
  - added exported JSDoc coverage for web request metadata and throttling contracts in `src/channels/web/request-origin.ts` and `src/channels/web/http/rate-limit-rules.ts`
  - added exported JSDoc coverage for web/passkey session persistence helpers in `src/db/webauthn.ts` and `src/db/web-sessions.ts`
  - added exported JSDoc coverage for auth mode/context evaluation helpers in `src/channels/web/auth-runtime.ts`
  - added exported JSDoc coverage for endpoint-context dependency builders in `src/channels/web/endpoint-contexts.ts`
  - added exported JSDoc coverage for timeline/search/thread/thought helper contracts in `src/channels/web/content-endpoints.ts`
  - added exported JSDoc coverage for challenge tracking and RP/base64 helper contracts in `src/channels/web/webauthn-challenges.ts`
  - added exported JSDoc coverage for WebAuthn login/register endpoint context/handler contracts in `src/channels/web/webauthn-auth.ts`
  - completed remaining exported-JSDoc burn-down across residual `src/` seams (message-write flows, chat-run-control, identity/status helpers, auth/http dispatch contracts, workspace constants/tree contracts, runtime/provider/task scheduler seams, IPC/task validation, and agent-control helper contracts), bringing heuristic misses to zero.
  - extension contract hardening phase-2: removed remaining deep relative `../node_modules/...` imports from extension entrypoints, centralized extension-facing dependencies behind stable bridge modules (`src/extensions/azure-openai-api.ts`, `src/extensions/context-mode-api.ts`), and kept built-in extension registration coverage aligned to the active 9-factory set (`uiThemeExtension` included).
  - hardened web-session token storage at rest by hashing session tokens in `src/db/web-sessions.ts` with compatibility fallback/migration for legacy plaintext rows.
  - added key material provider abstraction for keychain crypto initialization (`KeyMaterialProvider`, test/runtime override hook) in `src/secure/keychain.ts`.
  - added observability seams: per-response `x-request-id` in `RequestRouterService` and queue/scheduler metrics snapshots (`AgentQueue#getMetrics()`, scheduler metrics helpers).
  - started frontend modularization by extracting reusable app helpers/hooks into `web/src/ui/app-helpers.ts` and reducing `web/src/app.ts` utility responsibilities.

### Recent commit sequence (latest first)

- Close TypeScript gate regressions and enforce typecheck quality (current HEAD)
- `dc1efe1` Add usage stats totals plus provider/model breakdown
- `03e23d0` Harden session security, observability, and quality gates
- `a0c4c0f` Tighten control and tooling type boundaries
- `b32e237` Decompose remote interop service handlers
- `ef5d390` Refresh plan after Azure extension bridge tranche
- `2dbf204` Consolidate Azure extension imports behind stable bridge
- `4c6029a` Harden extension import boundaries and update factory coverage
- `1b99938` Complete src exported JSDoc coverage sweep
- `1ea15c5` Document webauthn auth endpoint exports
- `7f14e8d` Document webauthn challenge helper exports
- `74172cc` Document web content endpoint helper exports
- `a01094d` Document web endpoint context builder exports
- `e135de5` Expand auth/session persistence JSDoc coverage
- `34d424f` Record commenting standards re-audit snapshot
- `7ebcdd4` Document request-origin and rate-limit rule contracts
- `18a5d7b` Document runtime wiring/shutdown seam contracts
- `65676aa` Document TOTP QR helper contracts
- `5eb5a55` Document remote nonce-cache and limit contracts
- `3ecb0b0` Expand remote auth/identity/signature/ssrf module docs
- `540075f` Expand remote interop DB contract documentation
- `488e6db` Document remote service and Azure tool-call limit seams
- `06460e4` Tighten agent-control helper event/content typing
- `fbc7f0e` Remove residual SQL spread casts in task/remote DB helpers
- `de05c60` Harden Azure tool-call limit parsing contracts
- `31d75ff` Harden remote interop payload parsing contracts
- `3542795` Tighten slash-command event/content typing
- `7469eb3` Extract web endpoint-context factory from web channel orchestration
- `294c7a3` Extract web message-write flows and narrow preview/store boundaries
- `ad7358c` Decompose web media/workspace routing and narrow bootstrap core contracts
- `48a6ee9` Extract web auth endpoint seam and tighten runtime/agent typing
- `85db5c8` Consolidate web dispatch route flag test fixtures
- `9233ac6` Reduce web endpoint test fixture duplication
- `8491d98` Add web/runtime test redundancy inventory
- `e198134` Document runtime seam contracts with JSDoc
- `0aad6d5` Extract runtime bootstrap orchestration module
- `54192c7` Extract runtime core composition helpers
- `e843215` Extract web endpoint context builders
- `984875e` Extract web auth gateway from web channel
- `6303253` Extract web chat run control helpers
- `ed67e5d` Extract web followup placeholder queue store
- `cbd1514` Extract web interaction broadcaster context helper
- `7500358` Extract web pending steering queue store
- `9a3fc16` Extract web agent status persistence store
- `a6d6480` Extract web auth runtime helpers and context builders
- `3cad033` Extract web recovery and pending-resume orchestration
- `4ca7068` Extract web agent buffer state service
- `2fa15d4` Harden runtime provider and IPC typing boundaries
- `4b9711e` Narrow runtime wiring interfaces and add coverage
- `79833ab` Extract web identity endpoint helpers
- `b16e931` Extract web content endpoint helpers and type workspace tree
- `da4d198` Extract web UI endpoint helpers and tighten UI bridge typing
- `46dc1ab` Extract web agent status helpers and harden session binder typing
- `05deb0b` Extract post mutation endpoint orchestration from web channel
- `fc8a95e` Extract web manifest response helper from web channel
- `99e5b92` Extract TOTP verify endpoint orchestration from web channel
- `5076b35` Extract passkey enrol page response from web channel
- `a568e6b` Extract WebAuthn auth endpoint orchestration from web channel
- `98484d4` Extract WebAuthn challenge helpers from web channel
- `ca1f393` Extract internal secret verification helper from web channel
- `7bd2bc3` Extract web session auth helpers from web channel
- `be2bcca` Extract TOTP failure tracking from web channel and refresh plan
- `c0e59d9` Extract runtime message-loop coordinator and update plan
- `a4f7ddc` Extract runtime startup/wiring helpers and refresh plan status
- `8ddcb06` Decompose runtime provider bootstrap and shutdown orchestration
- `00d74b9` Extract auth route dispatch into web/http module
- `259281d` Extract shell/static route dispatch into web/http module
- `9adb245` Extract content route dispatch into web/http module
- `0527837` Extract workspace route dispatch into web/http module
- `c7cfa3a` Extract agent route dispatch into web/http module
- `160b71f` Extract media route dispatch into web/http module
- `ebeecb4` Extract web request security guards into http module
- `176faf3` Modularize web route flags and rate-limit rule mapping
- `814762c` Unify web http module namespace and extract rate limiting
- `5a93b8c` Extract web security helpers and simplify IPC schedule handling
- `a584982` Add stoppable IPC/scheduler loops and tighten stale-dist guard
- `f31c6e8` Add package quality guard scripts and TRUST_PROXY config coverage
- `c4c63e6` Harden request trust, CSRF, SSRF, cwd checks, and package contents

---

## 1) Overview table (maintainability, reusability, security, architecture, dead code)

| Area | Current state | Risk | Priority | Main improvements |
|---|---|---:|---:|---|
| Architecture boundaries | Web router is now modularized under `src/channels/web/http/*`; `web.ts` reduced below 600 LOC, with remaining concentration in `agent-pool.ts` and select orchestration seams | Medium | P1 | Continue decomposition of runtime/bootstrap and remaining orchestration-heavy services |
| Maintainability | Significant improvement in web routing/service extraction; large core files remain | Medium | P1 | Continue focused decomposition + reduce module LOC concentration |
| Reusability | Web helpers centralized; extension API boundaries now guarded by bridge modules + import-boundary checks | Low | P1 | Keep bridge modules as stable extension integration seam |
| Type safety / best practices | Explicit `any` usage in `src/` has been eliminated; remaining risk is contract drift over time | Low | P1 | Maintain typed DTO/contracts and keep no-`any` regression checks in review flow |
| Security (local/web/remote) | P0 hardening implemented and covered by tests | Low | P0 (done) | Maintain + regressions + audit for new surfaces |
| Dead code / stale artifacts | Stale-dist detection in place (allowlist-based); destructive cleanup deferred due in-progress feature constraint | Medium | P1 | Non-destructive inventory -> confirm ownership -> gradual allowlist burn-down |
| Quality gates | Lint/tests/package guard checks in use; coverage bar still below target and redundancy consolidation has started but remains partial | Medium | P1 | Add CI coverage floor + architecture/static analysis guardrails + continue redundancy consolidation |
| Documentation/commenting standards | Partial consistency; recently extracted seams are documented but standards were not explicit in plan goals | Medium | P1 | Track and enforce module headers + exported API JSDoc for new/refactored seams |

---

## 2) Detailed checklist of fixes

## P0 (security/release safety)

- [x] **Fix path traversal boundary check for scheduled shell cwd**
  - `src/utils/task-validation.ts` now uses robust containment validation.
  - Regression tests added.

- [x] **Harden client identity for rate limiting/auth logs**
  - Trusted proxy mode added.
  - Centralized request client/origin extraction.

- [x] **Strengthen CSRF origin validation**
  - Full origin tuple validation (scheme+host+port).
  - Security tests updated.

- [x] **Harden remote callback SSRF defenses**
  - DNS resolve + private/loopback/link-local IP blocking (IPv4/IPv6).
  - Remote SSRF tests added.

- [x] **Packaging cleanup / release safety**
  - Runtime packaging guardrails and tarball hygiene checks added.
  - `files` allowlist + stale-dist checks integrated.

- [x] **Dead/stale artifact cleanup (final destructive pass)**
  - Completed: retired the stale dist artifact allowlist and removed legacy stale build outputs (including `dist/db/auto-compaction.js`).
  - `check:stale-dist` now runs in strict mode without expected stale entries.

## P1 (active wave)

- [x] **Refactor web router into middleware + route-map style modules**
  - Security, classification, rate-limits, and route dispatch now split under `web/http/*`.
  - Behavior preserved (non-destructive).

- [x] **Refactor `src/channels/web.ts` into narrower services**
  - Completed: extracted route dispatching, auth helpers/endpoints, WebAuthn/TOTP services, status/content/identity/ui endpoint helpers, message-write/recovery/chat-run control services, endpoint-context factories, and workspace/media dispatch seams.
  - Result: `web.ts` now acts as orchestration composition (~551 LOC, below architecture threshold).

- [x] **Refactor `src/runtime.ts` into composition root + startup/shutdown managers**
  - Completed: provider bootstrap/shutdown/startup/wiring/coordinator extracted into dedicated runtime modules, with typed bootstrap/composition dependency contracts.
  - Result: `runtime.ts` is now a thin composition root that delegates startup orchestration.

- [x] **Architectural dependency boundaries**
  - Completed: removed internal peeking/casts in runtime/web seams, introduced interface-based wiring contracts, and encapsulated mutable orchestration state behind dedicated service modules.
  - Result: boundary enforcement is now backed by code structure and import-boundary quality checks.

- [x] **Extension contract hardening**
  - Completed (current scope): hardened extension import boundaries in `extensions/azure-openai.ts` by removing fragile `../node_modules/...` deep relative imports and routing extension-internal dependencies through stable bridge modules.
  - Completed (current scope): introduced stable extension-facing bridge modules (`src/extensions/azure-openai-api.ts`, `src/extensions/context-mode-api.ts`) and migrated `extensions/context-mode.ts` + `extensions/azure-openai.ts` to those bridge surfaces instead of multiple direct internal imports.
  - Completed (validation): aligned extension registration coverage by updating built-in extension factory tests for the active 9-factory set (including `uiThemeExtension` command registration), with full suite green.
  - Follow-up (optional/upstream): further reduce `@mariozechner/pi-ai/dist/providers/*` usage now encapsulated in `src/extensions/azure-openai-api.ts` if/when stable top-level exports become available.

- [x] **Type quality pass**
  - Completed: removed high-risk `any` usage and cast-based seams across runtime/web/agent-control/remote/extension/tooling modules and tightened DTO/contracts for payload parsing/state flows.
  - Result: explicit `any` usage in `src/` is eliminated; continued regressions are guarded via lint/review + dedicated quality checks.

- [x] **Commenting/documentation standards consistency**
  - Completed: extracted seam modules include module-level purpose headers and JSDoc on exported contracts/helpers (including runtime, remote, db, web/http, and web/auth service seams).
  - Re-audit snapshot (2026-03-09, completion sweep): module headers are complete across `src/**/*.ts`; exported-JSDoc heuristic flags **0** missing export docblocks across **0** files.
  - Ongoing policy: keep module headers + exported JSDoc as required review criteria for newly added/refactored `src/` seams.

- [x] **Test redundancy analysis (suite signal-to-noise)**
  - Completed: inventory documented in `docs/testing/test-redundancy-inventory.md` and key duplication seams consolidated via shared helpers (`test/channels/web/helpers/http.ts`, `test/channels/web/helpers/route-flags.ts`) with regression coverage preserved.
  - Validation: full suite remains green after consolidation passes.

- [x] **Dead code review and removal**
  - Completed: removed unused `src/db/auto-compaction.ts` and stale `dist/db/auto-compaction.js` artifact.
  - Confirmed: `src/channels/web/ui-context.ts` is retained intentionally as a lightweight compatibility/test adapter around `UiBridge` (not runtime dead code).

- [x] **I/O and concurrency hygiene (loop lifecycle controls)**
  - Stoppable IPC/scheduler loops implemented and shutdown-aware.

## P2 (stabilization/polish)

- [x] Frontend modularization of large UI components (`web/src/app.ts`, larger components)
  - Completed (current tranche): extracted reusable app-level UI utilities/hooks (`buildAgentsMap`, silence timing config, iOS detection, timestamp refresh hook, preview-line estimator) into `web/src/ui/app-helpers.ts` and removed those concerns from `web/src/app.ts`.
  - Follow-up (optional): continue deeper component-level decomposition (`workspace-explorer.ts`, remaining large view files) as incremental UX-safe refactors.
- [x] Security-in-depth extras (session token storage hardening, key-provider abstraction)
  - Completed: web auth sessions are now stored as SHA-256 token hashes at rest (`src/db/web-sessions.ts`) with legacy row fallback/migration for compatibility.
  - Completed: keychain master-key loading now uses a pluggable provider seam (`KeyMaterialProvider`) with explicit override/reset hooks for tests/runtime composition.
- [x] Operational observability (request IDs, queue/scheduler metrics)
  - Completed: every web response now carries `x-request-id` for trace correlation.
  - Completed: queue/scheduler observability counters exposed via `AgentQueue#getMetrics()` and scheduler metrics snapshot helpers.

---

## 3) Dead code / stale code inventory (current)

- Potentially removable or reintegrate-with-justification:
  - `src/channels/web/ui-context.ts` (currently retained as compatibility/test adapter around `UiBridge`)
- Stale dist artifacts:
  - Guarded by `check:stale-dist` in strict mode (no allowlisted stale entries)

---

## 4) Quality bars (acceptance criteria)

## Security bars
- [x] No raw `startsWith` containment checks for workspace path security.
- [x] Forwarded headers trusted only under explicit proxy mode.
- [x] CSRF validation includes scheme+host+port.
- [x] SSRF callback validation includes DNS/IP private-range protections.

## Architecture bars
- [x] No backend module > 600 LOC in `src/` (except justified cases). (`agent-pool.ts`, `remote/service.ts`, and `totp-qr.ts` are now below threshold after remote + QR decompositions)
- [x] `runtime.ts` reduced to composition/bootstrap responsibilities.
- [x] No cross-layer internal peeking via `as any`/private field casts.

## Maintainability/reusability bars
- [x] `any` usage reduced to target threshold.
- [x] Shared web request helpers and routing logic centralized.
- [x] Optional extensions depend only on stable exported APIs.
- [x] New/refactored seam modules include module headers + JSDoc on exported contracts/functions.

## Testing/quality bars
- [x] Line coverage >= 75% overall and >= 85% for security-critical modules.
  - Coverage snapshot: **77.76%** lines overall (`bun run test:coverage`).
  - Security-critical spot checks in this tranche are >=85% lines for core controls: `src/channels/web/auth.ts` (100%), `src/channels/web/internal-secret.ts` (100%), `src/channels/web/session-auth.ts` (86.05%), `src/channels/web/http/security.ts` (89.58%), `src/remote/auth.ts` (90.91%), `src/remote/ssrf.ts` (93.18%), `src/utils/request-client.ts` (92.00%), `src/db/web-sessions.ts` (85.25%).
- [x] Redundancy audit completed: overlapping/duplicate tests identified, justified, and reduced without coverage regressions.
- [x] CI checks for dead exports/modules and import-boundary rules.
- [x] TypeScript compile gate is mandatory in tranche-end quality flow (`quality` now runs `typecheck` before tests).
- [x] Packaging CI-style checks in place (`check:pack-hygiene`, `check:stale-dist`).

## Release/package bars
- [x] Tarball hygiene guardrails implemented.
- [x] Single final runtime artifact strategy fully enforced with legacy artifacts retired.

---

## 5) Suggested execution order (next)

1. **Maintenance cadence**
   - Keep `make build-piclaw` + `quality` + `test:coverage` in tranche-end validation and preserve strict stale-dist/import-boundary/unused-export checks.
2. **Incremental optional polish**
   - Continue opportunistic frontend decomposition (`workspace-explorer.ts`, large UI files) without coupling it to backend safety/refactor gates.

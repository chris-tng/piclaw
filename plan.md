# piclaw code quality improvement plan

Date: 2026-03-09
Scope reviewed: `piclaw/piclaw/src`, `piclaw/piclaw/extensions`, `piclaw/piclaw/web/src`, packaging/build config.

## Review snapshot (updated)

- Backend size: **169 TS files / 22,946 LOC** (`src/`)
- Frontend size: **7,095 LOC** (`web/src/`)
- Tests: **613 passing, 0 failing**
- Lint: passing (for current backend tranche)
- Coverage (line): **57.97%** (`coverage/lcov.info`)
- Review comment coverage: Added focused regression/unit tests for each recent extraction seam (`web/recovery.ts`, `web/agent-buffers.ts`, `web/auth-runtime.ts`, `web/auth-gateway.ts`, `web/auth-endpoints.ts`, `web/channel-endpoint-context-factory.ts`, `web/endpoint-contexts.ts`, `web/agent-status-store.ts`, `web/pending-steering.ts`, `web/interaction-broadcaster.ts`, `web/followup-placeholders.ts`, `web/chat-run-control.ts`, `web/message-write-flows.ts`, `web/handlers/workspace.ts`, `web/http/dispatch-workspace.ts`, `web/http/dispatch-media.ts`, `web/http/dispatch-auth.ts`, `web/http/request-guards.ts`, `runtime/composition.ts`, `runtime/bootstrap.ts`, runtime wiring/provider bootstrap) so refactors remain behavior-preserving.
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
  - hardened remote interop JSON/body parsing in `src/remote/service.ts` by replacing `any`-typed payload parsing with `Record<string, unknown>` DTO guards and shared field access helpers, preserving endpoint behavior while tightening contracts
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

### Recent commit sequence (latest first)

- `c5f47d8` Consolidate Azure extension imports behind stable bridge
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
| Reusability | Web helpers now centralized; extension API boundaries still mixed (`src/*` and deep imports in some areas) | Medium | P1 | Stabilize extension-facing internal API and remove brittle deep import paths |
| Type safety / best practices | `any` usage still elevated in selected core modules | Medium | P1 | Add typed DTO/schemas for IPC/runtime/events and reduce high-density `any` hotspots |
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

- [ ] **Dead/stale artifact cleanup (final destructive pass)**
  - Partial: stale-dist quality gate active with explicit allowlist.
  - Pending: safely retire allowlisted legacy artifacts once in-progress work stabilizes.

## P1 (active wave)

- [x] **Refactor web router into middleware + route-map style modules**
  - Security, classification, rate-limits, and route dispatch now split under `web/http/*`.
  - Behavior preserved (non-destructive).

- [ ] **Refactor `src/channels/web.ts` into narrower services**
  - In progress: extracted route dispatching, TOTP lockout bookkeeping, session cookie/auth helpers, internal-secret verification helper, WebAuthn challenge helpers, WebAuthn auth endpoint orchestration, passkey enrol page response, TOTP verify endpoint orchestration, manifest response helper, post mutation endpoint orchestration, agent status/context/models helpers, workspace/thought/ui-response endpoint helpers, timeline/hashtag/search/thread/thought endpoint helpers, agents/avatar endpoint helpers, thought/draft buffer/panel state service, inflight-recovery/pending-resume orchestration, auth-runtime mode/context helpers, auth/session/passkey request-surface gateway, auth endpoint delegation helpers, endpoint context builders (post/agent/content/ui/identity/avatar), agent status persistence lifecycle service, pending steering queue service, interaction broadcast context helper, follow-up placeholder queue service, chat run control helpers (thread-root lookup/resume/failed-run cursor skip), message write orchestration helpers (`web/message-write-flows.ts`), direct workspace/media route dispatch to handler modules, and static router/agent/post handler wiring in `web.ts`.
  - Pending: split remaining `web.ts` orchestration around residual state adapters and wrapper-style endpoint methods (file now reduced to ~551 LOC, below the 600 LOC architecture bar for this module).

- [ ] **Refactor `src/runtime.ts` into composition root + startup/shutdown managers**
  - In progress: provider bootstrap, shutdown orchestration, startup/wiring helpers, message-loop coordinator extraction, runtime core composition/signal binding helpers (`runtime/composition.ts`), runtime bootstrap orchestration/default dependency wiring (`runtime/bootstrap.ts`), bootstrap core-contract narrowing (`RuntimeBootstrapCoreServices`), default bootstrap-core decoupling (`RuntimeBootstrapDefaultCoreServices`), and interface narrowing across runtime wiring/coordinator/provider bootstrap.
  - Pending: complete remaining runtime-owned interface narrowing and reduce residual global composition coupling.

- [ ] **Architectural dependency boundaries**
  - In progress: removed web session-binder `as any` cast path, tightened UI bridge/context typing (including pending/custom flow and typed context bridge access), shifted runtime wiring/coordinator to interface-based dependency contracts, extracted runtime core composition/signal registration boundaries (`runtime/composition.ts`), extracted runtime bootstrap orchestration dependency boundaries (`runtime/bootstrap.ts`), narrowed bootstrap core contracts to remove orchestration casts, decoupled bootstrap default-core typing from composition internals, removed runtime provider-bootstrap peeking into private `AgentPool` internals, and encapsulated web mutable state/orchestration (thought/draft/panel + recovery/resume + auth-runtime mode/context + auth/session/passkey request-surface + auth endpoint delegation + endpoint-context construction + agent-status persistence + pending-steering + interaction-broadcast + follow-up-placeholder + chat-run-control + workspace/media handler dispatch flows) behind dedicated services.
  - Pending: remove remaining internal peeking/casts and formalize service interfaces/ports.

- [x] **Extension contract hardening**
  - Completed (current scope): hardened extension import boundaries in `extensions/azure-openai.ts` by removing fragile `../node_modules/...` deep relative imports and routing extension-internal dependencies through stable bridge modules.
  - Completed (current scope): introduced stable extension-facing bridge modules (`src/extensions/azure-openai-api.ts`, `src/extensions/context-mode-api.ts`) and migrated `extensions/context-mode.ts` + `extensions/azure-openai.ts` to those bridge surfaces instead of multiple direct internal imports.
  - Completed (validation): aligned extension registration coverage by updating built-in extension factory tests for the active 9-factory set (including `uiThemeExtension` command registration), with full suite green.
  - Follow-up (optional/upstream): further reduce `@mariozechner/pi-ai/dist/providers/*` usage now encapsulated in `src/extensions/azure-openai-api.ts` if/when stable top-level exports become available.

- [ ] **Type quality pass**
  - In progress: removed high-risk `any` usage from `src/ipc.ts` payload/update paths, from runtime provider bootstrap + `AgentPool` provider-registration boundary, unified web thought/draft buffer typing via shared `web/agent-buffers.ts` contracts, introduced typed recovery/resume context boundaries in `web/recovery.ts`, introduced typed auth-runtime config/context builders in `web/auth-runtime.ts`, added typed auth/session/passkey gateway boundaries in `web/auth-gateway.ts`, added typed auth endpoint delegation boundaries in `web/auth-endpoints.ts`, introduced typed endpoint context builder boundaries in `web/endpoint-contexts.ts`, introduced typed channel endpoint-context assembly boundaries in `web/channel-endpoint-context-factory.ts`, added typed runtime core factory/signal registrar boundaries in `runtime/composition.ts`, added typed runtime bootstrap dependency boundaries in `runtime/bootstrap.ts`, centralized agent-status lifecycle typing in `web/agent-status-store.ts`, typed pending-steering queue semantics in `web/pending-steering.ts`, generalized interaction broadcast channel typing in `web/interaction-service.ts`/`web/interaction-broadcaster.ts`, isolated follow-up placeholder queue typing in `web/followup-placeholders.ts`, added typed chat run control boundaries in `web/chat-run-control.ts`, extracted typed message-write flow boundaries in `web/message-write-flows.ts`, narrowed workspace/media handler contracts to explicit minimal interfaces, narrowed auth dispatch/request-guard contracts to `authGateway` + `AuthEndpointsContext`, narrowed message-store/link-preview channel contract boundaries via `LinkPreviewChannel`, removed an agent-handler fallback cast on model-label lookup, removed `any` hotspots in `src/agent-pool.ts` session/message extraction plus `src/agent-pool/usage.ts` token usage parsing, replaced `any`-typed slash-command event/content handling with guarded `AgentSessionEvent` parsing in `src/agent-pool/slash-command.ts`, hardened remote interop JSON/body parsing contracts in `src/remote/service.ts` with typed payload guards/helpers, removed `any`-typed message/reasoning parsing in `src/utils/azure-tool-call-limit.ts` through guarded record access helpers, eliminated residual SQL spread casts (`as [any, ...any[]]`) in `src/db/tasks.ts` plus `src/db/remote-interop.ts`, and tightened `src/agent-control/agent-control-helpers.ts` event/content/model typing to remove `any` from control helper seams.
  - Pending: continue reducing `any` density in remaining hotspots (especially residual `src/agent-pool/*` internals and remote/tooling payload boundaries).

- [x] **Commenting/documentation standards consistency**
  - Completed: extracted seam modules include module-level purpose headers and JSDoc on exported contracts/helpers (including runtime, remote, db, web/http, and web/auth service seams).
  - Re-audit snapshot (2026-03-09, completion sweep): module headers are complete across `src/**/*.ts`; exported-JSDoc heuristic flags **0** missing export docblocks across **0** files.
  - Ongoing policy: keep module headers + exported JSDoc as required review criteria for newly added/refactored `src/` seams.

- [ ] **Test redundancy analysis (suite signal-to-noise)**
  - In progress: initial inventory captured in `docs/testing/test-redundancy-inventory.md` covering web/runtime hotspots and concrete dedupe candidates (JSON response/request fixtures, route-flag fixture builders, env/workspace setup helpers).
  - In progress: started consolidation by introducing shared web test HTTP helpers (`test/channels/web/helpers/http.ts`) and reducing repeated JSON response/request scaffolding across endpoint helper suites.
  - In progress: consolidated duplicated route-flag defaults in HTTP dispatch tests via shared fixture builder (`test/channels/web/helpers/route-flags.ts`) used by `http-dispatch-auth.test.ts` and `http-dispatch-shell.test.ts`.
  - Pending: continue consolidating redundant cases while preserving behavior-critical/security regression coverage.

- [ ] **Dead code review and removal**
  - Pending confirmation for `src/db/auto-compaction.ts`, `src/channels/web/ui-context.ts`, and stale dist allowlist items.

- [x] **I/O and concurrency hygiene (loop lifecycle controls)**
  - Stoppable IPC/scheduler loops implemented and shutdown-aware.

## P2 (stabilization/polish)

- [ ] Frontend modularization of large UI components (`web/src/app.ts`, larger components)
- [ ] Security-in-depth extras (session token storage hardening, key-provider abstraction)
- [ ] Operational observability (request IDs, queue/scheduler metrics)

---

## 3) Dead code / stale code inventory (current)

- Potentially removable or reintegrate-with-justification:
  - `src/db/auto-compaction.ts`
  - `src/channels/web/ui-context.ts` (verify runtime vs test-only role)
- Stale dist artifacts:
  - Guarded by `check:stale-dist` + explicit allowlist (non-destructive mode)
  - Planned burn-down after in-progress/legacy streams stabilize

---

## 4) Quality bars (acceptance criteria)

## Security bars
- [x] No raw `startsWith` containment checks for workspace path security.
- [x] Forwarded headers trusted only under explicit proxy mode.
- [x] CSRF validation includes scheme+host+port.
- [x] SSRF callback validation includes DNS/IP private-range protections.

## Architecture bars
- [ ] No backend module > 600 LOC in `src/` (except justified cases).
- [x] `runtime.ts` reduced to composition/bootstrap responsibilities.
- [ ] No cross-layer internal peeking via `as any`/private field casts.

## Maintainability/reusability bars
- [ ] `any` usage reduced to target threshold.
- [x] Shared web request helpers and routing logic centralized.
- [ ] Optional extensions depend only on stable exported APIs.
- [x] New/refactored seam modules include module headers + JSDoc on exported contracts/functions.

## Testing/quality bars
- [ ] Line coverage >= 75% overall and >= 85% for security-critical modules.
- [ ] Redundancy audit completed: overlapping/duplicate tests identified, justified, and reduced without coverage regressions.
- [ ] CI checks for dead exports/modules and import-boundary rules.
- [x] Packaging CI-style checks in place (`check:pack-hygiene`, `check:stale-dist`).

## Release/package bars
- [x] Tarball hygiene guardrails implemented.
- [ ] Single final runtime artifact strategy fully enforced with legacy artifacts retired.

---

## 5) Suggested execution order (next)

1. **Runtime decomposition tranche**
   - Split `runtime.ts` into composition root + lifecycle managers.
2. **Web channel service decomposition tranche**
   - Continue extracting responsibilities from `web.ts` while preserving behavior.
3. **Type-safety tranche**
   - Add schemas/DTOs for IPC/runtime/remote payload boundaries.
4. **Extension API hardening tranche**
   - Remove deep/internal imports and define stable integration surface.
5. **Dead-code and stale-artifact burn-down (safe mode first)**
   - Produce non-destructive reports, then remove with explicit confirmation.
6. **Test redundancy analysis tranche**
   - Inventory and reduce redundant overlapping tests while preserving critical regression coverage.
7. **Coverage/CI bars uplift**
   - Raise coverage and enforce architecture/packaging gates in CI.

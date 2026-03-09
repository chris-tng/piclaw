# piclaw code quality improvement plan

Date: 2026-03-09
Scope reviewed: `piclaw/piclaw/src`, `piclaw/piclaw/extensions`, `piclaw/piclaw/web/src`, packaging/build config.

## Review snapshot (updated)

- Backend size: **157 TS files / 22,071 LOC** (`src/`)
- Frontend size: **7,095 LOC** (`web/src/`)
- Tests: **572 passing, 0 failing**
- Lint: passing (for current backend tranche)
- Coverage (line): **57.97%** (`coverage/lcov.info`)

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
- Runtime decomposition (ongoing, non-destructive)
  - extracted provider bootstrap and shutdown orchestration from `runtime.ts`
  - extracted startup/wiring helpers (`runtime/startup.ts`, `runtime/wiring.ts`)
  - extracted message-loop orchestration coordinator (`runtime/coordinator.ts`)
  - narrowed runtime coordinator/wiring to interface-based contracts (message-loop/scheduler/IPC deps) and localized channel instances inside `main()` composition
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
  - replaced `as any` session-binder bridge with typed helper `web/agent-pool-binder.ts`
  - removed `any` from web UI bridge pending/custom flow and narrowed UI-context channel typing

### Recent commit sequence (latest first)

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
| Architecture boundaries | Web router is now modularized under `src/channels/web/http/*`; `runtime.ts` and `web.ts` still large | Medium | P1 | Continue decomposition of runtime/bootstrap and `web.ts` orchestration services |
| Maintainability | Significant improvement in web routing/service extraction; large core files remain | Medium | P1 | Continue focused decomposition + reduce module LOC concentration |
| Reusability | Web helpers now centralized; extension API boundaries still mixed (`src/*` and deep imports in some areas) | Medium | P1 | Stabilize extension-facing internal API and remove brittle deep import paths |
| Type safety / best practices | `any` usage still elevated in selected core modules | Medium | P1 | Add typed DTO/schemas for IPC/runtime/events and reduce high-density `any` hotspots |
| Security (local/web/remote) | P0 hardening implemented and covered by tests | Low | P0 (done) | Maintain + regressions + audit for new surfaces |
| Dead code / stale artifacts | Stale-dist detection in place (allowlist-based); destructive cleanup deferred due in-progress feature constraint | Medium | P1 | Non-destructive inventory -> confirm ownership -> gradual allowlist burn-down |
| Quality gates | Lint/tests/package guard checks in use; coverage bar still below target | Medium | P1 | Add CI coverage floor + architecture/static analysis guardrails |

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
  - In progress: extracted route dispatching, TOTP lockout bookkeeping, session cookie/auth helpers, internal-secret verification helper, WebAuthn challenge helpers, WebAuthn auth endpoint orchestration, passkey enrol page response, TOTP verify endpoint orchestration, manifest response helper, post mutation endpoint orchestration, agent status/context/models helpers, workspace/thought/ui-response endpoint helpers, timeline/hashtag/search/thread/thought endpoint helpers, and agents/avatar endpoint helpers.
  - Pending: split auth/session/status/passkey and orchestration responsibilities further.

- [ ] **Refactor `src/runtime.ts` into composition root + startup/shutdown managers**
  - In progress: provider bootstrap, shutdown orchestration, startup/wiring helpers, message-loop coordinator extraction, and interface narrowing across runtime wiring/coordinator.
  - Pending: complete remaining runtime-owned interface narrowing and reduce residual global composition coupling.

- [ ] **Architectural dependency boundaries**
  - In progress: removed web session-binder `as any` cast path, tightened UI bridge/context typing (including pending/custom flow and typed context bridge access), and shifted runtime wiring/coordinator to interface-based dependency contracts.
  - Pending: remove remaining internal peeking/casts and formalize service interfaces/ports.

- [ ] **Extension contract hardening**
  - Pending: remove deep/dist imports and `src/*` coupling where avoidable.

- [ ] **Type quality pass**
  - Pending: reduce `any` density in `src/ipc.ts`, `src/runtime.ts`, `src/channels/web.ts`, `src/agent-pool.ts`.

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
- [ ] `runtime.ts` reduced to composition/bootstrap responsibilities.
- [ ] No cross-layer internal peeking via `as any`/private field casts.

## Maintainability/reusability bars
- [ ] `any` usage reduced to target threshold.
- [x] Shared web request helpers and routing logic centralized.
- [ ] Optional extensions depend only on stable exported APIs.

## Testing/quality bars
- [ ] Line coverage >= 75% overall and >= 85% for security-critical modules.
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
6. **Coverage/CI bars uplift**
   - Raise coverage and enforce architecture/packaging gates in CI.

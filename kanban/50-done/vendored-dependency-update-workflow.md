---
id: vendored-dependency-update-workflow
title: General-purpose vendored dependency update workflow
status: done
priority: medium
created: 2026-03-12
updated: 2026-03-14
completed: 2026-03-14
target_release: next
estimate: M
risk: medium
tags:
  - work-item
  - kanban
  - vendor
  - dependencies
  - build
  - tooling
owner: pi
---

# General-purpose vendored dependency update workflow

## Summary

Create a general-purpose task/script/skill for managing vendored third-party dependencies that we ship in the source tree.

The goal is to make vendored assets reproducible, auditable, and easy to update without relying on ad hoc one-off commands. This should cover the full lifecycle: pinning the upstream version, rebuilding or exporting the vendored artifact, recording metadata/checksums, validating the result, and documenting how future updates are performed.

This should generalize the beautiful-mermaid flow into a reusable pattern that can also be applied to other vendored frontend or runtime assets.

## Acceptance Criteria

- [x] Define a standard vendored-dependency workflow that covers source entry, build/export command, output path, version pinning, and verification metadata.
- [x] Decide whether the primary interface should be a script, a skill, a Make target, or a combination.
- [x] Support at least one reusable manifest/config format for vendored dependencies.
- [x] Document how vendored assets are rebuilt, upgraded, verified, and committed.
- [x] Identify which currently vendored assets should migrate to the common workflow first.
- [x] Split follow-up migration work into separate tickets if more than one dependency needs non-trivial conversion.
- [x] Prove the workflow on at least one real vendored dependency beyond the current one-off Mermaid path, or explicitly document why Mermaid is the only initial adopter.

## Implementation Paths

### Path A — Script-first manifest-driven updater (recommended)
1. Add a generic script that reads a manifest describing vendored dependencies.
2. For each dependency, run the pinned install/build/export command.
3. Write metadata alongside the vendored artifact (version, checksum, source, command).
4. Expose thin wrappers via package scripts / Make targets.

**Pros:** reusable, automatable, good fit for CI and local rebuilds.
**Cons:** requires a bit more upfront design.

### Path B — Skill-first workflow wrapper
1. Create a Pi skill that standardizes vendored dependency updates.
2. Keep per-dependency scripts local to each dependency.
3. Use the skill mostly as orchestration + documentation.

**Pros:** ergonomic for interactive use.
**Cons:** less reusable for CI/non-agent workflows unless backed by scripts anyway.

### Path C — Convention + per-dependency scripts only
1. Keep one script per vendored dependency.
2. Standardize naming, metadata output, and docs conventions.
3. Avoid a shared manifest or generic updater.

**Pros:** simple and incremental.
**Cons:** higher drift risk over time.

## Recommended Path

Use **Path A**: define a reusable script-first workflow, then optionally expose it through a skill or Make wrapper.

## Test Plan

- **Unit:** validate manifest parsing, required fields, and deterministic metadata output for at least one fixture dependency.
- **Integration:** run the generic updater against a real vendored dependency and confirm the artifact + metadata are reproduced.
- **Build:** verify package/Make wrappers work from the authoritative repo root and package root.
- **Safety:** confirm the workflow fails clearly when an upstream package, entry file, or build command is missing.

## Definition of Done

- [x] All acceptance criteria satisfied and verified
- [x] Generic vendored-dependency updater exists and is documented
- [x] Manifest/config format committed with at least one real example
- [x] Metadata/checksum output verified for the example dependency
- [x] Package / Make / skill entry points (as chosen) are wired and documented
- [x] Follow-up migration tickets created for additional vendored assets
- [x] Update history complete with evidence
- [x] Quality score ≥ 9 recorded in final update
- [x] Ticket front matter updated (`status`, `updated`, `completed`)
- [x] Ticket moved to `50-done/`

## Updates

### 2026-03-14
- Lane change: `next` → `doing`.
- Picked up implementation using the script-first path.
- Started factoring the existing Mermaid vendoring flow into a reusable manifest-driven workflow in `piclaw/piclaw/`:
  - `scripts/vendor-workflow.ts`
  - `scripts/build-vendored-dependency.ts`
  - `scripts/update-vendored-dependency.ts`
  - `vendor-manifests/beautiful-mermaid.json`
- Kept the historical Mermaid entrypoints as compatibility wrappers so existing package scripts / docs / Make targets do not break during the transition.
- Selected Mermaid as the first manifest-backed adopter.
- Initial audited vendored/runtime asset inventory now includes:
  - `web/static/js/vendor/beautiful-mermaid.js`
  - `extensions/editor/vendor/codemirror.js`
  - `web/static/js/vendor/preact-htm.js`
  - `web/static/js/marked.min.js`
  - `web/static/js/vendor/katex.min.js`
- CodeMirror was selected as the second concrete migration target because it already has an in-tree source entry (`extensions/editor/vendor/codemirror-entry.ts`) and pinned package dependencies, making it a clean manifest-backed adopter.
- Added `vendor-manifests/codemirror-editor.json` and wired CodeMirror into the shared vendor workflow and top-level `build:vendor` / `make vendor` path.
- Added direct exact package pins for the audited runtime vendor inputs so provenance is explicit instead of purely transitive / opaque:
  - `marked@17.0.4` (upgraded during this pass)
  - `katex@0.16.38`
  - `preact@10.29.0`
  - `htm@3.1.1`
- Added the missing direct CodeMirror-family pin used by the editor vendor entry:
  - `@lezer/highlight@1.2.3`
- Added manifest-backed rebuilds for the remaining audited runtime vendors:
  - `vendor-manifests/preact-htm.json`
  - `vendor-manifests/marked-global.json`
  - `vendor-manifests/katex-global.json`
- Added an export-style vendoring path and used it to vendor the GitHub-pinned `rcarmo/ghostty-web` fork (`fcc47d423a7fce1c02c702b6464d0b1ab89175f1`) as shipped frontend assets:
  - `vendor-manifests/ghostty-web.json`
  - `web/static/js/vendor/ghostty-web.js`
  - `web/static/js/vendor/ghostty-vt.wasm`
  - `web/static/js/vendor/ghostty-web.meta.json`
- Added a manifest-backed self-hosted terminal font bundle so the docked terminal frontend does not rely on remote CDNs or host-native monospace availability:
  - exact pin `@fontsource/jetbrains-mono@5.2.8`
  - `vendor-manifests/jetbrains-mono-terminal-fonts.json`
  - `web/static/fonts/vendor/*.woff2`
  - `web/static/fonts/vendor/jetbrains-mono.meta.json`
- Added source entries for reproducible rebuilds:
  - `web/src/vendor/preact-htm-entry.ts`
  - `web/src/vendor/marked-entry.ts`
  - `web/src/vendor/katex-entry.ts`
- The shared workflow now covers all currently audited checked-in JS vendor/runtime artifacts plus the terminal font bundle:
  - Mermaid
  - CodeMirror
  - Preact/HTM
  - Marked
  - KaTeX JS
  - Ghostty Web frontend (JS + wasm export)
  - JetBrains Mono terminal webfonts
- Extended workflow metadata to record multi-package provenance (`package_versions`, licenses, repositories), which is required for composed vendors like `preact-htm`.
- Added smoke coverage for the new vendor paths, including runtime-global validation for `marked` and `katex`, export validation for `ghostty-web`, and local terminal font validation for the JetBrains Mono bundle.
- Added a minimal `ghostty-web` frontend bootstrap in `web/src/panes/terminal-pane.ts` so the vendored terminal frontend is actually exercised in the dock pane while the authenticated PTY/WebSocket bridge remains separate work.
- Added self-hosted `@font-face` wiring plus `document.fonts`/`terminal.loadFonts()` bootstrapping so the terminal measures against the vendored JetBrains Mono webfont instead of host-native fallbacks.
- Evidence so far:
  - `cd /workspace/piclaw/piclaw && bun test test/scripts/beautiful-mermaid-vendor.test.ts test/scripts/codemirror-vendor.test.ts test/scripts/runtime-vendors.test.ts test/scripts/ghostty-web-vendor.test.ts test/scripts/terminal-font-vendor.test.ts test/web/terminal-pane.test.ts` → pass
  - `cd /workspace/piclaw/piclaw && bun run build:vendor` → pass
  - `cd /workspace/piclaw && make vendor` → pass
  - `cd /workspace/piclaw/piclaw && bun run build:web` → pass
  - `cd /workspace/piclaw/piclaw && bun run quality` → pass (`824 pass, 0 fail`)
- Remaining scoped gap after this pass: KaTeX CSS/font provenance is still managed separately from the JS vendor manifest flow, so a small follow-up ticket is warranted rather than silently pretending that part is fully standardized.

### 2026-03-14 (closure)
- Marking this workflow ticket complete and moving it to `50-done/`.
- Outcome: the shared manifest-driven workflow now covers Mermaid, CodeMirror, Preact/HTM, Marked, KaTeX JS, Ghostty Web frontend assets, and the self-hosted terminal font path, with package / Make integration and regression coverage.
- Follow-up gaps were split out rather than left implicit, including `kanban/50-done/katex-css-font-vendor-provenance.md`.
- Quality: ★★★★★ 9/10 (problem: 2, scope: 2, test: 2, deps: 2, risk: 1)

### 2026-03-12
- Lane change: `inbox` → `next`.
- Expanded the ticket with a concrete test plan, DoD, and a draft manifest shape so it is ready for implementation planning.
- Quality: ★★★★☆ 8/10 (problem: 2, scope: 2, test: 2, deps: 1, risk: 1)
- Gap: still needs the first concrete adoption target beyond Mermaid to be selected at pickup time.

### 2026-03-12
- Created to track a reusable vendored dependency update workflow after the beautiful-mermaid vendoring work exposed the need for a general pattern.

## Notes

### Draft manifest shape

```json
{
  "id": "beautiful-mermaid",
  "packageName": "beautiful-mermaid",
  "version": "1.1.3",
  "projectRoot": "piclaw/piclaw",
  "sourceEntry": "web/src/vendor/mermaid-entry.ts",
  "outputFile": "web/static/js/vendor/beautiful-mermaid.js",
  "metadataFile": "web/static/js/vendor/beautiful-mermaid.meta.json",
  "installCommand": ["bun", "add", "--exact", "beautiful-mermaid@1.1.3"],
  "buildCommand": [
    "bun",
    "build",
    "web/src/vendor/mermaid-entry.ts",
    "--target=browser",
    "--minify",
    "--outfile",
    "web/static/js/vendor/beautiful-mermaid.js"
  ],
  "verify": {
    "sha256": true,
    "sizeBytes": true,
    "packageVersion": true
  }
}
```

Suggested required fields:
- `id`
- `packageName`
- `version`
- `projectRoot`
- `outputFile`
- `metadataFile`
- one of `buildCommand` or `exportCommand`

Suggested optional fields:
- `sourceEntry`
- `installCommand`
- `verify`
- `license`
- `repository`
- `notes`

The workflow should preserve host/container identity assumptions and keep all vendored assets reproducible from the authoritative source tree.

Good candidates include frontend bundles and other checked-in generated assets that are currently rebuilt manually or with one-off commands.

Metadata should be committed alongside the vendored artifact where practical.
Consider whether the shared workflow should also validate license/source provenance for vendored dependencies.

## Links

- `kanban/20-doing/fix-mermaid-vendor-build.md`
- `piclaw/piclaw/web/static/js/vendor/`
- `piclaw/piclaw/scripts/build-beautiful-mermaid-vendor.ts`
- `piclaw/piclaw/scripts/update-beautiful-mermaid.ts`
- `piclaw/Makefile`

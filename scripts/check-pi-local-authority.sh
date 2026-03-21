#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$REPO_ROOT" ]]; then
  echo "[pi-authority] error: run inside the piclaw git repo." >&2
  exit 1
fi

EXPECTED_PI="$REPO_ROOT/node_modules/.bin/pi"
PACKAGE_JSON="$REPO_ROOT/package.json"
LOCAL_AGENT_PKG="$REPO_ROOT/node_modules/@mariozechner/pi-coding-agent/package.json"

EXPECTED_AGENT_VERSION="$(node -e 'const p=require(process.argv[1]); process.stdout.write(String(p.dependencies?.["@mariozechner/pi-coding-agent"] ?? ""));' "$PACKAGE_JSON")"
INSTALLED_AGENT_VERSION=""
if [[ -f "$LOCAL_AGENT_PKG" ]]; then
  INSTALLED_AGENT_VERSION="$(node -e 'const p=require(process.argv[1]); process.stdout.write(String(p.version ?? ""));' "$LOCAL_AGENT_PKG")"
fi

ACTIVE_PI="$(command -v pi || true)"
ACTIVE_PI_VERSION=""
if [[ -n "$ACTIVE_PI" ]]; then
  ACTIVE_PI_VERSION="$($ACTIVE_PI --version 2>/dev/null || true)"
fi

# Use package metadata as local version source to avoid side effects from
# executing the local pi binary directly.
LOCAL_PI_VERSION="$INSTALLED_AGENT_VERSION"

echo "[pi-authority] expected binary: $EXPECTED_PI"
echo "[pi-authority] active   binary: ${ACTIVE_PI:-<not found>}"
echo "[pi-authority] expected agent version (package.json): ${EXPECTED_AGENT_VERSION:-<missing>}"
echo "[pi-authority] installed local agent version: ${INSTALLED_AGENT_VERSION:-<missing>}"
echo "[pi-authority] active pi --version: ${ACTIVE_PI_VERSION:-<missing>}"
echo "[pi-authority] local  pi --version: ${LOCAL_PI_VERSION:-<missing>}"

if [[ ! -x "$EXPECTED_PI" ]]; then
  echo "[pi-authority] FAIL: local pi binary not found." >&2
  echo "[pi-authority] fix: cd $REPO_ROOT && bun install --frozen-lockfile" >&2
  exit 1
fi

if [[ -z "$INSTALLED_AGENT_VERSION" ]]; then
  echo "[pi-authority] FAIL: local @mariozechner/pi-coding-agent is not installed." >&2
  echo "[pi-authority] fix: cd $REPO_ROOT && bun install --frozen-lockfile" >&2
  exit 1
fi

if [[ "$INSTALLED_AGENT_VERSION" != "$EXPECTED_AGENT_VERSION" ]]; then
  echo "[pi-authority] FAIL: local installed version does not match package.json pin." >&2
  echo "[pi-authority] fix: cd $REPO_ROOT && bun install --frozen-lockfile" >&2
  exit 1
fi

if [[ "$ACTIVE_PI" != "$EXPECTED_PI" ]]; then
  echo "[pi-authority] FAIL: active pi is not project-local." >&2
  echo "[pi-authority] fix: install direnv, then run: cd $REPO_ROOT && direnv allow" >&2
  exit 1
fi

echo "[pi-authority] OK: project-local pi authority is enforced."

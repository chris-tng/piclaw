#!/usr/bin/env bash
set -euo pipefail

WORKSPACE="${PICLAW_WORKSPACE:-/workspace}"
BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-$WORKSPACE/.cache/ms-playwright}"
PACKAGE_JSON="$WORKSPACE/package.json"
NODE_MODULES="$WORKSPACE/node_modules"

log() {
  printf "[bootstrap] %s\n" "$*"
}

have() {
  command -v "$1" >/dev/null 2>&1
}

ensure_apt_packages() {
  if ! have apt-get; then
    log "apt-get not found; skipping OS package install."
    return 0
  fi

  local sudo_cmd=()
  if [ "$(id -u)" -ne 0 ]; then
    if have sudo; then
      sudo_cmd=(sudo)
    else
      log "sudo not available; run as root to install OS packages."
      return 0
    fi
  fi

  local packages=(
    ca-certificates curl wget unzip git jq ripgrep make
    supervisor sqlite3 restic openssh-client
    iproute2 procps psmisc rsync file
  )

  log "Installing OS packages (if missing)..."
  "${sudo_cmd[@]}" apt-get update -y
  "${sudo_cmd[@]}" apt-get install -y --no-install-recommends "${packages[@]}"
}

ensure_bun() {
  if ! have bun; then
    log "bun is missing. Install Bun before continuing."
    exit 1
  fi
}

ensure_workspace_package() {
  if [ ! -f "$PACKAGE_JSON" ]; then
    log "package.json missing; initializing in $WORKSPACE"
    (cd "$WORKSPACE" && bun init -y)
  fi

  if [ ! -d "$NODE_MODULES" ]; then
    log "node_modules missing; running bun install"
    (cd "$WORKSPACE" && bun install)
  fi
}

ensure_bun_dependencies() {
  local deps=(linkedom turndown)
  local missing=()
  for dep in "${deps[@]}"; do
    if [ ! -d "$NODE_MODULES/$dep" ]; then
      missing+=("$dep")
    fi
  done

  if [ ${#missing[@]} -gt 0 ]; then
    log "Installing missing deps: ${missing[*]}"
    (cd "$WORKSPACE" && bun add "${missing[@]}")
  fi

  if [ ! -d "$NODE_MODULES/playwright" ]; then
    log "Installing Playwright (dev dependency)"
    (cd "$WORKSPACE" && bun add -d playwright)
  fi
}

ensure_playwright_browsers() {
  mkdir -p "$BROWSERS_PATH"
  if [ -d "$BROWSERS_PATH" ] && ls "$BROWSERS_PATH"/chromium-* >/dev/null 2>&1; then
    log "Playwright browsers already present in $BROWSERS_PATH"
    return 0
  fi
  log "Installing Playwright Chromium + OS deps"
  (cd "$WORKSPACE" && PLAYWRIGHT_BROWSERS_PATH="$BROWSERS_PATH" bunx playwright install chromium --with-deps)
}

report_versions() {
  log "Version summary:"
  bun --version || true
  git --version || true
  jq --version || true
  rg --version || true
  sqlite3 --version || true
  restic version || true
  ssh -V 2>&1 || true
}

main() {
  log "Starting bootstrap for $WORKSPACE"
  ensure_apt_packages
  ensure_bun
  ensure_workspace_package
  ensure_bun_dependencies
  ensure_playwright_browsers

  if [ -f "$WORKSPACE/.piclaw/restic/env.sh" ]; then
    log "Restic env present: $WORKSPACE/.piclaw/restic/env.sh"
  else
    log "Restic env missing: $WORKSPACE/.piclaw/restic/env.sh"
  fi

  report_versions
  log "Bootstrap complete."
}

main "$@"

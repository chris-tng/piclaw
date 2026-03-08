#!/usr/bin/env bash
# scripts/docker/build-piclaw-package.sh – Build piclaw .tgz and install globally.
#
# Runs bun update, tsc, bun pack, then `bun add -g` to let bun handle
# the global install layout under $BUN_INSTALL.
#
# Build pipeline:
#   1. `bun run build`     – Type-check/compile TypeScript for CI parity.
#   2. `bun run build:web` – Produces web/static/dist/{app,login}.bundle.js
#                            plus source maps, and builds vendored CodeMirror.
#   3. `bun pm pack`       – Creates the tarball for global install.
#
# TODO: Exclude dist/ from the tarball (add to .npmignore or use package.json
#   "files" field). The bin entry points to src/index.ts, not dist/.
#
# Note: request-router-service.ts auth-gates app.bundle.js and only exposes
#   login.bundle.js pre-auth.
set -euo pipefail

export BUN_INSTALL="${BUN_INSTALL:-/usr/local/lib/bun}"
export PATH="$BUN_INSTALL/bin:/home/linuxbrew/.linuxbrew/bin:$PATH"

cd /home/agent/piclaw

bun update
bun install
bun run build
bun run build:web

rm -f piclaw-*.tgz
PACK_DIR="$(mktemp -d)"
bun pm pack --outdir "$PACK_DIR"

TARBALL="$(find "$PACK_DIR" -maxdepth 1 -name 'piclaw-*.tgz' | head -n1)"
if [ -z "$TARBALL" ] || [ ! -f "$TARBALL" ]; then
  TARBALL="$(find . -maxdepth 1 -name 'piclaw-*.tgz' | head -n1)"
fi
if [ -z "$TARBALL" ] || [ ! -f "$TARBALL" ]; then
  echo "piclaw tarball not found" >&2
  exit 1
fi

# Use an absolute path so bun add -g works reliably under sudo/buildkit.
TARBALL="$(realpath "$TARBALL")"

GLOBAL_PKG="$BUN_INSTALL/install/global/package.json"
GLOBAL_LOCK="$BUN_INSTALL/install/global/bun.lock"

# Keep the global install deterministic and avoid stale/duplicate dependency
# entries from previous runs. Keep pi-coding-agent explicitly installed so
# the standalone `pi` CLI stays aligned with piclaw's dependency version.
PI_AGENT_VERSION="$(jq -r '.dependencies["@mariozechner/pi-coding-agent"] // "0.57.0"' package.json)"
printf '{"dependencies":{"@mariozechner/pi-coding-agent":"%s","piclaw":"%s"}}\n' "$PI_AGENT_VERSION" "$TARBALL" | sudo tee "$GLOBAL_PKG" >/dev/null
sudo rm -f "$GLOBAL_LOCK"
sudo BUN_INSTALL="$BUN_INSTALL" "$BUN_INSTALL/bin/bun" install -g "$TARBALL" --registry https://registry.npmjs.org

rm -f "$TARBALL"
rm -rf "$PACK_DIR"

DEST="$BUN_INSTALL/install/global/node_modules/piclaw"
if [ -d "$DEST/extensions" ] && [ -d "$DEST/node_modules" ]; then
  sudo ln -sfn "$DEST/node_modules" "$DEST/extensions/node_modules" 2>/dev/null || true
fi

# Ensure world-readable after install
sudo chmod -R a+rX "$BUN_INSTALL"

# Symlink piclaw into /usr/local/bin if bun placed it under $BUN_INSTALL/bin
if [ -f "$BUN_INSTALL/bin/piclaw" ]; then
  sudo ln -sf "$BUN_INSTALL/bin/piclaw" /usr/local/bin/piclaw
fi

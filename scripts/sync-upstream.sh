#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Sync upstream -> main, then rebase overrides branch onto main.

Usage:
  scripts/sync-upstream.sh [options]

Options:
  --auth-user <github-user>   Switch gh auth account before pushing (optional)
  --upstream <remote>         Upstream remote name (default: upstream)
  --origin <remote>           Origin remote name (default: origin)
  --main <branch>             Main branch name (default: main)
  --overrides <branch>        Overrides branch name (default: chris/overrides)
  --no-push                   Skip pushing branches to origin
  --skip-typecheck            Skip bun typecheck in ./piclaw
  -h, --help                  Show this help

Examples:
  scripts/sync-upstream.sh --auth-user chris-tng
  scripts/sync-upstream.sh --no-push
EOF
}

UPSTREAM_REMOTE="upstream"
ORIGIN_REMOTE="origin"
MAIN_BRANCH="main"
OVERRIDES_BRANCH="chris/overrides"
AUTH_USER=""
NO_PUSH="false"
SKIP_TYPECHECK="false"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --auth-user)
      AUTH_USER="${2:-}"
      shift 2
      ;;
    --upstream)
      UPSTREAM_REMOTE="${2:-}"
      shift 2
      ;;
    --origin)
      ORIGIN_REMOTE="${2:-}"
      shift 2
      ;;
    --main)
      MAIN_BRANCH="${2:-}"
      shift 2
      ;;
    --overrides)
      OVERRIDES_BRANCH="${2:-}"
      shift 2
      ;;
    --no-push)
      NO_PUSH="true"
      shift
      ;;
    --skip-typecheck)
      SKIP_TYPECHECK="true"
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
  esac
done

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$REPO_ROOT" ]]; then
  echo "Error: not inside a git repository." >&2
  exit 1
fi

cd "$REPO_ROOT"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Error: working tree is not clean (including untracked files). Commit/stash/clean before syncing." >&2
  git status --short
  exit 1
fi

if ! git show-ref --verify --quiet "refs/heads/${MAIN_BRANCH}"; then
  echo "Error: main branch '${MAIN_BRANCH}' does not exist." >&2
  exit 1
fi

if ! git show-ref --verify --quiet "refs/heads/${OVERRIDES_BRANCH}"; then
  echo "Error: overrides branch '${OVERRIDES_BRANCH}' does not exist." >&2
  exit 1
fi

if [[ -n "$AUTH_USER" ]]; then
  if ! command -v gh >/dev/null 2>&1; then
    echo "Error: gh CLI is required for --auth-user." >&2
    exit 1
  fi
  echo "[sync] Switching gh auth account -> ${AUTH_USER}"
  gh auth switch --user "$AUTH_USER"
fi

CURRENT_BRANCH="$(git branch --show-current)"

echo "[sync] Fetching ${UPSTREAM_REMOTE}..."
git fetch "$UPSTREAM_REMOTE" --prune

echo "[sync] Rebasing ${MAIN_BRANCH} onto ${UPSTREAM_REMOTE}/${MAIN_BRANCH}"
git switch "$MAIN_BRANCH"
git rebase "${UPSTREAM_REMOTE}/${MAIN_BRANCH}"

if [[ "$NO_PUSH" != "true" ]]; then
  echo "[sync] Pushing ${MAIN_BRANCH} -> ${ORIGIN_REMOTE}/${MAIN_BRANCH}"
  git push "$ORIGIN_REMOTE" "$MAIN_BRANCH"
fi

echo "[sync] Rebasing ${OVERRIDES_BRANCH} onto ${MAIN_BRANCH}"
git switch "$OVERRIDES_BRANCH"
git rebase "$MAIN_BRANCH"

if [[ "$SKIP_TYPECHECK" != "true" && -f "${REPO_ROOT}/piclaw/package.json" ]]; then
  echo "[sync] Running typecheck in ${REPO_ROOT}/piclaw"
  (cd "${REPO_ROOT}/piclaw" && bun run typecheck)
fi

if [[ "$NO_PUSH" != "true" ]]; then
  echo "[sync] Pushing ${OVERRIDES_BRANCH} with --force-with-lease"
  git push --force-with-lease "$ORIGIN_REMOTE" "$OVERRIDES_BRANCH"
fi

echo "[sync] Done."
echo "[sync] Current branch: $(git branch --show-current)"
echo "[sync] Previous branch was: ${CURRENT_BRANCH}"

import path from "path";
import chokidar from "chokidar";

import { WORKSPACE_DIR } from "../../../core/config.js";
import { buildTree, compressPaths } from "./tree.js";
import { isHiddenPath, resolveWorkspacePath, shouldIgnorePath, toRelativePath } from "./paths.js";

export type WorkspaceUpdate = { path: string; root: unknown; truncated: boolean };

export function createWorkspaceUpdateThrottle(
  onUpdate: (updates: WorkspaceUpdate[]) => void,
  throttleMs = 1000
) {
  let lastEmit = 0;
  let throttleTimer: ReturnType<typeof setTimeout> | null = null;
  let pendingUpdates: Map<string, WorkspaceUpdate> | null = null;

  const emitUpdates = (updates: WorkspaceUpdate[]) => {
    if (!updates.length) return;
    lastEmit = Date.now();
    onUpdate(updates);
  };

  const schedule = (updates: WorkspaceUpdate[]) => {
    const now = Date.now();
    const elapsed = now - lastEmit;
    if (elapsed >= throttleMs) {
      emitUpdates(updates);
      return;
    }
    if (!pendingUpdates) pendingUpdates = new Map();
    for (const update of updates) {
      pendingUpdates.set(update.path, update);
    }
    if (throttleTimer) return;
    throttleTimer = setTimeout(() => {
      throttleTimer = null;
      const merged = pendingUpdates ? Array.from(pendingUpdates.values()) : [];
      pendingUpdates = null;
      emitUpdates(merged);
    }, Math.max(throttleMs - elapsed, 0));
  };

  const clear = () => {
    if (throttleTimer) {
      clearTimeout(throttleTimer);
      throttleTimer = null;
    }
    pendingUpdates = null;
  };

  return { schedule, clear };
}

export function startWorkspaceWatcher(
  onUpdate: (updates: WorkspaceUpdate[]) => void,
  includeHidden: () => boolean
): { close: () => Promise<void> } {
  const pending = new Set<string>();
  let flushTimer: ReturnType<typeof setTimeout> | null = null;
  const throttler = createWorkspaceUpdateThrottle(onUpdate, 1000);

  const queuePath = (absPath: string) => {
    if (shouldIgnorePath(absPath)) return;
    if (!includeHidden() && isHiddenPath(absPath)) return;
    const rel = toRelativePath(absPath);
    const target = rel === "." ? "." : toRelativePath(path.dirname(absPath));
    pending.add(target);
    if (flushTimer) return;
    flushTimer = setTimeout(() => {
      flushTimer = null;
      const targets = compressPaths(Array.from(pending));
      pending.clear();
      if (!targets.length) return;
      const updates: WorkspaceUpdate[] = [];
      for (const relPath of targets) {
        const abs = resolveWorkspacePath(relPath);
        if (!abs) continue;
        try {
          const state = { count: 0, truncated: false };
          const depth = relPath === "." ? 4 : 3;
          const root = buildTree(abs, depth, state, { includeHidden: includeHidden() });
          updates.push({ path: relPath, root, truncated: state.truncated });
        } catch {
          // ignore
        }
      }
      throttler.schedule(updates);
    }, 300);
  };

  const watcher = chokidar.watch(WORKSPACE_DIR, {
    ignoreInitial: true,
    depth: 8,
    awaitWriteFinish: { stabilityThreshold: 150, pollInterval: 50 },
    ignored: (p) => shouldIgnorePath(p),
  });

  watcher.on("add", queuePath);
  watcher.on("addDir", queuePath);
  watcher.on("unlink", queuePath);
  watcher.on("unlinkDir", queuePath);
  watcher.on("change", queuePath);

  return {
    close: async () => {
      if (flushTimer) {
        clearTimeout(flushTimer);
        flushTimer = null;
      }
      throttler.clear();
      pending.clear();
      try { await watcher.close(); } catch {}
    },
  };
}

import path from "path";
import chokidar from "chokidar";
import { WORKSPACE_DIR } from "../../../core/config.js";
import { buildTree, compressPaths } from "./tree.js";
import { isHiddenPath, resolveWorkspacePath, shouldIgnorePath, toRelativePath } from "./paths.js";
export function createWorkspaceUpdateThrottle(onUpdate, throttleMs = 1000) {
    let lastEmit = 0;
    let throttleTimer = null;
    let pendingUpdates = null;
    const emitUpdates = (updates) => {
        if (!updates.length)
            return;
        lastEmit = Date.now();
        onUpdate(updates);
    };
    const schedule = (updates) => {
        const now = Date.now();
        const elapsed = now - lastEmit;
        if (elapsed >= throttleMs) {
            emitUpdates(updates);
            return;
        }
        if (!pendingUpdates)
            pendingUpdates = new Map();
        for (const update of updates) {
            pendingUpdates.set(update.path, update);
        }
        if (throttleTimer)
            return;
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
export function startWorkspaceWatcher(onUpdate, includeHidden) {
    const pending = new Set();
    let flushTimer = null;
    const throttler = createWorkspaceUpdateThrottle(onUpdate, 1000);
    const queuePath = (absPath) => {
        if (shouldIgnorePath(absPath))
            return;
        if (!includeHidden() && isHiddenPath(absPath))
            return;
        const rel = toRelativePath(absPath);
        const target = rel === "." ? "." : toRelativePath(path.dirname(absPath));
        pending.add(target);
        if (flushTimer)
            return;
        flushTimer = setTimeout(() => {
            flushTimer = null;
            const targets = compressPaths(Array.from(pending));
            pending.clear();
            if (!targets.length)
                return;
            const updates = [];
            for (const relPath of targets) {
                const abs = resolveWorkspacePath(relPath);
                if (!abs)
                    continue;
                try {
                    const state = { count: 0, truncated: false };
                    const depth = relPath === "." ? 4 : 3;
                    const root = buildTree(abs, depth, state, { includeHidden: includeHidden() });
                    updates.push({ path: relPath, root, truncated: state.truncated });
                }
                catch {
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
            try {
                await watcher.close();
            }
            catch { }
        },
    };
}

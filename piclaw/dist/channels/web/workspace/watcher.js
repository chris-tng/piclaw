import path from "path";
import { readdirSync, statSync, watch } from "fs";
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
    const watchers = new Map();
    const maxDepth = 8;
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
    const removeWatcher = (dir) => {
        for (const [key, watcher] of Array.from(watchers.entries())) {
            if (key === dir || key.startsWith(`${dir}${path.sep}`)) {
                try {
                    watcher.close();
                }
                catch { }
                watchers.delete(key);
            }
        }
    };
    const addWatcher = (dir, depth) => {
        if (depth < 0)
            return;
        if (shouldIgnorePath(dir))
            return;
        if (watchers.has(dir))
            return;
        try {
            const watcher = watch(dir, { persistent: true }, (eventType, filename) => {
                const name = filename ? filename.toString() : "";
                const targetPath = name ? path.join(dir, name) : dir;
                queuePath(targetPath);
                if (eventType === "rename" && name) {
                    try {
                        const stats = statSync(targetPath);
                        if (stats.isDirectory()) {
                            addWatcher(targetPath, depth - 1);
                        }
                    }
                    catch {
                        removeWatcher(targetPath);
                    }
                }
            });
            watcher.on("error", (err) => {
                console.warn("[workspace] fs.watch error:", err);
                removeWatcher(dir);
            });
            watchers.set(dir, watcher);
        }
        catch (err) {
            console.warn("[workspace] Failed to watch directory:", dir, err);
            return;
        }
        if (depth === 0)
            return;
        let entries;
        try {
            entries = readdirSync(dir, { withFileTypes: true });
        }
        catch {
            return;
        }
        for (const entry of entries) {
            if (!entry.isDirectory())
                continue;
            const child = path.join(dir, entry.name);
            addWatcher(child, depth - 1);
        }
    };
    addWatcher(WORKSPACE_DIR, maxDepth);
    return {
        close: async () => {
            if (flushTimer) {
                clearTimeout(flushTimer);
                flushTimer = null;
            }
            throttler.clear();
            pending.clear();
            for (const watcher of watchers.values()) {
                try {
                    watcher.close();
                }
                catch { }
            }
            watchers.clear();
        },
    };
}

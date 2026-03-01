import { readFileSync, statSync } from "fs";
import path from "path";
import chokidar from "chokidar";
import { WORKSPACE_DIR } from "../../../config.js";
import { createMedia } from "../../../db.js";
import { MAX_ATTACH_BYTES, MAX_PREVIEW_BYTES } from "./constants.js";
import { contentTypeForPath, detectBinary, formatMtime, isImageFile, isTextFile } from "./file-utils.js";
import { isHiddenPath, resolveWorkspacePath, shouldIgnorePath, toRelativePath } from "./paths.js";
import { buildTree, compressPaths } from "./tree.js";
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
export class WorkspaceService {
    treeCache = new Map();
    treeRequestTimes = [];
    isTreeRateLimited() {
        const windowMs = 2000;
        const maxRequests = 60;
        const now = Date.now();
        this.treeRequestTimes = this.treeRequestTimes.filter((t) => now - t < windowMs);
        if (this.treeRequestTimes.length >= maxRequests)
            return true;
        this.treeRequestTimes.push(now);
        return false;
    }
    getTree(pathParam, depthParam, includeHidden = false) {
        const targetPath = resolveWorkspacePath(pathParam);
        if (!targetPath)
            return { status: 400, body: { error: "Invalid path" } };
        const depthRaw = parseInt(depthParam || "2", 10);
        const depth = Number.isFinite(depthRaw) ? Math.min(Math.max(depthRaw, 1), 8) : 2;
        const cacheKey = `${targetPath}|${depth}|${includeHidden ? "1" : "0"}`;
        const cached = this.treeCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < 1000) {
            return cached.result;
        }
        if (this.isTreeRateLimited()) {
            return { status: 429, body: { error: "Workspace tree requests are throttled. Try again shortly." } };
        }
        try {
            const state = { count: 0, truncated: false };
            const tree = buildTree(targetPath, depth, state, { includeHidden });
            const result = { status: 200, body: { root: tree, truncated: state.truncated } };
            this.treeCache.set(cacheKey, { timestamp: Date.now(), result });
            return result;
        }
        catch {
            return { status: 500, body: { error: "Failed to read workspace" } };
        }
    }
    getFile(pathParam, maxParam) {
        const targetPath = resolveWorkspacePath(pathParam);
        if (!targetPath)
            return { status: 400, body: { error: "Invalid path" } };
        try {
            const stats = statSync(targetPath);
            if (stats.isDirectory()) {
                return { status: 400, body: { error: "Path is a directory" } };
            }
            const relPath = toRelativePath(targetPath);
            const contentType = contentTypeForPath(targetPath);
            const isImage = isImageFile(targetPath);
            if (isImage) {
                const rawUrl = `/workspace/raw?path=${encodeURIComponent(relPath)}`;
                return {
                    status: 200,
                    body: {
                        path: relPath,
                        name: path.basename(targetPath),
                        kind: "image",
                        content_type: contentType,
                        size: stats.size,
                        mtime: formatMtime(stats),
                        url: rawUrl,
                    },
                };
            }
            const maxParsed = parseInt(maxParam || "", 10);
            const maxBytes = Number.isFinite(maxParsed)
                ? Math.min(Math.max(maxParsed, 1024), MAX_PREVIEW_BYTES)
                : 20000;
            const buffer = readFileSync(targetPath, { encoding: null });
            const slice = buffer.subarray(0, maxBytes);
            const truncated = buffer.length > maxBytes;
            if (!isTextFile(targetPath) && detectBinary(slice)) {
                return {
                    status: 200,
                    body: {
                        path: relPath,
                        name: path.basename(targetPath),
                        kind: "binary",
                        content_type: contentType,
                        size: stats.size,
                        mtime: formatMtime(stats),
                        truncated,
                    },
                };
            }
            let text = slice.toString("utf-8");
            if (path.extname(targetPath).toLowerCase() === ".json") {
                try {
                    text = JSON.stringify(JSON.parse(text), null, 2);
                }
                catch {
                    // keep raw
                }
            }
            return {
                status: 200,
                body: {
                    path: relPath,
                    name: path.basename(targetPath),
                    kind: "text",
                    content_type: contentType,
                    size: stats.size,
                    mtime: formatMtime(stats),
                    text,
                    truncated,
                },
            };
        }
        catch {
            return { status: 500, body: { error: "Failed to read file" } };
        }
    }
    getRaw(pathParam) {
        const targetPath = resolveWorkspacePath(pathParam);
        if (!targetPath)
            return { status: 400, body: "Invalid path" };
        try {
            const stats = statSync(targetPath);
            if (stats.isDirectory())
                return { status: 400, body: "Path is a directory" };
            const contentType = contentTypeForPath(targetPath);
            const file = Bun.file(targetPath);
            return { status: 200, body: file, contentType };
        }
        catch {
            return { status: 404, body: "Not found" };
        }
    }
    attachFile(pathParam) {
        const targetPath = resolveWorkspacePath(pathParam);
        if (!targetPath)
            return { status: 400, body: { error: "Invalid path" } };
        try {
            const stats = statSync(targetPath);
            if (stats.isDirectory())
                return { status: 400, body: { error: "Path is a directory" } };
            if (stats.size > MAX_ATTACH_BYTES) {
                return { status: 400, body: { error: "File too large to attach" } };
            }
            const dataBuf = readFileSync(targetPath);
            const filename = path.basename(targetPath);
            const contentType = contentTypeForPath(targetPath);
            const mediaId = createMedia(filename, contentType, new Uint8Array(dataBuf), null, {
                size: stats.size,
                kind: "file",
                source_path: targetPath,
            });
            return {
                status: 200,
                body: {
                    media_id: mediaId,
                    filename,
                    size: stats.size,
                },
            };
        }
        catch {
            return { status: 500, body: { error: "Failed to attach file" } };
        }
    }
    startWatcher(onUpdate, includeHidden) {
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
}

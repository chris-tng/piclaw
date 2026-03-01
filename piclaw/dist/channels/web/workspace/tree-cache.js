import { buildTree } from "./tree.js";
import { resolveWorkspacePath } from "./paths.js";
export class WorkspaceTreeCache {
    treeCache = new Map();
    treeRequestTimes = [];
    isRateLimited() {
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
        if (this.isRateLimited()) {
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
}

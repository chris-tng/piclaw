export class RequestRouterService {
    channel;
    constructor(channel) {
        this.channel = channel;
    }
    async handle(req) {
        const url = new URL(req.url);
        const pathname = url.pathname;
        if (req.method === "GET" && (pathname === "/" || pathname === "/index.html")) {
            return this.channel.serveStatic("index.html");
        }
        if (pathname.startsWith("/static/")) {
            const rel = pathname.replace("/static/", "");
            return this.channel.serveStatic(rel);
        }
        if (pathname.startsWith("/docs/")) {
            const rel = pathname.replace("/docs/", "");
            return this.channel.serveDocsStatic(rel);
        }
        if (pathname === "/sse/stream") {
            return this.channel.handleSse();
        }
        if (req.method === "GET" && pathname === "/agents") {
            return await this.channel.handleAgents();
        }
        if (req.method === "GET" && pathname === "/timeline") {
            const limit = this.channel.clampInt(url.searchParams.get("limit"), 10, 1, 100);
            const before = this.channel.parseOptionalInt(url.searchParams.get("before"));
            return this.channel.handleTimeline(limit, before ?? undefined);
        }
        if (req.method === "GET" && pathname === "/workspace/tree") {
            return this.channel.handleWorkspaceTree(req);
        }
        if (req.method === "GET" && pathname === "/workspace/file") {
            return this.channel.handleWorkspaceFile(req);
        }
        if (req.method === "GET" && pathname === "/workspace/raw") {
            return this.channel.handleWorkspaceRaw(req);
        }
        if (req.method === "POST" && pathname === "/workspace/attach") {
            return this.channel.handleWorkspaceAttach(req);
        }
        if (req.method === "POST" && pathname === "/workspace/visibility") {
            return this.channel.handleWorkspaceVisibility(req);
        }
        if (req.method === "GET" && pathname.startsWith("/hashtag/")) {
            const tag = decodeURIComponent(pathname.replace("/hashtag/", ""));
            const limit = this.channel.clampInt(url.searchParams.get("limit"), 50, 1, 100);
            const offset = this.channel.clampInt(url.searchParams.get("offset"), 0, 0, Number.MAX_SAFE_INTEGER);
            return this.channel.handleHashtag(tag, limit, offset);
        }
        if (req.method === "GET" && pathname === "/search") {
            const query = (url.searchParams.get("q") || "").trim();
            const limit = this.channel.clampInt(url.searchParams.get("limit"), 50, 1, 100);
            const offset = this.channel.clampInt(url.searchParams.get("offset"), 0, 0, Number.MAX_SAFE_INTEGER);
            return this.channel.handleSearch(query, limit, offset);
        }
        if (req.method === "POST" && pathname === "/post") {
            return this.channel.handlePost(req, false);
        }
        if (req.method === "POST" && pathname === "/reply") {
            return this.channel.handlePost(req, true);
        }
        if (req.method === "GET" && pathname.startsWith("/thread/")) {
            const id = this.channel.parseOptionalInt(pathname.replace("/thread/", ""));
            return this.channel.handleThread(id);
        }
        if (req.method === "DELETE" && pathname.startsWith("/post/")) {
            const id = this.channel.parseOptionalInt(pathname.replace("/post/", ""));
            const url = new URL(req.url);
            const cascade = url.searchParams.get("cascade") === "true" || url.searchParams.get("cascade") === "1";
            return this.channel.handleDeletePost(id, cascade);
        }
        if (req.method === "POST" && pathname.startsWith("/agent/") && pathname.endsWith("/message")) {
            return this.channel.handleAgentMessage(req, pathname);
        }
        if (req.method === "POST" && pathname === "/agent/respond") {
            return this.channel.handleAgentRespond(req);
        }
        if (req.method === "POST" && pathname === "/agent/whitelist") {
            return this.channel.json({ status: "ok" });
        }
        if (req.method === "POST" && pathname === "/media/upload") {
            return this.channel.handleMediaUpload(req);
        }
        if (req.method === "GET" && pathname.startsWith("/media/") && pathname.endsWith("/thumbnail")) {
            const id = this.channel.parseOptionalInt(pathname.replace("/media/", "").replace("/thumbnail", ""));
            if (!id)
                return this.channel.json({ error: "Media not found" }, 404);
            return this.channel.handleMedia(id, true);
        }
        if (req.method === "GET" && pathname.startsWith("/media/") && pathname.endsWith("/info")) {
            const id = this.channel.parseOptionalInt(pathname.replace("/media/", "").replace("/info", ""));
            if (!id)
                return this.channel.json({ error: "Media not found" }, 404);
            return this.channel.handleMediaInfo(id);
        }
        if (req.method === "GET" && pathname.startsWith("/media/")) {
            const id = this.channel.parseOptionalInt(pathname.replace("/media/", ""));
            if (!id)
                return this.channel.json({ error: "Media not found" }, 404);
            return this.channel.handleMedia(id, false);
        }
        return this.channel.json({ error: "Not found" }, 404);
    }
}

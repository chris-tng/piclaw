export async function handleWebRequest(channel, req) {
    const url = new URL(req.url);
    const pathname = url.pathname;
    if (req.method === "GET" && (pathname === "/" || pathname === "/index.html")) {
        return channel.serveStatic("index.html");
    }
    if (pathname.startsWith("/static/")) {
        const rel = pathname.replace("/static/", "");
        return channel.serveStatic(rel);
    }
    if (pathname.startsWith("/docs/")) {
        const rel = pathname.replace("/docs/", "");
        return channel.serveDocsStatic(rel);
    }
    if (pathname === "/sse/stream") {
        return channel.handleSse();
    }
    if (req.method === "GET" && pathname === "/agents") {
        return await channel.handleAgents();
    }
    if (req.method === "GET" && pathname === "/timeline") {
        const limit = channel.clampInt(url.searchParams.get("limit"), 10, 1, 100);
        const before = channel.parseOptionalInt(url.searchParams.get("before"));
        return channel.handleTimeline(limit, before ?? undefined);
    }
    if (req.method === "GET" && pathname === "/workspace/tree") {
        return channel.handleWorkspaceTree(req);
    }
    if (req.method === "GET" && pathname === "/workspace/file") {
        return channel.handleWorkspaceFile(req);
    }
    if (req.method === "GET" && pathname === "/workspace/raw") {
        return channel.handleWorkspaceRaw(req);
    }
    if (req.method === "POST" && pathname === "/workspace/attach") {
        return channel.handleWorkspaceAttach(req);
    }
    if (req.method === "POST" && pathname === "/workspace/visibility") {
        return channel.handleWorkspaceVisibility(req);
    }
    if (req.method === "GET" && pathname.startsWith("/hashtag/")) {
        const tag = decodeURIComponent(pathname.replace("/hashtag/", ""));
        const limit = channel.clampInt(url.searchParams.get("limit"), 50, 1, 100);
        const offset = channel.clampInt(url.searchParams.get("offset"), 0, 0, Number.MAX_SAFE_INTEGER);
        return channel.handleHashtag(tag, limit, offset);
    }
    if (req.method === "GET" && pathname === "/search") {
        const query = (url.searchParams.get("q") || "").trim();
        const limit = channel.clampInt(url.searchParams.get("limit"), 50, 1, 100);
        const offset = channel.clampInt(url.searchParams.get("offset"), 0, 0, Number.MAX_SAFE_INTEGER);
        return channel.handleSearch(query, limit, offset);
    }
    if (req.method === "POST" && pathname === "/post") {
        return channel.handlePost(req, false);
    }
    if (req.method === "POST" && pathname === "/reply") {
        return channel.handlePost(req, true);
    }
    if (req.method === "GET" && pathname.startsWith("/thread/")) {
        const id = channel.parseOptionalInt(pathname.replace("/thread/", ""));
        return channel.handleThread(id);
    }
    if (req.method === "DELETE" && pathname.startsWith("/post/")) {
        const id = channel.parseOptionalInt(pathname.replace("/post/", ""));
        const url = new URL(req.url);
        const cascade = url.searchParams.get("cascade") === "true" || url.searchParams.get("cascade") === "1";
        return channel.handleDeletePost(id, cascade);
    }
    if (req.method === "POST" && pathname.startsWith("/agent/") && pathname.endsWith("/message")) {
        return channel.handleAgentMessage(req, pathname);
    }
    if (req.method === "POST" && pathname === "/agent/respond") {
        return channel.handleAgentRespond(req);
    }
    if (req.method === "POST" && pathname === "/agent/whitelist") {
        return channel.json({ status: "ok" });
    }
    if (req.method === "POST" && pathname === "/media/upload") {
        return channel.handleMediaUpload(req);
    }
    if (req.method === "GET" && pathname.startsWith("/media/") && pathname.endsWith("/thumbnail")) {
        const id = channel.parseOptionalInt(pathname.replace("/media/", "").replace("/thumbnail", ""));
        if (!id)
            return channel.json({ error: "Media not found" }, 404);
        return channel.handleMedia(id, true);
    }
    if (req.method === "GET" && pathname.startsWith("/media/") && pathname.endsWith("/info")) {
        const id = channel.parseOptionalInt(pathname.replace("/media/", "").replace("/info", ""));
        if (!id)
            return channel.json({ error: "Media not found" }, 404);
        return channel.handleMediaInfo(id);
    }
    if (req.method === "GET" && pathname.startsWith("/media/")) {
        const id = channel.parseOptionalInt(pathname.replace("/media/", ""));
        if (!id)
            return channel.json({ error: "Media not found" }, 404);
        return channel.handleMedia(id, false);
    }
    return channel.json({ error: "Not found" }, 404);
}

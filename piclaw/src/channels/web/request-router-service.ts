/**
 * web/request-router-service.ts – HTTP request dispatcher and security layer.
 *
 * Handles all incoming HTTP requests for the web channel:
 *   - Applies security headers (CSP, HSTS, X-Frame-Options, etc.) to every response
 *   - Enforces TOTP / WebAuthn authentication when configured
 *   - Validates CSRF Origin on all state-changing (POST/PUT/DELETE/PATCH) requests
 *   - Rate-limits auth endpoints (brute-force protection) and data endpoints
 *     (posts, uploads, deletes, workspace writes)
 *   - Auth-gates app bundles; only fonts, static images, and login bundles
 *     are served to unauthenticated visitors
 *   - Routes requests to the appropriate handler (posts, media, workspace,
 *     agent control, SSE streaming, static files)
 *
 * Security architecture:
 *   1. rememberWebOrigin (tracking)
 *   2. Auth rate limiting (auth/verify, WebAuthn login/enrol)
 *   3. Session auth check (TOTP/WebAuthn cookie)
 *   4. CSRF Origin validation (state-changing methods, exempt: auth endpoints)
 *   5. Data rate limiting (posts, uploads, deletes, writes)
 *   6. Route to handler
 *   7. withSecurityHeaders() wraps the final response
 *
 * Consumers: channels/web.ts delegates each request to handle().
 */

import { extname, resolve } from "path";
import type { WebChannel } from "../web.js";
import { rememberWebOrigin } from "./request-origin.js";
import { enforceRequestGuards } from "./http/request-guards.js";
import { getRouteFlags } from "./http/route-flags.js";
import { withSecurityHeaders } from "./http/security.js";

const STATIC_DIR = resolve(import.meta.dir, "..", "..", "..", "..", "web", "static");
const STATIC_MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".json": "application/manifest+json; charset=utf-8",
};

/** Business logic for handling compose-box submissions and agent runs. */
export class RequestRouterService {
  constructor(private channel: WebChannel) {}

  private async serveStaticAsset(req: Request, relPath: string): Promise<Response> {
    const filePath = resolve(STATIC_DIR, relPath);

    if (!filePath.startsWith(STATIC_DIR)) {
      return this.channel.json({ error: "Not found" }, 404);
    }

    const file = Bun.file(filePath);
    if (!(await file.exists())) {
      return this.channel.json({ error: "Not found" }, 404);
    }

    const size = file.size ?? 0;
    const contentType = STATIC_MIME_TYPES[extname(filePath)] || "application/octet-stream";
    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Content-Length": String(size),
      "Cache-Control": "no-store",
    };

    if (req.method === "HEAD") {
      return new Response(null, { status: 200, headers });
    }

    return new Response(file, { status: 200, headers });
  }

  /**
   * Main entry point for all HTTP requests.
   * Delegates to route() for path dispatch, then wraps the response
   * with security headers (CSP, HSTS, X-Frame-Options, etc.).
   */
  async handle(req: Request): Promise<Response> {
    const response = await this.route(req);
    // Determine TLS from the request URL scheme to conditionally add HSTS
    const isTls = req.url.startsWith("https://");
    return withSecurityHeaders(response, isTls);
  }

  /**
   * Internal request router. Processes the request through the security
   * pipeline (auth → CSRF → rate limiting) and dispatches to the
   * appropriate handler. See the module-level JSDoc for the full pipeline.
   */
  private async route(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const pathname = url.pathname;

    if (pathname.startsWith("/api/remote/")) {
      return await this.channel.handleRemote(req);
    }

    // Track the last seen origin so slash commands can build absolute links.
    rememberWebOrigin("web:default", req);

    const flags = getRouteFlags(req, pathname);
    const guardResponse = await enforceRequestGuards(this.channel, req, pathname, flags);
    if (guardResponse) {
      return guardResponse;
    }

    if (flags.isWebauthnEnrollPage) {
      if (!this.channel.isTotpSession(req)) {
        if (flags.isGetOrHead) {
          return this.channel.redirectToLogin();
        }
        return this.channel.json({ error: "TOTP session required" }, 401);
      }
      return this.channel.handleWebauthnEnrollPage(req);
    }

    if (flags.isWebauthnLoginStart) {
      return this.channel.handleWebauthnLoginStart(req);
    }

    if (flags.isWebauthnLoginFinish) {
      return this.channel.handleWebauthnLoginFinish(req);
    }

    if (flags.isWebauthnRegisterStart) {
      return this.channel.handleWebauthnRegisterStart(req);
    }

    if (flags.isWebauthnRegisterFinish) {
      return this.channel.handleWebauthnRegisterFinish(req);
    }

    if (flags.isIndex) {
      return this.channel.serveStatic("index.html");
    }

    if (flags.isManifest) {
      return this.channel.handleManifest(req);
    }

    if (flags.isFavicon) {
      // Prefer agent avatar for favicon if configured
      const avatarResp = await this.channel.handleAvatar("agent", req);
      if (avatarResp.status === 200) return avatarResp;
      return this.serveStaticAsset(req, "favicon.ico");
    }

    if (flags.isAppleIcon) {
      // If a custom agent avatar is configured, serve it for apple-touch-icon paths
      // so the PWA home-screen icon matches the configured avatar.
      const avatarResp = await this.channel.handleAvatar("agent", req);
      if (avatarResp.status === 200) return avatarResp;
      return this.serveStaticAsset(req, pathname.slice(1));
    }

    if (flags.isStaticAsset) {
      const rel = pathname.replace("/static/", "");
      return this.channel.serveStatic(rel);
    }

    if (flags.isDocsAsset) {
      const rel = pathname.replace("/docs/", "");
      return this.channel.serveDocsStatic(rel);
    }

    if (pathname === "/sse/stream") {
      return this.channel.handleSse();
    }

    if (req.method === "GET" && pathname === "/agents") {
      return await this.channel.handleAgents();
    }

    if (flags.isAvatar) {
      return await this.channel.handleAvatar("agent", req);
    }

    if (flags.isGetOrHead && pathname === "/avatar/user") {
      return await this.channel.handleAvatar("user", req);
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

    if (req.method === "PUT" && pathname === "/workspace/file") {
      return await this.channel.handleWorkspaceUpdate(req);
    }

    if (req.method === "DELETE" && pathname === "/workspace/file") {
      return this.channel.handleWorkspaceDelete(req);
    }

    if (req.method === "GET" && pathname === "/workspace/raw") {
      return this.channel.handleWorkspaceRaw(req);
    }

    if (req.method === "GET" && pathname === "/workspace/download") {
      return this.channel.handleWorkspaceDownload(req);
    }

    if (req.method === "POST" && pathname === "/workspace/attach") {
      return this.channel.handleWorkspaceAttach(req);
    }

    if (req.method === "POST" && pathname === "/workspace/upload") {
      return this.channel.handleWorkspaceUpload(req);
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

    if (req.method === "PATCH" && pathname.startsWith("/post/")) {
      const id = this.channel.parseOptionalInt(pathname.replace("/post/", ""));
      return this.channel.handleUpdatePost(req, id);
    }

    if (req.method === "GET" && pathname.startsWith("/thread/")) {
      const id = this.channel.parseOptionalInt(pathname.replace("/thread/", ""));
      return this.channel.handleThread(id);
    }

    if (req.method === "GET" && pathname === "/agent/thought") {
      const turnId = url.searchParams.get("turn_id");
      const panel = url.searchParams.get("panel");
      return this.channel.handleThought(panel, turnId);
    }

    if (req.method === "POST" && pathname === "/agent/thought/visibility") {
      return this.channel.handleThoughtVisibility(req);
    }

    if (req.method === "DELETE" && pathname.startsWith("/post/")) {
      const id = this.channel.parseOptionalInt(pathname.replace("/post/", ""));
      const cascade = url.searchParams.get("cascade") === "true" || url.searchParams.get("cascade") === "1";
      return this.channel.handleDeletePost(id, cascade);
    }

    if (req.method === "POST" && pathname === "/internal/post") {
      return this.channel.handleInternalPost(req);
    }

    if (req.method === "POST" && pathname.startsWith("/agent/") && pathname.endsWith("/message")) {
      return this.channel.handleAgentMessage(req, pathname);
    }

    if (req.method === "GET" && pathname === "/agent/status") {
      return this.channel.handleAgentStatus(req);
    }

    if (req.method === "GET" && pathname === "/agent/context") {
      return this.channel.handleAgentContext(req);
    }

    if (req.method === "GET" && pathname === "/agent/models") {
      return this.channel.handleAgentModels(req);
    }

    if (req.method === "POST" && pathname === "/agent/respond") {
      return this.channel.handleAgentRespond(req);
    }

    // /agent/whitelist — deprecated no-op stub, removed for security hygiene.
    if (req.method === "POST" && pathname === "/agent/whitelist") {
      return this.channel.json({ error: "Not found" }, 404);
    }

    if (req.method === "POST" && pathname === "/media/upload") {
      return this.channel.handleMediaUpload(req);
    }

    if (req.method === "GET" && pathname.startsWith("/media/") && pathname.endsWith("/thumbnail")) {
      const id = this.channel.parseOptionalInt(pathname.replace("/media/", "").replace("/thumbnail", ""));
      if (!id) return this.channel.json({ error: "Media not found" }, 404);
      return this.channel.handleMedia(id, true);
    }

    if (req.method === "GET" && pathname.startsWith("/media/") && pathname.endsWith("/info")) {
      const id = this.channel.parseOptionalInt(pathname.replace("/media/", "").replace("/info", ""));
      if (!id) return this.channel.json({ error: "Media not found" }, 404);
      return this.channel.handleMediaInfo(id);
    }

    if (req.method === "GET" && pathname.startsWith("/media/")) {
      const id = this.channel.parseOptionalInt(pathname.replace("/media/", ""));
      if (!id) return this.channel.json({ error: "Media not found" }, 404);
      return this.channel.handleMedia(id, false);
    }

    return this.channel.json({ error: "Not found" }, 404);
  }
}

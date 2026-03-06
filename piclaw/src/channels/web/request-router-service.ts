/**
 * web/request-router-service.ts – High-level request processing logic.
 *
 * Contains the business logic for handling compose-box submissions:
 * detecting control commands, routing agent runs, managing steering/followup
 * modes, and coordinating with the agent queue.
 *
 * Consumers: web/request-router.ts delegates to functions defined here.
 */

import { extname, resolve } from "path";
import type { WebChannel } from "../web.js";
import { rememberWebOrigin } from "./request-origin.js";

const STATIC_DIR = resolve(import.meta.dir, "..", "..", "..", "..", "web", "static");
const STATIC_MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".json": "application/manifest+json; charset=utf-8",
};

const APPLE_ICON_PATHS = new Set([
  "/apple-touch-icon.png",
  "/apple-touch-icon-precomposed.png",
  "/apple-touch-icon-180x180.png",
  "/apple-touch-icon-167x167.png",
  "/apple-touch-icon-152x152.png",
]);

const ENROLL_RATE_WINDOW_MS = 5 * 60 * 1000;
const ENROLL_RATE_LIMIT = 20;
const AUTH_RATE_WINDOW_MS = 5 * 60 * 1000;
const AUTH_RATE_LIMIT = 10;
const rateBuckets = new Map<string, number[]>();

// Prune stale IP entries every 10 minutes to prevent unbounded memory growth.
const RATE_PRUNE_INTERVAL_MS = 10 * 60 * 1000;
let lastRatePrune = Date.now();

function pruneRateBuckets(): void {
  const now = Date.now();
  if (now - lastRatePrune < RATE_PRUNE_INTERVAL_MS) return;
  lastRatePrune = now;
  const maxWindow = Math.max(ENROLL_RATE_WINDOW_MS, AUTH_RATE_WINDOW_MS);
  const cutoff = now - maxWindow;
  for (const [key, entries] of rateBuckets.entries()) {
    const live = entries.filter((ts) => ts > cutoff);
    if (live.length === 0) {
      rateBuckets.delete(key);
    } else {
      rateBuckets.set(key, live);
    }
  }
}

function getClientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function isRateLimited(req: Request, bucket: string, windowMs: number, limit: number): boolean {
  pruneRateBuckets();
  const key = `${getClientKey(req)}:${bucket}`;
  const now = Date.now();
  const cutoff = now - windowMs;
  const entries = rateBuckets.get(key) || [];
  const trimmed = entries.filter((ts) => ts > cutoff);
  trimmed.push(now);
  rateBuckets.set(key, trimmed);
  return trimmed.length > limit;
}

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

  async handle(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const pathname = url.pathname;

    // Track the last seen origin so slash commands can build absolute links.
    rememberWebOrigin("web:default", req);

    const isGetOrHead = req.method === "GET" || req.method === "HEAD";
    const authEnabled = this.channel.isAuthEnabled();
    const internalSecretEnabled = this.channel.isInternalSecretEnabled();
    const isLoginPage = isGetOrHead && (pathname === "/login" || pathname === "/login.html");
    const isAuthVerify = req.method === "POST" && pathname === "/auth/verify";
    const isWebauthnLoginStart = req.method === "POST" && pathname === "/auth/webauthn/login/start";
    const isWebauthnLoginFinish = req.method === "POST" && pathname === "/auth/webauthn/login/finish";
    const isWebauthnRegisterStart = req.method === "POST" && pathname === "/auth/webauthn/register/start";
    const isWebauthnRegisterFinish = req.method === "POST" && pathname === "/auth/webauthn/register/finish";
    const isWebauthnEnrollPage = isGetOrHead && pathname === "/auth/webauthn/enrol";
    const isInternalPost = req.method === "POST" && pathname === "/internal/post";
    const isInternalPatch = req.method === "PATCH" && pathname.startsWith("/post/");
    const hasInternalAccess = internalSecretEnabled && this.channel.verifyInternalSecret(req);
    const isIndex = isGetOrHead && (pathname === "/" || pathname === "/index.html");
    const isManifest = isGetOrHead && pathname === "/manifest.json";
    const isFavicon = isGetOrHead && pathname === "/favicon.ico";
    const isAppleIcon = isGetOrHead && APPLE_ICON_PATHS.has(pathname);
    // TODO: Auth-gate the app bundle
    // ─────────────────────────────
    // isStaticAsset currently whitelists ALL /static/ paths past auth. This
    // means the full app JS (app.js, api.js, components/, etc.) is served to
    // unauthenticated visitors. The login page (login.html) is self-contained
    // with inline JS and does NOT load any /static/js/ files.
    //
    // To fix, either:
    //   (a) Move the app bundle to an auth-gated path (e.g. /app/bundle.js)
    //       and only whitelist /static/css/, /static/fonts/, and vendor libs, OR
    //   (b) Replace the blanket isStaticAsset check with an allowlist of public
    //       paths (CSS, icons, vendor libs) and require auth for app JS.
    //
    // The app bundle exposes API endpoint paths, component structure, and
    // workspace logic that should not be visible to unauthenticated users.
    const isStaticAsset = pathname.startsWith("/static/");
    const isDocsAsset = pathname.startsWith("/docs/");
    const isAvatar = isGetOrHead && pathname === "/avatar/agent";

    // Internal post/patch: require internal secret when configured, otherwise
    // fall through to normal TOTP auth (do NOT skip auth).
    if (isInternalPost || isInternalPatch) {
      if (internalSecretEnabled) {
        if (!hasInternalAccess) {
          return this.channel.json({ error: "Unauthorized" }, 401);
        }
        // hasInternalAccess is true → skipAuthCheck will include it below
      }
      // If internal secret is NOT enabled, these are treated as normal
      // endpoints and must pass TOTP auth like everything else.
    }

    if (!authEnabled && isAuthVerify) {
      return this.channel.json({ error: "Auth disabled" }, 404);
    }

    // Rate-limit auth endpoints to prevent brute-force attacks.
    if (isAuthVerify) {
      if (isRateLimited(req, "auth/verify", AUTH_RATE_WINDOW_MS, AUTH_RATE_LIMIT)) {
        console.warn(`[auth] Rate limit exceeded for /auth/verify (ip=${getClientKey(req)})`);
        return this.channel.json({ error: "Too many login attempts. Try again later." }, 429);
      }
    }
    if (isWebauthnLoginStart || isWebauthnLoginFinish) {
      if (isRateLimited(req, "webauthn/login", AUTH_RATE_WINDOW_MS, AUTH_RATE_LIMIT)) {
        console.warn(`[auth] Rate limit exceeded for WebAuthn login (ip=${getClientKey(req)})`);
        return this.channel.json({ error: "Too many login attempts. Try again later." }, 429);
      }
    }
    if (isWebauthnEnrollPage || isWebauthnRegisterStart || isWebauthnRegisterFinish) {
      if (isRateLimited(req, "webauthn/enrol", ENROLL_RATE_WINDOW_MS, ENROLL_RATE_LIMIT)) {
        console.warn(`[auth] Rate limit exceeded for WebAuthn enrol (ip=${getClientKey(req)})`);
        return this.channel.json({ error: "Too many enrol attempts. Try again later." }, 429);
      }
    }

    const skipAuthCheck =
      hasInternalAccess ||
      isLoginPage ||
      isAuthVerify ||
      isWebauthnLoginStart ||
      isWebauthnLoginFinish ||
      isWebauthnRegisterStart ||
      isWebauthnRegisterFinish ||
      isManifest ||
      isFavicon ||
      isAppleIcon ||
      isStaticAsset ||
      isAvatar;

    if (authEnabled) {
      if (isAuthVerify) {
        return this.channel.handleAuthVerify(req);
      }
      if (isLoginPage) {
        return this.channel.serveLoginPage();
      }
      if (!skipAuthCheck && !this.channel.isAuthenticated(req)) {
        if (isIndex) {
          return this.channel.serveLoginPage();
        }
        if (isGetOrHead) {
          return this.channel.redirectToLogin();
        }
        return this.channel.json({ error: "Unauthorized" }, 401);
      }
    } else if (isLoginPage) {
      return this.channel.json({ error: "Not found" }, 404);
    }

    if (isWebauthnEnrollPage) {
      if (!this.channel.isTotpSession(req)) {
        if (isGetOrHead) {
          return this.channel.redirectToLogin();
        }
        return this.channel.json({ error: "TOTP session required" }, 401);
      }
      return this.channel.handleWebauthnEnrollPage(req);
    }

    if (isWebauthnLoginStart) {
      return this.channel.handleWebauthnLoginStart(req);
    }

    if (isWebauthnLoginFinish) {
      return this.channel.handleWebauthnLoginFinish(req);
    }

    if (isWebauthnRegisterStart) {
      return this.channel.handleWebauthnRegisterStart(req);
    }

    if (isWebauthnRegisterFinish) {
      return this.channel.handleWebauthnRegisterFinish(req);
    }

    if (isIndex) {
      return this.channel.serveStatic("index.html");
    }

    if (isManifest) {
      return this.channel.handleManifest(req);
    }

    if (isFavicon) {
      return this.serveStaticAsset(req, "favicon.ico");
    }

    if (isAppleIcon) {
      return this.serveStaticAsset(req, pathname.slice(1));
    }

    if (isStaticAsset) {
      const rel = pathname.replace("/static/", "");
      return this.channel.serveStatic(rel);
    }

    if (isDocsAsset) {
      const rel = pathname.replace("/docs/", "");
      return this.channel.serveDocsStatic(rel);
    }

    if (pathname === "/sse/stream") {
      return this.channel.handleSse();
    }

    if (req.method === "GET" && pathname === "/agents") {
      return await this.channel.handleAgents();
    }

    if (isAvatar) {
      return await this.channel.handleAvatar("agent", req);
    }

    if (isGetOrHead && pathname === "/avatar/user") {
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

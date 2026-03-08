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

// ── Auth rate limiting ──
// Limits brute-force attempts on login and enrolment endpoints.
const ENROLL_RATE_WINDOW_MS = 5 * 60 * 1000;  // 5-minute sliding window
const ENROLL_RATE_LIMIT = 20;                   // max 20 enrol attempts per window
const AUTH_RATE_WINDOW_MS = 5 * 60 * 1000;      // 5-minute sliding window
const AUTH_RATE_LIMIT = 10;                      // max 10 login attempts per window

// ── Data endpoint rate limiting ──
// Limits abuse of state-changing endpoints (message flooding, upload spam,
// mass deletion). Applied per client IP, after auth check passes.
const DATA_RATE_WINDOW_MS = 60 * 1000; // 1-minute sliding window

// Per-endpoint rate limits (counts are per client IP per window).
const DATA_POST_LIMIT = 30; // POST /post
const DATA_REPLY_LIMIT = 30; // POST /reply
const DATA_AGENT_MESSAGE_LIMIT = 30; // POST /agent/:id/message
const DATA_MEDIA_UPLOAD_LIMIT = 20; // POST /media/upload
const DATA_WORKSPACE_UPLOAD_LIMIT = 20; // POST /workspace/upload
const DATA_DELETE_LIMIT = 60; // DELETE /post/:id
const DATA_WRITE_LIMIT = 30; // PUT /workspace/file

// ── Rate bucket storage ──
// Per-IP sliding-window counters for all rate-limited endpoints.
// Keys are "ip:bucket" strings, values are arrays of timestamps.
const rateBuckets = new Map<string, number[]>();

// Prune stale IP entries every 10 minutes to prevent unbounded memory growth.
const RATE_PRUNE_INTERVAL_MS = 10 * 60 * 1000;
let lastRatePrune = Date.now();

/** Remove expired entries from all rate buckets. Called lazily on each check. */

function pruneRateBuckets(): void {
  const now = Date.now();
  if (now - lastRatePrune < RATE_PRUNE_INTERVAL_MS) return;
  lastRatePrune = now;
  const maxWindow = Math.max(ENROLL_RATE_WINDOW_MS, AUTH_RATE_WINDOW_MS, DATA_RATE_WINDOW_MS);
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

/**
 * Extract the client IP from the request for rate limiting.
 * Trusts x-forwarded-for and x-real-ip from reverse proxies (Caddy/nginx).
 */
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

/**
 * Check if a client has exceeded its rate limit for a given bucket.
 * Records the current attempt and returns true if over the limit.
 */
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

// ── Security headers ──
// Applied to every response via withSecurityHeaders(). These defend against:
//   X-Content-Type-Options: nosniff    → MIME sniffing attacks
//   X-Frame-Options: DENY              → clickjacking (iframe embedding)
//   Referrer-Policy                    → referrer leakage on navigation
//   Permissions-Policy                 → disable camera/mic/geolocation APIs
//   Content-Security-Policy            → XSS mitigation (inline scripts allowed
//                                        for login page; blob: for file downloads)
//   Strict-Transport-Security          → HSTS (TLS only, added dynamically)
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; " +
    "frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
};

/**
 * Clone a response with security headers appended.
 * Called once at the end of handle() so ALL responses (API, static, SSE)
 * get consistent security headers. Existing headers are not overwritten.
 * HSTS is only added when the connection is TLS.
 */
function withSecurityHeaders(response: Response, isTls: boolean): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    if (!headers.has(key)) headers.set(key, value);
  }
  if (isTls && !headers.has("Strict-Transport-Security")) {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Determine which /static/ paths are safe to serve without authentication.
 * Public pages only need styling, icons, and the login bundle.
 *
 * Auth split:
 *   - Public: /static/dist/login.bundle.js + /static/dist/login.bundle.css
 *   - Auth-only: /static/dist/app.bundle.js + /static/dist/app.bundle.css
 */
function isPublicStaticPath(pathname: string): boolean {
  // Fonts are needed by KaTeX and login/app styles.
  if (pathname.startsWith("/static/fonts/")) return true;

  // Explicitly allow only login bundles (+ source maps) for unauthenticated users.
  if (pathname === "/static/dist/login.bundle.js") return true;
  if (pathname === "/static/dist/login.bundle.js.map") return true;
  if (pathname === "/static/dist/login.bundle.css") return true;
  if (pathname === "/static/dist/login.bundle.css.map") return true;

  // Static images/icons used by favicon/PWA/login branding.
  if (pathname.startsWith("/static/") && /\.(png|ico|svg|jpg|jpeg|webp|gif)$/i.test(pathname)) return true;
  return false;
}

/**
 * CSRF origin validation for state-changing requests (POST/PUT/DELETE/PATCH).
 *
 * Compares the Origin header against the Host header to ensure the request
 * comes from the same origin. This prevents cross-origin form submissions
 * and fetch attacks when the user has an active session cookie.
 *
 * Design choices:
 *   - No Origin header → allow (non-browser clients like curl, internal tools)
 *   - Origin "null" → block (sandboxed iframes, data: URLs)
 *   - No Host header → allow (direct connections without proxy)
 *   - Hostname comparison ignores port (works behind port-forwarding proxies)
 *   - Auth endpoints are exempt (handled before this check by the caller)
 *
 * Note: SameSite=Strict cookies provide the primary CSRF defense; this is
 * a defense-in-depth layer against same-site but cross-origin attacks.
 */
function checkCsrfOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  // Non-browser clients (curl, internal) may not send Origin — allow
  if (!origin) return true;
  // "null" origin comes from sandboxed iframes — block
  if (origin === "null") return false;

  const host = req.headers.get("host");
  if (!host) return true; // No host header means non-proxy environment

  try {
    const originUrl = new URL(origin);
    // Compare hostname (ignoring port for flexibility behind proxies)
    return originUrl.hostname === host.split(":")[0];
  } catch {
    return false;
  }
}

/** Return a 429 JSON response. */
function rateLimitResponse(msg: string): Response {
  return new Response(JSON.stringify({ error: msg }), {
    status: 429,
    headers: { "Content-Type": "application/json" },
  });
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
    // Auth-gate app bundle assets: only fonts, static images, and login
    // bundles (/static/dist/login.bundle.js|.css + source maps) are served
    // pre-auth. Authenticated UI bundles (/static/dist/app.bundle.js|.css)
    // stay gated.
    const isStaticAsset = pathname.startsWith("/static/");
    const isPublicStatic = isStaticAsset && isPublicStaticPath(pathname);
    const isDocsAsset = pathname.startsWith("/docs/");
    const isAvatar = isGetOrHead && pathname === "/avatar/agent";

    // Internal post/patch: require internal secret when configured, otherwise
    // fall through to normal TOTP auth (do NOT skip auth).
    if (isInternalPost || isInternalPatch) {
      if (internalSecretEnabled) {
        if (!hasInternalAccess) {
          console.warn(
            `[auth] Internal secret required (ip=${getClientKey(req)}, method=${req.method}, path=${pathname})`
          );
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
      isPublicStatic ||
      isAvatar;

    if (authEnabled) {
      if (isAuthVerify) {
        return this.channel.handleAuthVerify(req);
      }
      if (isLoginPage) {
        return this.channel.serveLoginPage();
      }
      if (!skipAuthCheck && !this.channel.isAuthenticated(req)) {
        console.warn(
          `[auth] Unauthorized request (ip=${getClientKey(req)}, method=${req.method}, path=${pathname})`
        );
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

    // ── CSRF origin check on state-changing methods ──
    // Auth endpoints are exempt: they have their own rate limiting and are
    // needed before the user has a session (Origin may vary in edge cases).
    const isMutating = req.method === "POST" || req.method === "PUT" || req.method === "DELETE" || req.method === "PATCH";
    const isAuthEndpoint =
      isAuthVerify ||
      isWebauthnLoginStart ||
      isWebauthnLoginFinish ||
      isWebauthnRegisterStart ||
      isWebauthnRegisterFinish;
    if (isMutating && !hasInternalAccess && !isAuthEndpoint) {
      if (!checkCsrfOrigin(req)) {
        console.warn(`[security] CSRF origin check failed (ip=${getClientKey(req)}, origin=${req.headers.get("origin")})`);
        return this.channel.json({ error: "Origin not allowed" }, 403);
      }
    }

    // ── Rate limiting on data endpoints ──
    if (isMutating && !hasInternalAccess) {
      if (req.method === "POST" && pathname === "/post") {
        if (isRateLimited(req, "data/post", DATA_RATE_WINDOW_MS, DATA_POST_LIMIT)) {
          return rateLimitResponse("Too many posts. Slow down.");
        }
      }
      if (req.method === "POST" && pathname === "/reply") {
        if (isRateLimited(req, "data/reply", DATA_RATE_WINDOW_MS, DATA_REPLY_LIMIT)) {
          return rateLimitResponse("Too many replies. Slow down.");
        }
      }
      if (req.method === "POST" && pathname.endsWith("/message")) {
        if (isRateLimited(req, "data/agent_message", DATA_RATE_WINDOW_MS, DATA_AGENT_MESSAGE_LIMIT)) {
          return rateLimitResponse("Too many agent messages. Slow down.");
        }
      }
      if (req.method === "POST" && pathname === "/media/upload") {
        if (isRateLimited(req, "data/media_upload", DATA_RATE_WINDOW_MS, DATA_MEDIA_UPLOAD_LIMIT)) {
          return rateLimitResponse("Too many media uploads. Slow down.");
        }
      }
      if (req.method === "POST" && pathname === "/workspace/upload") {
        if (isRateLimited(req, "data/workspace_upload", DATA_RATE_WINDOW_MS, DATA_WORKSPACE_UPLOAD_LIMIT)) {
          return rateLimitResponse("Too many workspace uploads. Slow down.");
        }
      }
      if (req.method === "DELETE" && pathname.startsWith("/post/")) {
        if (isRateLimited(req, "data/delete_post", DATA_RATE_WINDOW_MS, DATA_DELETE_LIMIT)) {
          return rateLimitResponse("Too many deletions. Slow down.");
        }
      }
      if (req.method === "PUT" && pathname === "/workspace/file") {
        if (isRateLimited(req, "data/write", DATA_RATE_WINDOW_MS, DATA_WRITE_LIMIT)) {
          return rateLimitResponse("Too many file writes. Slow down.");
        }
      }
      if (req.method === "DELETE" && pathname === "/workspace/file") {
        if (isRateLimited(req, "data/write", DATA_RATE_WINDOW_MS, DATA_WRITE_LIMIT)) {
          return rateLimitResponse("Too many file writes. Slow down.");
        }
      }
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
      // Prefer agent avatar for favicon if configured
      const avatarResp = await this.channel.handleAvatar("agent", req);
      if (avatarResp.status === 200) return avatarResp;
      return this.serveStaticAsset(req, "favicon.ico");
    }

    if (isAppleIcon) {
      // If a custom agent avatar is configured, serve it for apple-touch-icon paths
      // so the PWA home-screen icon matches the configured avatar.
      const avatarResp = await this.channel.handleAvatar("agent", req);
      if (avatarResp.status === 200) return avatarResp;
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

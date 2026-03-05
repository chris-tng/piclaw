/**
 * channels/web.ts – Web channel: HTTP server, SSE, and API endpoints.
 *
 * The WebChannel class is the central coordinator for the web UI. It:
 *   - Starts the HTTP(S) server (Bun.serve) with TLS and auth support.
 *   - Routes requests to handlers (posts, media, agent, workspace).
 *   - Manages SSE connections for real-time event streaming to browsers.
 *   - Bridges agent events (drafts, thoughts, status) to the UI.
 *   - Handles inbound messages and control commands from the web compose box.
 *
 * Consumers:
 *   - runtime.ts creates and starts the WebChannel.
 *   - The web UI (web/src/) connects via SSE and REST API.
 */

import { AgentQueue } from "../queue.js";
import type { AgentPool } from "../agent-pool.js";
import { initTheme, type AgentSession } from "@mariozechner/pi-coding-agent";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import type {
  AuthenticationResponseJSON,
  PublicKeyCredentialDescriptorFuture,
  RegistrationResponseJSON,
  AuthenticatorDevice,
} from "@simplewebauthn/types";
import { randomSessionToken, verifyTotp } from "./web/auth.js";
import {
  ASSISTANT_AVATAR,
  ASSISTANT_NAME,
  USER_AVATAR,
  USER_AVATAR_BACKGROUND,
  USER_NAME,
  WEB_HOST,
  WEB_IDLE_TIMEOUT,
  WEB_PORT,
  WEB_TLS_CERT,
  WEB_TLS_KEY,
  WEB_SESSION_TTL,
  WEB_TOTP_SECRET,
  WEB_TOTP_WINDOW,
  WEB_INTERNAL_SECRET,
  WEB_PASSKEY_MODE,
} from "../core/config.js";
import { handleMedia, handleMediaInfo, handleMediaUpload } from "./web/handlers/media.js";
import {
  handleWorkspaceAttach,
  handleWorkspaceDownload,
  handleWorkspaceFile,
  handleWorkspaceRaw,
  handleWorkspaceTree,
  handleWorkspaceUpdate,
  handleWorkspaceUpload,
  startWorkspaceWatcher,
} from "./web/handlers/workspace.js";
import { SseHub } from "./web/sse-hub.js";
import { UiBridge } from "./web/ui-bridge.js";
import { ResponseService } from "./web/http/response-service.js";
import {
  getMessageRowIdById,
  getMessagesSince,
  replaceMessageContent,
  createWebSession,
  getWebSession,
  deleteExpiredWebSessions,
  DEFAULT_WEB_USER_ID,
  getWebauthnEnrollment,
  consumeWebauthnEnrollment,
  getWebauthnCredentialsForRpId,
  getWebauthnCredentialById,
  storeWebauthnCredential,
  updateWebauthnCredentialCounter,
} from "../db.js";
import type { InteractionRow } from "../db.js";
import { WebChannelState } from "./web/channel-state.js";
import { storeWebMessage } from "./web/message-store.js";
import {
  deletePostResponse,
  getHashtagResponse,
  getSearchResponse,
  getThreadResponse,
  getTimelineResponse,
} from "./web/timeline-service.js";
import { getAgentsResponse } from "./web/agents-service.js";
import { buildAvatarResponse, ensureAvatarCache, resolveAvatarUrl } from "./web/avatar-service.js";
import { broadcastAgentResponse, broadcastInteractionUpdated } from "./web/interaction-service.js";

const DEFAULT_CHAT_JID = "web:default";
const DEFAULT_AGENT_ID = "default";
const STATE_KEY = "last_agent_timestamp_web";

/** Construction options for WebChannel: queue and agentPool references. */
export interface WebChannelOpts {
  queue: AgentQueue;
  agentPool: AgentPool;
}

/** Web channel: HTTP/SSE server, API endpoints, and agent event bridge. */
export class WebChannel {
  queue: AgentQueue;
  agentPool: AgentPool;
  server: ReturnType<typeof Bun.serve> | null = null;
  state = new WebChannelState(STATE_KEY);
  sse = new SseHub();
  uiBridge: UiBridge;
  responses = new ResponseService();
  pendingLinkPreviews = new Set<number>();
  workspaceWatcher: { close: () => Promise<void> } | null = null;
  workspaceVisible = false;
  workspaceShowHidden = false;
  pendingSteering = new Map<string, string[]>();
  activeAgentStatuses = new Map<string, Record<string, unknown>>();
  lastCommandInteractionId: number | null = null;
  pendingWebauthnRegistrations = new Map<
    string,
    { challenge: string; rpId: string; userId: string; createdAt: number }
  >();
  pendingWebauthnLogins = new Map<
    string,
    { challenge: string; rpId: string; userId: string; createdAt: number }
  >();
  thoughtBuffers = new Map<string, { text: string; totalLines: number; updatedAt: number }>();
  draftBuffers = new Map<string, { text: string; totalLines: number; updatedAt: number }>();
  expandedPanels = new Map<string, { thought: boolean; draft: boolean }>();

  constructor(opts: WebChannelOpts) {
    this.queue = opts.queue;
    this.agentPool = opts.agentPool;
    this.uiBridge = new UiBridge(this);
    if (typeof (this.agentPool as any).setSessionBinder === "function") {
      (this.agentPool as any).setSessionBinder((session: AgentSession, chatJid: string) =>
        this.uiBridge.bindSession(session, chatJid)
      );
    }
  }

  async start(): Promise<void> {
    this.loadState();
    try { initTheme(); } catch {}
    const tls = await this.loadTlsOptions();
    this.server = Bun.serve({
      hostname: WEB_HOST,
      port: WEB_PORT,
      idleTimeout: WEB_IDLE_TIMEOUT,
      fetch: (req) => this.handleRequest(req),
      ...(tls ? { tls } : {}),
    });
    this.workspaceWatcher = startWorkspaceWatcher(this);
    const scheme = tls ? "https" : "http";
    console.log(`[web] UI listening on ${scheme}://${WEB_HOST}:${WEB_PORT}`);
  }

  async stop(): Promise<void> {
    this.sse.closeAll();
    this.uiBridge.stop();
    this.server?.stop(true);
    this.server = null;
    if (this.workspaceWatcher) {
      await this.workspaceWatcher.close();
      this.workspaceWatcher = null;
    }
  }

  async sendMessage(chatJid: string, text: string, threadId?: number | null): Promise<void> {
    const interaction = this.storeMessage(chatJid, text, true, [], threadId ? { threadId } : undefined);
    if (interaction) {
      broadcastAgentResponse(
        this,
        interaction,
        ASSISTANT_NAME,
        resolveAvatarUrl("agent", ASSISTANT_AVATAR),
        USER_NAME || null,
        resolveAvatarUrl("user", USER_AVATAR),
        USER_AVATAR_BACKGROUND || null
      );
    }
  }

  queueFollowupPlaceholder(chatJid: string, text: string, threadId?: number): InteractionRow | null {
    const interaction = this.storeMessage(chatJid, text, true, [], { threadId });
    if (!interaction) return null;

    this.state.enqueueFollowupPlaceholder(chatJid, interaction.id);

    broadcastAgentResponse(
      this,
      interaction,
      ASSISTANT_NAME,
      resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      USER_NAME || null,
      resolveAvatarUrl("user", USER_AVATAR),
      USER_AVATAR_BACKGROUND || null
    );

    return interaction;
  }

  consumeQueuedFollowupPlaceholder(chatJid: string): number | null {
    return this.state.consumeFollowupPlaceholder(chatJid);
  }

  queuePendingSteering(chatJid: string, timestamp: string | undefined): void {
    if (!timestamp) return;
    const existing = this.pendingSteering.get(chatJid) ?? [];
    existing.push(timestamp);
    this.pendingSteering.set(chatJid, existing);
  }

  consumePendingSteering(chatJid: string): string | null {
    const entries = this.pendingSteering.get(chatJid);
    if (!entries || entries.length === 0) return null;
    this.pendingSteering.delete(chatJid);
    entries.sort();
    return entries[entries.length - 1] ?? null;
  }

  updateAgentStatus(chatJid: string, status: Record<string, unknown>): void {
    const type = status?.type;
    if (type === "done" || type === "error") {
      const removed = this.activeAgentStatuses.delete(chatJid);
      if (removed) {
        this.state.setAgentStatus(chatJid, null);
        this.saveState();
      }
      return;
    }
    this.activeAgentStatuses.set(chatJid, status);
    this.state.setAgentStatus(chatJid, status);
    this.saveState();
  }

  getAgentStatus(chatJid: string): Record<string, unknown> | null {
    return this.activeAgentStatuses.get(chatJid) ?? null;
  }

  replaceQueuedFollowupPlaceholder(
    chatJid: string,
    rowId: number,
    text: string,
    mediaIds: number[],
    contentBlocks: Array<Record<string, unknown>> | undefined,
    threadId?: number
  ): InteractionRow | null {
    const updated = replaceMessageContent(chatJid, rowId, text, {
      contentBlocks,
      mediaIds,
    });
    if (!updated) return null;

    updated.data.agent_id = DEFAULT_AGENT_ID;
    if (threadId) updated.data.thread_id = threadId;

    broadcastInteractionUpdated(
      this,
      updated,
      ASSISTANT_NAME,
      resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      USER_NAME || null,
      resolveAvatarUrl("user", USER_AVATAR),
      USER_AVATAR_BACKGROUND || null
    );

    return updated;
  }

  getThreadRootId(chatJid: string, messageId: string): number | null {
    return getMessageRowIdById(chatJid, messageId);
  }

  resumeChat(chatJid: string, prevTimestamp?: string, threadRootId?: number | null): void {
    if (typeof prevTimestamp === "string") {
      this.state.lastAgentTimestamp[chatJid] = prevTimestamp;
      this.saveState();
    }
    this.queue.enqueue(async () => {
      await this.processChat(chatJid, DEFAULT_AGENT_ID, threadRootId ?? undefined);
    }, `resume:${chatJid}:${Date.now()}`);
  }

  resumePendingChats(chatJid?: string): void {
    const pending = this.state.getPendingResumes();
    const entries = chatJid && chatJid !== "all" ? { [chatJid]: pending[chatJid] } : pending;

    for (const [jid, info] of Object.entries(entries)) {
      if (!info) continue;
      const prevTimestamp = typeof info.prevTimestamp === "string" ? info.prevTimestamp : "";
      const messages = getMessagesSince(jid, prevTimestamp, ASSISTANT_NAME);
      if (messages.length === 0) {
        this.state.clearPendingResume(jid);
        continue;
      }
      const threadRootId = info.threadRootId ?? getMessageRowIdById(jid, info.messageId);
      this.resumeChat(jid, prevTimestamp, threadRootId ?? undefined);
    }

    this.saveState();
  }

  loadState(): void {
    this.state.load();
    const restored = this.state.getAgentStatuses();
    this.activeAgentStatuses = new Map(Object.entries(restored));
  }

  saveState(): void {
    this.state.save();
  }

  setPanelExpanded(turnId: string, panel: "thought" | "draft", expanded: boolean): void {
    if (!turnId) return;
    const current = this.expandedPanels.get(turnId) ?? { thought: false, draft: false };
    current[panel] = expanded;
    if (!current.thought && !current.draft) {
      this.expandedPanels.delete(turnId);
    } else {
      this.expandedPanels.set(turnId, current);
    }
  }

  isPanelExpanded(turnId: string, panel: "thought" | "draft"): boolean {
    return this.expandedPanels.get(turnId)?.[panel] ?? false;
  }

  updateThoughtBuffer(turnId: string, text: string, totalLines: number): void {
    if (!turnId) return;
    this.thoughtBuffers.set(turnId, { text, totalLines, updatedAt: Date.now() });
    this.pruneBuffers(this.thoughtBuffers);
  }

  updateDraftBuffer(turnId: string, text: string, totalLines: number): void {
    if (!turnId) return;
    this.draftBuffers.set(turnId, { text, totalLines, updatedAt: Date.now() });
    this.pruneBuffers(this.draftBuffers);
  }

  getBuffer(turnId: string, panel: "thought" | "draft") {
    return panel === "draft" ? this.draftBuffers.get(turnId) : this.thoughtBuffers.get(turnId);
  }

  pruneBuffers(map: Map<string, { text: string; totalLines: number; updatedAt: number }>): void {
    const limit = 50;
    if (map.size <= limit) return;
    const entries = Array.from(map.entries()).sort((a, b) => a[1].updatedAt - b[1].updatedAt);
    for (let i = 0; i < entries.length - limit; i += 1) {
      map.delete(entries[i][0]);
    }
  }

  private async loadTlsOptions(): Promise<{ cert: string; key: string } | null> {
    if (!WEB_TLS_CERT || !WEB_TLS_KEY) return null;
    try {
      const [cert, key] = await Promise.all([
        Bun.file(WEB_TLS_CERT).text(),
        Bun.file(WEB_TLS_KEY).text(),
      ]);
      return { cert, key };
    } catch (error) {
      console.error("[web] Failed to load TLS cert/key:", error);
      return null;
    }
  }

  isAuthEnabled(): boolean {
    return this.isTotpEnabled() || this.isPasskeyEnabled();
  }

  isInternalSecretEnabled(): boolean {
    return Boolean(WEB_INTERNAL_SECRET && WEB_INTERNAL_SECRET.trim());
  }

  isPasskeyEnabled(): boolean {
    const mode = (WEB_PASSKEY_MODE || "").toLowerCase();
    if (mode === "totp-only") return false;
    if (mode === "passkey-only") return true;
    return this.isTotpEnabled();
  }

  isPasskeyOnly(): boolean {
    return (WEB_PASSKEY_MODE || "").toLowerCase() === "passkey-only";
  }

  isTotpEnabled(): boolean {
    return Boolean(WEB_TOTP_SECRET && WEB_TOTP_SECRET.trim());
  }

  private cleanupAuthSessions(): void {
    deleteExpiredWebSessions();
  }

  private parseCookies(req: Request): Record<string, string> {
    const header = req.headers.get("cookie") || "";
    if (!header) return {};
    return header.split(";").reduce((acc, part) => {
      const [rawKey, ...rest] = part.trim().split("=");
      if (!rawKey) return acc;
      acc[rawKey] = decodeURIComponent(rest.join("=") || "");
      return acc;
    }, {} as Record<string, string>);
  }

  verifyInternalSecret(req: Request): boolean {
    const secret = (WEB_INTERNAL_SECRET || "").trim();
    if (!secret) return false;
    const header = req.headers.get("x-piclaw-internal-secret") || "";
    if (header && header === secret) return true;
    const auth = req.headers.get("authorization") || "";
    if (auth.toLowerCase().startsWith("bearer ")) {
      const token = auth.slice(7).trim();
      if (token === secret) return true;
    }
    return false;
  }

  private getSessionToken(req: Request): string | null {
    const cookies = this.parseCookies(req);
    return cookies.piclaw_session || null;
  }

  isAuthenticated(req: Request): boolean {
    if (!this.isAuthEnabled()) return true;
    this.cleanupAuthSessions();
    const token = this.getSessionToken(req);
    if (!token) return false;
    const session = getWebSession(token);
    if (!session) return false;
    return true;
  }

  private buildSessionCookie(token: string, req: Request): string {
    const rawTtl = Number.isFinite(WEB_SESSION_TTL) ? WEB_SESSION_TTL : 0;
    const ttl = Math.max(60, rawTtl || 0);
    const secure = req.url.startsWith("https://") || Boolean(WEB_TLS_CERT && WEB_TLS_KEY);
    const parts = [
      `piclaw_session=${encodeURIComponent(token)}`,
      `Max-Age=${ttl}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Strict",
    ];
    if (secure) parts.push("Secure");
    return parts.join("; ");
  }

  private cleanupWebauthnChallenges(now = Date.now()): void {
    const cutoff = now - 10 * 60 * 1000;
    for (const [token, entry] of this.pendingWebauthnRegistrations.entries()) {
      if (entry.createdAt < cutoff) this.pendingWebauthnRegistrations.delete(token);
    }
    for (const [token, entry] of this.pendingWebauthnLogins.entries()) {
      if (entry.createdAt < cutoff) this.pendingWebauthnLogins.delete(token);
    }
  }

  private getWebauthnRpInfo(req: Request): { rpId: string; origin: string } {
    const url = new URL(req.url);
    const rpId = url.hostname;
    return { rpId, origin: url.origin };
  }

  private bufferToBase64Url(value: Uint8Array): string {
    return Buffer.from(value).toString("base64url");
  }

  private base64UrlToBuffer(value: string): Uint8Array {
    return Buffer.from(value, "base64url");
  }

  async handleAuthVerify(req: Request): Promise<Response> {
    if (!this.isAuthEnabled() || !this.isTotpEnabled()) return this.json({ error: "Auth disabled" }, 404);
    let body: { code?: string };
    try {
      body = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }
    const code = (body.code || "").trim();
    const windowSteps = Number.isFinite(WEB_TOTP_WINDOW) ? Math.max(0, WEB_TOTP_WINDOW) : 1;
    if (!code) return this.json({ error: "Missing code" }, 400);
    if (!verifyTotp(WEB_TOTP_SECRET, code, windowSteps)) {
      return this.json({ error: "Invalid code" }, 401);
    }

    const rawTtl = Number.isFinite(WEB_SESSION_TTL) ? WEB_SESSION_TTL : 0;
    const ttlSeconds = Math.max(60, rawTtl || 0);
    const token = randomSessionToken();
    createWebSession(token, DEFAULT_WEB_USER_ID, ttlSeconds);

    const payload = JSON.stringify({ ok: true });
    return new Response(payload, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": this.buildSessionCookie(token, req),
      },
    });
  }

  async handleWebauthnLoginStart(req: Request): Promise<Response> {
    if (!this.isPasskeyEnabled()) return this.json({ error: "Passkeys disabled" }, 404);

    const { rpId } = this.getWebauthnRpInfo(req);
    const credentials = getWebauthnCredentialsForRpId(DEFAULT_WEB_USER_ID, rpId);
    if (credentials.length === 0) {
      return this.json({ error: "No passkeys registered" }, 404);
    }

    const allowCredentials: PublicKeyCredentialDescriptorFuture[] = credentials.map((cred) => {
      const transports = cred.transports ? JSON.parse(cred.transports) : undefined;
      return {
        id: this.base64UrlToBuffer(cred.credential_id),
        type: "public-key",
        transports: Array.isArray(transports) ? transports : undefined,
      };
    });

    const options = await generateAuthenticationOptions({
      rpID: rpId,
      allowCredentials,
      userVerification: "preferred",
    });

    const challengeToken = randomSessionToken();
    this.cleanupWebauthnChallenges();
    this.pendingWebauthnLogins.set(challengeToken, {
      challenge: options.challenge,
      rpId,
      userId: DEFAULT_WEB_USER_ID,
      createdAt: Date.now(),
    });

    return this.json({ token: challengeToken, options });
  }

  async handleWebauthnLoginFinish(req: Request): Promise<Response> {
    if (!this.isPasskeyEnabled()) return this.json({ error: "Passkeys disabled" }, 404);
    let body: { token?: string; credential?: AuthenticationResponseJSON };
    try {
      body = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }
    const token = body.token || "";
    const credential = body.credential;
    if (!token || !credential) return this.json({ error: "Missing credential" }, 400);

    this.cleanupWebauthnChallenges();
    const pending = this.pendingWebauthnLogins.get(token);
    if (!pending) return this.json({ error: "Login expired" }, 400);
    this.pendingWebauthnLogins.delete(token);

    const stored = getWebauthnCredentialById(credential.id);
    if (!stored || stored.rp_id !== pending.rpId) {
      return this.json({ error: "Unknown credential" }, 400);
    }

    const authenticator: AuthenticatorDevice = {
      credentialID: this.base64UrlToBuffer(stored.credential_id),
      credentialPublicKey: this.base64UrlToBuffer(stored.public_key),
      counter: stored.sign_count || 0,
      transports: stored.transports ? JSON.parse(stored.transports) : undefined,
    };

    const { origin } = this.getWebauthnRpInfo(req);
    const result = await verifyAuthenticationResponse({
      response: credential,
      expectedChallenge: pending.challenge,
      expectedOrigin: origin,
      expectedRPID: pending.rpId,
      authenticator,
      requireUserVerification: false,
    });

    if (!result.verified) {
      return this.json({ error: "Passkey verification failed" }, 401);
    }

    updateWebauthnCredentialCounter(stored.credential_id, result.authenticationInfo.newCounter);

    const rawTtl = Number.isFinite(WEB_SESSION_TTL) ? WEB_SESSION_TTL : 0;
    const ttlSeconds = Math.max(60, rawTtl || 0);
    const sessionToken = randomSessionToken();
    createWebSession(sessionToken, DEFAULT_WEB_USER_ID, ttlSeconds);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": this.buildSessionCookie(sessionToken, req),
      },
    });
  }

  async handleWebauthnRegisterStart(req: Request): Promise<Response> {
    if (!this.isPasskeyEnabled()) return this.json({ error: "Passkeys disabled" }, 404);
    let body: { token?: string };
    try {
      body = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }
    const token = (body.token || "").trim();
    if (!token) return this.json({ error: "Missing enrol token" }, 400);

    const enrollment = getWebauthnEnrollment(token);
    if (!enrollment) return this.json({ error: "Invalid or expired enrol token" }, 400);

    const { rpId } = this.getWebauthnRpInfo(req);
    const existing = getWebauthnCredentialsForRpId(enrollment.user_id, rpId);
    const excludeCredentials: PublicKeyCredentialDescriptorFuture[] = existing.map((cred) => ({
      id: this.base64UrlToBuffer(cred.credential_id),
      type: "public-key",
    }));

    const options = await generateRegistrationOptions({
      rpName: ASSISTANT_NAME || "PiClaw",
      rpID: rpId,
      userID: enrollment.user_id,
      userName: USER_NAME || enrollment.user_id,
      userDisplayName: USER_NAME || "User",
      attestationType: "none",
      excludeCredentials,
    });

    this.cleanupWebauthnChallenges();
    this.pendingWebauthnRegistrations.set(token, {
      challenge: options.challenge,
      rpId,
      userId: enrollment.user_id,
      createdAt: Date.now(),
    });

    return this.json({ token, options });
  }

  async handleWebauthnRegisterFinish(req: Request): Promise<Response> {
    if (!this.isPasskeyEnabled()) return this.json({ error: "Passkeys disabled" }, 404);
    let body: { token?: string; credential?: RegistrationResponseJSON };
    try {
      body = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }
    const token = (body.token || "").trim();
    const credential = body.credential;
    if (!token || !credential) return this.json({ error: "Missing credential" }, 400);

    this.cleanupWebauthnChallenges();
    const pending = this.pendingWebauthnRegistrations.get(token);
    if (!pending) return this.json({ error: "Registration expired" }, 400);
    this.pendingWebauthnRegistrations.delete(token);

    const enrollment = consumeWebauthnEnrollment(token);
    if (!enrollment) return this.json({ error: "Invalid or expired enrol token" }, 400);
    if (enrollment.user_id !== pending.userId) {
      return this.json({ error: "Enrollment mismatch" }, 400);
    }

    const { origin } = this.getWebauthnRpInfo(req);
    const result = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: pending.challenge,
      expectedOrigin: origin,
      expectedRPID: pending.rpId,
    });

    if (!result.verified || !result.registrationInfo) {
      return this.json({ error: "Passkey verification failed" }, 401);
    }

    const info = result.registrationInfo;
    const transports = Array.isArray(credential.response.transports)
      ? JSON.stringify(credential.response.transports)
      : null;

    storeWebauthnCredential({
      user_id: pending.userId,
      rp_id: pending.rpId,
      credential_id: this.bufferToBase64Url(info.credentialID),
      public_key: this.bufferToBase64Url(info.credentialPublicKey),
      sign_count: info.counter || 0,
      transports,
    });

    return this.json({ ok: true });
  }

  async handleWebauthnEnrollPage(_req: Request): Promise<Response> {
    if (!this.isPasskeyEnabled()) return this.json({ error: "Passkeys disabled" }, 404);
    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Passkey enrolment</title>
    <style>
      :root { color-scheme: light dark; --bg:#0b0f14; --card:#111827; --text:#e5e7eb; --muted:#94a3b8; --border:#1f2937; --accent:#38bdf8; }
      @media (prefers-color-scheme: light) { :root { --bg:#f8fafc; --card:#fff; --text:#0f172a; --muted:#64748b; --border:#e2e8f0; --accent:#2563eb; } }
      body { margin:0; font-family:"Segoe UI", system-ui, -apple-system, sans-serif; background:var(--bg); color:var(--text); min-height:100vh; display:flex; align-items:center; justify-content:center; }
      .card { width:min(92vw, 520px); background:var(--card); border:1px solid var(--border); border-radius:16px; padding:28px; box-shadow:0 24px 48px rgba(0,0,0,0.2); }
      h1 { font-size:22px; margin:0 0 8px; }
      p { margin:0 0 16px; color:var(--muted); }
      .status { margin-top:12px; font-size:14px; }
      button { padding:12px 16px; border-radius:10px; border:none; background:var(--accent); color:white; font-size:16px; cursor:pointer; }
      button[disabled] { opacity:0.6; cursor:not-allowed; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Register a passkey</h1>
      <p>This link expires in a few minutes. Keep this tab open.</p>
      <button id="start">Create passkey</button>
      <div class="status" id="status"></div>
    </div>
    <script>
      const statusEl = document.getElementById('status');
      const startBtn = document.getElementById('start');

      const base64UrlToBuffer = (value) => {
        const pad = '='.repeat((4 - (value.length % 4)) % 4);
        const base64 = (value + pad).replace(/-/g, '+').replace(/_/g, '/');
        const raw = atob(base64);
        const buffer = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) buffer[i] = raw.charCodeAt(i);
        return buffer;
      };

      const bufferToBase64Url = (buffer) => {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (const b of bytes) binary += String.fromCharCode(b);
        return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
      };

      const credentialToJSON = (cred) => ({
        id: cred.id,
        rawId: bufferToBase64Url(cred.rawId),
        type: cred.type,
        response: {
          clientDataJSON: bufferToBase64Url(cred.response.clientDataJSON),
          attestationObject: bufferToBase64Url(cred.response.attestationObject),
          transports: cred.response.getTransports ? cred.response.getTransports() : undefined
        }
      });

      const parseOptions = (options) => {
        return {
          ...options,
          challenge: base64UrlToBuffer(options.challenge),
          user: {
            ...options.user,
            id: base64UrlToBuffer(options.user.id)
          },
          excludeCredentials: (options.excludeCredentials || []).map((cred) => ({
            ...cred,
            id: base64UrlToBuffer(cred.id)
          }))
        };
      };

      const token = new URLSearchParams(window.location.search).get('token');
      if (!window.PublicKeyCredential || !navigator.credentials) {
        statusEl.textContent = 'Passkeys are not supported in this browser.';
        startBtn.disabled = true;
      } else if (!window.isSecureContext) {
        statusEl.textContent = 'Passkeys require HTTPS or localhost.';
        startBtn.disabled = true;
      } else if (!token) {
        statusEl.textContent = 'Missing enrol token.';
        startBtn.disabled = true;
      }

      let publicKeyOptions = null;

      const loadOptions = async () => {
        if (!token) return;
        startBtn.disabled = true;
        statusEl.textContent = 'Preparing passkey options…';
        try {
          const res = await fetch('/auth/webauthn/register/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
          });
          if (!res.ok) throw new Error('Failed to start registration');
          const payload = await res.json();
          publicKeyOptions = parseOptions(payload.options);
          statusEl.textContent = 'Ready to create passkey.';
          startBtn.disabled = false;
        } catch (err) {
          statusEl.textContent = err && err.message ? err.message : 'Failed to prepare passkey options.';
          startBtn.disabled = true;
        }
      };

      const startEnrollment = async () => {
        if (!token) return;
        if (!publicKeyOptions) {
          statusEl.textContent = 'Passkey options are not ready yet.';
          return;
        }
        startBtn.disabled = true;
        try {
          statusEl.textContent = 'Waiting for your passkey…';
          const cred = await navigator.credentials.create({ publicKey: publicKeyOptions });
          if (!cred) throw new Error('Passkey creation cancelled');
          const finish = await fetch('/auth/webauthn/register/finish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, credential: credentialToJSON(cred) })
          });
          if (!finish.ok) throw new Error('Registration failed');
          statusEl.textContent = 'Passkey registered. You can close this tab.';
        } catch (err) {
          const name = err && err.name ? err.name : '';
          const message = err && err.message ? err.message : '';
          const detail = [name, message].filter(Boolean).join(' ').trim();
          statusEl.textContent = detail ? 'Passkey error: ' + detail : 'Passkey registration failed.';
          startBtn.disabled = false;
        }
      };

      startBtn.addEventListener('click', startEnrollment);
      if (window.PublicKeyCredential && window.isSecureContext && token) {
        loadOptions();
      }

    </script>
  </body>
</html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  async serveLoginPage(): Promise<Response> {
    return this.serveStatic("login.html");
  }

  redirectToLogin(): Response {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }

  async handleRequest(req: Request): Promise<Response> {
    const { RequestRouterService } = await import("./web/request-router-service.js");
    const router = new RequestRouterService(this);
    return router.handle(req);
  }

  async handleAgents(): Promise<Response> {
    const result = await getAgentsResponse(this.agentPool, {
      chatJid: DEFAULT_CHAT_JID,
      agentId: DEFAULT_AGENT_ID,
      agentName: ASSISTANT_NAME,
      agentAvatar: resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      userName: USER_NAME || null,
      userAvatar: resolveAvatarUrl("user", USER_AVATAR),
      userAvatarBackground: USER_AVATAR_BACKGROUND || null,
    });
    return this.json(result.body, result.status);
  }

  async handleManifest(req: Request): Promise<Response> {
    const encoder = new TextEncoder();
    const baseName = ASSISTANT_NAME || "PiClaw";
    const icons: Array<{ src: string; sizes: string; type: string; purpose?: string }> = [
      { src: "/static/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/static/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/static/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/static/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ];

    if (ASSISTANT_AVATAR) {
      try {
        const meta = await ensureAvatarCache("agent", ASSISTANT_AVATAR);
        if (meta) {
          const versionSource = meta.updatedAt || new Date().toISOString();
          const version = encodeURIComponent(versionSource);
          icons.unshift({
            src: `/avatar/agent?v=${version}`,
            sizes: "any",
            type: meta.contentType || "image/png",
            purpose: "any maskable",
          });
        }
      } catch (err) {
        console.warn("[web] Failed to prepare agent avatar for manifest:", err);
      }
    }

    const manifest = {
      name: baseName,
      short_name: baseName,
      description: "Slack-like interface for coding agents",
      start_url: "/",
      display: "standalone",
      display_override: ["window-controls-overlay"],
      background_color: "#ffffff",
      theme_color: "#ffffff",
      color_scheme: "dark light",
      icons,
    };

    const body = `${JSON.stringify(manifest, null, 2)}\n`;
    const headers: Record<string, string> = {
      "Content-Type": "application/manifest+json; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Length": String(encoder.encode(body).length),
    };

    if (req.method === "HEAD") {
      return new Response(null, { status: 200, headers });
    }

    return new Response(body, { status: 200, headers });
  }

  async handleAvatar(kind: "agent" | "user", req: Request): Promise<Response> {
    const source = kind === "agent" ? ASSISTANT_AVATAR : USER_AVATAR;
    if (!source) return this.json({ error: "Avatar not found" }, 404);
    const response = await buildAvatarResponse(kind, source, req);
    if (response) return response;
    return this.json({ error: "Avatar not found" }, 404);
  }

  async handleWorkspaceVisibility(req: Request): Promise<Response> {
    let data: { visible?: boolean; show_hidden?: boolean; showHidden?: boolean };
    try {
      data = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }
    if (typeof data.visible === "boolean") {
      this.workspaceVisible = data.visible;
    } else {
      this.workspaceVisible = Boolean(data.visible);
    }
    if (typeof data.show_hidden === "boolean") {
      this.workspaceShowHidden = data.show_hidden;
    } else if (typeof data.showHidden === "boolean") {
      this.workspaceShowHidden = data.showHidden;
    }
    return this.json({ status: "ok", visible: this.workspaceVisible, show_hidden: this.workspaceShowHidden });
  }

  handleTimeline(limit: number, before?: number): Response {
    const result = getTimelineResponse(DEFAULT_CHAT_JID, limit, before);
    return this.json(result.body, result.status);
  }

  handleHashtag(tag: string, limit: number, offset: number): Response {
    const result = getHashtagResponse(DEFAULT_CHAT_JID, tag, limit, offset);
    return this.json(result.body, result.status);
  }

  handleSearch(query: string, limit: number, offset: number): Response {
    const result = getSearchResponse(DEFAULT_CHAT_JID, query, limit, offset);
    return this.json(result.body, result.status);
  }

  handleThread(id: number | null): Response {
    const result = getThreadResponse(DEFAULT_CHAT_JID, id);
    return this.json(result.body, result.status);
  }

  handleThought(panel: string | null, turnId: string | null): Response {
    if (!turnId) return this.json({ error: "Missing turn_id" }, 400);
    const normalized = panel === "draft" ? "draft" : "thought";
    const buffer = this.getBuffer(turnId, normalized);
    if (!buffer) return this.json({ error: "Thought not found" }, 404);
    return this.json({ text: buffer.text, total_lines: buffer.totalLines }, 200);
  }

  async handleThoughtVisibility(req: Request): Promise<Response> {
    let data: { turn_id?: string; turnId?: string; panel?: string; expanded?: boolean };
    try {
      data = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }
    const turnId = (data.turn_id || data.turnId || "").trim();
    const panel = data.panel === "draft" ? "draft" : "thought";
    const expanded = Boolean(data.expanded);
    if (!turnId) return this.json({ error: "Missing turn_id" }, 400);
    this.setPanelExpanded(turnId, panel, expanded);
    return this.json({ status: "ok", turn_id: turnId, panel, expanded });
  }

  handleDeletePost(id: number | null, cascade = false): Response {
    const result = deletePostResponse(DEFAULT_CHAT_JID, id, cascade);
    if (result.deletedIds.length > 0) {
      this.broadcastEvent("interaction_deleted", { ids: result.deletedIds });
    }
    return this.json(result.body, result.status);
  }

  async handleUpdatePost(req: Request, id: number | null): Promise<Response> {
    if (!id) return this.json({ error: "Missing post id" }, 400);
    let body: { content?: string; thread_id?: number };
    try {
      body = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }
    if (!body.content && body.content !== "") {
      return this.json({ error: "Missing content" }, 400);
    }
    const updated = replaceMessageContent(DEFAULT_CHAT_JID, id, body.content!, {});
    if (!updated) return this.json({ error: "Post not found" }, 404);

    if (body.thread_id) {
      const { getDb } = await import("../db/connection.js");
      getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(body.thread_id, id);
      updated.data.thread_id = body.thread_id;
    }

    broadcastInteractionUpdated(
      this,
      updated,
      ASSISTANT_NAME,
      resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      USER_NAME || null,
      resolveAvatarUrl("user", USER_AVATAR),
      USER_AVATAR_BACKGROUND || null
    );
    return this.json({ ok: true, id: updated.id });
  }

  async handleInternalPost(req: Request): Promise<Response> {
    let body: { content?: string; thread_id?: number };
    try {
      body = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }
    if (!body.content) return this.json({ error: "Missing content" }, 400);

    const threadId = body.thread_id || this.lastCommandInteractionId || undefined;
    const interaction = this.storeMessage(
      DEFAULT_CHAT_JID,
      body.content,
      true,
      [],
      threadId ? { threadId } : undefined
    );
    if (!interaction) return this.json({ error: "Failed to store" }, 500);

    broadcastAgentResponse(
      this,
      interaction,
      ASSISTANT_NAME,
      resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      USER_NAME || null,
      resolveAvatarUrl("user", USER_AVATAR),
      USER_AVATAR_BACKGROUND || null
    );
    return this.json({ ok: true, id: interaction.id }, 201);
  }

  handleSse(): Response {
    return this.sse.handleRequest();
  }

  broadcastEvent(eventType: string, data: unknown): void {
    this.sse.broadcast(eventType, data);
  }

  async handlePost(req: Request, isReply: boolean): Promise<Response> {
    const { handlePost } = await import("./web/handlers/posts.js");
    return handlePost(this, req, isReply, DEFAULT_CHAT_JID);
  }

  handleAgentStatus(req: Request): Response {
    const url = new URL(req.url);
    const chatJid = (url.searchParams.get("chat_jid") || DEFAULT_CHAT_JID).trim() || DEFAULT_CHAT_JID;
    const status = this.getAgentStatus(chatJid);
    if (!status) {
      return this.json({ status: "idle", data: null });
    }
    // Enrich with current draft/thought buffers so the client can restore
    // state after a disconnect or SSE failure without waiting for the next
    // streaming delta.
    const turnId = (status.turn_id || status.turnId) as string | undefined;
    let thought: { text: string; totalLines: number } | undefined;
    let draft: { text: string; totalLines: number } | undefined;
    if (turnId) {
      const tb = this.getBuffer(turnId, "thought");
      if (tb) thought = { text: tb.text, totalLines: tb.totalLines };
      const db = this.getBuffer(turnId, "draft");
      if (db) draft = { text: db.text, totalLines: db.totalLines };
    }
    return this.json({ status: "active", data: status, thought, draft });
  }

  async handleAgentRespond(req: Request): Promise<Response> {
    let data: { request_id?: string; outcome?: unknown };
    try {
      data = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }

    if (!data.request_id) return this.json({ error: "Missing request_id" }, 400);

    const status = this.uiBridge.handleUiResponse(data.request_id, data.outcome);
    return this.json(status);
  }

  async handleAgentMessage(req: Request, pathname: string): Promise<Response> {
    const { handleAgentMessage } = await import("./web/handlers/agent.js");
    return handleAgentMessage(this, req, pathname, DEFAULT_CHAT_JID, DEFAULT_AGENT_ID);
  }

  async processChat(chatJid: string, agentId: string, threadRootId?: number | null): Promise<void> {
    const { processChat } = await import("./web/handlers/agent.js");
    return processChat(this, chatJid, agentId, threadRootId ?? undefined);
  }

  storeMessage(
    chatJid: string,
    content: string,
    isBot: boolean,
    mediaIds: number[],
    options: { contentBlocks?: unknown[]; linkPreviews?: unknown[]; threadId?: number } = {}
  ): InteractionRow | null {
    return storeWebMessage(
      this,
      {
        chatJid,
        content,
        isBot,
        mediaIds,
        agentId: DEFAULT_AGENT_ID,
        agentName: ASSISTANT_NAME,
      },
      {
        contentBlocks: options.contentBlocks,
        linkPreviews: options.linkPreviews,
        threadId: options.threadId ?? null,
      }
    );
  }

  async handleMediaUpload(req: Request): Promise<Response> {
    return handleMediaUpload(this, req);
  }

  handleMedia(id: number, thumbnail: boolean): Response {
    return handleMedia(this, id, thumbnail);
  }

  handleMediaInfo(id: number): Response {
    return handleMediaInfo(this, id);
  }

  handleWorkspaceTree(req: Request): Response {
    return handleWorkspaceTree(this, req);
  }

  handleWorkspaceFile(req: Request): Response {
    return handleWorkspaceFile(this, req);
  }

  async handleWorkspaceUpdate(req: Request): Promise<Response> {
    return handleWorkspaceUpdate(this, req);
  }

  handleWorkspaceRaw(req: Request): Response {
    return handleWorkspaceRaw(this, req);
  }

  async handleWorkspaceAttach(req: Request): Promise<Response> {
    return handleWorkspaceAttach(this, req);
  }

  async handleWorkspaceUpload(req: Request): Promise<Response> {
    return handleWorkspaceUpload(this, req);
  }

  async handleWorkspaceDownload(req: Request): Promise<Response> {
    return handleWorkspaceDownload(this, req);
  }

  async serveStatic(relPath: string): Promise<Response> {
    return this.responses.serveStatic(relPath);
  }

  async serveDocsStatic(relPath: string): Promise<Response> {
    return this.responses.serveDocsStatic(relPath);
  }

  json(data: unknown, status = 200): Response {
    return this.responses.json(data, status);
  }

  clampInt(value: string | null, fallback: number, min: number, max: number): number {
    return this.responses.clampInt(value, fallback, min, max);
  }

  parseOptionalInt(value: string | null): number | null {
    return this.responses.parseOptionalInt(value);
  }
}

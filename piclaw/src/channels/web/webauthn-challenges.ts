/**
 * channels/web/webauthn-challenges.ts – transient WebAuthn challenge tracking and helpers.
 */

import { getRequestOriginParts } from "./http/client.js";

export type PendingWebauthnChallenge = {
  challenge: string;
  rpId: string;
  userId: string;
  createdAt: number;
};

const DEFAULT_CHALLENGE_TTL_MS = 10 * 60 * 1000;

export class WebauthnChallengeTracker {
  private readonly pendingRegistrations = new Map<string, PendingWebauthnChallenge>();
  private readonly pendingLogins = new Map<string, PendingWebauthnChallenge>();

  constructor(private readonly ttlMs = DEFAULT_CHALLENGE_TTL_MS) {}

  private prune(now = Date.now()): void {
    const cutoff = now - this.ttlMs;

    for (const [token, entry] of this.pendingRegistrations.entries()) {
      if (entry.createdAt < cutoff) this.pendingRegistrations.delete(token);
    }

    for (const [token, entry] of this.pendingLogins.entries()) {
      if (entry.createdAt < cutoff) this.pendingLogins.delete(token);
    }
  }

  trackLogin(token: string, value: Omit<PendingWebauthnChallenge, "createdAt">, now = Date.now()): void {
    this.prune(now);
    this.pendingLogins.set(token, { ...value, createdAt: now });
  }

  consumeLogin(token: string, now = Date.now()): PendingWebauthnChallenge | null {
    this.prune(now);
    const entry = this.pendingLogins.get(token);
    if (!entry) return null;
    this.pendingLogins.delete(token);
    return entry;
  }

  trackRegistration(token: string, value: Omit<PendingWebauthnChallenge, "createdAt">, now = Date.now()): void {
    this.prune(now);
    this.pendingRegistrations.set(token, { ...value, createdAt: now });
  }

  consumeRegistration(token: string, now = Date.now()): PendingWebauthnChallenge | null {
    this.prune(now);
    const entry = this.pendingRegistrations.get(token);
    if (!entry) return null;
    this.pendingRegistrations.delete(token);
    return entry;
  }
}

export function resolveWebauthnRpInfo(req: Request): { rpId: string; origin: string } {
  const url = new URL(req.url);
  const originHeader = req.headers.get("origin");

  if (originHeader && originHeader !== "null") {
    try {
      const originUrl = new URL(originHeader);
      return { rpId: originUrl.hostname, origin: originUrl.origin };
    } catch {
      // Ignore invalid Origin header and fall back to request host/proto.
    }
  }

  const { proto, host } = getRequestOriginParts(req);
  const rpId = host ? host.split(":")[0] : url.hostname;
  const origin = `${proto}://${host || url.host}`;
  return { rpId, origin };
}

export function bufferToBase64Url(value: Uint8Array): string {
  return Buffer.from(value).toString("base64url");
}

export function base64UrlToBuffer(value: string): Uint8Array<ArrayBuffer> {
  return Buffer.from(value, "base64url") as Uint8Array<ArrayBuffer>;
}

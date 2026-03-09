/**
 * channels/web/internal-secret.ts – internal secret request verification.
 */

import { safeEqual } from "./auth.js";

export function isInternalSecretRequestAuthorized(req: Request, secret: string): boolean {
  const trimmedSecret = secret.trim();
  if (!trimmedSecret) return false;

  const header = req.headers.get("x-piclaw-internal-secret") || "";
  if (header && safeEqual(header, trimmedSecret)) return true;

  const auth = req.headers.get("authorization") || "";
  if (auth.toLowerCase().startsWith("bearer ")) {
    const token = auth.slice(7).trim();
    if (token && safeEqual(token, trimmedSecret)) return true;
  }

  return false;
}

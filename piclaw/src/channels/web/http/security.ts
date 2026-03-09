/**
 * web/http/security.ts – Shared web security helpers.
 */

import { getRequestOriginParts } from "../../../utils/request-client.js";

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

/** Clone a response and append baseline security headers. */
export function withSecurityHeaders(response: Response, isTls: boolean): Response {
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
 * CSRF origin validation for state-changing requests (POST/PUT/DELETE/PATCH).
 * Allows requests without Origin (non-browser clients), blocks origin="null".
 */
export function checkCsrfOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  if (origin === "null") return false;

  const normalizePort = (proto: string, port: string): string => {
    if (port) return port;
    return proto === "https" ? "443" : proto === "http" ? "80" : "";
  };

  try {
    const originUrl = new URL(origin);
    const expected = getRequestOriginParts(req);
    const expectedProto = expected.proto.toLowerCase();
    const expectedHost = expected.host;
    if (!expectedHost) return false;

    const expectedUrl = new URL(`${expectedProto}://${expectedHost}`);
    const expectedHostname = expectedUrl.hostname.toLowerCase();
    const expectedPort = normalizePort(expectedProto, expectedUrl.port);

    const originProto = originUrl.protocol.replace(":", "").toLowerCase();
    const originHostname = originUrl.hostname.toLowerCase();
    const originPort = normalizePort(originProto, originUrl.port);

    return originProto === expectedProto && originHostname === expectedHostname && originPort === expectedPort;
  } catch {
    return false;
  }
}

/** Return a 429 JSON response. */
export function rateLimitResponse(message: string): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 429,
    headers: { "Content-Type": "application/json" },
  });
}

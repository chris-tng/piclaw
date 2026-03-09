/**
 * db/web-sessions.ts – Persistent web UI auth session storage.
 *
 * Stores session tokens issued after TOTP or passkey login so sessions
 * survive restarts. Designed for a single-user default now, but includes
 * user_id to enable multi-user support later without schema changes.
 */

import { getDb } from "./connection.js";

/** Default user ID used for single-user web auth sessions. */
export const DEFAULT_WEB_USER_ID = "default";

/** Persisted web auth session row. */
export interface WebSessionRecord {
  token: string;
  user_id: string;
  auth_method: string | null;
  created_at: string;
  expires_at: string;
}

/** Create or replace a persistent web auth session token row. */
export function createWebSession(
  token: string,
  userId: string,
  ttlSeconds: number,
  authMethod: string | null
): WebSessionRecord {
  const db = getDb();
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
  db.prepare(
    "INSERT OR REPLACE INTO web_sessions (token, user_id, auth_method, created_at, expires_at) VALUES (?, ?, ?, ?, ?)"
  ).run(token, userId, authMethod, createdAt, expiresAt);
  return { token, user_id: userId, auth_method: authMethod, created_at: createdAt, expires_at: expiresAt };
}

/** Fetch a session row by token and auto-delete it when expired. */
export function getWebSession(token: string): WebSessionRecord | null {
  const db = getDb();
  const row = db
    .prepare("SELECT token, user_id, auth_method, created_at, expires_at FROM web_sessions WHERE token = ?")
    .get(token) as WebSessionRecord | undefined;
  if (!row) return null;
  const expiresAt = Date.parse(row.expires_at);
  if (!Number.isNaN(expiresAt) && expiresAt <= Date.now()) {
    db.prepare("DELETE FROM web_sessions WHERE token = ?").run(token);
    return null;
  }
  return row;
}

/** Delete a specific web auth session token. */
export function deleteWebSession(token: string): void {
  const db = getDb();
  db.prepare("DELETE FROM web_sessions WHERE token = ?").run(token);
}

/** Delete expired session rows and return number of removed records. */
export function deleteExpiredWebSessions(now = new Date()): number {
  const db = getDb();
  const nowIso = now.toISOString();
  const info = db.prepare("DELETE FROM web_sessions WHERE expires_at <= ?").run(nowIso);
  return Number(info.changes || 0);
}

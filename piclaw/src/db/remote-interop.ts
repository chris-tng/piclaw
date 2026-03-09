/**
 * db/remote-interop.ts – Persistence for cross-instance interop peers and requests.
 */

import { getDb } from "./connection.js";

export type RemotePeerStatus = "paired" | "pending" | "denied" | "blocked" | "revoked";
export type RemotePeerMode = "mediated" | "short-circuit";
export type RemotePeerProfile = "read-only" | "restricted" | "full" | "custom";

export interface RemotePeerRecord {
  instance_id: string;
  public_key: string;
  display_name: string | null;
  status: RemotePeerStatus;
  mode: RemotePeerMode;
  profile: RemotePeerProfile;
  trust_epoch: number;
  created_at: string;
  updated_at: string;
  last_seen_at: string | null;
  blocked_reason: string | null;
}

export interface RemotePairRequestRecord {
  id: string;
  instance_id: string;
  public_key: string;
  display_name: string | null;
  callback_url: string | null;
  protocol_version: string | null;
  nonce: string | null;
  expires_at: string;
  status: string;
  created_at: string;
  source_ip: string | null;
}

export interface RemoteRequestRecord {
  id: string;
  peer_instance_id: string;
  request_type: string;
  status: string;
  prompt: string | null;
  created_at: string;
  decision: string | null;
  remote_mode: string | null;
  error: string | null;
}

export interface RemoteAuditRecord {
  peer_instance_id: string | null;
  endpoint: string;
  decision: string | null;
  status: string | null;
  error: string | null;
  created_at: string;
}

export function upsertRemotePeer(peer: RemotePeerRecord): void {
  const db = getDb();
  db.prepare(
    `INSERT INTO remote_peers (
      instance_id, public_key, display_name, status, mode, profile, trust_epoch,
      created_at, updated_at, last_seen_at, blocked_reason
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(instance_id) DO UPDATE SET
      public_key = excluded.public_key,
      display_name = excluded.display_name,
      status = excluded.status,
      mode = excluded.mode,
      profile = excluded.profile,
      trust_epoch = excluded.trust_epoch,
      updated_at = excluded.updated_at,
      last_seen_at = excluded.last_seen_at,
      blocked_reason = excluded.blocked_reason`
  ).run(
    peer.instance_id,
    peer.public_key,
    peer.display_name,
    peer.status,
    peer.mode,
    peer.profile,
    peer.trust_epoch,
    peer.created_at,
    peer.updated_at,
    peer.last_seen_at,
    peer.blocked_reason
  );
}

export function getRemotePeer(instanceId: string): RemotePeerRecord | null {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT instance_id, public_key, display_name, status, mode, profile, trust_epoch,
              created_at, updated_at, last_seen_at, blocked_reason
       FROM remote_peers WHERE instance_id = ?`
    )
    .get(instanceId) as RemotePeerRecord | undefined;
  return row ?? null;
}

export function updateRemotePeer(instanceId: string, updates: Partial<RemotePeerRecord>): void {
  const fields: string[] = [];
  const values: unknown[] = [];
  const addField = (name: keyof RemotePeerRecord, value: unknown) => {
    if (value === undefined) return;
    fields.push(`${name} = ?`);
    values.push(value);
  };

  addField("public_key", updates.public_key);
  addField("display_name", updates.display_name);
  addField("status", updates.status);
  addField("mode", updates.mode);
  addField("profile", updates.profile);
  addField("trust_epoch", updates.trust_epoch);
  addField("updated_at", updates.updated_at);
  addField("last_seen_at", updates.last_seen_at);
  addField("blocked_reason", updates.blocked_reason);

  if (!fields.length) return;
  values.push(instanceId);
  const db = getDb();
  db.prepare(`UPDATE remote_peers SET ${fields.join(", ")} WHERE instance_id = ?`).run(...values);
}

export function createPairRequest(request: RemotePairRequestRecord): void {
  const db = getDb();
  db.prepare(
    `INSERT INTO remote_pair_requests (
      id, instance_id, public_key, display_name, callback_url, protocol_version,
      nonce, expires_at, status, created_at, source_ip
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    request.id,
    request.instance_id,
    request.public_key,
    request.display_name,
    request.callback_url,
    request.protocol_version,
    request.nonce,
    request.expires_at,
    request.status,
    request.created_at,
    request.source_ip
  );
}

export function getPairRequestById(id: string): RemotePairRequestRecord | null {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT id, instance_id, public_key, display_name, callback_url, protocol_version,
              nonce, expires_at, status, created_at, source_ip
       FROM remote_pair_requests WHERE id = ?`
    )
    .get(id) as RemotePairRequestRecord | undefined;
  return row ?? null;
}

export function getPendingPairRequest(instanceId: string): RemotePairRequestRecord | null {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT id, instance_id, public_key, display_name, callback_url, protocol_version,
              nonce, expires_at, status, created_at, source_ip
       FROM remote_pair_requests
       WHERE instance_id = ? AND status = 'pending'
       ORDER BY created_at DESC
       LIMIT 1`
    )
    .get(instanceId) as RemotePairRequestRecord | undefined;
  return row ?? null;
}

export function updatePairRequestStatus(id: string, status: string): void {
  const db = getDb();
  db.prepare("UPDATE remote_pair_requests SET status = ? WHERE id = ?").run(status, id);
}

export function storeRemoteRequest(request: RemoteRequestRecord): void {
  const db = getDb();
  db.prepare(
    `INSERT INTO remote_requests (
      id, peer_instance_id, request_type, status, prompt, created_at, decision, remote_mode, error
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    request.id,
    request.peer_instance_id,
    request.request_type,
    request.status,
    request.prompt,
    request.created_at,
    request.decision,
    request.remote_mode,
    request.error
  );
}

export function getRemoteRequestById(id: string): RemoteRequestRecord | null {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT id, peer_instance_id, request_type, status, prompt, created_at, decision, remote_mode, error
       FROM remote_requests WHERE id = ?`
    )
    .get(id) as RemoteRequestRecord | undefined;
  return row ?? null;
}

export function updateRemoteRequest(id: string, updates: Partial<RemoteRequestRecord>): void {
  const fields: string[] = [];
  const values: unknown[] = [];
  const addField = (name: keyof RemoteRequestRecord, value: unknown) => {
    if (value === undefined) return;
    fields.push(`${name} = ?`);
    values.push(value);
  };

  addField("status", updates.status);
  addField("decision", updates.decision);
  addField("remote_mode", updates.remote_mode);
  addField("error", updates.error);

  if (!fields.length) return;
  values.push(id);
  const db = getDb();
  db.prepare(`UPDATE remote_requests SET ${fields.join(", ")} WHERE id = ?`).run(...values);
}

export function logRemoteAudit(entry: RemoteAuditRecord): void {
  const db = getDb();
  db.prepare(
    `INSERT INTO remote_audit_logs (peer_instance_id, endpoint, decision, status, error, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(
    entry.peer_instance_id,
    entry.endpoint,
    entry.decision,
    entry.status,
    entry.error,
    entry.created_at
  );
}

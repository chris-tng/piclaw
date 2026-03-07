# Cross-Instance IPC (Experimental)

> **Status:** Draft design. Not implemented yet.
>
> This feature enables one piclaw instance to interact with another instance in a
> secure, consent-driven way.

---

## 1) Design Intent

Cross-instance IPC must be secure by default and operator-controlled.

A key design decision:

- **Default mode is LLM-mediated** on the remote side.
- Inbound requests go to a **dedicated remote interop channel**.
- The remote side can **accept / deny / negotiate scope** before execution.
- **Short-circuit (direct RPC-like execution)** is optional and must be explicitly
  enabled by a human operator.

This avoids turning pairing into unconditional remote code execution.

---

## 2) Threat Model

### Adversaries

1. On-path attacker (MITM, replay, tamper)
2. Scanner/flooder (pairing spam, endpoint abuse)
3. Malicious/compromised paired peer
4. Social engineering via deceptive names/fingerprints
5. Compromised private key
6. Resource exhaustion attacker (LLM/tool budget starvation)

### Trust boundaries

- Local user/operator
- Local runtime + policy engine
- Remote runtime + policy engine
- Network transport
- Remote LLM decision channel (untrusted until policy-validated)

### Security goals

- Cryptographic peer authentication
- Replay resistance
- Explicit operator consent for trust
- Least-privilege authorization
- Abuse resilience (rate/queue/budget controls)
- Revocation + auditability

### Non-goals

- Transitive trust across peers
- Anonymous federation
- Automatic broad trust due to network location alone

---

## 3) Identity and Peer Model

Each instance has a stable Ed25519 identity.

| Field | Definition |
|---|---|
| `public_key` | Ed25519 public key |
| `private_key` | Local secret key (keychain/protected file) |
| `instance_id` | `base64url(sha256(public_key))` |
| `instance_name` | Display-only label |
| `fingerprint` | Human-verifiable short form |

### Rules

- `instance_id` is key-derived (not user-chosen).
- Display names are not security identifiers.
- Accept/deny/revoke operations must use `instance_id` or fingerprint.

---

## 4) Pairing Protocol (Consent + Proof)

## Step A — Request

Initiator sends `POST /api/remote/pair-request` with:

- `instance_id`, `public_key`, `display_name`
- callback URL
- protocol version
- nonce + expiry

## Step B — Review

Receiver stores request as `pending_inbound` and prompts operator with:

- full URL
- source address
- instance ID
- full fingerprint
- requested mode/permissions

## Step C — URL Control Proof

Receiver verifies initiator controls claimed URL via signed challenge callback.

## Step D — Accept / Deny / Block

- **accept**: signed confirmation, peer record created
- **deny**: reject request (retry allowed)
- **block**: deny + suppress future attempts under policy

## Step E — Confirm

Initiator verifies signature + challenge binding and marks peer as paired.

### Anti-spoof constraints

- Never accept by display name alone.
- Require explicit fingerprint/ID confirmation.
- Optional short authentication string (SAS) strongly recommended.

---

## 5) Interaction Modes

## 5.1 Default: LLM-Mediated Mode (Recommended)

Inbound prompt is treated as a **proposal**, not an immediate RPC.

Flow:

1. Peer sends signed `proposal`.
2. Remote runtime routes proposal to a **dedicated interop channel**.
3. Remote LLM evaluates and returns a decision envelope:
   - `accept_execute`
   - `accept_defer`
   - `deny`
   - `negotiate`
   - `human_required`
4. Runtime policy engine validates decision against hard limits.
5. If allowed, execution proceeds in bounded scope.
6. Response returns result and optional scope proposal updates.

### Important security rule

The LLM is a **policy advisor**, not a policy authority.

- LLM may narrow scope or deny.
- LLM must not expand permissions beyond deterministic policy ceiling.
- If LLM output conflicts with policy, runtime denies.

## 5.2 Optional: Short-Circuit Mode (Direct RPC-like)

Enabled explicitly per peer by human operator.

- Bypasses negotiation step for eligible request types.
- Executes directly under pre-approved scope profile.
- Still requires full signature, replay, budget, and authorization checks.

Use cases: low-latency trusted automation between tightly controlled peers.

---

## 6) Request Authentication Protocol

All remote requests are signed after pairing.

### Required headers

| Header | Purpose |
|---|---|
| `X-Instance-Id` | Sender identity |
| `X-Timestamp` | Request time |
| `X-Nonce` | Unique request nonce |
| `X-Sig-Version` | Signature/canonicalization version |
| `X-Signature` | Ed25519 signature |

### Canonical payload (v1)

```text
METHOD + "\n" +
PATH_WITH_QUERY + "\n" +
CONTENT_TYPE + "\n" +
SHA256(BODY_BYTES) + "\n" +
X-Timestamp + "\n" +
X-Nonce + "\n" +
X-Instance-Id + "\n" +
X-Sig-Version
```

### Verification sequence

1. Lookup peer by `X-Instance-Id`
2. Require `status=paired`
3. Validate timestamp skew bound
4. Reject reused nonce (per-peer replay cache)
5. Verify Ed25519 signature
6. Validate peer `trust_epoch`
7. Apply mode + permission + budget checks
8. Execute request

---

## 7) API Shape (Experimental)

| Endpoint | Purpose | Auth |
|---|---|---|
| `POST /api/remote/pair-request` | initiate pairing | validated unauth input |
| `POST /api/remote/pair-confirm` | complete pairing | signed |
| `GET /api/remote/ping` | health/metadata | signed |
| `POST /api/remote/proposal` | default mediated inbound prompt | signed |
| `POST /api/remote/execute` | optional short-circuit direct exec | signed + mode gate |
| `POST /api/remote/revoke` | revoke relationship | signed |

### Proposal response envelope

```json
{
  "decision": "negotiate",
  "reason": "Need narrower tool scope",
  "proposed_scope": {
    "tools": ["read", "search_workspace"],
    "max_timeout_sec": 30,
    "max_tool_calls": 5
  },
  "negotiation_id": "neg_123",
  "remote_mode": "mediated"
}
```

### Execute response envelope

```json
{
  "decision": "accept_execute",
  "result": "Disk usage: /workspace 18%",
  "usage": {
    "duration_ms": 950,
    "tool_calls": 1
  },
  "scope_applied": {
    "profile": "restricted"
  }
}
```

---

## 8) Authorization and Scope

Pairing grants identity trust, not blanket execution rights.

## Permission profiles

| Profile | Allowed |
|---|---|
| `read-only` | ping/status only |
| `restricted` (default) | proposal channel with constrained tools |
| `full` | full remote execution rights |
| `custom` | explicit allowlist |

### Restricted baseline (deny by default)

Disallow at minimum:

- shell execution
- file write/edit/delete
- keychain access
- SQL introspection
- model/provider switching
- scheduler/task creation
- privileged auth/session operations

Only explicitly granted tools/capabilities are enabled.

---

## 9) Abuse Resistance

### Mandatory controls

- per-peer request rate limit
- per-peer concurrent run cap
- per-peer daily token/time budget
- request/response size caps
- max tool calls per request
- queue isolation (local user traffic priority)
- circuit breaker on repeated invalid/abusive traffic

### Loop prevention (agent-to-agent)

Use chain metadata:

- `X-Request-Chain-Id`
- `X-Request-Hop`

Reject if hop exceeds configured max.

---

## 10) SSRF and URL Safety

Pairing/callback URLs are untrusted input.

Must enforce:

- `https` by default (dev-only exception explicit)
- block localhost/link-local/metadata ranges by default
- DNS rebinding-aware checks where feasible
- redirect + timeout limits
- optional domain/ACL allowlists

---

## 11) Revocation, Rotation, Recovery

### Revocation

`/pair revoke <instance_id>` immediately blocks new requests.

### Trust epoch

Each peer has `trust_epoch`; requests with stale trust context are rejected.

### Key rotation

Key changes require re-verification/re-pair flow; no silent key swaps.

### Compromise runbook

1. revoke compromised peer/key
2. block source if needed
3. rotate local identity key
4. re-pair trusted peers
5. audit and backfill incident timeline

---

## 12) Logging, Privacy, Retention

Audit logs required, but minimize sensitive payload retention.

Recommended logged fields:

- peer ID
- endpoint + decision
- auth result/failure code
- mode used (mediated/short-circuit)
- applied scope profile
- resource usage (duration/tokens/tool calls)
- redacted error summary

Avoid logging raw secrets and full payloads by default.

---

## 13) Minimum Viable Secure Defaults

These defaults are recommended for first implementation.

| Control | Default |
|---|---|
| feature flag | disabled |
| default mode | `mediated` |
| default peer profile | `restricted` |
| timestamp skew | ±90s |
| nonce replay TTL | 5 min |
| nonce cache size | 10k per peer (bounded LRU) |
| pending pair request TTL | 24h |
| pair-request rate | 3 / 10 min / source + ID |
| proposal rate | 12 / min / peer |
| concurrent runs | 1 / peer, 4 global remote |
| max prompt size | 32 KB |
| max response size | 256 KB |
| max tool calls | 8 (restricted), 32 (full) |
| max execution timeout | 60s (restricted), 180s (full) |
| request hop limit | 3 |
| audit retention | 30 days (configurable) |

---

## 14) Command UX (Proposed)

```text
/pair request <url>
/pair accept <instance_id|fingerprint>
/pair deny <instance_id|fingerprint>
/pair block <instance_id|fingerprint>
/pair revoke <instance_id|fingerprint>
/pair list
/pair permissions <instance_id> <profile>
/pair mode <instance_id> <mediated|short-circuit>
/ask <instance_id> <prompt>
```

UX requirements:

- always show fingerprint and immutable ID
- explicit warning on `full` or `short-circuit`
- require confirm step for privilege escalation

---

## 15) Implementation Plan (Security-Gated)

| Phase | Scope | Security gate |
|---|---|---|
| 1 | identity + key storage | key-derived IDs enforced |
| 2 | pairing + peer state | challenge/URL proof complete |
| 3 | signature middleware | canonicalization + nonce replay cache |
| 4 | policy engine | deterministic scope enforcement |
| 5 | mediated channel | decision envelope + negotiation flow |
| 6 | short-circuit mode | explicit operator opt-in + tests |
| 7 | capacity controls | quotas/queue isolation/circuit breakers |
| 8 | revocation + rotation | trust epoch checks + runbooks |
| 9 | observability | audit, redaction, retention, alerts |

---

## 16) Must-Fix Checklist Before Enabling

- [ ] canonical signature spec implemented and versioned
- [ ] nonce replay cache enforced per peer
- [ ] acceptance/revocation only by immutable ID/fingerprint
- [ ] URL ownership challenge implemented in pairing
- [ ] strict SSRF protections for callback URLs
- [ ] deterministic policy ceiling (LLM cannot escalate)
- [ ] mediated mode default with dedicated channel
- [ ] short-circuit mode explicit opt-in only
- [ ] per-peer quotas, concurrency caps, and queue isolation
- [ ] loop/hop prevention implemented
- [ ] trust-epoch revocation checks in request path
- [ ] TLS enforcement (no silent plaintext fallback)
- [ ] audit logging with redaction and retention controls

---

## 17) Diagram

See [`cross-instance-ipc-design.svg`](cross-instance-ipc-design.svg).

The diagram should be interpreted together with this document’s security gates
and default mode behavior.

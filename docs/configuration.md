# Configuration

This document covers all `piclaw` configuration options: environment variables, config files, secrets, authentication, and notifications.

## Path overrides

| Variable | Default | Purpose |
|----------|---------|---------|
| `PICLAW_WORKSPACE` | `/workspace` | Working directory for `pi` + `piclaw` |
| `PICLAW_STORE` | `/workspace/.piclaw/store` | SQLite database location |
| `PICLAW_DATA` | `/workspace/.piclaw/data` | Sessions, IPC, chats.json |
| `SUPERVISOR_CONF` | `/workspace/.piclaw/supervisor/supervisord.conf` | Supervisor config path (falls back to `/etc/supervisor/supervisord.conf`) |

## Web server

| Variable | Default | Purpose |
|----------|---------|---------|
| `PICLAW_WEB_PORT` | `8080` | Web UI port |
| `PICLAW_WEB_HOST` | `0.0.0.0` | Bind address |
| `PICLAW_WEB_IDLE_TIMEOUT` | `0` (disabled) | Drop idle clients after this many seconds |
| `PICLAW_WEB_TLS_CERT` | _(empty)_ | Path to TLS certificate; enables HTTPS |
| `PICLAW_WEB_TLS_KEY` | _(empty)_ | Path to TLS private key; enables HTTPS |
| `PICLAW_WEB_MAX_CONTENT_CHARS` | `262144` | Max message size in characters; oversized messages are truncated with metadata |

If `PICLAW_WEB_TLS_CERT` and `PICLAW_WEB_TLS_KEY` are both omitted, piclaw checks for `.piclaw/certs/sandbox.local.crt` and `.piclaw/certs/sandbox.local.key` and enables HTTPS automatically if both exist.

CLI overrides: `piclaw --port`, `--host`, `--idle-timeout`, `--tls-cert`, `--tls-key`.

## Runtime and agent

| Variable | Default | Purpose |
|----------|---------|---------|
| `PICLAW_AUTOSTART` | `1` | Set to `0` to keep the supervisor service idle (run `pi`/`piclaw` manually) |
| `PICLAW_AGENT_TIMEOUT` | `1800000` | Max `pi` invocation time (ms) |
| `PICLAW_BACKGROUND_AGENT_TIMEOUT` | `0` | Max background invocation time (ms; `0` disables) |
| `PICLAW_ASSISTANT_NAME` | `PiClaw` | Display name in the web UI |
| `PICLAW_ASSISTANT_AVATAR` | _(empty)_ | Avatar URL for the web UI |
| `PICLAW_TOOL_OUTPUT_RETENTION_DAYS` | `30` | Days to retain stored tool outputs |
| `PICLAW_TOOL_OUTPUT_CLEANUP_INTERVAL_MS` | `43200000` | Cleanup interval (ms) |

Deprecated env names (still supported): `ASSISTANT_NAME`, `ASSISTANT_AVATAR`, `AGENT_TIMEOUT`, `AGENT_TIMEOUT_BACKGROUND`.

### Assistant name and avatar

Set via environment variables (see above) or in `.piclaw/config.json`:

```json
{
  "assistant": {
    "assistantName": "PiClaw",
    "assistantAvatar": "https://example.com/avatar.png"
  }
}
```

## Authentication (TOTP + passkeys)

You can gate the entire web UI behind a 6-digit TOTP challenge and optionally enable WebAuthn passkeys. Static assets needed by iOS/Android webapps (manifest, icons, avatars, `/static/*`) remain public so homescreen shortcuts keep working.

| Variable | Default | Purpose |
|----------|---------|---------|
| `PICLAW_WEB_TOTP_SECRET` | _(empty)_ | Base32 TOTP secret. When set, `/login` requires a 6-digit code before issuing a `piclaw_session` cookie. Leave unset to keep the UI open. |
| `PICLAW_WEB_PASSKEY_MODE` | `totp-fallback` | Passkey mode: `totp-fallback`, `passkey-only`, or `totp-only`. |
| `PICLAW_WEB_TOTP_WINDOW` | `1` | TOTP step skew (number of 30s windows to accept on either side). |
| `PICLAW_WEB_SESSION_TTL` | `604800` (7 days) | Session cookie lifetime in seconds. |
| `PICLAW_WEB_INTERNAL_SECRET` / `PICLAW_INTERNAL_SECRET` | _(empty)_ | Shared secret for unattended POST/PATCH calls to `/internal/post`; required when TOTP is enabled and you want automations to keep posting. |

### Setup flow (TOTP)

1. Set `PICLAW_WEB_TOTP_SECRET` to a base32 string (e.g. output of `oathtool --totp -b`).
2. Restart piclaw. Visiting the UI redirects to `/login`.
3. Enter the 6-digit code from your authenticator app to receive an HTTP-only `piclaw_session` cookie.
4. Sessions expire automatically after `PICLAW_WEB_SESSION_TTL` seconds or when you delete the cookie.

### Passkey enrolment

1. Sign in with TOTP.
2. Run `/passkey enrol` in the web UI to get a one-time enrolment link.
3. Open the link in the same browser and complete the passkey prompt.

### Notes

- Multiple passkeys are supported per user; use `/passkey list` to review and `/passkey delete` to revoke.
- Passkeys are bound to the hostname used during enrolment (RP ID).
- Login attempts automatically try passkeys first when supported; TOTP remains as fallback unless you set `PICLAW_WEB_PASSKEY_MODE=passkey-only`.

Internal automation still works via `/internal/post` as long as the request includes the configured secret in the `x-piclaw-internal-secret` header or the `Authorization` header.

## Keychain secrets

See [keychain.md](keychain.md) for full details.

The keychain is disabled unless you provide a master key:

| Variable | Default | Purpose |
|----------|---------|---------|
| `PICLAW_KEYCHAIN_KEY` | _(empty)_ | Master key for encrypting/decrypting keychain entries |
| `PICLAW_KEYCHAIN_KEY_FILE` | _(empty)_ | Read master key from a file (trimmed) |

Quick example:

```bash
PICLAW_KEYCHAIN_KEY="your-master-key" \
  piclaw keychain set github/token --type token --secret "ghp_xxx"
```

## WhatsApp pairing

See [whatsapp.md](whatsapp.md) for full details.

If QR pairing fails (headless/server environments), provide a phone number to request a pairing code:

```bash
WHATSAPP_PHONE=1234567890
```

Or in `.piclaw/config.json`:

```json
{ "whatsappPhone": "1234567890" }
```

## Pushover notifications

`piclaw` can send push notifications for scheduled tasks and IPC messages.

```bash
PUSHOVER_APP_TOKEN=your-app-token
PUSHOVER_USER_KEY=your-user-key
PUSHOVER_DEVICE=myphone          # optional
PUSHOVER_PRIORITY=0              # optional
PUSHOVER_SOUND=pushover          # optional
```

Or in `.piclaw/config.json` under the `pushover` key:

```json
{
  "pushover": {
    "appToken": "your-app-token",
    "userKey": "your-user-key",
    "device": "myphone"
  }
}
```

## Using an external workspace

By default, `docker-compose.yml` bind-mounts `./workspace`. To use a different path, set `WORKSPACE_PATH` in `.env`:

```bash
echo 'WORKSPACE_PATH=/mnt/data/piclaw-workspace' >> .env
make up
```

Or override directly:

```bash
WORKSPACE_PATH=/mnt/data/piclaw-workspace docker compose up -d
```

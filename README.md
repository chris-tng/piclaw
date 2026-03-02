# `piclaw` - A `pi`-based general-purpose agent

![PiClaw](docs/icon-512.png)

PiClaw is a minimal Docker-based sandbox for running the [Pi Coding Agent](https://github.com/badlogic/pi-mono) in an isolated Debian environment. It bundles `piclaw` — a web‑first orchestrator built on the Pi SDK with persistent sessions, a streaming web UI, and scheduled tasks. WhatsApp is optional. Inspired by [agentbox](https://github.com/rcarmo/agentbox) and [nanoclaw](https://github.com/qwibitai/nanoclaw).

## Highlights

- **Debian Bookworm (slim)** base image
- **Bun** runtime + **Homebrew** package manager
- **Pi Coding Agent** installed globally (`pi` CLI)
- **`piclaw`** orchestrator (web UI, WhatsApp optional)
- **Streaming Web UI** with markdown, attachments, link previews, and SSE
- **Persistent workspace & SQLite storage** (messages, media, tasks, token usage)
- **Token usage tracking + charts** (token-chart skill)
- **Built-in skills** for setup, debugging, Playwright, charts, and scheduling

## Quick Start

```bash
# Build the image
make build

# Start the container
make up

# Enter the container
make enter

# Inside the container, start piclaw (web UI + WhatsApp gateway)
piclaw
```

The container starts idle — you need to `exec` into it and run `piclaw` manually (or set `PICLAW_AUTOSTART=1` in your environment / `.env` to start it on boot).

Once piclaw is running, open the web UI at:

```
http://localhost:8080
```

To use `pi` interactively instead (no web UI):

```bash
cd /workspace
pi
```

WhatsApp pairing is optional; see [docs/whatsapp.md](docs/whatsapp.md).

## Web UI

![Screenshot showing thought](docs/screenshot-dark.png)

The built-in UI is single-user, mobile-friendly, and streams updates over SSE:

- **Real-time streaming** with token-by-token updates
- **Markdown rendering** with syntax highlighting, KaTeX, and Mermaid
- **Thought/Draft panels** during streaming
- **Live steering** and follow‑ups while streaming
- **File attachments** with download links
- **Workspace explorer** (left sidebar SVG tree, previews, and downloads) — responsive, shown on desktop/tablet in landscape
- **File reference pills** (click a file to add it to the next prompt)
- **Preview rules**: Markdown renders only for `.md`; other text is monospaced plaintext; images render inline
- **Link previews** via server-side OpenGraph fetch
- **Multi-turn threading** — when the agent produces multiple turns in a single response, subsequent turns are visually threaded under the first
- **Large message previews** — oversized messages are truncated with a download link for the full content
- **Dark/Light themes** (system preference)
- **Mobile-first layout** with webapp manifest

### Workspace explorer

![Screenshot showing explorer](docs/screenshot-explorer-light.jpg)


The workspace sidebar shows an SVG tree of `/workspace` (auto-refreshes every 15s and only re-renders when the tree changes). Click a file to:

- Open a preview (images inline, text in monospaced plaintext by default, Markdown rendered only for `.md`).
- Add a **file reference pill** to the compose box for your next prompt.

When you send a message with pills, the UI prefixes your prompt with a `Files:` block so the agent sees the paths:

```
Files:
- notes/orangepi-6-plus.md
- scripts/run-stress-ng.sh

<your message>
```

Remove pills with the “x” on each tag, or clear them automatically after sending.

Web server settings:

- `PICLAW_WEB_PORT` (default `8080`)
- `PICLAW_WEB_HOST` (default `0.0.0.0`)
- `PICLAW_WEB_IDLE_TIMEOUT` (seconds, `0` disables)
- `PICLAW_WEB_TLS_CERT` (path to TLS certificate; enables HTTPS)
- `PICLAW_WEB_TLS_KEY` (path to TLS private key; enables HTTPS)
  - If both are omitted but `.piclaw/certs/sandbox.local.crt` and `.piclaw/certs/sandbox.local.key` exist, HTTPS is enabled automatically.
- `PICLAW_WEB_MAX_CONTENT_CHARS` (default `262144` / 256 KB; oversized messages are truncated with metadata)

CLI overrides are also available: `piclaw --port`, `--host`, `--idle-timeout`, `--tls-cert`, `--tls-key`.

## Volumes & Persistence

Everything that should survive container recreation lives on two volumes:

| Mount | Container path | Contents |
|-------|---------------|----------|
| Home  | `/config`     | Agent home persistence (`.pi/`, `.gitconfig`, `.bashrc`) |
| Workspace | `/workspace` | Projects, `piclaw` state, and notes |

### Workspace layout

```
/workspace/
├── AGENTS.md                # Pi system prompt (seeded from skeleton on first boot)
├── .pi/skills/              # Project-level skills (seeded from skel/)
├── .piclaw/                 # `piclaw` state (auto-created, gitignored)
│   ├── store/messages.db    # SQLite database (messages, media, tasks, token usage)
│   ├── data/sessions/       # Pi session history (per chat JID)
│   ├── data/ipc/            # IPC files (messages, tasks)
│   └── data/chats.json      # Registered chat JIDs
├── notes/                   # Agent memory (created by `pi` as needed)
└── <your projects>/
```

### Data integrity

**Never delete** `/workspace/.piclaw/store/messages.db`. It contains all chat history, media, tasks, and token usage. Only repair/migrate it when needed.

### Using an external workspace

By default, `docker-compose.yml` bind-mounts `./workspace`. To use a different path or a named volume, set `WORKSPACE_PATH` in `.env`:

```bash
# Use a directory on an external drive
echo 'WORKSPACE_PATH=/mnt/data/piclaw-workspace' >> .env
make up
```

Or override directly:

```bash
WORKSPACE_PATH=/mnt/data/piclaw-workspace docker compose up -d
```

## Configuration

### Path overrides

| Variable | Default | Purpose |
|----------|---------|---------|
| `PICLAW_WORKSPACE` | `/workspace` | Working directory for `pi` + `piclaw` |
| `PICLAW_STORE` | `/workspace/.piclaw/store` | SQLite database location |
| `PICLAW_DATA` | `/workspace/.piclaw/data` | Sessions, IPC, chats.json |

### Runtime & UI

| Variable | Default | Purpose |
|----------|---------|---------|
| `PICLAW_AUTOSTART` | `0` | Set to `1` to auto-start piclaw on container boot |
| `AGENT_TIMEOUT` | `600000` | Max `pi` invocation time (ms) |
| `ASSISTANT_NAME` | `PiClaw` | Trigger name (`@PiClaw`) |
| `ASSISTANT_AVATAR` | _(empty)_ | Avatar URL for web UI |
| `PICLAW_WEB_PORT` | `8080` | Web UI port |
| `PICLAW_WEB_HOST` | `0.0.0.0` | Web UI bind address |
| `PICLAW_WEB_IDLE_TIMEOUT` | `0` | Drop idle clients (seconds) |
| `PICLAW_WEB_MAX_CONTENT_CHARS` | `262144` | Max web message size |
| `PICLAW_TOOL_OUTPUT_RETENTION_DAYS` | `30` | Retain stored tool outputs |
| `PICLAW_TOOL_OUTPUT_CLEANUP_INTERVAL_MS` | `43200000` | Cleanup interval |

### Keychain secrets

Piclaw ships with an encrypted SQLite-backed keychain that can inject secrets into tool environment variables. The keychain is disabled unless you provide a master key.

| Variable | Default | Purpose |
|----------|---------|---------|
| `PICLAW_KEYCHAIN_KEY` | _(empty)_ | Master key for encrypting/decrypting keychain entries |
| `PICLAW_KEYCHAIN_KEY_FILE` | _(empty)_ | Read master key from a file (trimmed) |

Entries live in `messages.db` (table `keychain_entries`) encrypted with AES-256-GCM + PBKDF2 (per-entry salt + nonce). Deleting entries uses `PRAGMA secure_delete=ON`.

Add an entry from the repo root:

```bash
PICLAW_KEYCHAIN_KEY="your-master-key" \
  bun -e 'import { initDatabase } from "./piclaw/src/db.js";
    import { setKeychainEntry } from "./piclaw/src/secure/keychain.js";
    initDatabase();
    await setKeychainEntry({
      name: "github/foo/bar",
      type: "token",
      secret: "ghp_xxx",
      username: "octo"
    });'
```

Use entries in tool env maps by prefixing with `keychain:`. The default value is the secret; append `:username` to read the stored username.

```json
{
  "env": {
    "GITHUB_TOKEN": "keychain:github/foo/bar",
    "GITHUB_USER": "keychain:github/foo/bar:username"
  }
}
```

See `docs/keychain.md` for details.

### WhatsApp pairing

If QR pairing fails (headless/server environments), provide a phone number to request a pairing code:

```bash
WHATSAPP_PHONE=1234567890
```

You can also store it in `/workspace/.piclaw/config.json`:

```json
{ "whatsappPhone": "1234567890" }
```

### Assistant name & avatar

You can set the web UI name/avatar in `.piclaw/config.json`:

```json
{
  "assistant": {
    "assistantName": "PiClaw",
    "assistantAvatar": "https://example.com/avatar.png"
  }
}
```

### Pushover notifications

`piclaw` can send proactive notifications for scheduled tasks or IPC messages:

```bash
PUSHOVER_APP_TOKEN=your-app-token
PUSHOVER_USER_KEY=your-user-key
PUSHOVER_DEVICE=myphone
PUSHOVER_PRIORITY=0
PUSHOVER_SOUND=pushover
```

Or via config:

```json
{
  "pushover": {
    "appToken": "your-app-token",
    "userKey": "your-user-key",
    "device": "myphone",
    "priority": 0,
    "sound": "pushover"
  }
}
```

## Tools & skills overview

`pi` ships with the standard tools (read, bash, edit, write) plus `piclaw` extensions for message search, model control, and file attachments. They keep output lean, store messages and media in SQLite, and enable one‑shot operations without leaving the chat.

Skills live under `.pi/skills` and `~/.pi/agent/skills` and are kept in sync. They cover setup, diagnostics, Playwright automation, hot‑reload, scheduling, messaging, and chart helpers. Each skill keeps its script alongside the `SKILL.md` so it can travel with the workspace.

## Further documentation

- [Architecture](docs/architecture.md)
- [Storage model](docs/storage.md)
- [Runtime flows](docs/runtime-flows.md)
- [Tools and skills](docs/tools-and-skills.md)
- [WhatsApp integration (optional)](docs/whatsapp.md)

## Development

### Building

```bash
cd piclaw
make build-piclaw    # TypeScript compile + web asset copy
make lint            # ESLint (flat config)
make test            # Run all tests
make test-coverage   # Tests with coverage report
```

### Testing

Tests use the Bun runner. For SQLite safety, tests default to sequential mode:

```bash
cd piclaw/piclaw
bun test                              # run all tests
bun test --max-concurrency=1          # sequential (recommended)
bun test test/extensions-model-control.test.ts  # single file
```

## Container Runtime

PiClaw is a standard OCI image and works with any compliant container runtime:

- **Docker** / Docker Desktop — primary development target
- **Apple Containers** (macOS 26+) — works natively
- **Podman**, **nerdctl**, etc. — standard `docker compose` equivalents work

Multi-arch images (amd64 + arm64) are published to GHCR on every tag push.

## CI / Release Pipeline

Pushing a version tag triggers `.github/workflows/publish.yml`:

1. Native multi-arch builds (amd64 + arm64)
2. Manifest merge into `latest` + versioned tag
3. Artifact cleanup (keeps 5 most recent releases/tags/workflows/images)

```bash
make bump-patch   # bumps VERSION, commits, creates git tag
make push         # pushes commits + tag → triggers CI
```

## Credits

- [rcarmo/agentbox](https://github.com/rcarmo/agentbox)
- [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)
- [badlogic/pi-mono](https://github.com/badlogic/pi-mono)

## License

MIT

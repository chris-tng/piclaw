# `piclaw` — a web-first sandbox for `pi`

![PiClaw](docs/icon-256.png)

PiClaw packages the [Pi Coding Agent](https://github.com/badlogic/pi-mono) into a self-hosted Debian sandbox with a streaming web UI, persistent sessions, scheduled tasks, workspace tooling, and optional WhatsApp support.

It is built for people who want a practical, stateful agent they can run locally or in a container without stitching together half a dozen separate services.

Inspired by [agentbox](https://github.com/rcarmo/agentbox) and [nanoclaw](https://github.com/qwibitai/nanoclaw).

## Why PiClaw

![Demo Animation](docs/demo.gif)

- **Streaming web UI** — real-time chat with Markdown, KaTeX, Mermaid, and Adaptive Cards
- **Persistent agent state** — SQLite-backed messages, media, tasks, token usage, and encrypted keychain
- **Workspace-native workflow** — browse files, preview documents, upload attachments, edit code, and reference files in prompts
- **Built-in tools** — Ghostty-based terminal, code editor, Office/PDF/CSV/image/video viewers, draw.io, kanban board and mindmap editors, VNC client, Chromium CDP browser automation, and Windows UI automation
- **Agent control features** — steering, queued follow-ups, threading, side prompts, autoresearch experiment loops, and scheduled tasks
- **Optional auth and channels** — passkeys/TOTP for the web UI, plus optional WhatsApp integration

## Quick start

> [!IMPORTANT]
> The supported runtime path is the published image:
> **`ghcr.io/rcarmo/piclaw`**.
>
> Source builds are mainly for development. If something looks wrong in production, validate it against GHCR first.

### Run with Docker

```bash
mkdir -p ./home ./workspace

docker run -d \
  --name piclaw \
  --restart unless-stopped \
  -p 8080:8080 \
  -e PICLAW_WEB_PORT=8080 \
  -v "$(pwd)/home:/config" \
  -v "$(pwd)/workspace:/workspace" \
  ghcr.io/rcarmo/piclaw:latest
```

Open `http://localhost:8080`.

> [!NOTE] 
> If you plan to use SSHFS (`sshfs` inside the container), start with FUSE-enabled permissions:
>
> ```bash
> docker run -d \
>   --name piclaw \
>   --restart unless-stopped \
>   -p 8080:8080 \
>   --device /dev/fuse \
>   --cap-add SYS_ADMIN \
>   -e PICLAW_WEB_PORT=8080 \
>   -v "$(pwd)/home:/config" \
>   -v "$(pwd)/workspace:/workspace" \
>   ghcr.io/rcarmo/piclaw:latest
> ```
>
> Depending on host/container security policy, `--security-opt apparmor:unconfined` may also be required.

To use `pi` interactively inside the container:

```bash
docker exec -u agent -it piclaw bash
cd /workspace && pi
```

| Mount | Container path | Contents |
|---|---|---|
| Home | `/config` | Agent home (`.pi/`, `.gitconfig`, `.bashrc`) |
| Workspace | `/workspace` | Projects, notes, and piclaw state |

> [!WARNING]
> Never delete `/workspace/.piclaw/store/messages.db`. It contains chat history, media, and task state.


### Install directly from the repo with Bun

> [!NOTE]
> This is the Docker-free install path.
>
> **Experimental for now**: Bun-first, Linux/macOS, and intended to avoid a manual build step, but not yet positioned as the main production install route or a generally supported deployment target.
>
> It also runs directly on Windows — with native desktop automation via Win32 FFI — but Windows is **not officially supported**. It technically works, but you're on your own.
>
> One reason this path exists is to support people who want to run PiClaw on low-end ARM SBCs, lightweight VMs, or other sandboxed environments where Docker is not the best fit or is not available.
>

```bash
bun add -g github:rcarmo/piclaw
```

A `postinstall` script runs automatically to fetch the draw.io viewer (~35 MB),
which is too large to commit to git. All other vendored assets and web bundles
are committed and available immediately.

If `postinstall` is skipped (e.g. `--ignore-scripts`), run manually:

```bash
bun run build:vendor:drawio
```

For a full development rebuild (requires devDependencies):

```bash
bun install               # includes devDependencies
bun run build:web         # rebuild web bundles from source
bun run build             # recompile TypeScript (optional — Bun runs .ts directly)
```

See [docs/install-from-repo.md](docs/install-from-repo.md) for scope and caveats.


## Configure models

Type `/login` in the web chat to configure providers and models. The terminal (`pi /login`) is also available as a fallback.

> [!IMPORTANT]
> You do **not** need to set provider API keys in piclaw environment variables.
> PiClaw reuses provider credentials configured in Pi Agent settings.


The web terminal is disabled by default. Set `PICLAW_WEB_TERMINAL_ENABLED=1` to enable it. See [docs/configuration.md](docs/configuration.md) for details.

> [!NOTE]
> The `/login` card flow works with GitHub Copilot, Codex, and standard OpenAI providers. For providers that need manual configuration, use `pi /login` in the terminal.

## Web UI

PiClaw is single-user, mobile-friendly, and streams updates over SSE.

### Chat features

- Thought and draft panels during streaming
- Live steering and queued follow-ups
- Adaptive Cards with persisted submissions
- `/btw` side conversations
- File attachments and downloads
- Link previews
- Threaded follow-up turns
- Themes and tinting via `/theme` and `/tint`
- Mobile-friendly layout with webapp manifest

### Workspace explorer

The sidebar shows `/workspace` with auto-refresh.

- Preview files
- Add file-reference pills to prompts
- Upload files by drag-and-drop
- View folder sizes in the starburst explorer

### Editor

Open the built-in editor from a text-file preview.

- CodeMirror 6
- Search and replace
- Save with dirty-state tracking
- Line wrapping, numbers, active-line highlight
- Syntax highlighting for JS/TS, Python, Go, JSON, CSS, HTML, YAML, SQL, XML/SVG, Markdown, and Shell
- Lazy-loaded local bundle; no CDN dependency

### Browser and desktop automation

- **`cdp_browser`** — bundled Chromium/Edge/Chrome automation via the Chrome DevTools Protocol for tab listing, navigation, JS evaluation, DOM clicking, and screenshots
- **`win_*` tools** — bundled Windows-only desktop automation via `bun:ffi` + IAccessible for window enumeration, screenshots, tree inspection, clicking, typing, and graceful/forced close

The Windows desktop tools are safe to ship cross-platform because they no-op off Windows, while `cdp_browser` works across Linux, macOS, and Windows when a Chromium-based browser is available.


### Windows support (experimental)

PiClaw runs natively on Windows via `bun install`. The bundled `win_*` tools provide full desktop automation through `bun:ffi` calling directly into Win32 system DLLs — no PowerShell, no compiled helpers, nothing for Defender to flag:

- `win_list_windows` — enumerate visible windows with titles, PIDs, bounds
- `win_screenshot` — capture any window to BMP/PNG (works through lock screen)
- `win_find_elements` — discover UI elements via IAccessible/MSAA (sees inside Edge, VS Code, WPF, UWP)
- `win_click` — click by coordinates or element name
- `win_type` — send keystrokes with Unicode support
- `win_tree` — dump the full accessibility tree for a window
- `win_kill` — close or force-kill windows by title

These tools no-op on non-Windows platforms. Not officially supported. Works anyway.

### Viewers

- **Draw.io** — self-hosted editor with SVG/PNG/XML export back to workspace
- **Office documents** — `.docx`, `.xlsx`, `.pptx`, `.odt`, `.ods`, `.odp`
- **CSV/TSV** — dedicated table viewer
- **PDF** — inline viewer
- **Images** — inline image viewer
- **Video** — dedicated tab-based viewer
- **Kanban boards** — `*.kanban.md` files open in a drag-and-drop board editor (Obsidian Kanban compatible)
- **Mindmaps** — `*.mindmap.yaml` files open in a D3/SVG visual editor
- **VNC remote display** — connect to remote machines from a tab (experimental)

## Configuration

Key environment variables:

| Variable | Default | Purpose |
|---|---|---|
| `PICLAW_WEB_PORT` | `8080` | Web UI port |
| `PICLAW_WEB_TERMINAL_ENABLED` | `0` | Enable the authenticated web terminal |
| `PICLAW_WEB_TOTP_SECRET` | _(empty)_ | Base32 TOTP secret; enables login gate (or leave unset and initialize with `/totp`) |
| `PICLAW_WEB_PASSKEY_MODE` | `totp-fallback` | `totp-fallback`, `passkey-only`, or `totp-only` |
| `PICLAW_ASSISTANT_NAME` | `PiClaw` | Display name in the UI |
| `PICLAW_KEYCHAIN_KEY` | _(empty)_ | Master key for encrypted secret storage |
| `PICLAW_TRUST_PROXY` | `0` | Enable when behind a reverse proxy or tunnel |

For the full list, auth setup (TOTP/passkeys), and reverse proxy configuration, see [docs/configuration.md](docs/configuration.md).

### Auth quick notes

- Run `/totp` in the web UI to initialize TOTP with a single card that shows the QR code, manual entry code, and confirmation input.
- The secret is committed only after that same card is confirmed with a valid live TOTP code.
- `/totp reset <current-code>` stages a new secret, then commits it only after the new code is confirmed; existing web sessions are invalidated only after that succeeds.
- `/passkey enrol` still requires a TOTP-authenticated session.

### Reverse proxies / tunnels

> [!IMPORTANT]
> If piclaw runs behind a reverse proxy or tunnel (Cloudflare Tunnel, Caddy, Nginx, etc.), enable proxy trust.

```bash
PICLAW_TRUST_PROXY=1
```

See [docs/reverse-proxy.md](docs/reverse-proxy.md) for forwarded-header requirements, examples, and troubleshooting.

## Development

Run build/package commands from the **repo root**:

```bash
make build-piclaw    # full build: vendor bundle + web assets + TypeScript
make vendor          # rebuild vendored assets
make lint            # ESLint
make test            # full test suite
make local-install   # pack, install globally, restart piclaw
```

The implementation lives under `runtime/`, so direct Bun test runs should target that subtree. Sequential mode is recommended for SQLite safety:

```bash
cd runtime && bun test --max-concurrency=1
```

### Local-only `pi` authority (recommended)

To avoid global-vs-local CLI drift, this repo enforces project-local `pi` via `.envrc`:

```bash
# one-time
cd /path/to/piclaw
direnv allow

# verify authority and version alignment
make check-pi-local
```

Expected behavior inside the repo:
- `which pi` resolves to `./node_modules/.bin/pi`
- local installed `@mariozechner/pi-coding-agent` matches `package.json`

If the check fails, re-align local dependencies:

```bash
bun install --frozen-lockfile
```

## Release

Pushing a version tag triggers `.github/workflows/publish.yml` and publishes multi-arch GHCR images:

- `ghcr.io/rcarmo/piclaw:<tag>`
- `ghcr.io/rcarmo/piclaw:latest`

```bash
make bump-patch
make bump-minor
make push
```

## Container runtime

PiClaw works with any OCI-compliant runtime.

- **Preferred image source:** `ghcr.io/rcarmo/piclaw`
- **Primary target:** Docker / Docker Desktop
- Also works with Apple Containers, Podman, nerdctl, and similar runtimes

## Documentation

- [Configuration](docs/configuration.md)
- [Reverse proxy / Cloudflare Tunnel](docs/reverse-proxy.md)
- [Architecture](docs/architecture.md)
- [Development](docs/development.md)
- [Extension UI contract](docs/extension-ui-contract.md)
- [Web pane extensions](docs/web-pane-extensions.md)
- [Storage model](docs/storage.md)
- [Runtime flows](docs/runtime-flows.md)
- [Tools and skills](docs/tools-and-skills.md)
- [Keychain](docs/keychain.md)
- [WhatsApp](docs/whatsapp.md)
- [Cross-instance interop](docs/cross-instance-ipc.md)
- [Release process](docs/release.md)

## Credits

- [rcarmo/agentbox](https://github.com/rcarmo/agentbox)
- [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)
- [badlogic/pi-mono](https://github.com/badlogic/pi-mono)
- [davebcn87/pi-autoresearch](https://github.com/davebcn87/pi-autoresearch) — autonomous experiment loop by Tobi Lutke and David Cortés (vendored under `runtime/vendor/autoresearch/`)

## Licence

MIT

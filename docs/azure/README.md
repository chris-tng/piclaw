# Piclaw on Azure VM (setup guide)

This is a concise checklist for deploying Piclaw on an Azure VM.

## 1) Provision the VM

- Create a Linux VM (Debian/Ubuntu recommended).
- Open inbound ports for:
  - **SSH** (consider a non‑standard port, e.g. 2211)
  - **HTTP/HTTPS** (80/443) for the web UI
- Create a non‑root user (e.g. `agent`) and enable passwordless sudo.

## 2) Install prerequisites

```bash
sudo apt update
sudo apt install -y git curl build-essential ca-certificates
curl -fsSL https://bun.sh/install | bash
```

Ensure `~/.bun/bin` is on the PATH.

## 3) Prepare workspace

```bash
sudo mkdir -p /workspace
sudo chown -R $USER:$USER /workspace
```

Clone your Piclaw repo into `/workspace/piclaw`.

## 4) Build + install Piclaw (no symlinks)

```bash
cd /workspace/piclaw && make build-piclaw
cd /workspace/piclaw/piclaw
bun pm pack --destination /tmp
TARBALL=$(ls -t /tmp/piclaw-*.tgz | head -1)
DEST=/home/$USER/.bun/install/global/node_modules/piclaw
rm -rf "$DEST"
mkdir -p "$DEST"
tar -xzf "$TARBALL" -C "$DEST" --strip-components=1
rm -f "$TARBALL"
cd "$DEST" && bun install --production
```

## 5) Systemd user service

Create `~/.config/systemd/user/piclaw.service`:

```
[Unit]
Description=Piclaw agent
After=network.target

[Service]
Type=simple
WorkingDirectory=/workspace/piclaw
Environment=PICLAW_WORKSPACE=/workspace
Environment=PICLAW_STORE=/workspace/.piclaw/store
Environment=PICLAW_DATA=/workspace/.piclaw/data
Environment=PICLAW_AGENT_TIMEOUT=1800000
ExecStart=/home/USER/.bun/bin/piclaw --port 3000
Restart=always
RestartSec=2

[Install]
WantedBy=default.target
```

Enable linger and start the service:

```bash
loginctl enable-linger $USER
systemctl --user daemon-reload
systemctl --user enable --now piclaw.service
```

## 6) Reverse proxy (Caddy example)

Use a basic reverse proxy with TLS and basic auth. Example snippet:

```
example.yourdomain.tld {
  basicauth {
    username <hashed-password>
  }
  reverse_proxy 127.0.0.1:3000
}
```

Ensure ports 80/443 are open and DNS points to the VM.

## 7) Optional: SSH hardening

- Move SSH to a custom port (e.g. 2211).
- Disable password login after key auth is working.

## 8) Optional: Azure OpenAI extension

If you want a managed‑identity Azure OpenAI provider:

- Copy `docs/azure/azure-openai-token.ts` to `~/.pi/agent/extensions/azure-openai-token.ts`.
- Configure:
  - `AOAI_BASE_URL` (Responses API base URL)
  - `AOAI_MODEL_ID` / `AOAI_MODEL_NAME`
  - `AOAI_RESOURCE` (defaults to `https://cognitiveservices.azure.com/`)
- Restart Piclaw after installing.

See `docs/azure/azure-openai-extension.md` for design notes.

## Operational notes

- Prefer `systemctl --user restart piclaw.service` over killing port 3000 directly.
- Keep `/workspace/.piclaw` on persistent storage if possible.

---
name: reload
description: Reinstall piclaw from workspace source and force-restart the running process. Use after making code changes to piclaw.
---

# Reload Piclaw (force)

Reinstall the piclaw package from workspace source and restart the running process
immediately (no waiting for the current pi invocation). This is a force hot-reload —
the new process takes over on the same port.

## Steps

1. Build piclaw, pack a tarball, and install it globally as real files (not symlinks). Bun's `add -g file:` always creates symlinks, so we manually extract and install dependencies:
   ```bash
   cd /workspace/piclaw && make build-piclaw
   cd /workspace/piclaw/piclaw && bun pm pack --destination /tmp
   TARBALL=$(ls -t /tmp/piclaw-*.tgz | head -1)
   DEST=/home/agent/.bun/install/global/node_modules/piclaw
   rm -rf "$DEST"
   mkdir -p "$DEST"
   tar -xzf "$TARBALL" -C "$DEST" --strip-components=1
   rm -f "$TARBALL"
   cd "$DEST" && bun install --production
   ```

2. Find the running piclaw PID:
   ```bash
   PICLAW_PID=$(pgrep -f 'bun.*piclaw.*--port' | head -1)
   ```

3. Determine the piclaw command line (preserves flags like --port):
   ```bash
   PICLAW_CMD=$(cat /proc/$PICLAW_PID/cmdline | tr '\0' ' ')
   ```

4. Launch the force-restart script as a fully detached process. The script:
   - Does NOT wait for the current pi invocation
   - Sends SIGTERM to piclaw and waits for it to die
   - Starts a new piclaw with the same command line

   ```bash
   cat > /tmp/restart-piclaw-force.sh << 'SCRIPT'
   #!/bin/bash
   set -e
   PICLAW_PID=$1
   shift 1
   PICLAW_CMD="$@"

   # Immediate restart (no wait)
   echo "[reload] Forcing restart (no wait)"

   # Kill old piclaw
   echo "[reload] Stopping old piclaw ($PICLAW_PID)..."
   kill "$PICLAW_PID" 2>/dev/null || true
   for i in $(seq 1 10); do
     kill -0 "$PICLAW_PID" 2>/dev/null || break
     sleep 0.5
   done
   kill -9 "$PICLAW_PID" 2>/dev/null || true
   sleep 1

   # Start new piclaw
   echo "[reload] Starting new piclaw: $PICLAW_CMD"
   exec $PICLAW_CMD
   SCRIPT
   chmod +x /tmp/restart-piclaw-force.sh

   nohup setsid /tmp/restart-piclaw-force.sh "$PICLAW_PID" $PICLAW_CMD \
     </dev/null >/tmp/restart-piclaw-force.log 2>&1 &
   disown
   ```

5. Confirm the restart script is running:
   ```bash
   echo "Force restart scheduled. Piclaw will restart immediately."
   ```

## Important Notes

- This force restart does NOT wait for the current pi invocation; the current response may be cut off.
- There will be a brief (~3s) gap where piclaw is down during the restart.
- The new piclaw inherits the same command-line flags as the old one.
- WhatsApp session state persists across restarts (stored in SQLite + auth dir).
- If something goes wrong, check `/tmp/restart-piclaw-force.log`.
- `bun add -g file:` creates symlinks; the pack+extract approach ensures real file copies.

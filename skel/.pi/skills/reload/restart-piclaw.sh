#!/bin/bash
# Restart piclaw: kill old process, exec into new one.
#
# Usage: restart-piclaw.sh [--sync|--async] [OLD_PID] [-- CMD...]
#   --sync       Run in the foreground (no self-detach)
#   --async      Force async mode (default)
#   OLD_PID      PID to kill first (default: read from /tmp/piclaw.pid)
#   CMD          command to run (default: piclaw --port 3000)
#
# The script now self-detaches by default, so you can run it directly from
# /shell or ssh. Logs go to /tmp/restart-piclaw-force.log unless overridden via
# PICLAW_RELOAD_LOG.

export PATH="/home/agent/.bun/bin:/home/linuxbrew/.linuxbrew/bin:$PATH"
export BUN_INSTALL="/home/agent/.bun"

LOG_PATH="${PICLAW_RELOAD_LOG:-/tmp/restart-piclaw-force.log}"
DETACH_DEFAULT="${PICLAW_RELOAD_ASYNC:-1}"
DETACH_MODE="$DETACH_DEFAULT"

while [ $# -gt 0 ]; do
  case "$1" in
    --sync|--no-async)
      DETACH_MODE=0
      shift
      ;;
    --async)
      DETACH_MODE=1
      shift
      ;;
    *)
      break
      ;;
  esac
done

if [ -n "${PICLAW_RELOAD_SYNC_MODE:-}" ]; then
  DETACH_MODE=0
fi

if [ "$DETACH_MODE" = "1" ]; then
  export PICLAW_RELOAD_SYNC_MODE=1
  mkdir -p "$(dirname "$LOG_PATH")"
  LAUNCH_CMD=()
  if command -v setsid >/dev/null 2>&1; then
    LAUNCH_CMD+=(setsid)
  fi
  if command -v nohup >/dev/null 2>&1; then
    nohup "${LAUNCH_CMD[@]}" "$0" "$@" </dev/null >>"$LOG_PATH" 2>&1 &
  else
    "${LAUNCH_CMD[@]}" "$0" "$@" </dev/null >>"$LOG_PATH" 2>&1 &
  fi
  CHILD=$!
  echo "[reload] Restart scheduled asynchronously (PID $CHILD). Follow $LOG_PATH for progress."
  exit 0
fi

PIDFILE=/tmp/piclaw.pid
LOCKFILE=/tmp/piclaw-restart.lock
LOCK_HELD=0

if command -v flock >/dev/null 2>&1; then
  exec 9>"$LOCKFILE"
  if ! flock -n 9; then
    echo "[reload] Another restart is in progress. Exiting."
    exit 1
  fi
  LOCK_HELD=1
else
  echo "[reload] flock not available; continuing without lock"
fi

# Parse args
OLD_PID=""
if [ $# -ge 1 ] && [ "$1" != "--" ]; then
  OLD_PID="$1"
  shift
fi
[ "${1:-}" = "--" ] && shift

if [ $# -eq 0 ]; then
  set -- piclaw --port 3000
fi

# Fall back to pidfile
if [ -z "$OLD_PID" ] && [ -f "$PIDFILE" ]; then
  OLD_PID=$(cat "$PIDFILE" 2>/dev/null || true)
fi

PORT=3000
for ((i=1;i<=$#;i++)); do
  arg="${!i}"
  if [ "$arg" = "--port" ]; then
    next_index=$((i+1))
    PORT="${!next_index:-3000}"
  elif [[ "$arg" == --port=* ]]; then
    PORT="${arg#--port=}"
  fi
done

DATA_DIR="${PICLAW_DATA:-/workspace/.piclaw/data}"
IPC_MESSAGES_DIR="$DATA_DIR/ipc/messages"
IPC_TASKS_DIR="$DATA_DIR/ipc/tasks"
NOTIFY_SENT_FILE="/tmp/piclaw-reload-notified"
INTERNAL_SECRET="${PICLAW_INTERNAL_SECRET:-${PICLAW_WEB_INTERNAL_SECRET:-}}"

COMMAND="$1"
if ! command -v "$COMMAND" >/dev/null 2>&1; then
  echo "[reload] Command not found: $COMMAND"
  tidy_lock
  exit 1
fi

echo ""
echo "[reload] === $(date -Iseconds) ==="

wait_for_exit() {
  local pid="$1"
  local label="$2"
  for _ in $(seq 1 20); do
    if ! kill -0 "$pid" 2>/dev/null; then
      return 0
    fi
    sleep 0.5
  done
  echo "[reload] ${label} still running after timeout"
  return 1
}

is_zombie() {
  local pid="$1"
  local stat
  stat=$(ps -o stat= -p "$pid" 2>/dev/null | tr -d ' ')
  [[ "$stat" == *Z* ]]
}

find_port_pid() {
  if ! command -v ss >/dev/null 2>&1; then
    return 0
  fi
  ss -ltnp "sport = :$PORT" 2>/dev/null | awk -F 'pid=' 'NR>1 {split($2,a,","); print a[1]}' | head -1
}

wait_for_agent_idle() {
  if ! command -v curl >/dev/null 2>&1; then
    echo "[reload] curl not available; skipping agent status wait."
    return 0
  fi
  local url="http://127.0.0.1:$PORT/agent/status"
  local attempt=0
  local max_attempts=120
  local -a headers=()
  if [ -n "$INTERNAL_SECRET" ]; then
    headers+=(-H "X-Piclaw-Internal-Secret: $INTERNAL_SECRET")
  fi
  while true; do
    local resp
    resp=$(curl -fsS --max-time 2 "${headers[@]}" "$url" 2>/dev/null || true)
    if [ -z "$resp" ]; then
      if [ -n "$INTERNAL_SECRET" ]; then
        echo "[reload] Agent status unavailable (curl failed); proceeding."
      elif [ $attempt -eq 0 ]; then
        echo "[reload] Agent status unavailable; proceeding without wait."
      fi
      return 0
    fi
    if echo "$resp" | grep -q '"status":"active"'; then
      if [ $attempt -eq 0 ]; then
        echo "[reload] Waiting for active agent turn to finish..."
      fi
      attempt=$((attempt + 1))
      if [ $attempt -ge $max_attempts ]; then
        echo "[reload] Waited ${max_attempts}s for active turn; continuing reload."
        return 0
      fi
      sleep 1
      continue
    fi
    if [ $attempt -gt 0 ]; then
      echo "[reload] Active turn finished; continuing reload."
    fi
    return 0
  done
}

kill_pid() {
  local pid="$1"
  local label="$2"
  if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
    if is_zombie "$pid"; then
      echo "[reload] ${label} ($pid) is a zombie; skipping kill"
      return 0
    fi
    echo "[reload] Stopping ${label} ($pid)..."
    kill "$pid" 2>/dev/null || true
    wait_for_exit "$pid" "$label" || true
    if kill -0 "$pid" 2>/dev/null; then
      echo "[reload] Force-killing ${label} ($pid)"
      kill -9 "$pid" 2>/dev/null || true
      sleep 1
    fi
  fi
}

wait_for_agent_idle

# Kill old piclaw
kill_pid "$OLD_PID" "old piclaw"

# Ensure port is free (kill stray piclaw if needed)
PORT_PID=$(find_port_pid)
if [ -n "$PORT_PID" ]; then
  CMDLINE=$(ps -p "$PORT_PID" -o cmd= 2>/dev/null || true)
  if echo "$CMDLINE" | grep -qi "piclaw"; then
    kill_pid "$PORT_PID" "piclaw on port $PORT"
  else
    echo "[reload] Port $PORT is in use by PID $PORT_PID ($CMDLINE). Aborting."
    exit 1
  fi
fi

SUPERVISOR_PIDFILE=/tmp/piclaw-supervisor.pid
CHILD_PID=""

tidy_lock() {
  if [ "$LOCK_HELD" -eq 1 ]; then
    flock -u 9 || true
    exec 9>&- || true
  fi
}

handle_signal() {
  echo "[reload] Signal received, shutting down..."
  if [ -n "$CHILD_PID" ] && kill -0 "$CHILD_PID" 2>/dev/null; then
    kill "$CHILD_PID" 2>/dev/null || true
    wait "$CHILD_PID" 2>/dev/null || true
  fi
  tidy_lock
  exit 0
}
trap handle_signal SIGTERM SIGINT

# Kill old supervisor if present
if [ -f "$SUPERVISOR_PIDFILE" ]; then
  OLD_SUPERVISOR=$(cat "$SUPERVISOR_PIDFILE" 2>/dev/null || true)
  if [ -n "$OLD_SUPERVISOR" ] && [ "$OLD_SUPERVISOR" != "$$" ]; then
    kill_pid "$OLD_SUPERVISOR" "old supervisor"
  fi
fi

echo $$ > "$SUPERVISOR_PIDFILE"

tidy_lock

notify_ready() {
  if [ -f "$NOTIFY_SENT_FILE" ]; then
    return 0
  fi
  for _ in $(seq 1 40); do
    if bash -c "</dev/tcp/127.0.0.1/$PORT" >/dev/null 2>&1; then
      mkdir -p "$IPC_MESSAGES_DIR"
      cat > "$IPC_MESSAGES_DIR/reload_$(date +%s%N).json" <<EOF
{"type":"message","chatJid":"web:default","text":"Piclaw reload complete."}
EOF
      echo "ready" > "$NOTIFY_SENT_FILE"
      return 0
    fi
    sleep 0.5
  done
  echo "[reload] Ready check timed out; skipping reload notification."
}

queue_resume_pending() {
  if ! mkdir -p "$IPC_TASKS_DIR" 2>/dev/null; then
    echo "[reload] Unable to create IPC tasks dir at $IPC_TASKS_DIR; skipping resume queue."
    return 0
  fi
  if ls "$IPC_TASKS_DIR"/resume_pending_*.json >/dev/null 2>&1; then
    echo "[reload] Resume IPC already queued; skipping."
    return 0
  fi
  cat > "$IPC_TASKS_DIR/resume_pending_$(date +%s%N).json" <<EOF
{"type":"resume_pending","chatJid":"all","reason":"reload"}
EOF
  echo "[reload] Queued resume_pending IPC."
}

queue_resume_pending

echo "[reload] Starting: $* (supervisor PID $$)"
ATTEMPT=0
rm -f "$NOTIFY_SENT_FILE"
while true; do
  ATTEMPT=$((ATTEMPT + 1))
  "$@" &
  CHILD_PID=$!
  echo "$CHILD_PID" > "$PIDFILE"
  if [ ! -f "$NOTIFY_SENT_FILE" ]; then
    notify_ready &
  fi
  wait "$CHILD_PID"
  STATUS=$?
  CHILD_PID=""
  if [ $STATUS -eq 0 ]; then
    echo "[reload] piclaw exited cleanly"
    exit 0
  fi
  if [ $ATTEMPT -ge 5 ]; then
    echo "[reload] piclaw exited with status $STATUS; giving up"
    exit $STATUS
  fi
  echo "[reload] piclaw exited with status $STATUS; restarting in 2s"
  sleep 2

done

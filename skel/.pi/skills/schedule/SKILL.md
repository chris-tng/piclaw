---
name: schedule
description: Schedule a task to run later or on a recurring basis. Creates an IPC file that piclaw picks up to register the scheduled task.
---

# Schedule a Task

Create a JSON file in the piclaw IPC directory to schedule work.

## Usage

Write a JSON file to `$PICLAW_DATA/ipc/tasks/`:

```bash
cat > "$PICLAW_DATA/ipc/tasks/schedule_$(date +%s).json" <<EOF
{
  "type": "schedule_task",
  "chatJid": "$PICLAW_CHAT_JID",
  "prompt": "Describe what should happen when this task fires",
  "model": "gpt-5.1-codex-mini",
  "schedule_type": "TYPE",
  "schedule_value": "VALUE"
}
EOF
```

`model` is optional. When provided, the scheduler switches the session model before running the prompt.

## Schedule Types

### Cron (recurring on a schedule)
Use standard cron expressions. Example — every weekday at 9am:
```json
{ "schedule_type": "cron", "schedule_value": "0 9 * * 1-5" }
```

### Interval (recurring, in milliseconds)
Example — every hour:
```json
{ "schedule_type": "interval", "schedule_value": "3600000" }
```

### Once (one-time at a specific time)
Use an ISO 8601 timestamp:
```json
{ "schedule_type": "once", "schedule_value": "2025-02-01T09:00:00Z" }
```

## Managing Existing Tasks

Write to the same IPC directory:

• Pause:  `{ "type": "pause_task", "taskId": "task-xxx" }`
• Resume: `{ "type": "resume_task", "taskId": "task-xxx" }`
• Cancel: `{ "type": "cancel_task", "taskId": "task-xxx" }`

## Environment

The following environment variables are set by piclaw when it invokes you:
- `PICLAW_DATA` — piclaw data directory (contains `ipc/`, `sessions/`)
- `PICLAW_CHAT_JID` — JID of the chat that triggered this invocation

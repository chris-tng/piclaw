# Runtime flows

This document covers the primary web‑first flows. WhatsApp is documented separately in [whatsapp.md](whatsapp.md).

## Web UI → Agent → Web UI

The web UI supports steering mid‑response by queuing follow‑ups while streaming.

```mermaid
sequenceDiagram
  participant User
  participant Web as Web UI
  participant API as WebChannel (HTTP/SSE)
  participant Router
  participant DB as SQLite
  participant Pool as AgentPool
  participant Pi as Pi SDK

  User->>Web: Prompt
  Web->>API: POST /agent
  API->>DB: Store message
  API->>Router: Route message
  Router->>Pool: runAgent()
  Pool->>Pi: prompt()
  Pi-->>Pool: streaming updates
  Pool-->>API: events
  API-->>Web: SSE updates
  Pool->>DB: Store assistant reply
```

## Scheduled tasks / IPC

```mermaid
sequenceDiagram
  participant Skill
  participant IPC
  participant Scheduler
  participant DB as SQLite
  participant Pool as AgentPool
  participant Pi as Pi SDK
  participant Web as Web UI

  Skill->>IPC: write schedule_task JSON
  Scheduler->>DB: persist task
  Scheduler->>Pool: runAgent()
  Pool->>Pi: prompt()
  Pi-->>Pool: result
  Scheduler->>DB: log run
  Scheduler-->>Web: post result
```

## Session lifecycle (summary)

- Messages for a chat JID share a warm `AgentSession`.
- Auto‑compaction runs when the context window is tight.
- Idle sessions are evicted after a short TTL.

See [architecture.md](architecture.md) for component layout and [tools-and-skills.md](tools-and-skills.md) for tool/skill details.

---
name: token-chart
description: Generate a 7-day token usage chart (all chats) and post it to the web UI timeline.
---

# Token chart

Generate a 7-day token usage chart (all chats) and post it to the web UI timeline as a message.

## Steps

1. Run the chart script:
   ```bash
   bun /workspace/.pi/skills/token-chart/token-chart.ts
   ```

2. Post safely to the web chat (JSON-encoded, no Pushover nudge):
   ```bash
   bun /workspace/.pi/skills/token-chart/token-chart.ts --ipc
   ```

3. If you explicitly want a Pushover nudge as well:
   ```bash
   bun /workspace/.pi/skills/token-chart/token-chart.ts --ipc --nudge
   ```

## Notes

- The chart is rendered as an embedded SVG via markdown image syntax.
- Styling is handled by the web UI CSS (token-chart image selector).
- Numbers are formatted using K/M in labels and summaries.
- Uses the `token_usage` table by default; pass `--source sessions` (or `--sessions-dir`) to read session JSONL files.
- Use this on demand (not scheduled yet).

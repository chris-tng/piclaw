---
name: graphite-power-chart
description: Generate a Graphite chart (12h default) for a Zigbee device metric and post it to the web timeline.
---

# Graphite power chart

Generate a 12-hour chart for a Zigbee device and post it to the web UI timeline.
The script lives alongside this skill for easy adaptation to other data sources.

## Usage

### Power chart for a Zigbee device (default 12h)
```bash
bun /workspace/piclaw/piclaw/skills/graphite-power-chart/graphite-power-chart.ts \
  --device office_benchmark_plug --ipc
```

### Temperature chart (explicit metric + unit)
```bash
bun /workspace/piclaw/piclaw/skills/graphite-power-chart/graphite-power-chart.ts \
  --metric zigbee.server_closet_temperature.temperature \
  --label Temperature --unit "°C" \
  --ipc
```

### Override the window and resampling
```bash
bun /workspace/piclaw/piclaw/skills/graphite-power-chart/graphite-power-chart.ts \
  --device office_desk_ups_power --hours 24 --resample 10min --ipc
```

## Notes

- Default window is 12 hours.
- Resampling is auto-selected based on window length using Graphite `summarize(..., "avg")`.
- Use `--resample raw` to disable resampling.
- Output is posted to the web timeline using the IPC message bus (no push by default).
- To adapt to other data sources, change the `--base-url` and pass a full `--metric`.

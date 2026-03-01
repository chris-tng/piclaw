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
bun /workspace/.pi/skills/graphite-power-chart/graphite-power-chart.ts \
  --device example_plug --ipc
```

### Temperature chart (explicit metric + unit)
```bash
bun /workspace/.pi/skills/graphite-power-chart/graphite-power-chart.ts \
  --metric zigbee.example_sensor.temperature \
  --label Temperature --unit "°C" \
  --ipc
```

### Override the window and resampling
```bash
bun /workspace/.pi/skills/graphite-power-chart/graphite-power-chart.ts \
  --device example_ups --hours 24 --resample 10min --ipc
```

## Notes

- Default window is 12 hours.
- Resampling is auto-selected based on window length using Graphite `summarize(..., "avg")`.
- Use `--resample raw` to disable resampling.
- Output is posted to the web timeline using the IPC message bus (no push by default).
- Set the Graphite URL with `--base-url` (or `GRAPHITE_BASE_URL`) and pass a full `--metric` to adapt to other data sources.

#!/usr/bin/env bun
/**
 * graphite-power-chart.ts
 * -----------------------
 * Query a Graphite server for one or more metrics, render an SVG chart,
 * and optionally send it via IPC.
 *
 * Supports:
 * - Multiple metrics (even with different sampling intervals).
 * - Line, area, and stacked-area charts.
 * - Optional stacked-percent (normalized to 100%).
 * - Optional dual Y axis with independent scaling.
 * - Test sine-wave generator for offline visual checks.
 */
import { mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";

const args = process.argv.slice(2);

/**
 * Read a CLI argument by name (e.g., "--hours") and return the next token.
 * Returns undefined if the argument is absent or the next token is another flag.
 */
const getArg = (name: string): string | undefined => {
  const idx = args.indexOf(name);
  if (idx >= 0 && idx + 1 < args.length) {
    const value = args[idx + 1];
    if (!value.startsWith("--")) return value;
  }
  return undefined;
};

/** Parse comma-separated CLI lists (e.g., "a,b,c"). */
const parseList = (value?: string): string[] =>
  value
    ? value
        .split(",")
        .map((entry) => entry.trim())
        .filter(Boolean)
    : [];

/**
 * Compute a common prefix for a list of strings.
 * Returns an empty string if no shared prefix exists.
 */
const commonPrefix = (values: string[]) => {
  if (!values.length) return "";
  let prefix = values[0];
  for (let i = 1; i < values.length; i += 1) {
    const value = values[i];
    let j = 0;
    while (j < prefix.length && j < value.length && prefix[j] === value[j]) {
      j += 1;
    }
    prefix = prefix.slice(0, j);
    if (!prefix) break;
  }
  return prefix;
};

/**
 * Compute a common suffix for a list of strings.
 * Returns an empty string if no shared suffix exists.
 */
const commonSuffix = (values: string[]) => {
  if (!values.length) return "";
  let suffix = values[0];
  for (let i = 1; i < values.length; i += 1) {
    const value = values[i];
    let j = 0;
    while (
      j < suffix.length &&
      j < value.length &&
      suffix[suffix.length - 1 - j] === value[value.length - 1 - j]
    ) {
      j += 1;
    }
    suffix = suffix.slice(suffix.length - j);
    if (!suffix) break;
  }
  return suffix;
};

/**
 * Remove a shared prefix/suffix from labels to avoid duplicate strings.
 * We only trim on a separator boundary to avoid chopping words in half.
 */
const stripSharedAffixes = (labels: string[]) => {
  if (labels.length <= 1) return labels;
  const separators = [".", "-", "_", " "];
  const prefix = commonPrefix(labels);
  const suffix = commonSuffix(labels);

  const trimPrefix = (value: string) => {
    if (!prefix) return value;
    const lastSep = Math.max(...separators.map((sep) => prefix.lastIndexOf(sep)));
    const cut = lastSep >= 0 ? lastSep + 1 : prefix.length;
    return value.slice(cut);
  };

  const trimSuffix = (value: string) => {
    if (!suffix) return value;
    const reversed = suffix.split("").reverse().join("");
    const lastSep = Math.max(...separators.map((sep) => reversed.lastIndexOf(sep)));
    const cut = lastSep >= 0 ? lastSep + 1 : suffix.length;
    return value.slice(0, Math.max(0, value.length - cut));
  };

  return labels.map((value) => {
    let trimmed = trimSuffix(trimPrefix(value));
    trimmed = trimmed.replace(/^[._\-\s]+|[._\-\s]+$/g, "");
    return trimmed || value;
  });
};

// CLI flags and config.
const testSine = args.includes("--test-sine");
const outputSvg = getArg("--output-svg");
const mode = (getArg("--mode") || "line").toLowerCase();
const stackedPercent = args.includes("--stacked-percent") || args.includes("--stacked-100");

const hoursArg = getArg("--hours");
const hours = hoursArg ? parseInt(hoursArg, 10) : 12;
const targetHours = Number.isFinite(hours) && hours > 0 ? hours : 12;

const baseUrlArg = getArg("--base-url");
const baseUrl = (baseUrlArg || process.env.GRAPHITE_BASE_URL || "http://192.168.1.250:8086").replace(/\/$/, "");

const deviceArg = getArg("--device");
const metricArg = getArg("--metric");
const metricsArg = getArg("--metrics");
const rightAxisArg = getArg("--right-axis");
const labelArg = getArg("--label");
const unitArg = getArg("--unit");
const rightAxisUnitsArg = getArg("--right-axis-units");

const rawDevices = parseList(deviceArg);
const rawMetrics = [...parseList(metricsArg), ...parseList(metricArg)];
const rightAxisMetrics = parseList(rightAxisArg);

if (!rawDevices.length && !rawMetrics.length && !testSine) {
  console.error(
    "Usage: graphite-power-chart.ts --metrics <metric,metric> [--device <name,name>] " +
      "[--hours 12] [--resample 5min|raw] [--mode line|area|stacked] [--stacked-percent] " +
      "[--label Power] [--unit W] [--right-axis metric,metric] [--right-axis-units units] " +
      "[--test-sine] [--output-svg /path/output.svg] [--ipc] [--chat-jid web:default]"
  );
  process.exit(1);
}

/**
 * Normalize device names to Zigbee power metrics for backward compatibility.
 * Example: "living-room" -> "zigbee.living-room.power".
 */
const normalizeDeviceMetric = (device: string) => {
  let metric = device;
  if (!metric.startsWith("zigbee.")) metric = `zigbee.${metric}`;
  if (!metric.endsWith(".power")) metric = `${metric}.power`;
  return metric;
};

// Build final metric list.
const metrics: string[] = [];
rawDevices.forEach((device) => metrics.push(normalizeDeviceMetric(device)));
rawMetrics.forEach((metric) => metrics.push(metric));
if (!metrics.length && testSine) {
  metrics.push("test.sine.power");
}

/** Remove the zigbee. prefix to keep legends compact. */
const displayNameFor = (metric: string) => metric.replace(/^zigbee\./, "");
const primaryMetric = metrics[0] || "value";

/** Infer a chart label if none is specified. */
const inferLabel = (metric: string) => {
  if (labelArg) return labelArg;
  if (metric.endsWith(".power")) return "Power";
  if (metric.endsWith(".temperature")) return "Temperature";
  if (metric.endsWith(".humidity")) return "Humidity";
  if (metric.endsWith(".voltage")) return "Voltage";
  if (metric.endsWith(".current")) return "Current";
  return "Value";
};

/** Infer a unit label if none is specified. */
const inferUnit = (metric: string) => {
  if (unitArg) return unitArg;
  if (metric.endsWith(".power")) return "W";
  if (metric.endsWith(".temperature")) return "°C";
  if (metric.endsWith(".humidity")) return "%";
  if (metric.endsWith(".voltage")) return "V";
  if (metric.endsWith(".current")) return "A";
  return "";
};

const seriesLabel = inferLabel(primaryMetric);
const unit = inferUnit(primaryMetric);
const unitSuffix = unit ? ` ${unit}` : "";

const ipcEnabled = args.includes("--ipc");
const nudgeEnabled = args.includes("--nudge");
const chatJid = getArg("--chat-jid") || "web:default";
const dataDir = process.env.PICLAW_DATA || "/workspace/.piclaw/data";
const messagesDir = join(dataDir, "ipc", "messages");

/**
 * Choose an appropriate Graphite resample period for the time span.
 * We keep this small for short ranges and coarser for long ranges.
 */
const chooseResamplePeriod = (hours: number): string => {
  if (hours <= 3) return "1min";
  if (hours <= 6) return "2min";
  if (hours <= 12) return "5min";
  if (hours <= 24) return "10min";
  if (hours <= 48) return "30min";
  if (hours <= 72) return "1h";
  return "2h";
};

const resampleArg = getArg("--resample");
const resamplePeriod = resampleArg === "raw" ? null : resampleArg || chooseResamplePeriod(targetHours);
const targetMetrics = metrics.map((metric) =>
  resamplePeriod ? `summarize(${metric},\"${resamplePeriod}\",\"avg\")` : metric
);

const from = `-${targetHours}h`;
const targetParams = targetMetrics.map((metric) => `target=${encodeURIComponent(metric)}`).join("&");
const url = `${baseUrl}/render?${targetParams}&from=${from}&format=json`;

type Point = { value: number; ts: number };
type Axis = "left" | "right";

type Series = {
  metric: string;
  displayName: string;
  axis: Axis;
  points: Point[];
};

/**
 * Decide whether a metric belongs on the right axis.
 * We match against the full metric, its display name, or the stripped zigbee name.
 */
const isRightAxisMetric = (metric: string) => {
  if (!rightAxisMetrics.length) return false;
  const display = displayNameFor(metric);
  return rightAxisMetrics.some((candidate) =>
    [metric, display, display.replace(/^zigbee\./, "")].includes(candidate)
  );
};

let series: Series[] = [];

if (testSine) {
  // Generate synthetic sine waves so we can test rendering without Graphite.
  const nowTs = Date.now();
  const startTs = nowTs - targetHours * 3600 * 1000;
  const intervalMs = Math.max(60_000, Math.floor((targetHours * 3600 * 1000) / 200));
  const periodMs = 6 * 3600 * 1000;
  const baseAmplitude = 30;
  const offset = 50;

  metrics.forEach((metric, idx) => {
    const phaseOffset = (idx / Math.max(metrics.length, 1)) * Math.PI;
    const amplitude = baseAmplitude * (1 - idx * 0.1);
    const points: Point[] = [];

    for (let ts = startTs; ts <= nowTs; ts += intervalMs) {
      const phase = ((ts - startTs) / periodMs) * Math.PI * 2 + phaseOffset;
      const value = offset + amplitude * Math.sin(phase);
      points.push({ value, ts });
    }

    series.push({
      metric,
      displayName: displayNameFor(metric),
      axis: isRightAxisMetric(metric) ? "right" : "left",
      points,
    });
  });
} else {
  // Fetch all metrics in a single Graphite request (multiple target params).
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Graphite request failed (${res.status}): ${url}`);
    process.exit(1);
  }

  const payload = (await res.json()) as Array<{ target: string; datapoints: Array<[number | null, number]> }>;

  series = payload.map((entry, idx) => {
    const metric = metrics[idx] || entry.target || `series-${idx + 1}`;
    const points = (entry.datapoints || [])
      .filter((pt) => pt[0] !== null)
      .map((pt) => ({ value: pt[0] as number, ts: pt[1] * 1000 }))
      .sort((a, b) => a.ts - b.ts);

    return {
      metric,
      displayName: displayNameFor(metric),
      axis: isRightAxisMetric(metric) ? "right" : "left",
      points,
    };
  });
}

/**
 * Trim trailing zero-ish values from each series so that flat tails
 * do not stretch the chart unnecessarily.
 */
const trimSeries = (entry: Series): Series => {
  if (!entry.points.length) return entry;
  const rawValues = entry.points.map((p) => p.value);
  const rawMax = Math.max(...rawValues);
  const zeroThreshold = Math.max(0.001, rawMax * 0.001);
  let trimmedPoints = entry.points;
  for (let i = entry.points.length - 1; i >= 0; i -= 1) {
    if (Math.abs(entry.points[i].value) > zeroThreshold) {
      if (i < entry.points.length - 1) {
        trimmedPoints = entry.points.slice(0, i + 1);
      }
      break;
    }
  }
  return { ...entry, points: trimmedPoints.length ? trimmedPoints : entry.points };
};

series = series.map(trimSeries).filter((entry) => entry.points.length);

if (!series.length) {
  const msg = `No data for ${metrics.map(displayNameFor).join(", ")} (last ${targetHours}h).`;
  if (ipcEnabled) {
    mkdirSync(messagesDir, { recursive: true });
    const outPath = join(messagesDir, `msg_${Date.now()}_graphite_power.json`);
    writeFileSync(outPath, JSON.stringify({ type: "message", chatJid, text: msg, noNudge: !nudgeEnabled }, null, 2));
  } else {
    process.stdout.write(msg);
  }
  process.exit(0);
}

const leftSeries = series.filter((entry) => entry.axis === "left");
const rightSeries = series.filter((entry) => entry.axis === "right");
const hasRightAxis = rightSeries.length > 0;

// Apply label de-duplication to all series labels.
const dedupedLabels = stripSharedAffixes(series.map((entry) => entry.displayName));
series = series.map((entry, idx) => ({ ...entry, displayName: dedupedLabels[idx] }));

const flattenPoints = series.flatMap((entry) => entry.points);
const allValues = flattenPoints.map((p) => p.value);
const minValue = Math.min(...allValues);
const maxValue = Math.max(...allValues);

const seriesStats = series.map((entry) => {
  const values = entry.points.map((p) => p.value);
  const avgValue = values.reduce((a, b) => a + b, 0) / values.length;
  const lastValue = values[values.length - 1];
  return {
    metric: entry.metric,
    displayName: entry.displayName,
    axis: entry.axis,
    avgValue,
    minValue: Math.min(...values),
    maxValue: Math.max(...values),
    lastValue,
  };
});

/** Format a raw metric value to a fixed-decimal string. */
const formatValue = (value: number): string => {
  if (!Number.isFinite(value)) return "0";
  if (Math.abs(value) >= 100) return value.toFixed(0);
  if (Math.abs(value) >= 10) return value.toFixed(1).replace(/\.0$/, "");
  return value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
};

/** Format a value with its unit suffix appended. */
const formatValueWithUnit = (value: number, suffix = unitSuffix): string => `${formatValue(value)}${suffix}`;

/** Round a number to a 'nice' value (1, 2, 5 × 10^n) for axis ticks. */
const niceNumber = (value: number, round: boolean): number => {
  if (value === 0) return 0;
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const fraction = Math.abs(value) / Math.pow(10, exponent);
  let niceFraction = 1;
  if (round) {
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
  } else {
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;
  }
  return niceFraction * Math.pow(10, exponent);
};

/** Generate evenly spaced axis tick values for a given range. */
const buildTicks = (min: number, max: number, tickCount: number) => {
  const range = niceNumber(max - min || 1, false);
  const step = niceNumber(range / Math.max(1, tickCount - 1), true) || 1;
  const graphMin = Math.floor(min / step) * step;
  const graphMax = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = graphMin; v <= graphMax + step / 2; v += step) {
    ticks.push(Number(v.toFixed(6)));
  }
  return { min: graphMin, max: graphMax, ticks, step };
};

/** Choose the best hour interval for X-axis ticks given the time span. */
const chooseHourStep = (hours: number): number => {
  const candidates = [1, 2, 3, 4, 6, 8, 12, 24];
  let best = candidates[0];
  let bestScore = Infinity;
  for (const step of candidates) {
    const ticks = Math.floor(hours / step) + 1;
    const score = Math.abs(ticks - 5);
    if (score < bestScore) {
      bestScore = score;
      best = step;
    }
  }
  return best;
};

/**
 * Build a shared timeline for stacked charts. We take the union of timestamps
 * across all left-axis series, then downsample to a reasonable size.
 */
const buildTimeline = (entries: Series[], maxPoints = 400) => {
  const allTs = Array.from(
    new Set(entries.flatMap((entry) => entry.points.map((p) => p.ts)))
  ).sort((a, b) => a - b);

  if (allTs.length <= maxPoints) return allTs;
  const step = Math.ceil(allTs.length / maxPoints);
  const sampled: number[] = [];
  for (let i = 0; i < allTs.length; i += step) sampled.push(allTs[i]);
  if (sampled[sampled.length - 1] !== allTs[allTs.length - 1]) {
    sampled.push(allTs[allTs.length - 1]);
  }
  return sampled;
};

/**
 * Interpolate a series value at a given timestamp using linear interpolation.
 * Outside the series range we return 0 to avoid inflating stacked areas.
 */
const interpolateValue = (points: Point[], ts: number) => {
  if (!points.length) return 0;
  if (ts < points[0].ts || ts > points[points.length - 1].ts) return 0;

  // Binary search for the right-hand point.
  let left = 0;
  let right = points.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (points[mid].ts === ts) return points[mid].value;
    if (points[mid].ts < ts) left = mid + 1;
    else right = mid - 1;
  }

  const idx = Math.max(1, left);
  const prev = points[idx - 1];
  const next = points[idx];
  if (!prev || !next) return 0;

  const ratio = (ts - prev.ts) / (next.ts - prev.ts || 1);
  return prev.value + (next.value - prev.value) * ratio;
};

type StackData = {
  timeline: number[];
  valuesBySeries: number[][];
  totals: number[];
};

/**
 * Build stacked chart data for the left-axis series.
 * Returns a shared timeline, per-series interpolated values,
 * and total values per timestamp (optionally normalized).
 */
const buildStackData = (entries: Series[], normalized: boolean): StackData => {
  const timeline = buildTimeline(entries);
  if (!timeline.length) return { timeline: [], valuesBySeries: [], totals: [] };

  const valuesBySeries = entries.map((entry) =>
    timeline.map((ts) => interpolateValue(entry.points, ts))
  );

  const totals = timeline.map((_, idx) =>
    valuesBySeries.reduce((sum, seriesValues) => sum + (seriesValues[idx] || 0), 0)
  );

  if (normalized) {
    for (let i = 0; i < timeline.length; i += 1) {
      const total = totals[i] || 1;
      for (let s = 0; s < valuesBySeries.length; s += 1) {
        valuesBySeries[s][i] = (valuesBySeries[s][i] / total) * 100;
      }
      totals[i] = 100;
    }
  }

  return { timeline, valuesBySeries, totals };
};

const now = Date.now();
const startTs = now - targetHours * 3600 * 1000;
const endTs = now;

const width = 680;
const height = 240;
const padding = { left: 48, right: hasRightAxis ? 48 : 16, top: 28, bottom: 42 };
const chartWidth = width - padding.left - padding.right;
const chartHeight = height - padding.top - padding.bottom;

const stackData = mode === "stacked" && leftSeries.length
  ? buildStackData(leftSeries, stackedPercent)
  : null;

const leftValues = leftSeries.flatMap((entry) => entry.points.map((p) => p.value));
const rightValues = rightSeries.flatMap((entry) => entry.points.map((p) => p.value));

const stackMax = stackData?.totals.length ? Math.max(...stackData.totals) : 0;
const leftMin = stackData
  ? 0
  : leftValues.length
    ? Math.min(0, ...leftValues)
    : Math.min(0, minValue);
const leftMax = stackData
  ? stackedPercent
    ? 100
    : Math.max(1, stackMax)
  : leftValues.length
    ? Math.max(1, ...leftValues)
    : Math.max(1, maxValue);

const rightMin = rightValues.length ? Math.min(0, ...rightValues) : 0;
const rightMax = rightValues.length ? Math.max(1, ...rightValues) : 1;

const leftTicks = buildTicks(leftMin, leftMax, 5);
const rightTicks = hasRightAxis ? buildTicks(rightMin, rightMax, 5) : null;

const leftRange = leftTicks.max - leftTicks.min || 1;
const rightRange = rightTicks ? rightTicks.max - rightTicks.min || 1 : 1;

const scaleX = (ts: number) =>
  padding.left + ((ts - startTs) / (endTs - startTs)) * chartWidth;
const scaleLeftY = (value: number) =>
  padding.top + ((leftTicks.max - value) / leftRange) * chartHeight;
const scaleRightY = (value: number) =>
  padding.top + ((rightTicks?.max ?? 1) - value) / rightRange * chartHeight;

const xStepHours = chooseHourStep(targetHours);
const xStepMs = xStepHours * 3600 * 1000;
const firstTick = Math.ceil(startTs / xStepMs) * xStepMs;
const xTicks: number[] = [];
for (let t = firstTick; t <= endTs + 1; t += xStepMs) {
  xTicks.push(t);
}

const linePaths = series.map((entry, idx) => {
  const path = entry.points
    .map((p, pointIdx) => {
      const y = entry.axis === "right" ? scaleRightY(p.value) : scaleLeftY(p.value);
      return `${pointIdx === 0 ? "M" : "L"}${scaleX(p.ts).toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return { idx, axis: entry.axis, path };
});

// In stacked mode we keep line strokes only for right-axis series.
const linePathsToRender = mode === "stacked"
  ? linePaths.filter((entry) => entry.axis === "right")
  : linePaths;

// Area paths for overlapping mode (each series has its own fill).
const areaPaths = mode === "area"
  ? series.map((entry, idx) => {
      const scaleY = entry.axis === "right" ? scaleRightY : scaleLeftY;
      const baseY = scaleY(entry.axis === "right" ? rightTicks?.min ?? 0 : leftTicks.min);
      const path = entry.points
        .map((p, pointIdx) => `${pointIdx === 0 ? "M" : "L"}${scaleX(p.ts).toFixed(1)} ${scaleY(p.value).toFixed(1)}`)
        .join(" ");

      const lastPoint = entry.points[entry.points.length - 1];
      const firstPoint = entry.points[0];
      const lastX = scaleX(lastPoint.ts);
      const firstX = scaleX(firstPoint.ts);
      return {
        idx,
        path: `${path} L ${lastX.toFixed(1)} ${baseY.toFixed(1)} L ${firstX.toFixed(1)} ${baseY.toFixed(1)} Z`,
      };
    })
  : [];

// Stacked area paths (left axis only). Right-axis series stay as lines.
const stackedAreas = mode === "stacked"
  ? (() => {
      if (!stackData || !stackData.timeline.length) {
        return [] as Array<{ idx: number; path: string }>;
      }

      const { timeline, valuesBySeries } = stackData;
      const paths: Array<{ idx: number; path: string }> = [];
      const baseline = new Array(timeline.length).fill(0);

      leftSeries.forEach((entry, seriesIdx) => {
        const seriesValues = valuesBySeries[seriesIdx] || [];
        const top = seriesValues.map((value, i) => value + baseline[i]);

        const upper = timeline
          .map((ts, i) => `L${scaleX(ts).toFixed(1)} ${scaleLeftY(top[i]).toFixed(1)}`)
          .join(" ");
        const lower = timeline
          .slice()
          .reverse()
          .map((ts, i) => {
            const idx = timeline.length - 1 - i;
            return `L${scaleX(ts).toFixed(1)} ${scaleLeftY(baseline[idx]).toFixed(1)}`;
          })
          .join(" ");

        const start = `M${scaleX(timeline[0]).toFixed(1)} ${scaleLeftY(top[0]).toFixed(1)}`;
        paths.push({ idx: seriesIdx, path: `${start} ${upper} ${lower} Z` });

        // Update baseline for the next series in the stack.
        for (let i = 0; i < baseline.length; i += 1) baseline[i] = top[i];
      });

      return paths;
    })()
  : [];

const title = `${seriesLabel} • ${series.length} series • last ${targetHours}h`;
const timeLabel = (ts: number) =>
  new Date(ts).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

const yGrid = leftTicks.ticks
  .map((value) => {
    const y = scaleLeftY(value);
    return `<line class="grid" x1="${padding.left}" y1="${y.toFixed(1)}" x2="${width - padding.right}" y2="${y.toFixed(1)}" />`;
  })
  .join("\n  ");

const yTicksMarks = leftTicks.ticks
  .map((value) => {
    const y = scaleLeftY(value);
    return `<line class="tick" x1="${(padding.left - 4).toFixed(1)}" y1="${y.toFixed(1)}" x2="${padding.left.toFixed(1)}" y2="${y.toFixed(1)}" />`;
  })
  .join("\n  ");

const leftLabelSuffix = stackedPercent ? "%" : unitSuffix;

const yLabels = leftTicks.ticks
  .map((value) => {
    const y = scaleLeftY(value);
    return `<text class="label" x="${padding.left - 6}" y="${(y + 4).toFixed(1)}" text-anchor="end">${formatValueWithUnit(
      value,
      leftLabelSuffix
    )}</text>`;
  })
  .join("\n  ");

const yAxisLabel = stackedPercent ? `${seriesLabel} (%)` : unit ? `${seriesLabel} (${unit})` : seriesLabel;
const yAxisLabelX = 14;
const yAxisLabelY = padding.top + chartHeight / 2;
const yAxisLabelText = `<text class="axis-label" x="${yAxisLabelX}" y="${yAxisLabelY.toFixed(1)}" text-anchor="middle" transform="rotate(-90 ${yAxisLabelX} ${yAxisLabelY.toFixed(
  1
)})">${yAxisLabel}</text>`;

const rightAxisLabel = hasRightAxis
  ? rightAxisUnitsArg
    ? `${rightAxisUnitsArg}`
    : (() => {
        const metric = rightSeries[0]?.metric || "";
        const unit = inferUnit(metric);
        return unit ? `${unit}` : "";
      })()
  : "";

const rightAxisLabelText = hasRightAxis
  ? (() => {
      const axisX = width - 12;
      const axisY = padding.top + chartHeight / 2;
      const labelText = rightAxisLabel ? rightAxisLabel : "";
      return labelText
        ? `<text class="axis-label" x="${axisX}" y="${axisY.toFixed(1)}" text-anchor="middle" transform="rotate(90 ${axisX} ${axisY.toFixed(
            1
          )})">${labelText}</text>`
        : "";
    })()
  : "";

const rightTicksMarks = hasRightAxis && rightTicks
  ? rightTicks.ticks
      .map((value) => {
        const y = scaleRightY(value);
        const x = width - padding.right;
        return `<line class="tick" x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + 4).toFixed(1)}" y2="${y.toFixed(1)}" />`;
      })
      .join("\n  ")
  : "";

const rightLabels = hasRightAxis && rightTicks
  ? rightTicks.ticks
      .map((value) => {
        const y = scaleRightY(value);
        const x = width - padding.right + 6;
        return `<text class="label" x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}" text-anchor="start">${formatValueWithUnit(
          value,
          rightAxisUnitsArg ? ` ${rightAxisUnitsArg}` : ""
        )}</text>`;
      })
      .join("\n  ")
  : "";

const xGrid = xTicks
  .map((ts) => {
    const x = scaleX(ts);
    return `<line class="grid" x1="${x.toFixed(1)}" y1="${padding.top}" x2="${x.toFixed(1)}" y2="${padding.top + chartHeight}" />`;
  })
  .join("\n  ");

const xTicksMarks = xTicks
  .map((ts) => {
    const x = scaleX(ts);
    return `<line class="tick" x1="${x.toFixed(1)}" y1="${(padding.top + chartHeight).toFixed(1)}" x2="${x.toFixed(1)}" y2="${(padding.top + chartHeight + 4).toFixed(1)}" />`;
  })
  .join("\n  ");

const xLabels = xTicks
  .map((ts) => {
    const x = scaleX(ts);
    return `<text class="label" x="${x.toFixed(1)}" y="${height - 16}" text-anchor="middle">${timeLabel(ts)}</text>`;
  })
  .join("\n  ");

const palette = ["#1d9bf0", "#f97316", "#22c55e", "#a855f7", "#eab308", "#f43f5e"];
const darkPalette = ["#1d9bf0", "#fb923c", "#4ade80", "#c084fc", "#facc15", "#fb7185"];

const legendItems = series
  .map((entry, idx) => {
    const legendX = width - padding.right - 160;
    const legendY = 18 + idx * 14;
    const axisTag = entry.axis === "right" ? " (R)" : "";
    return `<g class="legend" transform="translate(${legendX}, ${legendY})">
      <rect width="10" height="3" y="-8" fill="var(--line-${idx})" />
      <text class="legend-label" x="14" y="-4">${entry.displayName}${axisTag}</text>
    </g>`;
  })
  .join("\n  ");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${title}">
  <style>
    svg { --text: #0f1419; --grid: #e5e7eb; --tick: #94a3b8; --muted: #536471; }
    ${palette.map((color, idx) => `svg { --line-${idx}: ${color}; }`).join("\n    ")}
    @media (prefers-color-scheme: dark) {
      svg { --text: #e7e9ea; --grid: #2a2d32; --tick: #5f666d; --muted: #71767b; }
      ${darkPalette.map((color, idx) => `svg { --line-${idx}: ${color}; }`).join("\n      ")}
    }
    .title { font: 600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; fill: var(--text); }
    .label { font: 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; fill: var(--muted); }
    .axis-label { font: 600 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; fill: var(--muted); letter-spacing: 0.02em; }
    .legend-label { font: 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; fill: var(--muted); }
    .axis { stroke: var(--grid); stroke-width: 1.2; }
    .grid { stroke: var(--grid); stroke-width: 1.2; stroke-dasharray: 4 4; opacity: 0.6; vector-effect: non-scaling-stroke; }
    .tick { stroke: var(--tick); stroke-width: 1.4; vector-effect: non-scaling-stroke; }
    .line { fill: none; stroke-width: 2; }
  </style>
  <text class="title" x="${padding.left}" y="18">${title}</text>
  ${legendItems}
  ${mode === "area" ? areaPaths.map((entry) => `<path class="area" fill="var(--line-${entry.idx})" fill-opacity="0.2" d="${entry.path}" />`).join("\n  ") : ""}
  ${mode === "stacked" ? stackedAreas.map((entry) => `<path class="area" fill="var(--line-${entry.idx})" fill-opacity="0.32" d="${entry.path}" />`).join("\n  ") : ""}
  ${yGrid}
  ${xGrid}
  ${linePathsToRender.map((entry) => `<path class="line" stroke="var(--line-${entry.idx})" d="${entry.path}" />`).join("\n  ")}
  <line class="axis" x1="${padding.left}" y1="${padding.top + chartHeight}" x2="${width - padding.right}" y2="${padding.top + chartHeight}" />
  <line class="axis" x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${padding.top + chartHeight}" />
  ${hasRightAxis ? `<line class="axis" x1="${width - padding.right}" y1="${padding.top}" x2="${width - padding.right}" y2="${padding.top + chartHeight}" />` : ""}
  ${yAxisLabelText}
  ${rightAxisLabelText}
  ${yTicksMarks}
  ${rightTicksMarks}
  ${xTicksMarks}
  ${yLabels}
  ${rightLabels}
  ${xLabels}
</svg>`;

if (outputSvg) {
  mkdirSync(dirname(outputSvg), { recursive: true });
  writeFileSync(outputSvg, svg);
}

const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

const resampleLabel = resamplePeriod ? ` (avg @ ${resamplePeriod})` : "";
const summaryLines = [
  `![power-chart](${dataUrl})`,
  "",
  `${seriesLabel} for ${series.length} series — last ${targetHours}h${resampleLabel}`,
  ...seriesStats.map((entry) =>
    `• ${entry.displayName}${entry.axis === "right" ? " (R)" : ""}: Avg ${formatValueWithUnit(
      entry.avgValue,
      entry.axis === "right" && rightAxisUnitsArg ? ` ${rightAxisUnitsArg}` : unitSuffix
    )} • Min ${formatValueWithUnit(
      entry.minValue,
      entry.axis === "right" && rightAxisUnitsArg ? ` ${rightAxisUnitsArg}` : unitSuffix
    )} • Max ${formatValueWithUnit(
      entry.maxValue,
      entry.axis === "right" && rightAxisUnitsArg ? ` ${rightAxisUnitsArg}` : unitSuffix
    )} • Last ${formatValueWithUnit(
      entry.lastValue,
      entry.axis === "right" && rightAxisUnitsArg ? ` ${rightAxisUnitsArg}` : unitSuffix
    )}`
  ),
];

const message = summaryLines.join("\n");

if (ipcEnabled) {
  mkdirSync(messagesDir, { recursive: true });
  const outPath = join(messagesDir, `msg_${Date.now()}_graphite_power.json`);
  const payloadOut = { type: "message", chatJid, text: message, noNudge: !nudgeEnabled };
  writeFileSync(outPath, JSON.stringify(payloadOut, null, 2));
  process.stdout.write(outPath);
} else {
  process.stdout.write(message);
}

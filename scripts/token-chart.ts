#!/usr/bin/env bun
import { readdirSync, statSync, readFileSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const args = process.argv.slice(2);
const daysArgIndex = args.indexOf("--days");
const days = daysArgIndex >= 0 ? parseInt(args[daysArgIndex + 1], 10) : 7;
const targetDays = Number.isFinite(days) && days > 0 ? days : 7;

const sessionsArgIndex = args.indexOf("--sessions-dir");
const sessionsCandidate = sessionsArgIndex >= 0 ? args[sessionsArgIndex + 1] : undefined;
const sessionsDir = sessionsCandidate && !sessionsCandidate.startsWith("--")
  ? sessionsCandidate
  : "/workspace/.piclaw/data/sessions";

const ipcEnabled = args.includes("--ipc");
const chatJidIndex = args.indexOf("--chat-jid");
const chatJidCandidate = chatJidIndex >= 0 ? args[chatJidIndex + 1] : undefined;
const chatJid = chatJidCandidate && !chatJidCandidate.startsWith("--") ? chatJidCandidate : "web:default";
const dataDir = process.env.PICLAW_DATA || "/workspace/.piclaw/data";
const messagesDir = join(dataDir, "ipc", "messages");

const now = new Date();
const start = new Date(now);
start.setHours(0, 0, 0, 0);
start.setDate(start.getDate() - (targetDays - 1));

const dayKeys: string[] = [];
const dayDates: Date[] = [];
const totals = new Map<string, number>();
const inputs = new Map<string, number>();
const outputs = new Map<string, number>();
const cacheReads = new Map<string, number>();
const cacheWrites = new Map<string, number>();
const costs = new Map<string, number>();

const pad = (n: number) => n.toString().padStart(2, "0");
const formatKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

for (let i = 0; i < targetDays; i += 1) {
  const d = new Date(start);
  d.setDate(start.getDate() + i);
  const key = formatKey(d);
  dayKeys.push(key);
  dayDates.push(d);
  totals.set(key, 0);
  inputs.set(key, 0);
  outputs.set(key, 0);
  cacheReads.set(key, 0);
  cacheWrites.set(key, 0);
  costs.set(key, 0);
}

const inRange = (d: Date) => d >= start && d <= now;

function addUsage(record: any) {
  if (!record || record.type !== "message") return;
  const msg = record.message;
  if (!msg || msg.role !== "assistant" || !msg.usage) return;

  let ts: Date | null = null;
  if (record.timestamp) {
    ts = typeof record.timestamp === "string" || typeof record.timestamp === "number" ? new Date(record.timestamp) : null;
  }
  if (!ts || Number.isNaN(ts.getTime())) {
    if (msg.timestamp) {
      ts = new Date(msg.timestamp);
    }
  }
  if (!ts || Number.isNaN(ts.getTime()) || !inRange(ts)) return;

  const key = formatKey(ts);
  if (!totals.has(key)) return;

  const usage = msg.usage || {};
  const input = typeof usage.input === "number" ? usage.input : 0;
  const output = typeof usage.output === "number" ? usage.output : 0;
  const cacheRead = typeof usage.cacheRead === "number" ? usage.cacheRead : 0;
  const cacheWrite = typeof usage.cacheWrite === "number" ? usage.cacheWrite : 0;
  const totalTokens =
    (typeof usage.totalTokens === "number" && usage.totalTokens) ||
    (typeof usage.total === "number" && usage.total) ||
    input + output + cacheRead + cacheWrite;

  const costObj = usage.cost || {};
  const costTotal =
    (typeof costObj.total === "number" && costObj.total) ||
    (typeof costObj.input === "number" ? costObj.input : 0) +
      (typeof costObj.output === "number" ? costObj.output : 0) +
      (typeof costObj.cacheRead === "number" ? costObj.cacheRead : 0) +
      (typeof costObj.cacheWrite === "number" ? costObj.cacheWrite : 0);

  totals.set(key, (totals.get(key) || 0) + totalTokens);
  inputs.set(key, (inputs.get(key) || 0) + input);
  outputs.set(key, (outputs.get(key) || 0) + output);
  cacheReads.set(key, (cacheReads.get(key) || 0) + cacheRead);
  cacheWrites.set(key, (cacheWrites.get(key) || 0) + cacheWrite);
  costs.set(key, (costs.get(key) || 0) + costTotal);
}

function scanFile(filePath: string) {
  const content = readFileSync(filePath, "utf8");
  const lines = content.split(/\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const record = JSON.parse(trimmed);
      addUsage(record);
    } catch {
      // ignore malformed line
    }
  }
}

function walk(dir: string) {
  let entries: string[] = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    let stat;
    try {
      stat = statSync(full);
    } catch {
      continue;
    }
    if (stat.isDirectory()) {
      walk(full);
    } else if (stat.isFile() && entry.endsWith(".jsonl")) {
      scanFile(full);
    }
  }
}

walk(sessionsDir);

const values = dayKeys.map((key) => totals.get(key) || 0);
const cachedValues = dayKeys.map((key) => (cacheReads.get(key) || 0) + (cacheWrites.get(key) || 0));
const uncachedValues = values.map((total, idx) => Math.max(total - cachedValues[idx], 0));
const maxValue = Math.max(1, ...values);
const sumValue = values.reduce((a, b) => a + b, 0);
const sumInput = dayKeys.reduce((acc, key) => acc + (inputs.get(key) || 0), 0);
const sumOutput = dayKeys.reduce((acc, key) => acc + (outputs.get(key) || 0), 0);
const sumCacheRead = dayKeys.reduce((acc, key) => acc + (cacheReads.get(key) || 0), 0);
const sumCacheWrite = dayKeys.reduce((acc, key) => acc + (cacheWrites.get(key) || 0), 0);
const sumCost = dayKeys.reduce((acc, key) => acc + (costs.get(key) || 0), 0);
const cachedTotal = sumCacheRead + sumCacheWrite;
const cachedPct = sumValue > 0 ? Math.round((cachedTotal / sumValue) * 1000) / 10 : 0;

const width = 680;
const height = 240;
const padding = { left: 48, right: 16, top: 28, bottom: 42 };
const chartWidth = width - padding.left - padding.right;
const chartHeight = height - padding.top - padding.bottom;
const step = chartWidth / targetDays;
const gap = Math.min(12, step * 0.2);
const barWidth = step - gap;

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const label = (key: string) => key.slice(5);
const labelLong = (d: Date) => `${dayNames[d.getDay()]} ${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const bars = values.map((value, i) => {
  const x = padding.left + i * step + gap / 2;
  const cached = cachedValues[i] || 0;
  const uncached = uncachedValues[i] || 0;
  const cachedHeight = Math.round((cached / maxValue) * chartHeight);
  const uncachedHeight = Math.round((uncached / maxValue) * chartHeight);
  const cachedY = padding.top + (chartHeight - cachedHeight);
  const uncachedY = padding.top + (chartHeight - cachedHeight - uncachedHeight);
  const rects = [] as string[];
  if (cachedHeight > 0) {
    rects.push(`<rect class="bar bar-cached" x="${x.toFixed(1)}" y="${cachedY.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${cachedHeight.toFixed(1)}" rx="4" />`);
  }
  if (uncachedHeight > 0) {
    rects.push(`<rect class="bar bar-uncached" x="${x.toFixed(1)}" y="${uncachedY.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${uncachedHeight.toFixed(1)}" rx="4" />`);
  }
  return rects.join("\n  ");
});

const labels = dayKeys.map((key, i) => {
  const x = padding.left + i * step + step / 2;
  const y = height - 16;
  return `<text class="label" x="${x.toFixed(1)}" y="${y}" text-anchor="middle">${label(key)}</text>`;
});

const yTop = padding.top + 4;
const yBottom = padding.top + chartHeight;
const axis = `<line class="axis" x1="${padding.left}" y1="${yBottom}" x2="${width - padding.right}" y2="${yBottom}" />`;
const maxLabel = `<text class="label" x="${padding.left}" y="${yTop}" text-anchor="start">${maxValue.toLocaleString()}</text>`;
const zeroLabel = `<text class="label" x="${padding.left}" y="${yBottom + 14}" text-anchor="start">0</text>`;

const title = `Tokens last ${targetDays} days • total ${sumValue.toLocaleString()}`;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${title}">
  <style>
    svg { --text: #0f1419; --grid: #e8ebed; --bar-uncached: #1d9bf0; --bar-cached: #8ac5f5; --muted: #536471; }
    @media (prefers-color-scheme: dark) {
      svg { --text: #e7e9ea; --grid: #2f3336; --bar-uncached: #1d9bf0; --bar-cached: #4f9cd6; --muted: #71767b; }
    }
    .title { font: 600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; fill: var(--text); }
    .label { font: 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; fill: var(--muted); }
    .axis { stroke: var(--grid); stroke-width: 1; }
    .bar-uncached { fill: var(--bar-uncached); }
    .bar-cached { fill: var(--bar-cached); }
  </style>
  <text class="title" x="${padding.left}" y="18">${title}</text>
  <rect x="${width - padding.right - 140}" y="6" width="10" height="10" fill="var(--bar-uncached)" rx="2" />
  <text class="label" x="${width - padding.right - 124}" y="15">uncached</text>
  <rect x="${width - padding.right - 70}" y="6" width="10" height="10" fill="var(--bar-cached)" rx="2" />
  <text class="label" x="${width - padding.right - 54}" y="15">cached</text>
  ${axis}
  ${maxLabel}
  ${zeroLabel}
  ${bars.join("\n  ")}
  ${labels.join("\n  ")}
</svg>`;

const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

const summaryLines = [
  `![token-chart](${dataUrl})`,
  "",
  `Token usage (all chats) — last ${targetDays} days, total ${sumValue.toLocaleString()}`,
  `Input ${sumInput.toLocaleString()} • Output ${sumOutput.toLocaleString()} • Cache read ${sumCacheRead.toLocaleString()} • Cache write ${sumCacheWrite.toLocaleString()} (${cachedPct}% cached)`,
  ...dayDates.map((d, i) => {
    const key = dayKeys[i];
    const total = values[i];
    const cached = (cacheReads.get(key) || 0) + (cacheWrites.get(key) || 0);
    const uncached = Math.max(total - cached, 0);
    return `• ${labelLong(d)}: ${total.toLocaleString()} tokens (cached ${cached.toLocaleString()}, uncached ${uncached.toLocaleString()})`;
  }),
];

const message = summaryLines.join("\n");

if (ipcEnabled) {
  mkdirSync(messagesDir, { recursive: true });
  const outPath = join(messagesDir, `msg_${Date.now()}_tokenchart.json`);
  writeFileSync(outPath, JSON.stringify({ type: "message", chatJid, text: message }, null, 2));
  process.stdout.write(outPath);
} else {
  process.stdout.write(message);
}

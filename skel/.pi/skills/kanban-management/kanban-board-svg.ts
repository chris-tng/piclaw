#!/usr/bin/env bun
/**
 * kanban-board-svg.ts — Generate a kanban board SVG from workspace tickets.
 *
 * Reads tickets from /workspace/kanban/ and produces a themed SVG with
 * progress bars, blocker arrows, and styled cards.
 *
 * Usage:
 *   bun run kanban-board-svg.ts [--out path.svg] [--theme dark|light|css|auto] [--post]
 *
 * Modes:
 *   --theme auto   Time-based default (dark after 18:00 or before 08:00, else light)
 *   --theme dark   Bake dark palette
 *   --theme light  Bake light palette
 *   --theme css    Use CSS custom properties (inline embedding only)
 *   --post         Write an IPC message with inline SVG media attachment
 *   --chat         Override chat JID (default: web:default)
 *   --message      Custom message text (default includes timestamp)
 */

import { readdirSync, readFileSync, existsSync, writeFileSync, mkdirSync, statSync } from "fs";
import { join, basename } from "path";

// ── Config ──────────────────────────────────────────────────────

const args = process.argv.slice(2);
const getArgValue = (flag: string): string | undefined => {
  const idx = args.indexOf(flag);
  if (idx < 0 || idx + 1 >= args.length) return undefined;
  return args[idx + 1];
};

const KANBAN_DIR = process.env.KANBAN_DIR || "/workspace/kanban";
const OUTPUT = getArgValue("--out") || "/workspace/tmp/kanban-board.svg";
const THEME_ARG_RAW = (getArgValue("--theme") || "auto").trim().toLowerCase();
const POST_TO_IPC = args.includes("--post");
const CHAT_JID = getArgValue("--chat") || process.env.PICLAW_CHAT_JID || "web:default";
const MESSAGE_TEXT = getArgValue("--message") || `Kanban board as of ${new Date().toISOString().slice(0, 10)}`;
/** Color palettes. */
const PALETTES: Record<string, Record<string, string>> = {
  dark: {
    // Keep board/lanes neutral (no saturation) so translucency blends with any theme.
    bgBoard:      "#262626",
    bgLane:       "#3a3a3a",
    bgCard:       "#0f172a",
    bgCardDone:   "#374151",
    textPrimary:  "#e7e9ea",
    textSecondary:"#94a3b8",
    textMuted:    "#6b7280",
    borderColor:  "#334155",
    barTrack:     "#334155",
  },
  light: {
    // Keep board/lanes neutral (no saturation) so translucency blends with any theme.
    bgBoard:      "#e2e2e2",
    bgLane:       "#f0f0f0",
    bgCard:       "#ffffff",
    bgCardDone:   "#f3f4f6",
    textPrimary:  "#0f172a",
    textSecondary:"#475569",
    textMuted:    "#94a3b8",
    borderColor:  "#cbd5e1",
    barTrack:     "#d1d5db",
  },
  css: {
    // Force neutral grays for board/lane surfaces even in CSS mode.
    bgBoard:      "#8a8a8a",
    bgLane:       "#9a9a9a",
    bgCard:       "var(--bg-primary, #0f172a)",
    bgCardDone:   "var(--bg-hover, #374151)",
    textPrimary:  "var(--text-primary, #e7e9ea)",
    textSecondary:"var(--text-secondary, #94a3b8)",
    textMuted:    "var(--text-secondary, #6b7280)",
    borderColor:  "var(--border-color, #334155)",
    barTrack:     "var(--border-color, #334155)",
  },
};

function getAutoThemeByTime(now = new Date()): "dark" | "light" {
  const hour = now.getHours();
  return hour >= 18 || hour < 8 ? "dark" : "light";
}

const AUTO_THEME = getAutoThemeByTime();
const THEME_ARG =
  THEME_ARG_RAW === "auto"
    ? AUTO_THEME
    : (PALETTES[THEME_ARG_RAW] ? THEME_ARG_RAW : AUTO_THEME);

if (THEME_ARG_RAW !== "auto" && !PALETTES[THEME_ARG_RAW]) {
  console.warn(`[kanban-board-svg] Unknown --theme '${THEME_ARG_RAW}', falling back to '${THEME_ARG}'.`);
}

const SURFACE_OPACITY: Record<string, { board: string; lane: string }> = {
  // Deliberately lower opacities so theme/background can bleed through.
  dark: { board: "0.56", lane: "0.38" },
  light: { board: "0.52", lane: "0.34" },
  css: { board: "0.54", lane: "0.36" },
};

const P = PALETTES[THEME_ARG] || PALETTES.dark;
const OPACITY = SURFACE_OPACITY[THEME_ARG] || SURFACE_OPACITY.dark;
const DONE_LANE_RENDER_LIMIT = 10;

// ── Ticket model ────────────────────────────────────────────────

interface Ticket {
  id: string;
  title: string;
  priority: string;
  status: string;
  tags: string[];
  file: string;
  created?: string;
  updated?: string;
  completed?: string;
  sortTimestamp: number;
  /** Progress percentage (0-100), parsed from ticket body. */
  progress?: number;
  /** Short status note for doing/blocked cards. */
  statusNote?: string;
  /** What this ticket is blocked on. */
  blockedOn?: string;
}

const LANES = [
  { dir: "00-inbox",   label: "📥 Inbox",   key: "inbox" },
  { dir: "10-next",    label: "⏭️ Next",    key: "next" },
  { dir: "20-doing",   label: "🔨 Doing",   key: "doing" },
  { dir: "30-blocked", label: "🚫 Blocked", key: "blocked" },
  { dir: "40-review",  label: "👀 Review",  key: "review" },
  { dir: "50-done",    label: "✅ Done",    key: "done" },
];

const PRIORITY_COLORS: Record<string, string> = {
  critical: "#ef4444",
  high:     "#ef4444",
  medium:   "#f59e0b",
  low:      "#22d3ee",
};

// ── Parse tickets ───────────────────────────────────────────────

function parseDateValue(value: string): number {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseTicket(filepath: string): Ticket | null {
  const raw = readFileSync(filepath, "utf-8");
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return null;
  const fm = fmMatch[1];

  const get = (key: string) => {
    const m = fm.match(new RegExp(`^${key}:\\s*(.+)`, "m"));
    return m ? m[1].trim() : "";
  };

  const tags: string[] = [];
  const tagBlock = fm.match(/tags:\n((?:\s+-\s+.+\n?)*)/);
  if (tagBlock) {
    for (const line of tagBlock[1].split("\n")) {
      const t = line.match(/^\s+-\s+(.+)/);
      if (t) tags.push(t[1].trim());
    }
  }

  // Parse progress: count checked vs total checkboxes in acceptance criteria
  let progress: number | undefined;
  const checks = raw.match(/^- \[[ x]\]/gm);
  if (checks && checks.length > 0) {
    const done = checks.filter((c) => c.includes("[x]")).length;
    progress = Math.round((done / checks.length) * 100);
  }

  // Extract blocked-on note
  let blockedOn: string | undefined;
  const blockedMatch = raw.match(/⛔\s*blocked\s*on[:\s]*(.+)/i) ||
    raw.match(/blocked\s*on[:\s]*`?([^`\n]+)`?/i);
  if (blockedMatch) blockedOn = blockedMatch[1].trim();

  // Extract a short status note from the latest update
  let statusNote: string | undefined;
  const updateMatch = raw.match(/### \d{4}-\d{2}-\d{2}\n-\s*(.+)/);
  if (updateMatch) statusNote = updateMatch[1].trim();

  const created = get("created");
  const updated = get("updated");
  const completed = get("completed");
  const fileMtime = statSync(filepath).mtimeMs;

  return {
    id: get("id"),
    title: get("title") || basename(filepath, ".md"),
    priority: get("priority") || "medium",
    status: get("status") || "inbox",
    tags,
    file: filepath,
    created,
    updated,
    completed,
    sortTimestamp: parseDateValue(completed) || parseDateValue(updated) || parseDateValue(created) || fileMtime,
    progress,
    statusNote,
    blockedOn,
  };
}

function loadLane(dir: string): Ticket[] {
  const fullPath = join(KANBAN_DIR, dir);
  if (!existsSync(fullPath)) return [];
  const files = readdirSync(fullPath).filter((f) => f.endsWith(".md"));
  const tickets: Ticket[] = [];
  for (const f of files) {
    const t = parseTicket(join(fullPath, f));
    if (t) tickets.push(t);
  }
  if (dir === "50-done") {
    tickets.sort((a, b) => {
      const byDate = b.sortTimestamp - a.sortTimestamp;
      if (byDate !== 0) return byDate;
      return a.title.localeCompare(b.title);
    });
    return tickets;
  }

  const order: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  tickets.sort((a, b) => (order[a.priority] ?? 9) - (order[b.priority] ?? 9));
  return tickets;
}

// ── SVG generation ──────────────────────────────────────────────

const LANE_W = 240;
const LANE_GAP = 14;
const CARD_W = LANE_W - 20;
const CARD_PAD = 10;
const HEADER_H = 44;
const MARGIN = 18;

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function wrapText(s: string, maxChars: number): string[] {
  if (s.length <= maxChars) return [s];
  // Break at last space before maxChars
  const idx = s.lastIndexOf(" ", maxChars);
  const breakAt = idx > maxChars * 0.4 ? idx : maxChars;
  const line1 = s.slice(0, breakAt);
  const line2 = s.slice(breakAt).trim();
  return [line1, line2.length > maxChars ? line2.slice(0, maxChars - 1) + "…" : line2];
}

function cardHeight(ticket: Ticket, laneKey: string): number {
  const lines = wrapText(ticket.title, 32);
  let h = 14 + lines.length * 14 + 16; // top pad + title lines + tag line
  if (laneKey === "doing" && ticket.progress !== undefined) h += 18; // progress bar
  if (laneKey === "blocked" && ticket.blockedOn) h += 0; // status note in tag area
  return Math.max(h, 52);
}

function renderCard(ticket: Ticket, x: number, y: number, laneKey: string, refNumber?: number): string {
  const pColor = PRIORITY_COLORS[ticket.priority] || "#94a3b8";
  const titleLines = wrapText(ticket.title, 32);
  const isDone = laneKey === "done";
  const isDoing = laneKey === "doing";
  const isBlocked = laneKey === "blocked";
  const h = cardHeight(ticket, laneKey);

  // Card stroke color
  let strokeColor = P.borderColor;
  let strokeWidth = "1";
  if (isDoing && ticket.progress === 100) {
    strokeColor = "#34d399";
    strokeWidth = "2";
  } else if (isDoing && ticket.progress !== undefined) {
    strokeColor = "#f59e0b";
    strokeWidth = "1.5";
  } else if (isBlocked) {
    strokeColor = "#fca5a5";
    strokeWidth = "1";
  }

  const bgFill = isDone ? P.bgCardDone : P.bgCard;
  const titleFill = isDone ? P.textMuted : P.textPrimary;
  const tagFill = isDone ? P.textMuted : P.textSecondary;

  let card = `
    <g transform="translate(${x},${y})">
      <rect width="${CARD_W}" height="${h}" rx="6"
            fill="${bgFill}" stroke="${strokeColor}" stroke-width="${strokeWidth}"${isDone ? ' opacity="0.7"' : ""}/>
      <circle cx="14" cy="16" r="4.5" fill="${pColor}"/>`;

  // Visible ticket number
  if (refNumber !== undefined) {
    card += `
      <g>
        <rect x="${CARD_W - 32}" y="8" width="24" height="14" rx="7" fill="${P.barTrack}"/>
        <text x="${CARD_W - 20}" y="18" font-size="9" font-weight="700" fill="${titleFill}" text-anchor="middle">${refNumber}</text>
      </g>`;
  }

  // Title (multi-line)
  titleLines.forEach((line, i) => {
    card += `
      <text x="26" y="${18 + i * 14}" font-size="11" font-weight="600" fill="${titleFill}">${escapeXml(line)}</text>`;
  });

  const tagY = 18 + titleLines.length * 14;

  // Tags or blocked-on note
  const tagText = isBlocked && ticket.blockedOn
    ? `⛔ ${ticket.blockedOn}`
    : ticket.tags.filter((t) => t !== "work-item" && t !== "kanban").slice(0, 3).join(" · ");
  if (tagText) {
    const truncTag = tagText.length > 38 ? tagText.slice(0, 37) + "…" : tagText;
    card += `
      <text x="14" y="${tagY}" font-size="9" fill="${tagFill}">${escapeXml(truncTag)}</text>`;
  }

  // Progress bar (doing lane only)
  if (isDoing && ticket.progress !== undefined) {
    const barY = tagY + 8;
    const barW = CARD_W - 56;
    const fillW = Math.round((ticket.progress / 100) * barW);
    const barColor = ticket.progress >= 100 ? "#34d399" : "#f59e0b";
    const label = ticket.progress >= 100 ? "✅ done" : `${ticket.progress}%`;
    card += `
      <rect x="14" y="${barY}" width="${barW}" height="5" rx="2.5" fill="${P.barTrack}"/>
      <rect x="14" y="${barY}" width="${fillW}" height="5" rx="2.5" fill="${barColor}"/>
      <text x="${14 + barW + 6}" y="${barY + 5}" font-size="9" font-weight="600" fill="${barColor}">${label}</text>`;
  }

  // Done checkmark
  if (isDone) {
    card += `
      <text x="${CARD_W - 14}" y="34" font-size="11" fill="#4ade80" text-anchor="end">✓</text>`;
  }

  card += `
    </g>`;
  return card;
}

function generate(): string {
  const lanes = LANES.map((lane) => {
    const allTickets = loadLane(lane.dir);
    const tickets = lane.key === "done"
      ? allTickets.slice(0, DONE_LANE_RENDER_LIMIT)
      : allTickets;
    return {
      ...lane,
      tickets,
      totalCount: allTickets.length,
    };
  });

  // Only show lanes with tickets (always show doing/next)
  const visibleLanes = lanes.filter(
    (l) => l.tickets.length > 0 || l.key === "doing" || l.key === "next"
  );

  const totalW = MARGIN * 2 + visibleLanes.length * LANE_W + (visibleLanes.length - 1) * LANE_GAP;

  // Calculate max lane height based on actual card heights
  let maxLaneContentH = 0;
  for (const lane of visibleLanes) {
    let h = 0;
    for (const t of lane.tickets) {
      h += cardHeight(t, lane.key) + 8;
    }
    if (h > maxLaneContentH) maxLaneContentH = h;
  }

  const LANE_BOTTOM_PAD = 12;
  const LEGEND_TOP_GAP = 12;
  const LEGEND_H = 18;
  const FOOTER_PAD = 2;

  const laneH = HEADER_H + maxLaneContentH + LANE_BOTTOM_PAD;
  const totalH = MARGIN + laneH + LEGEND_TOP_GAP + LEGEND_H + FOOTER_PAD;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" font-family="system-ui,-apple-system,sans-serif">
  <style>
    .col-header { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
    .count { font-size: 11px; fill: ${P.textMuted}; font-weight: 600; }
  </style>

  <!-- Board -->
  <rect width="${totalW}" height="${totalH}" rx="12" fill="${P.bgBoard}" fill-opacity="${OPACITY.board}"/>
`;

  // Track card positions for blocker arrows
  const cardPositions: Map<string, { x: number; y: number; w: number; h: number; laneIdx: number }> = new Map();
  let ticketNumber = 1;

  visibleLanes.forEach((lane, i) => {
    const lx = MARGIN + i * (LANE_W + LANE_GAP);

    svg += `
  <g transform="translate(${lx},${MARGIN})">
    <rect width="${LANE_W}" height="${laneH}" rx="8" fill="${P.bgLane}" fill-opacity="${OPACITY.lane}"/>
    <text x="${LANE_W / 2}" y="28" text-anchor="middle" class="col-header" fill="${P.textSecondary}">${escapeXml(lane.label)}</text>
    <text x="${LANE_W - 14}" y="28" text-anchor="end" class="count">${lane.totalCount > lane.tickets.length ? `${lane.tickets.length}/${lane.totalCount}` : lane.tickets.length}</text>`;

    let cy = HEADER_H;
    lane.tickets.forEach((ticket) => {
      const ch = cardHeight(ticket, lane.key);
      svg += renderCard(ticket, CARD_PAD, cy, lane.key, ticketNumber++);

      // Store absolute position for arrows
      cardPositions.set(ticket.id, {
        x: lx + CARD_PAD,
        y: MARGIN + cy,
        w: CARD_W,
        h: ch,
        laneIdx: i,
      });

      cy += ch + 8;
    });

    svg += `
  </g>`;
  });

  // ── Blocker arrows ──────────────────────────────────────────
  // Draw dashed red arrows from doing cards to blocked cards they unblock
  svg += `
  <defs>
    <marker id="ah" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#ef4444"/>
    </marker>
  </defs>`;

  for (const lane of visibleLanes) {
    if (lane.key !== "blocked") continue;
    for (const ticket of lane.tickets) {
      if (!ticket.blockedOn) continue;
      // Find the blocker card by fuzzy match on title/id
      const blockerKey = ticket.blockedOn.toLowerCase();
      let blockerPos: typeof cardPositions extends Map<string, infer V> ? V : never;
      for (const [id, pos] of cardPositions) {
        if (blockerKey.includes(id.toLowerCase()) || id.toLowerCase().includes(blockerKey.slice(0, 15))) {
          blockerPos = pos;
          break;
        }
      }
      const targetPos = cardPositions.get(ticket.id);
      if (!blockerPos || !targetPos) continue;

      const fromX = blockerPos.x + blockerPos.w;
      const fromY = blockerPos.y + blockerPos.h / 2;
      const toX = targetPos.x;
      const toY = targetPos.y + targetPos.h / 2;
      const midX = (fromX + toX) / 2;

      svg += `
  <path d="M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}"
        fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5 3"
        marker-end="url(#ah)" opacity="0.7"/>`;
    }
  }

  // Legend
  const ly = MARGIN + laneH + LEGEND_TOP_GAP;
  svg += `
  <g transform="translate(${MARGIN + 6},${ly})">
    <circle cx="4" cy="6" r="4" fill="#ef4444"/><text x="14" y="10" font-size="9.5" fill="${P.textSecondary}">high</text>
    <circle cx="56" cy="6" r="4" fill="#f59e0b"/><text x="66" y="10" font-size="9.5" fill="${P.textSecondary}">medium</text>
    <circle cx="118" cy="6" r="4" fill="#22d3ee"/><text x="128" y="10" font-size="9.5" fill="${P.textSecondary}">low</text>
    <line x1="176" y1="6" x2="206" y2="6" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5 3"/>
    <text x="212" y="10" font-size="9.5" fill="${P.textSecondary}">blocks</text>
    <rect x="252" y="-1" width="14" height="14" rx="3" fill="none" stroke="#34d399" stroke-width="2"/>
    <text x="272" y="10" font-size="9.5" fill="${P.textSecondary}">ready</text>
    <rect x="304" y="-1" width="14" height="14" rx="3" fill="none" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="324" y="10" font-size="9.5" fill="${P.textSecondary}">in progress</text>
  </g>`;

  svg += "\n</svg>\n";
  return svg;
}

function postBoardSvg(svgPath: string): void {
  const piclawData = process.env.PICLAW_DATA || "/workspace/.piclaw/data";
  const messagesDir = join(piclawData, "ipc", "messages");
  mkdirSync(messagesDir, { recursive: true });

  const msgPath = join(messagesDir, `kanban-board-${Date.now()}.json`);
  const payload = {
    type: "message",
    chatJid: CHAT_JID,
    text: MESSAGE_TEXT,
    media: [
      {
        path: svgPath,
        content_type: "image/svg+xml",
        filename: basename(svgPath),
        inline: true,
      },
    ],
  };

  writeFileSync(msgPath, `${JSON.stringify(payload, null, 2)}\n`, "utf-8");
}

// ── Main ────────────────────────────────────────────────────────

const svg = generate();
writeFileSync(OUTPUT, svg, "utf-8");
console.log(`✅ Kanban board SVG written to ${OUTPUT} (${(svg.length / 1024).toFixed(1)} KB)`);
console.log(`🎨 Theme: ${THEME_ARG}${THEME_ARG_RAW === "auto" ? " (auto by local time)" : " (from --theme)"}`);
console.log(`   ${LANES.map((l) => {
  const total = loadLane(l.dir).length;
  return l.key === "done"
    ? `${l.key}: ${Math.min(total, DONE_LANE_RENDER_LIMIT)} shown (${total} total)`
    : `${l.key}: ${total}`;
}).join(", ")}`);

if (POST_TO_IPC) {
  try {
    postBoardSvg(OUTPUT);
    console.log(`✅ IPC message queued: ${basename(OUTPUT)} attached as inline media`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[kanban-board-svg] Failed to queue IPC post: ${msg}`);
    process.exitCode = 1;
  }
}

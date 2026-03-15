/**
 * ui/adaptive-card-renderer.ts – Render Adaptive Card JSON payloads in the web timeline.
 *
 * Lazy-loads the vendored adaptivecards SDK on first use, builds a HostConfig
 * from the current theme, and renders cards into container elements.
 *
 * Consumers:
 *   - web/src/components/post.ts calls renderAdaptiveCard() when a post
 *     contains an adaptive_card content block.
 */

import { buildHostConfig } from "./adaptive-card-host-config.js";

/** Shape of an adaptive_card content block in a message's content_blocks. */
export interface AdaptiveCardBlock {
  type: "adaptive_card";
  card_id: string;
  schema_version: string;
  state: "active" | "completed" | "cancelled" | "failed";
  payload: Record<string, unknown>;
  fallback_text?: string;
  completed_at?: string;
  last_submission?: unknown;
}

export interface AdaptiveCardActionInfo {
  type: string;
  title: string;
  data?: unknown;
  url?: string;
  raw: unknown;
}

/** Supported Adaptive Card schema versions. */
const SUPPORTED_VERSIONS = new Set(["1.0", "1.1", "1.2", "1.3", "1.4", "1.5", "1.6"]);

let sdkLoaded = false;
let sdkLoadPromise: Promise<void> | null = null;

function clearAdaptiveCardNotice(container: HTMLElement): void {
  container.querySelector(".adaptive-card-notice")?.remove();
}

function showAdaptiveCardNotice(container: HTMLElement, message: string, tone: "error" | "info" = "error"): void {
  clearAdaptiveCardNotice(container);
  const notice = document.createElement("div");
  notice.className = `adaptive-card-notice adaptive-card-notice-${tone}`;
  notice.textContent = message;
  container.appendChild(notice);
}

/** Lazy-load the vendored adaptivecards SDK. */
async function ensureSdk(): Promise<void> {
  if (sdkLoaded) return;
  if (sdkLoadPromise) return sdkLoadPromise;

  sdkLoadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/static/js/vendor/adaptivecards.min.js";
    script.onload = () => {
      sdkLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load adaptivecards SDK"));
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
}

/** Get the global AdaptiveCards namespace after SDK is loaded. */
function getAC(): typeof import("adaptivecards") {
  return (globalThis as any).AdaptiveCards;
}

/**
 * Check whether a content block is a renderable adaptive card.
 */
export function isAdaptiveCardBlock(block: unknown): block is AdaptiveCardBlock {
  if (!block || typeof block !== "object") return false;
  const b = block as Record<string, unknown>;
  return (
    b.type === "adaptive_card" &&
    typeof b.card_id === "string" &&
    typeof b.schema_version === "string" &&
    typeof b.payload === "object" &&
    b.payload !== null
  );
}

/**
 * Check whether a schema version is supported.
 */
export function isSupportedVersion(version: string): boolean {
  return SUPPORTED_VERSIONS.has(version);
}

/**
 * Extract adaptive card blocks from a message's content_blocks.
 */
export function extractCardBlocks(contentBlocks: unknown): AdaptiveCardBlock[] {
  if (!Array.isArray(contentBlocks)) return [];
  return contentBlocks.filter(isAdaptiveCardBlock);
}

export function normalizeAdaptiveCardAction(action: any): AdaptiveCardActionInfo {
  const json = typeof action?.toJSON === "function" ? action.toJSON() : null;
  const type =
    (typeof action?.getJsonTypeName === "function" ? action.getJsonTypeName() : "") ||
    action?.constructor?.name ||
    json?.type ||
    "Unknown";
  const title =
    (typeof action?.title === "string" ? action.title : "") ||
    (typeof json?.title === "string" ? json.title : "") ||
    "";
  const url =
    (typeof action?.url === "string" ? action.url : "") ||
    (typeof json?.url === "string" ? json.url : "") ||
    undefined;
  const data = action?.data ?? json?.data;
  return { type, title, data, url, raw: action };
}

function formatSubmissionValue(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "yes" : "no";
  if (Array.isArray(value)) {
    return value.map((item) => formatSubmissionValue(item)).filter(Boolean).join(", ");
  }
  if (typeof value === "object") {
    const pairs = Object.entries(value as Record<string, unknown>)
      .map(([key, inner]) => `${key}: ${formatSubmissionValue(inner)}`)
      .filter((entry) => !entry.endsWith(": "));
    return pairs.join(", ");
  }
  return String(value).trim();
}

function formatAdaptiveCardTimestamp(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function describeAdaptiveCardState(block: AdaptiveCardBlock): { label: string; detail: string | null } | null {
  if (block.state === "active") return null;

  const label = block.state === "completed"
    ? "Submitted"
    : block.state === "cancelled"
      ? "Cancelled"
      : "Failed";

  const submission = block.last_submission && typeof block.last_submission === "object"
    ? (block.last_submission as Record<string, unknown>)
    : null;
  const title = submission && typeof submission.title === "string" ? submission.title.trim() : "";
  const dataSummary = submission ? formatSubmissionValue(submission.data) : "";
  const when = formatAdaptiveCardTimestamp(block.completed_at || (submission?.submitted_at as string | undefined));
  const detail = [title || null, dataSummary || null, when || null].filter(Boolean).join(" · ") || null;

  return { label, detail };
}

/**
 * Render an Adaptive Card into a container element.
 *
 * Returns true if the card was rendered successfully, false on failure.
 * On failure, the caller should fall back to text rendering.
 */
export async function renderAdaptiveCard(
  container: HTMLElement,
  block: AdaptiveCardBlock,
  options?: {
    /** Called when a card action is executed (Phase 2). */
    onAction?: (action: AdaptiveCardActionInfo) => void | Promise<void>;
  },
): Promise<boolean> {
  if (!isSupportedVersion(block.schema_version)) {
    console.warn(
      `[adaptive-card] Unsupported schema version ${block.schema_version} for card ${block.card_id}`,
    );
    return false;
  }

  try {
    await ensureSdk();
  } catch (err) {
    console.error("[adaptive-card] Failed to load SDK:", err);
    return false;
  }

  try {
    const AC = getAC();
    const card = new AC.AdaptiveCard();

    // Apply HostConfig from current theme
    card.hostConfig = new AC.HostConfig(buildHostConfig());

    // Parse the card payload
    card.parse(block.payload);

    // Wire up action handler (Phase 2)
    card.onExecuteAction = (action: any) => {
      const normalizedAction = normalizeAdaptiveCardAction(action);
      if (options?.onAction) {
        clearAdaptiveCardNotice(container);
        container.classList.add("adaptive-card-busy");
        void Promise.resolve(options.onAction(normalizedAction)).catch((error) => {
          console.error("[adaptive-card] Action failed:", error);
          const message = error instanceof Error ? error.message : String(error || "Action failed.");
          showAdaptiveCardNotice(container, message || "Action failed.", "error");
        }).finally(() => {
          container.classList.remove("adaptive-card-busy");
        });
      } else {
        console.log("[adaptive-card] Action executed (not wired yet):", normalizedAction);
      }
    };

    // Render
    const rendered = card.render();
    if (!rendered) {
      console.warn(`[adaptive-card] Card ${block.card_id} rendered to null`);
      return false;
    }

    // Style the container
    container.classList.add("adaptive-card-container");

    const stateMeta = describeAdaptiveCardState(block);
    if (stateMeta) {
      container.classList.add("adaptive-card-finished");
      const banner = document.createElement("div");
      banner.className = `adaptive-card-status adaptive-card-status-${block.state}`;

      const label = document.createElement("span");
      label.className = "adaptive-card-status-label";
      label.textContent = stateMeta.label;
      banner.appendChild(label);

      if (stateMeta.detail) {
        const detail = document.createElement("span");
        detail.className = "adaptive-card-status-detail";
        detail.textContent = stateMeta.detail;
        banner.appendChild(detail);
      }

      container.appendChild(banner);
    }

    clearAdaptiveCardNotice(container);
    container.appendChild(rendered);
    return true;
  } catch (err) {
    console.error(`[adaptive-card] Failed to render card ${block.card_id}:`, err);
    return false;
  }
}

/**
 * docs/azure/azure-openai-token.ts – Azure OpenAI provider implementation.
 *
 * Reference/example code showing how to implement a custom pi-ai Model
 * provider that talks to Azure OpenAI endpoints using token-based auth
 * instead of API keys. Supports streaming, tool calls, and thinking levels.
 */

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import OpenAI from "openai";
import {
  AssistantMessageEventStream,
  supportsXhigh,
  type AssistantMessage,
  type Model,
  type ToolCall,
  type ToolResultMessage,
} from "@mariozechner/pi-ai";
import {
  convertResponsesMessages,
  convertResponsesTools,
  processResponsesStream,
} from "../node_modules/@mariozechner/pi-ai/dist/providers/openai-responses-shared.js";
import { applyToolCallLimit } from "../src/utils/azure-tool-call-limit.js";
import { streamSimpleOpenAICompletions } from "../node_modules/@mariozechner/pi-ai/dist/providers/openai-completions.js";
import { buildBaseOptions, clampReasoning } from "../node_modules/@mariozechner/pi-ai/dist/providers/simple-options.js";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PROVIDER = "azure-openai";
const FOUNDRY_PROVIDER = "azure-foundry";
// Use custom API names so we don't override global handlers.
const AZURE_API = "azure-openai-responses-mi";
const FOUNDRY_API = "azure-foundry-openai-completions-mi";

// Pitfalls / guardrails:
// - Never use api: "openai-responses" or "openai-completions" here. That overrides the global
//   handlers and breaks other providers (e.g., GitHub Copilot). Always use AZURE_API/FOUNDRY_API.
// - Always set per-model `api` to the custom API names. If you omit it, the model will route
//   through the global handlers and fail with auth errors.
// - OpenAI SDK always injects `Authorization: Bearer <apiKey>`. Do not add Authorization/api-key
//   headers yourself or enable authHeader; Azure/Copilot will reject the request.
// - Managed identity only. AOAI_RESOURCE/FOUNDRY_RESOURCE must match the target resource or
//   tokens will be invalid (401/403).
// - MODEL_SPECS.reasoning=false will clamp thinking to off for that model.
// - Do not remove tool-call ID sanitization or TOOL_CALL_PROVIDERS; Azure Responses rejects
//   non-compliant IDs.
const MODEL_ID = process.env.AOAI_MODEL_ID || "gpt-5-2-codex";
const MODEL_NAME = process.env.AOAI_MODEL_NAME || `Azure ${MODEL_ID}`;
const MODEL_IDS = (process.env.AOAI_MODEL_IDS || MODEL_ID)
  .split(",")
  .map((entry) => entry.trim())
  .filter(Boolean);
const MODEL_NAMES = (process.env.AOAI_MODEL_NAMES || "")
  .split(",")
  .map((entry) => entry.trim());
const BASE_URL = process.env.AOAI_BASE_URL || "https://{RESOURCE_NAME}.openai.azure.com/openai/v1";
const AOAI_IMAGE_MODEL_ID = process.env.AOAI_IMAGE_MODEL_ID || "gpt-image-1-5";
const AOAI_API_VERSION = process.env.AOAI_API_VERSION || process.env.OPENAI_API_VERSION || "2024-02-15-preview";
const FOUNDRY_BASE_URL =
  process.env.FOUNDRY_BASE_URL || "https://{FOUNDRY_RESOURCE}.cognitiveservices.azure.com/openai/v1";
const FOUNDRY_MODEL_IDS = (process.env.FOUNDRY_MODEL_IDS || "mistral-large-3,flux-2-pro")
  .split(",")
  .map((entry) => entry.trim())
  .filter(Boolean);
const FOUNDRY_MODEL_NAMES = (process.env.FOUNDRY_MODEL_NAMES || "")
  .split(",")
  .map((entry) => entry.trim());
const FOUNDRY_IMAGE_MODEL_ID = process.env.FOUNDRY_IMAGE_MODEL_ID || "flux-2-pro";
const FOUNDRY_API_VERSION = process.env.FOUNDRY_API_VERSION || AOAI_API_VERSION;
const FOUNDRY_IMAGE_API_VERSION = process.env.FOUNDRY_IMAGE_API_VERSION || "preview";
const FOUNDRY_IMAGE_BASE_URL = process.env.FOUNDRY_IMAGE_BASE_URL || "";
const FOUNDRY_TEXT_MODEL_IDS = FOUNDRY_MODEL_IDS.filter(
  (id) => id !== FOUNDRY_IMAGE_MODEL_ID && !id.startsWith("flux-")
);
// Auth: managed identity by default — fetches AAD tokens from the VM metadata service.
// When AOAI_API_KEY is set, uses the static key instead (proxy mode — a remote proxy
// handles MI auth and this instance just passes the shared secret as a Bearer token).
const IMDS_URL = "http://169.254.169.254/metadata/identity/oauth2/token";
const IMDS_API_VERSION = "2018-02-01";
const RESOURCE = process.env.AOAI_RESOURCE || process.env.FOUNDRY_RESOURCE || "https://cognitiveservices.azure.com/";
const CACHE_DIR = process.env.AOAI_TOKEN_CACHE_DIR || "/workspace/.piclaw/cache";
const CACHE_FILE = process.env.AOAI_TOKEN_CACHE_FILE || `${CACHE_DIR}/aoai-token.json`;
const SKEW_SECONDS = Number(process.env.AOAI_TOKEN_SKEW_SECONDS || "300");
// When AOAI_API_KEY is set, use it directly instead of fetching managed-identity tokens.
// This is used when connecting through a proxy that handles MI auth on our behalf.
const STATIC_API_KEY = process.env.AOAI_API_KEY || "";
const TOOL_CALL_PROVIDERS = new Set(["openai", "openai-codex", "opencode", PROVIDER, FOUNDRY_PROVIDER]);
const DISABLE_TOOLS = /^(1|true|yes)$/i.test(process.env.AOAI_DISABLE_TOOLS || "");
const DISABLE_REASONING = /^(1|true|yes)$/i.test(process.env.AOAI_DISABLE_REASONING || "");
const TOOL_CALL_LIMIT = parseInt(process.env.AOAI_MAX_TOOL_CALLS || "96", 10);
const TOOL_CALL_SUMMARY_MAX = parseInt(process.env.AOAI_TOOL_CALL_SUMMARY_MAX || "12", 10);
const TOOL_CALL_OUTPUT_CHARS = parseInt(process.env.AOAI_TOOL_CALL_OUTPUT_CHARS || "200", 10);
const DEDUPE_TOOL_OUTPUT_SEARCH = !/^(0|false|no)$/i.test(process.env.AOAI_DEDUPE_TOOL_OUTPUT_SEARCH || "1");
const DISABLE_REASONING_MODELS = new Set(
  (process.env.AOAI_DISABLE_REASONING_MODELS || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean)
);
// Debug helper: log phase replay/persistence details when troubleshooting gpt-5.3-codex.
const LOG_PHASES = /^(1|true|yes)$/i.test(process.env.AOAI_LOG_PHASES || "");

// Per-model overrides: contextWindow, maxTokens, reasoning
const MODEL_SPECS: Record<string, { contextWindow?: number; maxTokens?: number; reasoning?: boolean }> = {
  "gpt-5-2-codex":      { contextWindow: 200000, maxTokens: 64000,  reasoning: true },
  "gpt-5-3-codex":      { contextWindow: 200000, maxTokens: 64000,  reasoning: true },
  "gpt-5-1-codex-mini": { contextWindow: 200000, maxTokens: 64000,  reasoning: true },
  "gpt-5-1":            { contextWindow: 1048576, maxTokens: 100000, reasoning: true },
  "gpt-5-mini":         { contextWindow: 1048576, maxTokens: 64000,  reasoning: true },
  "mistral-large-3":    { contextWindow: 131072, maxTokens: 16384,  reasoning: false },
  "flux-2-pro":         { contextWindow: 4096,   maxTokens: 4096,   reasoning: false },
};
const DEFAULT_AZURE_SPEC = { contextWindow: 200000, maxTokens: 64000, reasoning: true };
const DEFAULT_FOUNDRY_SPEC = { contextWindow: 200000, maxTokens: 64000, reasoning: false };
let extensionLogged = false;

function logExtensionLoaded(): void {
  if (extensionLogged) return;
  extensionLogged = true;
  const summary = {
    provider: PROVIDER,
    foundryProvider: FOUNDRY_PROVIDER,
    api: AZURE_API,
    foundryApi: FOUNDRY_API,
    baseUrl: BASE_URL,
    foundryBaseUrl: FOUNDRY_BASE_URL,
    modelIds: MODEL_IDS,
    foundryModelIds: FOUNDRY_MODEL_IDS,
    authMode: STATIC_API_KEY ? "api-key (proxy)" : "managed-identity",
    disableTools: DISABLE_TOOLS,
    disableReasoning: DISABLE_REASONING,
    disableReasoningModels: Array.from(DISABLE_REASONING_MODELS),
    bun: process.versions?.bun || null,
    node: process.versions?.node || null,
  };
  setTimeout(() => {
    try {
      console.error("[azure-openai] Extension loaded:", JSON.stringify(summary));
    } catch (error) {
      console.error("[azure-openai] Extension loaded (failed to serialize):", error);
    }
  }, 0);
}

function sanitizeOpenAIId(value?: string): string | undefined {
  if (!value) return value;
  let next = value.replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+$/, "");
  if (next.length > 64) next = next.slice(0, 64).replace(/_+$/, "");
  return next;
}

function sanitizeToolCallId(value?: string): string | undefined {
  if (!value) return value;
  if (!value.includes("|")) return sanitizeOpenAIId(value);
  const [callId, itemId, ...rest] = value.split("|");
  const sanitizedCallId = sanitizeOpenAIId(callId) || callId;
  const sanitizedItemId = sanitizeOpenAIId(itemId) || itemId;
  const tail = rest.length ? `|${rest.join("|")}` : "";
  if (sanitizedItemId) return `${sanitizedCallId}|${sanitizedItemId}${tail}`;
  return sanitizedCallId;
}

function logStreamFailureEvent(event: any, requestSummary?: Record<string, unknown>, loggedRef?: { logged: boolean }): void {
  if (!event || typeof event !== "object") return;
  const type = (event as { type?: string }).type;
  if (type === "response.failed") {
    const response = (event as { response?: any }).response;
    const error = response?.error || response?.status_details || response || event;
    console.error("[azure-openai] Stream response.failed:", JSON.stringify(error));
    if (requestSummary && loggedRef && !loggedRef.logged) {
      console.error("[azure-openai] Request summary:", JSON.stringify(requestSummary));
      loggedRef.logged = true;
    }
  }
  if (type === "error") {
    const { code, message, error } = event as { code?: string; message?: string; error?: unknown };
    console.error("[azure-openai] Stream error:", JSON.stringify({ code, message, error }));
    if (requestSummary && loggedRef && !loggedRef.logged) {
      console.error("[azure-openai] Request summary:", JSON.stringify(requestSummary));
      loggedRef.logged = true;
    }
  }
}

function logAzureError(modelId: string, error: unknown, requestSummary?: Record<string, unknown>, loggedRef?: { logged: boolean }): void {
  const err = error as { name?: string; message?: string; status?: number; code?: string; type?: string; response?: any; error?: any };
  const details = {
    name: err?.name,
    message: err?.message ?? String(error),
    status: err?.status ?? err?.response?.status,
    code: err?.code,
    type: err?.type,
    response: err?.response?.data,
    error: err?.error,
  };
  console.error(`[azure-openai] Error for ${modelId}:`, JSON.stringify(details));
  if (requestSummary && loggedRef && !loggedRef.logged) {
    console.error("[azure-openai] Request summary:", JSON.stringify(requestSummary));
    loggedRef.logged = true;
  }
}

function isReasoningEnabled(model: Model<any>): boolean {
  if (!model?.reasoning) return false;
  if (DISABLE_REASONING) return false;
  if (DISABLE_REASONING_MODELS.has(model.id)) return false;
  return true;
}

// GPT-5.3 Codex introduces a `phase` field on assistant output items (commentary vs final_answer).
// The cookbook notes that integrations must persist this metadata and replay it on subsequent
// requests, or the model may exhibit degraded behavior or failures. We store `phase` on the
// text blocks we persist, then re-apply it to the outgoing Responses API input items.
function collectMessagePhases(messages: unknown[]): Map<string, string> {
  const phases = new Map<string, string>();
  for (const msg of messages) {
    if (!msg || typeof msg !== "object") continue;
    if ((msg as { role?: string }).role !== "assistant") continue;
    const content = (msg as { content?: Array<any> }).content || [];
    for (const block of content) {
      if (block?.type !== "text") continue;
      const id = block.textSignature;
      const phase = block.phase;
      if (id && typeof id === "string" && phase && typeof phase === "string") {
        phases.set(id, phase);
      }
    }
  }
  return phases;
}

// Apply stored phase metadata to assistant output items when reconstructing input for /responses.
function applyPhasesToResponseInput(items: Array<any>, phases: Map<string, string>): void {
  if (!phases.size) return;
  for (const item of items) {
    if (item?.type !== "message" || !item.id) continue;
    const phase = phases.get(item.id);
    if (phase) item.phase = phase;
  }
}

// After streaming completes, copy the phase from Responses output items onto our stored text blocks
// so future requests can replay it (phase is required for gpt-5.3-codex continuity).
function applyPhasesToOutputMessage(output: { content?: Array<any> }, phases: Map<string, string>): void {
  if (!phases.size || !output?.content) return;
  for (const block of output.content) {
    if (block?.type !== "text") continue;
    const id = block.textSignature;
    if (!id || typeof id !== "string") continue;
    const phase = phases.get(id);
    if (phase) block.phase = phase;
  }
}

// Produce a compact, log-friendly summary of phase metadata in outgoing ResponseInput items.
// We avoid logging content and only emit IDs + phase counts when AOAI_LOG_PHASES=1.
function summarizeResponseInputPhases(items: Array<any>): {
  total: number;
  counts: Record<string, number>;
  sample: Array<{ id: string; phase: string }>;
} {
  const counts: Record<string, number> = {};
  const sample: Array<{ id: string; phase: string }> = [];
  let total = 0;

  for (const item of items) {
    if (item?.type !== "message" || !item.id || !item.phase) continue;
    const phase = String(item.phase);
    counts[phase] = (counts[phase] || 0) + 1;
    total += 1;
    if (sample.length < 6) {
      sample.push({ id: String(item.id), phase });
    }
  }

  return { total, counts, sample };
}

function isSameModel(message: AssistantMessage, model: Model<any> | undefined): boolean {
  if (!model) return false;
  return message.provider === model.provider && message.api === model.api && message.model === model.id;
}

function stripToolCallItemId(id: string): { id: string; changed: boolean } {
  if (!id.includes("|")) return { id, changed: false };
  const [callId] = id.split("|");
  if (!callId || callId === id) return { id, changed: false };
  return { id: callId, changed: true };
}


interface TokenCache {
  accessToken?: string;
  expiresOn?: string;
  expiresOnEpoch?: number;
}

type ImageArgs = {
  prompt: string;
  size?: string;
  count?: number;
  quality?: "low" | "medium" | "high";
  style?: "natural" | "vivid";
};

function readCache(): TokenCache {
  try {
    const raw = readFileSync(CACHE_FILE, "utf-8");
    return JSON.parse(raw) as TokenCache;
  } catch {
    return {};
  }
}

function isTokenValid(cache: TokenCache): boolean {
  if (!cache.accessToken || !cache.expiresOnEpoch) return false;
  const now = Math.floor(Date.now() / 1000);
  return cache.expiresOnEpoch - now > SKEW_SECONDS;
}

function writeCache(token: string, expiresOn: string | undefined, expiresOnEpoch: number): void {
  mkdirSync(CACHE_DIR, { recursive: true });
  const payload: TokenCache = { accessToken: token, expiresOn, expiresOnEpoch };
  writeFileSync(CACHE_FILE, `${JSON.stringify(payload, null, 2)}\n`);
}

async function fetchTokenFromImds(): Promise<TokenCache> {
  const url = `${IMDS_URL}?api-version=${IMDS_API_VERSION}&resource=${encodeURIComponent(RESOURCE)}`;
  const response = await fetch(url, {
    headers: {
      Metadata: "true",
    },
  });
  if (!response.ok) {
    throw new Error(`IMDS token request failed (${response.status})`);
  }
  const data = (await response.json()) as {
    access_token?: string;
    expires_on?: string;
  };

  if (!data.access_token) {
    throw new Error("IMDS token response missing access_token");
  }

  const expiresRaw = data.expires_on || "";
  let expiresOnEpoch = Number(expiresRaw);
  if (!Number.isFinite(expiresOnEpoch)) {
    const parsed = Date.parse(expiresRaw);
    if (Number.isFinite(parsed)) {
      expiresOnEpoch = Math.floor(parsed / 1000);
    }
  }
  if (!Number.isFinite(expiresOnEpoch) || expiresOnEpoch <= 0) {
    expiresOnEpoch = Math.floor(Date.now() / 1000) + 3300;
  }

  writeCache(data.access_token, expiresRaw, expiresOnEpoch);
  return { accessToken: data.access_token, expiresOn: expiresRaw, expiresOnEpoch };
}

async function ensureToken(force = false): Promise<TokenCache> {
  const cached = readCache();
  if (!force && isTokenValid(cached)) return cached;

  try {
    return await fetchTokenFromImds();
  } catch (error) {
    console.error("[azure-openai] Failed to refresh token via IMDS:", error);
    return cached;
  }
}

async function getAccessToken(): Promise<string> {
  // When a static API key is configured (proxy mode), skip IMDS entirely.
  if (STATIC_API_KEY) return STATIC_API_KEY;

  const token = await ensureToken();
  if (!token.accessToken) {
    throw new Error("Missing Azure access token. Ensure IMDS is available.");
  }
  return token.accessToken;
}

function isAuthError(error: unknown): boolean {
  const status = (error as { status?: number })?.status;
  if (status === 401 || status === 403) return true;
  const message = error instanceof Error ? error.message : String(error || "");
  return /unauthorized|forbidden|401|403/i.test(message);
}

function parseArgs(input: string): ImageArgs | null {
  const tokens = input.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;

  const args: ImageArgs = { prompt: "" };
  const promptParts: string[] = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token === "--size" && tokens[i + 1]) {
      args.size = tokens[i + 1];
      i += 1;
      continue;
    }
    if (token === "--count" && tokens[i + 1]) {
      const count = Number(tokens[i + 1]);
      if (Number.isFinite(count)) args.count = Math.min(4, Math.max(1, Math.floor(count)));
      i += 1;
      continue;
    }
    if (token === "--quality" && tokens[i + 1]) {
      const quality = tokens[i + 1] as ImageArgs["quality"];
      if (["low", "medium", "high"].includes(quality)) args.quality = quality;
      i += 1;
      continue;
    }
    if (token === "--style" && tokens[i + 1]) {
      const style = tokens[i + 1] as ImageArgs["style"];
      if (["natural", "vivid"].includes(style)) args.style = style;
      i += 1;
      continue;
    }
    promptParts.push(token);
  }

  args.prompt = promptParts.join(" ").trim();
  if (!args.prompt) return null;
  return args;
}

async function generateImage(baseUrl: string, model: string, args: ImageArgs, includeStyle: boolean) {
  await getAccessToken();
  const client = createAzureClient(baseUrl, {});

  const payload: Record<string, any> = {
    model,
    prompt: args.prompt,
    size: args.size || "1024x1024",
    quality: args.quality || "high",
    n: args.count || 1,
  };
  if (includeStyle && args.style) payload.style = args.style;

  const response = await client.images.generate(payload);
  const images = response.data || [];
  if (images.length === 0) {
    throw new Error("Image API returned no images.");
  }
  return images;
}

function getAzureEndpoint(baseUrl: string): string {

  return baseUrl.replace(/\/openai\/v1\/?$/, "").replace(/\/openai\/?$/, "");
}


function createAzureClient(baseUrl: string, headers: Record<string, string>) {
  return new OpenAI({
    apiKey: async () => await getAccessToken(),
    baseURL: baseUrl,
    defaultHeaders: headers,
    dangerouslyAllowBrowser: true,
  });
}

function getFoundryImageEndpoint(): string {
  if (FOUNDRY_IMAGE_BASE_URL) return FOUNDRY_IMAGE_BASE_URL.replace(/\/+$/, "");
  const base = getAzureEndpoint(FOUNDRY_BASE_URL);
  try {
    const url = new URL(base);
    if (url.hostname.endsWith(".cognitiveservices.azure.com")) {
      url.hostname = url.hostname.replace(".cognitiveservices.azure.com", ".services.ai.azure.com");
      return url.toString().replace(/\/+$/, "");
    }
    if (url.hostname.endsWith(".openai.azure.com")) {
      url.hostname = url.hostname.replace(".openai.azure.com", ".services.ai.azure.com");
      return url.toString().replace(/\/+$/, "");
    }
    return base;
  } catch {
    return base;
  }
}

function parseSize(size?: string): { width: number; height: number } {
  if (!size) return { width: 1024, height: 1024 };
  const match = size.toLowerCase().match(/(\d+)\s*x\s*(\d+)/);
  if (!match) return { width: 1024, height: 1024 };
  const width = Number(match[1]);
  const height = Number(match[2]);
  if (!Number.isFinite(width) || !Number.isFinite(height)) return { width: 1024, height: 1024 };
  return { width, height };
}

async function generateFoundryImage(model: string, args: ImageArgs) {
  const accessToken = await getAccessToken();

  const endpoint = getFoundryImageEndpoint();
  const url = `${endpoint}/providers/blackforestlabs/v1/${encodeURIComponent(model)}?api-version=${encodeURIComponent(FOUNDRY_IMAGE_API_VERSION)}`;
  const size = parseSize(args.size);
  const payload: Record<string, any> = {
    prompt: args.prompt,
    width: size.width,
    height: size.height,
    n: args.count || 1,
    model,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${body}`.trim());
  }
  const data = (await res.json()) as { data?: Array<{ b64_json?: string }> };
  const images = data.data || [];
  if (images.length === 0) {
    throw new Error("Image API returned no images.");
  }
  return images;
}

function saveImages(prefix: string, prompt: string, images: Array<{ b64_json?: string }>) {
  const outDir = join("/workspace", "exports", "images");
  mkdirSync(outDir, { recursive: true });

  const lines: string[] = [];
  images.forEach((image, idx) => {
    const b64 = image.b64_json;
    if (!b64) return;
    const buffer = Buffer.from(b64, "base64");
    const filename = `${prefix}-${Date.now()}-${idx + 1}.png`;
    const relPath = join("exports", "images", filename).replace(/\\/g, "/");
    const absPath = join("/workspace", relPath);
    writeFileSync(absPath, buffer);
    const url = `/workspace/raw?path=${encodeURIComponent(relPath)}`;
    lines.push(`![${prompt}](${url})`);
    lines.push(`Download: ${url}`);
  });
  return lines;
}

const PICLAW_PORT = process.env.PICLAW_PORT || "3000";
const PICLAW_BASE = `http://localhost:${PICLAW_PORT}`;
const INTERNAL_SECRET = process.env.PICLAW_INTERNAL_SECRET || process.env.PICLAW_WEB_INTERNAL_SECRET || "";

async function postPlaceholder(content: string, threadId?: number): Promise<number | null> {
  try {
    const body: Record<string, unknown> = { content };
    if (threadId) body.thread_id = threadId;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (INTERNAL_SECRET) headers["x-piclaw-internal-secret"] = INTERNAL_SECRET;
    const res = await fetch(`${PICLAW_BASE}/internal/post`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { id?: number };
    return data.id ?? null;
  } catch {
    return null;
  }
}

async function updatePost(id: number, content: string, threadId?: number): Promise<boolean> {
  try {
    const body: Record<string, unknown> = { content };
    if (threadId) body.thread_id = threadId;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (INTERNAL_SECRET) headers["x-piclaw-internal-secret"] = INTERNAL_SECRET;
    const res = await fetch(`${PICLAW_BASE}/post/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function streamAzureOpenAIResponses(model: any, context: any, options: any) {
  const stream = new AssistantMessageEventStream();



  (async () => {
    const output = {
      role: "assistant",
      content: [],
      api: model.api,
      provider: model.provider,
      model: model.id,
      usage: {
        input: 0,
        output: 0,
        cacheRead: 0,
        cacheWrite: 0,
        totalTokens: 0,
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
      },
      stopReason: "stop",
      timestamp: Date.now(),
    };

    let requestSummary: Record<string, unknown> | undefined;
    const loggedRef = { logged: false };

    try {
      const headers = { ...model.headers };
      if (options?.headers) {
        Object.assign(headers, options.headers);
      }
      for (const key of Object.keys(headers)) {
        const lower = key.toLowerCase();
        if (lower === "authorization" || lower === "api-key") {
          delete headers[key];
        }
      }

      // Pull any stored phase metadata from prior assistant messages, then apply it to the
      // reconstructed ResponseInput so gpt-5.3-codex sees the same phases on replay.
      const phaseById = collectMessagePhases(context.messages || []);
      const rawMessages = convertResponsesMessages(model, context, TOOL_CALL_PROVIDERS);
      applyPhasesToResponseInput(rawMessages as Array<any>, phaseById);
      const toolCallTrim = applyToolCallLimit(rawMessages as Array<any>, {
        limit: TOOL_CALL_LIMIT,
        summaryMax: TOOL_CALL_SUMMARY_MAX,
        outputChars: TOOL_CALL_OUTPUT_CHARS,
        dedupeToolOutputSearch: DEDUPE_TOOL_OUTPUT_SEARCH,
      });
      const messages = toolCallTrim.messages;
      const phaseReplaySummary = LOG_PHASES ? summarizeResponseInputPhases(messages as Array<any>) : null;

      const messageTypeCounts = messages.reduce<Record<string, number>>((acc, item: any) => {
        const key = item?.type || item?.role || "unknown";
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
      const toolsEnabled = !DISABLE_TOOLS;
      const reasoningEnabled = isReasoningEnabled(model);
      requestSummary = {
        model: model.id,
        api: model.api,
        provider: model.provider,
        baseUrl: model.baseUrl,
        messageCount: messages.length,
        messageTypes: messageTypeCounts,
        toolCount: toolsEnabled && context.tools ? context.tools.length : 0,
        hasToolCalls: messages.some((item: any) => item?.type === "function_call"),
        toolCallLimit: TOOL_CALL_LIMIT,
        toolCallTotal: toolCallTrim.toolCallTotal,
        toolCallKept: toolCallTrim.toolCallKept,
        toolCallRemoved: toolCallTrim.toolCallRemoved,
        toolCallDeduped: toolCallTrim.toolCallDeduped,
        toolCallSummary: Boolean(toolCallTrim.summaryText),
        reasoning: reasoningEnabled ? { effort: options?.reasoningEffort ?? null, summary: options?.reasoningSummary ?? null } : null,
        toolsEnabled,
        reasoningEnabled,
        // Phase replay summary is included only when AOAI_LOG_PHASES=1; omit otherwise.
        phaseReplay: phaseReplaySummary,
        storedPhaseCount: phaseById.size,
      };

      // Post-conversion sanitization for Azure OpenAI compatibility.
      // Azure requires: id/call_id max 64 chars, only [a-zA-Z0-9_-].
      // Upstream normalization misses some edge cases (cross-provider IDs without "|",
      // stale encrypted signatures, etc.). We sanitize ALL items here.
      //
      // Additionally, Azure enforces that every function_call item whose id starts
      // with "fc_" must have its paired reasoning item (rs_xxx) in the input.
      // If reasoning items were stripped (compaction, empty thinking blocks, model
      // switch), keeping the fc_ id causes a 400 error. Setting id to undefined
      // bypasses the pairing validation (same approach as cross-provider replay).
      const reasoningIds = new Set<string>();
      for (const item of messages) {
        if ((item as any).type === "reasoning" && (item as any).id) {
          reasoningIds.add((item as any).id);
        }
      }
      for (const item of messages) {
        if (item.id && typeof item.id === "string") {
          const nextId = sanitizeOpenAIId(item.id);
          if (nextId) item.id = nextId;
        }
        if (item.call_id && typeof item.call_id === "string") {
          const nextCallId = sanitizeOpenAIId(item.call_id);
          if (nextCallId) item.call_id = nextCallId;
        }
        // Strip function_call ids when no reasoning items are present.
        // If there ARE reasoning items, we keep function_call ids and trust
        // the upstream converter paired them correctly.
        if ((item as any).type === "function_call" && item.id &&
            typeof item.id === "string" && (item.id as string).startsWith("fc_") &&
            reasoningIds.size === 0) {
          (item as any).id = undefined;
        }
      }
      const params: Record<string, any> = {
        model: model.id,
        input: messages,
        stream: true,
      };

      // Only include OpenAI-specific params for models that support them
      if (reasoningEnabled) {
        params.prompt_cache_key = options?.sessionId;
        params.text = { format: { type: "text" }, verbosity: "medium" };
      }

      if (options?.maxTokens) {
        params.max_output_tokens = options?.maxTokens;
      }
      if (options?.temperature !== undefined) {
        params.temperature = options?.temperature;
      }
      if (!DISABLE_TOOLS && context.tools) {
        params.tools = convertResponsesTools(context.tools);
      } else if (DISABLE_TOOLS) {
        params.tool_choice = "none";
      }

      if (reasoningEnabled) {
        if (options?.reasoningEffort || options?.reasoningSummary) {
          // Azure OpenAI only supports a minimal reasoning payload.
          // Unsupported fields like `summary` and `include` cause silent
          // failures (response.failed with error: null). Some models
          // (e.g. gpt-5.3-chat) also restrict effort to "medium" only.
          // We send effort but omit summary and include for Azure.
          params.reasoning = {
            effort: options?.reasoningEffort || "medium",
          };
        } else if (String(model.name).toLowerCase().startsWith("gpt-5")) {
          messages.push({
            role: "developer",
            content: [
              {
                type: "input_text",
                text: "# Juice: 0 !important",
              },
            ],
          });
        }
      }
      const createStream = async () => {
        const client = createAzureClient(model.baseUrl, headers);
        return client.responses.create(
          params,
          options?.signal ? { signal: options.signal } : undefined
        );
      };

      await getAccessToken();

      // Track the best error message extracted from stream events so we can
      // override pi-ai's generic "Unknown error" with something actionable.
      // Declared here (before createStream) so it's accessible in the catch block.
      let streamErrorDetail = "";

      let openaiStream;
      try {
        openaiStream = await createStream();
      } catch (error) {
        if (!isAuthError(error)) throw error;
        // Force-refresh MI token on auth errors (no-op in proxy/api-key mode)
        if (!STATIC_API_KEY) await ensureToken(true);
        openaiStream = await createStream();
      }

      // Capture `phase` for assistant output items so we can persist it on stored messages.
      // This uses the Responses stream events to avoid any SDK version mismatches.
      const outputPhases = new Map<string, string>();

      const loggingStream = (async function* () {
        for await (const event of openaiStream) {
          if (event?.type === "response.output_item.added" || event?.type === "response.output_item.done") {
            const item = (event as { item?: any }).item;
            const phase = item?.phase;
            if (item?.type === "message" && item?.id && typeof phase === "string") {
              outputPhases.set(item.id, phase);
            }
          }

          // Extract a descriptive error from response.failed / error events
          // BEFORE pi-ai's processResponsesStream throws the generic "Unknown error".
          if (event?.type === "response.failed") {
            const resp = (event as { response?: any }).response;
            const errObj = resp?.error;
            if (errObj && typeof errObj === "object") {
              streamErrorDetail = `${errObj.code || "error"}: ${errObj.message || JSON.stringify(errObj)}`;
            } else if (resp?.status) {
              streamErrorDetail = `Azure response failed (status: ${resp.status})`;
            } else {
              streamErrorDetail = "Azure response failed (no error details returned)";
            }
          } else if (event?.type === "error") {
            const { code, message } = event as { code?: string; message?: string };
            streamErrorDetail = `${code || "stream_error"}: ${message || "unknown"}`;
          }

          logStreamFailureEvent(event, requestSummary, loggedRef);
          yield event;
        }
      })();

      stream.push({ type: "start", partial: output });
      await processResponsesStream(loggingStream, output, stream, model);
      applyPhasesToOutputMessage(output, outputPhases);
      if (LOG_PHASES && outputPhases.size > 0) {
        console.error("[azure-openai] Output phases:", JSON.stringify({ total: outputPhases.size, phases: Array.from(outputPhases.entries()).slice(0, 6) }));
      }

      if (options?.signal?.aborted) {
        throw new Error("Request was aborted");
      }
      if (output.stopReason === "aborted" || output.stopReason === "error") {
        // Use the detailed error we extracted from the stream event if available,
        // rather than the generic "unknown error" from pi-ai.
        const detail = streamErrorDetail || output.errorMessage || "unknown error";
        throw new Error(`Azure request failed: ${detail}`);
      }

      stream.push({ type: "done", reason: output.stopReason, message: output });
      stream.end();
    } catch (error) {
      logAzureError(model.id, error, requestSummary, loggedRef);
      for (const block of output.content) delete (block as any).index;
      output.stopReason = options?.signal?.aborted ? "aborted" : "error";
      // Prefer the stream-level error detail over the generic thrown message.
      const rawMsg = error instanceof Error ? error.message : JSON.stringify(error);
      output.errorMessage = streamErrorDetail || rawMsg;
      stream.push({ type: "error", reason: output.stopReason, error: output });
      stream.end();
    }
  })();

  return stream;
}

function streamSimpleAzureOpenAIResponses(model: any, context: any, options: any) {
  const base = buildBaseOptions(model, options, options?.apiKey);
  const reasoningEffort = supportsXhigh(model) ? options?.reasoning : clampReasoning(options?.reasoning);

  return streamAzureOpenAIResponses(model, context, {
    ...base,
    reasoningEffort,
  });
}

function streamSimpleFoundryOpenAICompletions(model: any, context: any, options: any) {
  // Foundry uses the standard OpenAI Completions transport, but we keep a custom API name
  // so this extension doesn't override global handlers. Force the api back to openai-completions
  // when calling the built-in stream implementation.
  const overrideModel = model.api === "openai-completions" ? model : { ...model, api: "openai-completions" };
  return streamSimpleOpenAICompletions(overrideModel, context, options);
}

function registerProvider(pi: ExtensionAPI, token: string) {
  const openaiModels = MODEL_IDS.map((id, idx) => {
    const spec = MODEL_SPECS[id] || DEFAULT_AZURE_SPEC;
    return {
      id,
      name: MODEL_NAMES[idx] || (id === MODEL_ID ? MODEL_NAME : `Azure ${id}`),
      api: AZURE_API,
      reasoning: spec.reasoning ?? true,
      input: ["text"],
      contextWindow: spec.contextWindow ?? 200000,
      maxTokens: spec.maxTokens ?? 64000,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    };
  });

  pi.registerProvider(PROVIDER, {
    baseUrl: BASE_URL,
    api: AZURE_API,
    apiKey: token,
    streamSimple: streamSimpleAzureOpenAIResponses,
    models: openaiModels,
  });

  const foundryModels = FOUNDRY_TEXT_MODEL_IDS.map((id, idx) => {
    const spec = MODEL_SPECS[id] || DEFAULT_FOUNDRY_SPEC;
    return {
      id,
      name: FOUNDRY_MODEL_NAMES[idx] || `Azure Foundry ${id}`,
      api: FOUNDRY_API,
      reasoning: spec.reasoning ?? false,
      input: ["text"],
      contextWindow: spec.contextWindow ?? 200000,
      maxTokens: spec.maxTokens ?? 64000,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    };
  });

  if (foundryModels.length > 0) {
    pi.registerProvider(FOUNDRY_PROVIDER, {
      baseUrl: FOUNDRY_BASE_URL,
      api: FOUNDRY_API,
      apiKey: token,
      streamSimple: streamSimpleFoundryOpenAICompletions,
      models: foundryModels,
    });
  }
}

export default function (pi: ExtensionAPI) {
  logExtensionLoaded();

  pi.on("context", async (event, ctx) => {
    const currentModel = ctx.model;
    if (!currentModel) return;

    const idMap = new Map<string, string>();
    let modified = false;

    const messages = event.messages.map((message) => {
      if (message.role === "assistant") {
        const assistant = message as AssistantMessage;
        if (isSameModel(assistant, currentModel)) return message;

        let contentChanged = false;
        const content = assistant.content.map((block) => {
          if (block.type !== "toolCall") return block;
          const toolCall = block as ToolCall;
          const { id, changed } = stripToolCallItemId(toolCall.id);
          if (!changed) return toolCall;
          idMap.set(toolCall.id, id);
          contentChanged = true;
          return { ...toolCall, id };
        });

        if (!contentChanged) return message;
        modified = true;
        return { ...assistant, content };
      }

      if (message.role === "toolResult") {
        const toolResult = message as ToolResultMessage;
        const mapped = idMap.get(toolResult.toolCallId);
        if (!mapped || mapped === toolResult.toolCallId) return message;
        modified = true;
        return { ...toolResult, toolCallId: mapped };
      }

      return message;
    });

    if (!modified) return;
    return { messages };
  });

  pi.registerCommand("image", {
    description: "Generate an image with Azure OpenAI",
    handler: async (input, ctx) => {
      const parsed = parseArgs(input || "");
      if (!parsed) {
        pi.sendMessage({
          customType: "image",
          content:
            "Usage: /image <prompt> [--size 1024x1024] [--count 1] [--quality low|medium|high] [--style natural|vivid]",
          display: true,
        });
        return;
      }

      const statusText = `⏳ Generating image… (${AOAI_IMAGE_MODEL_ID})`;
      const placeholderId = await postPlaceholder(statusText);

      void (async () => {
        try {
          const images = await generateImage(BASE_URL, AOAI_IMAGE_MODEL_ID, parsed, true);
          const lines = saveImages("azure-image", parsed.prompt, images);
          const caption = `Azure image (${AOAI_IMAGE_MODEL_ID}) — ${parsed.prompt}`;
          const message = [caption, "", ...lines].join("\n");
          if (placeholderId) {
            await updatePost(placeholderId, message);
          } else {
            pi.sendMessage({ customType: "image", content: message, display: true });
          }
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : String(error);
          const failContent = `Image generation failed: ${errMsg}`;
          if (placeholderId) {
            await updatePost(placeholderId, failContent);
          } else {
            pi.sendMessage({ customType: "image", content: failContent, display: true });
          }
        }
      })();
    },
  });

  pi.registerCommand("flux", {
    description: "Generate an image with Azure Foundry (FLUX.2-pro)",
    handler: async (input, ctx) => {
      const parsed = parseArgs(input || "");
      if (!parsed) {
        pi.sendMessage({
          customType: "flux",
          content:
            "Usage: /flux <prompt> [--size 1024x1024] [--count 1] [--quality low|medium|high]",
          display: true,
        });
        return;
      }

      const statusText = `⏳ Generating Foundry image… (${FOUNDRY_IMAGE_MODEL_ID})`;
      const placeholderId = await postPlaceholder(statusText);

      void (async () => {
        try {
          const images = await generateFoundryImage(FOUNDRY_IMAGE_MODEL_ID, parsed);
          const lines = saveImages("foundry-image", parsed.prompt, images);
          const caption = `Foundry image (${FOUNDRY_IMAGE_MODEL_ID}) — ${parsed.prompt}`;
          const message = [caption, "", ...lines].join("\n");
          if (placeholderId) {
            await updatePost(placeholderId, message);
          } else {
            pi.sendMessage({ customType: "flux", content: message, display: true });
          }
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : String(error);
          const failContent = `Foundry image generation failed: ${errMsg}`;
          if (placeholderId) {
            await updatePost(placeholderId, failContent);
          } else {
            pi.sendMessage({ customType: "flux", content: failContent, display: true });
          }
        }
      })();
    },
  });

  let timer: ReturnType<typeof setTimeout> | null = null;

  const scheduleNext = (expiresOnEpoch?: number) => {
    if (timer) clearTimeout(timer);
    const now = Math.floor(Date.now() / 1000);
    const delaySeconds = expiresOnEpoch
      ? Math.max(60, expiresOnEpoch - now - SKEW_SECONDS)
      : 60;
    timer = setTimeout(() => void refresh(), delaySeconds * 1000);
  };

  const refresh = async () => {
    logExtensionLoaded();
    // In proxy/api-key mode, register once with the static key and don't
    // schedule periodic refreshes — the remote proxy handles MI tokens.
    if (STATIC_API_KEY) {
      registerProvider(pi, STATIC_API_KEY);
      return;
    }
    const cache = await ensureToken();
    if (cache.accessToken) {
      registerProvider(pi, cache.accessToken);
    }
    scheduleNext(cache.expiresOnEpoch);
  };

  pi.on("session_start", () => {
    void refresh();
  });

  pi.on("session_shutdown", () => {
    if (timer) clearTimeout(timer);
  });

  void refresh();
}

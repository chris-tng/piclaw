/**
 * extensions/azure-openai-api.ts – Stable extension-facing API for Azure OpenAI helpers.
 *
 * Centralizes imports used by `extensions/azure-openai.ts` so the extension entrypoint
 * does not depend directly on fragile deep implementation paths.
 */

import {
  convertResponsesMessages,
  convertResponsesTools,
  processResponsesStream,
} from "@mariozechner/pi-ai/dist/providers/openai-responses-shared.js";

export { applyToolCallLimit } from "../utils/azure-tool-call-limit.js";

/** Re-exported response-input conversion helper from pi-ai internals. */
export { convertResponsesMessages, convertResponsesTools, processResponsesStream };

/** Input contract accepted by buildBaseOptions(). */
export interface AzureBaseOptionsInput {
  temperature?: number;
  maxTokens?: number;
  signal?: AbortSignal;
  apiKey?: string;
  cacheRetention?: string | number;
  sessionId?: string;
  headers?: Record<string, string>;
  onPayload?: (payload: unknown) => void;
  maxRetryDelayMs?: number;
  metadata?: Record<string, unknown>;
}

/** Output contract returned by buildBaseOptions(). */
export interface AzureBaseOptions {
  temperature?: number;
  maxTokens: number;
  signal?: AbortSignal;
  apiKey?: string;
  cacheRetention?: string | number;
  sessionId?: string;
  headers?: Record<string, string>;
  onPayload?: (payload: unknown) => void;
  maxRetryDelayMs?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Build base stream options for simple stream wrappers.
 * Mirrors pi-ai's simple-options behavior without requiring extension-side deep imports.
 */
export function buildBaseOptions(
  model: { maxTokens: number },
  options: AzureBaseOptionsInput | undefined,
  apiKey: string | undefined
): AzureBaseOptions {
  return {
    temperature: options?.temperature,
    maxTokens: options?.maxTokens || Math.min(model.maxTokens, 32000),
    signal: options?.signal,
    apiKey: apiKey || options?.apiKey,
    cacheRetention: options?.cacheRetention,
    sessionId: options?.sessionId,
    headers: options?.headers,
    onPayload: options?.onPayload,
    maxRetryDelayMs: options?.maxRetryDelayMs,
    metadata: options?.metadata,
  };
}

/** Clamp unsupported reasoning levels for providers that do not accept `xhigh`. */
export function clampReasoning(effort: string | undefined): string | undefined {
  return effort === "xhigh" ? "high" : effort;
}

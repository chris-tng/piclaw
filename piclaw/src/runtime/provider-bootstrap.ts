/**
 * runtime/provider-bootstrap.ts – Optional model provider registration at startup.
 */

import type { ModelRegistry } from "@mariozechner/pi-coding-agent";
import {
  getApiProvider,
  streamSimpleAzureOpenAIResponses,
  streamSimpleOpenAICompletions,
} from "@mariozechner/pi-ai";

/** Minimal AgentPool contract needed to register optional model providers. */
export interface ProviderBootstrapAgentPool {
  hasProviderModels(provider: string): boolean;
  registerModelProvider(
    providerName: string,
    config: Parameters<ModelRegistry["registerProvider"]>[1]
  ): void;
}

type ProviderModelConfig = NonNullable<
  Parameters<ProviderBootstrapAgentPool["registerModelProvider"]>[1]["models"]
>[number];

type ProviderApi = Exclude<ProviderModelConfig["api"], undefined>;

const AZURE_OPENAI_PROVIDER = "azure-openai";
const AZURE_OPENAI_API: ProviderApi = "azure-openai-responses-mi";

const AZURE_FOUNDRY_PROVIDER = "azure-foundry";
const AZURE_FOUNDRY_API: ProviderApi = "azure-foundry-openai-completions-mi";

function splitCsv(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
}

function isApiProviderRegistered(api: ProviderApi): boolean {
  return Boolean(getApiProvider(api));
}

function toProviderStreamSimple(
  fn: typeof streamSimpleAzureOpenAIResponses | typeof streamSimpleOpenAICompletions
): NonNullable<Parameters<ProviderBootstrapAgentPool["registerModelProvider"]>[1]["streamSimple"]> {
  return fn as unknown as NonNullable<
    Parameters<ProviderBootstrapAgentPool["registerModelProvider"]>[1]["streamSimple"]
  >;
}

function buildAzureOpenAiModels(modelIds: string[], modelNames: string[]): ProviderModelConfig[] {
  return modelIds.map((id: string, idx: number) => ({
    id,
    name: modelNames[idx] || `Azure ${id}`,
    api: AZURE_OPENAI_API,
    reasoning: true,
    input: ["text"],
    contextWindow: 200000,
    maxTokens: 64000,
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
  }));
}

function buildAzureFoundryModels(modelIds: string[], modelNames: string[]): ProviderModelConfig[] {
  return modelIds.map((id: string, idx: number) => ({
    id,
    name: modelNames[idx] || `Azure Foundry ${id}`,
    api: AZURE_FOUNDRY_API,
    reasoning: false,
    input: ["text"],
    contextWindow: 200000,
    maxTokens: 64000,
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
  }));
}

/** Ensure optional Azure providers are discoverable in /model at startup. */
export function registerOptionalProviders(agentPool: ProviderBootstrapAgentPool): void {
  const aoaiToken = process.env.AOAI_API_KEY;
  const aoaiBaseUrl = process.env.AOAI_BASE_URL;
  if (aoaiToken && aoaiBaseUrl) {
    const hasAzureModels = agentPool.hasProviderModels(AZURE_OPENAI_PROVIDER);
    const azureApiRegistered = isApiProviderRegistered(AZURE_OPENAI_API);

    if (!hasAzureModels) {
      const ids = splitCsv(process.env.AOAI_MODEL_IDS);
      const names = splitCsv(process.env.AOAI_MODEL_NAMES);
      const defaultIds = ["gpt-5-2-codex", "gpt-5-3-codex", "gpt-5-1-codex-mini", "gpt-5-1", "gpt-5-mini"];
      const modelIds = ids.length > 0 ? ids : defaultIds;

      agentPool.registerModelProvider(AZURE_OPENAI_PROVIDER, {
        baseUrl: aoaiBaseUrl,
        api: AZURE_OPENAI_API,
        apiKey: aoaiToken,
        streamSimple: toProviderStreamSimple(streamSimpleAzureOpenAIResponses),
        models: buildAzureOpenAiModels(modelIds, names),
      });
    } else if (!azureApiRegistered) {
      agentPool.registerModelProvider(AZURE_OPENAI_PROVIDER, {
        baseUrl: aoaiBaseUrl,
        api: AZURE_OPENAI_API,
        apiKey: aoaiToken,
        streamSimple: toProviderStreamSimple(streamSimpleAzureOpenAIResponses),
      });
    }
  }

  const foundryToken = process.env.FOUNDRY_API_KEY || process.env.AOAI_API_KEY;
  const foundryBaseUrl = process.env.FOUNDRY_BASE_URL;
  if (foundryToken && foundryBaseUrl) {
    const hasFoundryModels = agentPool.hasProviderModels(AZURE_FOUNDRY_PROVIDER);
    const foundryApiRegistered = isApiProviderRegistered(AZURE_FOUNDRY_API);

    if (!hasFoundryModels) {
      const ids = splitCsv(process.env.FOUNDRY_MODEL_IDS);
      const names = splitCsv(process.env.FOUNDRY_MODEL_NAMES);
      const modelIds = ids.length > 0 ? ids : ["mistral-large-3"];

      agentPool.registerModelProvider(AZURE_FOUNDRY_PROVIDER, {
        baseUrl: foundryBaseUrl,
        api: AZURE_FOUNDRY_API,
        apiKey: foundryToken,
        streamSimple: toProviderStreamSimple(streamSimpleOpenAICompletions),
        models: buildAzureFoundryModels(modelIds, names),
      });
    } else if (!foundryApiRegistered) {
      agentPool.registerModelProvider(AZURE_FOUNDRY_PROVIDER, {
        baseUrl: foundryBaseUrl,
        api: AZURE_FOUNDRY_API,
        apiKey: foundryToken,
        streamSimple: toProviderStreamSimple(streamSimpleOpenAICompletions),
      });
    }
  }
}

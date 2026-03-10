/**
 * provider-bridge – runtime provider registration bridge for PiClaw.
 *
 * Purpose:
 * - Ensure key Pi alias providers are available in PiClaw even when
 *   user-installed TS extensions fail to load under Bun.
 *
 * Current scope:
 * - openai-c
 * - openai-g
 * - openai-t
 * - openai-w
 */
import type { ExtensionAPI, ExtensionFactory } from "@mariozechner/pi-coding-agent";
import { getModels } from "@mariozechner/pi-ai";
import { loginOpenAICodex, refreshOpenAICodexToken, type OAuthLoginCallbacks } from "@mariozechner/pi-ai/oauth";

const OPENAI_CODEX_BASE_URL = "https://chatgpt.com/backend-api";

type AliasProvider = {
  provider: "openai-c" | "openai-g" | "openai-t" | "openai-w";
  envApiKey: string;
  originator: string;
  displayName: string;
};

const OPENAI_ALIAS_PROVIDERS: AliasProvider[] = [
  {
    provider: "openai-c",
    envApiKey: "OPENAI_C_API_KEY",
    originator: "pi-openai-c",
    displayName: "OpenAI Codex (openai-c)",
  },
  {
    provider: "openai-g",
    envApiKey: "OPENAI_G_API_KEY",
    originator: "pi-openai-g",
    displayName: "OpenAI Codex (openai-g)",
  },
  {
    provider: "openai-t",
    envApiKey: "OPENAI_T_API_KEY",
    originator: "pi-openai-t",
    displayName: "OpenAI Codex (openai-t)",
  },
  {
    provider: "openai-w",
    envApiKey: "OPENAI_W_API_KEY",
    originator: "pi-openai-w",
    displayName: "OpenAI Codex (openai-w)",
  },
];

function cloneOpenAICodexModels() {
  return getModels("openai-codex").map((model) => ({
    id: model.id,
    name: model.name,
    reasoning: model.reasoning,
    input: model.input,
    cost: model.cost,
    contextWindow: model.contextWindow,
    maxTokens: model.maxTokens,
    compat: model.compat,
  }));
}

function registerOpenAIAlias(pi: ExtensionAPI, alias: AliasProvider): void {
  pi.registerProvider(alias.provider, {
    baseUrl: OPENAI_CODEX_BASE_URL,
    api: "openai-codex-responses",
    apiKey: alias.envApiKey,
    models: cloneOpenAICodexModels(),
    oauth: {
      name: alias.displayName,
      async login(callbacks: OAuthLoginCallbacks) {
        return loginOpenAICodex({
          onAuth: ({ url }) => callbacks.onAuth({ url }),
          onPrompt: (prompt) => callbacks.onPrompt({ message: prompt.message }),
          originator: alias.originator,
        });
      },
      async refreshToken(credentials) {
        return refreshOpenAICodexToken(credentials.refresh);
      },
      getApiKey(credentials) {
        return credentials.access;
      },
    },
  });
}

/** Built-in extension factory that registers provider aliases required by PiClaw. */
export const providerBridge: ExtensionFactory = (pi) => {
  for (const alias of OPENAI_ALIAS_PROVIDERS) {
    registerOpenAIAlias(pi, alias);
  }
};

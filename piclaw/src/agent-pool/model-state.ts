import { Type, type Static } from "@sinclair/typebox";
import type {
  AgentSession,
  AgentToolResult,
  AgentToolUpdateCallback,
  ExtensionContext,
  ToolDefinition,
} from "@mariozechner/pi-coding-agent";
import type { ThinkingLevel } from "@mariozechner/pi-agent-core";

const ModelStateSchema = Type.Object({});

type ModelStateParams = Static<typeof ModelStateSchema>;

type ModelStateDetails = {
  model?: string | null;
  provider?: string | null;
  model_id?: string | null;
  thinking_level?: ThinkingLevel;
  supports_thinking?: boolean;
  available_thinking_levels?: ThinkingLevel[];
  context_tokens?: number | null;
  context_window?: number | null;
  context_percent?: number | null;
};

export function createModelStateTool(
  getSession: () => AgentSession | undefined
): ToolDefinition<typeof ModelStateSchema, ModelStateDetails> {
  return {
    name: "get_model_state",
    label: "get_model_state",
    description: "Get the current model and thinking level for the session.",
    parameters: ModelStateSchema,
    execute: async (
      _toolCallId: string,
      _params: ModelStateParams,
      _signal?: AbortSignal,
      _onUpdate?: AgentToolUpdateCallback<ModelStateDetails>,
      _ctx?: ExtensionContext
    ): Promise<AgentToolResult<ModelStateDetails>> => {
      const session = getSession();
      if (!session) {
        return {
          content: [{ type: "text", text: "Session not ready." }],
          details: {},
        };
      }

      const model = session.model;
      const label = model ? `${model.provider}/${model.id}` : null;
      const usage = session.getContextUsage();
      const details: ModelStateDetails = {
        model: label,
        provider: model?.provider ?? null,
        model_id: model?.id ?? null,
        thinking_level: session.thinkingLevel,
        supports_thinking: session.supportsThinking(),
        available_thinking_levels: session.getAvailableThinkingLevels(),
        context_tokens: usage?.tokens ?? null,
        context_window: usage?.contextWindow ?? null,
        context_percent: usage?.percent ?? null,
      };

      const thinkingNote = details.supports_thinking
        ? `Thinking level: ${details.thinking_level}.`
        : "Thinking is off for this model.";
      const contextNote = usage
        ? `Context: ${usage.tokens ?? "?"}/${usage.contextWindow} tokens (${usage.percent ? usage.percent.toFixed(1) : "?"}%).`
        : "Context: unknown.";
      const message = label
        ? `Current model: ${label}. ${thinkingNote} ${contextNote}`
        : `No model selected. ${thinkingNote} ${contextNote}`;

      return {
        content: [{ type: "text", text: message }],
        details,
      };
    },
  };
}

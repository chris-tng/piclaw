import { Type } from "@sinclair/typebox";
const ModelStateSchema = Type.Object({});
export function createModelStateTool(getSession) {
    return {
        name: "get_model_state",
        label: "get_model_state",
        description: "Get the current model and thinking level for the session.",
        parameters: ModelStateSchema,
        execute: async (_toolCallId, _params, _signal, _onUpdate, _ctx) => {
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
            const details = {
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

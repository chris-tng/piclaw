import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";

const TOOL_HINT = [
  "You can manage your own model and thinking level.",
  "Use get_model_state to see the current model + thinking level.",
  "Use list_models to discover available models when needed.",
  "Use switch_model to change models and switch_thinking to change thinking level.",
  "Do not ask the user to run /model or /thinking when you can switch yourself.",
].join("\n");

export default function (pi: ExtensionAPI) {
  pi.on("before_agent_start", async (event) => {
    return {
      systemPrompt: `${event.systemPrompt}\n\n${TOOL_HINT}`,
    };
  });
}

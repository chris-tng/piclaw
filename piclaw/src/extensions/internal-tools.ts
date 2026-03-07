/**
 * internal-tools – registers list_internal_tools for quick tool discovery.
 */
import { Type } from "@sinclair/typebox";
import type {
  ExtensionAPI,
  ExtensionFactory,
} from "@mariozechner/pi-coding-agent";

const InternalToolsSchema = Type.Object({
  query: Type.Optional(Type.String({ description: "Filter by tool name/description substring." })),
  limit: Type.Optional(Type.Integer({ description: "Max tools to return (1-200).", minimum: 1, maximum: 200 })),
  include_parameters: Type.Optional(Type.Boolean({ description: "Include JSON schema parameters in details." })),
});

function clampLimit(value: number | undefined, fallback = 100): number {
  if (!Number.isFinite(value)) return fallback;
  const num = Number(value);
  if (Number.isNaN(num)) return fallback;
  return Math.min(Math.max(num, 1), 200);
}

function summarizeDescription(value: string | undefined): string {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return "No description.";
  if (text.length <= 140) return text;
  return `${text.slice(0, 139)}…`;
}

const HINT = [
  "## Internal Tool Discovery",
  "If you are unsure about available tools, call list_internal_tools.",
].join("\n");

/** Extension factory that registers list_internal_tools. */
export const internalTools: ExtensionFactory = (pi: ExtensionAPI) => {
  pi.on("before_agent_start", async (event) => ({
    systemPrompt: `${event.systemPrompt}\n\n${HINT}`,
  }));

  pi.registerTool({
    name: "list_internal_tools",
    label: "list_internal_tools",
    description: "List available internal tools with brief descriptions.",
    parameters: InternalToolsSchema,
    async execute(_toolCallId, params, _signal, _onUpdate, _ctx) {
      const query = params.query?.trim().toLowerCase() || "";
      const limit = clampLimit(params.limit, 100);
      const includeParameters = Boolean(params.include_parameters);

      const all = pi.getAllTools()
        .map((tool) => ({
          name: tool.name,
          description: summarizeDescription(tool.description),
          parameters: includeParameters ? tool.parameters : undefined,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      const filtered = query
        ? all.filter((tool) =>
            tool.name.toLowerCase().includes(query)
            || tool.description.toLowerCase().includes(query),
          )
        : all;

      const tools = filtered.slice(0, limit);
      if (tools.length === 0) {
        return {
          content: [{ type: "text", text: query ? `No tools found matching "${params.query}".` : "No tools available." }],
          details: { total: filtered.length, count: 0, query: params.query?.trim(), tools: [] },
        };
      }

      const header = query
        ? `Available tools (filtered): ${tools.length} of ${filtered.length}.`
        : `Available tools: ${tools.length} of ${filtered.length}.`;
      const lines = tools.map((tool) => `• ${tool.name} — ${tool.description}`);

      return {
        content: [{ type: "text", text: `${header}\n${lines.join("\n")}` }],
        details: {
          total: filtered.length,
          count: tools.length,
          query: params.query?.trim() || undefined,
          tools,
        },
      };
    },
  });
};

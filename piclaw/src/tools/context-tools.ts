/**
 * tools/context-tools.ts – Enhanced tool definitions for the pi-agent runtime.
 *
 * Wraps the standard bash tool with output-storage logic: when a command
 * produces output exceeding configurable thresholds, the full output is
 * stored via tool-output.ts and only a preview is returned to the agent's
 * context window. This keeps the context lean while preserving searchability.
 *
 * Also provides:
 *   - tool_output_search: lets the agent search stored tool outputs by query.
 *   - batch_exec: runs multiple shell commands sequentially with summaries.
 *
 * Consumers:
 *   - agent-pool.ts registers these tools on the pi-agent session so the
 *     agent can invoke "bash", "tool_output_search", and "batch_exec".
 */

import { existsSync } from "fs";
import { Type } from "@sinclair/typebox";
import { createBashTool } from "@mariozechner/pi-coding-agent";

import { buildPreview, saveToolOutput, searchToolOutput, getToolOutput, readToolOutputFile } from "../tool-output.js";
import { createTrackedBashOperations } from "./tracked-bash.js";

const STORE_THRESHOLD_BYTES = parseInt(process.env.PICLAW_TOOL_OUTPUT_STORE_BYTES || "4096", 10);
const STORE_THRESHOLD_LINES = parseInt(process.env.PICLAW_TOOL_OUTPUT_STORE_LINES || "40", 10);
const PREVIEW_LINES = parseInt(process.env.PICLAW_TOOL_OUTPUT_PREVIEW_LINES || "8", 10);
const PREVIEW_LINE_CHARS = parseInt(process.env.PICLAW_TOOL_OUTPUT_PREVIEW_LINE_CHARS || "200", 10);

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes)) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function extractTextContent(content: Array<{ type: string; text?: string }> | undefined): string {
  if (!content) return "";
  return content.map((item) => (item.type === "text" ? item.text || "" : "")).join("");
}

function shouldStoreOutput(text: string, lineCount: number): boolean {
  const bytes = Buffer.byteLength(text || "", "utf8");
  return bytes > STORE_THRESHOLD_BYTES || lineCount > STORE_THRESHOLD_LINES;
}

export function createContextBashTool(cwd: string) {
  const base = createBashTool(cwd, { operations: createTrackedBashOperations() });

  return {
    ...base,
    label: "bash",
    description: `${base.description} Large outputs are stored and summarized to save context.`,
    execute: async (toolCallId: string, params: any, signal?: AbortSignal, onUpdate?: any) => {
      const result = await base.execute(toolCallId, params, signal, onUpdate);
      const text = extractTextContent(result.content as any);
      const details: any = result.details ?? {};

      let fullOutput = text;
      if (details.fullOutputPath && existsSync(details.fullOutputPath)) {
        const fileText = readToolOutputFile(details.fullOutputPath);
        if (fileText !== null) fullOutput = fileText;
      }

      const lineCount = fullOutput ? fullOutput.replace(/\r\n/g, "\n").split("\n").length : 0;
      if (!shouldStoreOutput(fullOutput, lineCount)) {
        return result;
      }

      const preview = buildPreview(fullOutput, PREVIEW_LINES, PREVIEW_LINE_CHARS);
      const saved = saveToolOutput(fullOutput, {
        source: `bash:${params.command}`,
        summary: preview,
      });

      const summaryText = [
        `Output stored as tool-output:${saved.id} (${saved.lineCount} lines, ${formatBytes(saved.sizeBytes)}).`,
        preview ? `Preview:\n${preview}` : null,
        `Use tool_output_search with handle "${saved.id}" and a query to retrieve relevant snippets.`,
      ]
        .filter(Boolean)
        .join("\n\n");

      return {
        content: [{ type: "text", text: summaryText }],
        details: {
          storedOutputId: saved.id,
          storedOutputPath: saved.path,
          storedOutputLines: saved.lineCount,
          storedOutputBytes: saved.sizeBytes,
        },
      };
    },
  };
}

export function createToolOutputSearchTool() {
  return {
    name: "tool_output_search",
    label: "tool_output_search",
    description: "Search stored tool output by handle and query, returning compact snippets.",
    parameters: Type.Object({
      handle: Type.String({ description: "Tool output handle, e.g. out_..." }),
      query: Type.String({ description: "Search query" }),
      limit: Type.Optional(Type.Number({ description: "Max snippets to return", default: 5 })),
    }),
    execute: async (_toolCallId: string, params: { handle: string; query: string; limit?: number }) => {
      const handle = params.handle.trim();
      const query = params.query.trim();
      const limit = params.limit && params.limit > 0 ? Math.floor(params.limit) : 5;

      const record = getToolOutput(handle);
      if (!record) {
        return { content: [{ type: "text", text: `No tool output found for handle ${handle}.` }], details: {} };
      }

      const snippets = searchToolOutput(handle, query, limit);
      if (snippets.length === 0) {
        const meta = `${record.line_count ?? 0} lines, ${formatBytes(record.size_bytes ?? 0)}`;
        return {
          content: [{ type: "text", text: `No matches for "${query}" in tool-output:${handle} (${meta}).` }],
          details: {},
        };
      }

      const lines = snippets.map((snippet) => `• ${snippet}`);
      const meta = `${record.line_count ?? 0} lines, ${formatBytes(record.size_bytes ?? 0)}`;
      const text = [
        `Matches for "${query}" in tool-output:${handle} (${meta}):`,
        ...lines,
        "Use a more specific query to narrow results if needed.",
      ].join("\n");

      return { content: [{ type: "text", text }], details: {} };
    },
  };
}

export function createBatchExecTool(cwd: string, bashTool = createContextBashTool(cwd)) {
  const base = bashTool;
  return {
    name: "batch_exec",
    label: "batch_exec",
    description: "Run multiple shell commands and return concise summaries for each.",
    parameters: Type.Object({
      commands: Type.Array(Type.String({ description: "Shell commands to execute" })),
      timeout: Type.Optional(Type.Number({ description: "Timeout in seconds per command" })),
    }),
    execute: async (_toolCallId: string, params: { commands: string[]; timeout?: number }) => {
      const outputs: string[] = [];
      for (const command of params.commands || []) {
        try {
          const result = await base.execute("", { command, timeout: params.timeout }, undefined, undefined);
          const text = extractTextContent(result.content as any).trim() || "(no output)";
          outputs.push(`Command: ${command}\n${text}`);
        } catch (err) {
          const message = err instanceof Error ? err.message : String(err);
          outputs.push(`Command: ${command}\nError: ${message}`);
        }
      }
      const joined = outputs.join("\n\n");
      return { content: [{ type: "text", text: joined }], details: {} };
    },
  };
}

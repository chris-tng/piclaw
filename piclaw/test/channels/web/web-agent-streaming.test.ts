import { describe, test, expect } from "bun:test";
import { AgentQueue } from "../../../src/queue.js";
import { WebChannel } from "../../../src/channels/web.js";
import { initDatabase } from "../../../src/db.js";
import { getTestWorkspace, setEnv } from "../../helpers.js";

function makeEvent(type: string, payload: Record<string, unknown> = {}) {
  return { type, ...payload } as any;
}

describe("web agent streaming", () => {
  test("processChat broadcasts streaming events and stores turns", async () => {
    const ws = getTestWorkspace();
    const restoreEnv = setEnv({
      PICLAW_WORKSPACE: ws.workspace,
      PICLAW_STORE: ws.store,
      PICLAW_DATA: ws.data,
    });
    initDatabase();

    const events: Array<{ type: string; data: any }> = [];

    const agentPool = {
      setSessionBinder: () => {},
      runAgent: async (_prompt: string, _chatJid: string, options: any) => {
        options.onEvent?.(makeEvent("message_update", {
          assistantMessageEvent: { type: "thinking_start" },
        }));
        options.onEvent?.(makeEvent("message_update", {
          assistantMessageEvent: { type: "thinking_delta", delta: "Thinking..." },
        }));
        options.onEvent?.(makeEvent("message_update", {
          assistantMessageEvent: { type: "thinking_end", content: "Thinking..." },
        }));
        options.onEvent?.(makeEvent("message_update", {
          assistantMessageEvent: {
            type: "toolcall_end",
            toolCall: { id: "tool-1", name: "bash", arguments: { command: "echo hi" } },
          },
        }));
        options.onEvent?.(makeEvent("tool_execution_start", {
          toolCallId: "tool-1",
          toolName: "bash",
          args: { command: "echo hi" },
        }));
        options.onEvent?.(makeEvent("tool_execution_update", {
          toolCallId: "tool-1",
          toolName: "bash",
          args: { command: "echo hi" },
        }));
        options.onEvent?.(makeEvent("tool_execution_end", {
          toolCallId: "tool-1",
          toolName: "bash",
          isError: false,
        }));
        options.onEvent?.(makeEvent("message_update", {
          assistantMessageEvent: { type: "text_start" },
        }));
        options.onEvent?.(makeEvent("message_update", {
          assistantMessageEvent: { type: "text_delta", delta: "Partial" },
        }));
        options.onTurnComplete?.({ text: "intermediate", attachments: [] });
        options.onEvent?.(makeEvent("message_update", {
          assistantMessageEvent: { type: "text_delta", delta: " final" },
        }));

        return { status: "success", result: "final response", attachments: [] };
      },
    } as any;

    const channel = new WebChannel({ queue: new AgentQueue(), agentPool });
    channel.broadcastEvent = (type: string, data: unknown) => {
      events.push({ type, data });
    };

    const interaction = channel.storeMessage("web:default", "hello", false, []);
    expect(interaction).not.toBeNull();

    await channel.processChat("web:default", "default");

    const eventTypes = events.map((event) => event.type);
    expect(eventTypes).toContain("agent_status");
    expect(eventTypes).toContain("agent_thought");
    expect(eventTypes).toContain("agent_draft");
    expect(eventTypes).toContain("agent_draft_delta");
    expect(eventTypes).toContain("agent_response");

    const toolStatus = events.find(
      (event) => event.type === "agent_status" && event.data?.type === "tool_status"
    );
    expect(toolStatus).toBeDefined();

    const responses = events.filter((event) => event.type === "agent_response");
    expect(responses.length).toBeGreaterThanOrEqual(2);

    const done = events.find(
      (event) => event.type === "agent_status" && event.data?.type === "done"
    );
    expect(done).toBeDefined();

    restoreEnv();
  });
});

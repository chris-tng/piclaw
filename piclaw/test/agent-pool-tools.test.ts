import { expect, test } from "bun:test";

import type { ModelRegistry } from "@mariozechner/pi-coding-agent";
import { AttachmentRegistry } from "../src/agent-pool/attachments.js";
import { createSessionTools } from "../src/agent-pool/tools.js";
import { createTrackedBashOperations } from "../src/tools/tracked-bash.js";
import { getTestWorkspace } from "./helpers.js";

test("createSessionTools returns base and custom tools", () => {
  const ws = getTestWorkspace();
  const registry = new AttachmentRegistry();
  const modelRegistry = { refresh: () => undefined, getAll: () => [] } as unknown as ModelRegistry;
  const { tools, customTools } = createSessionTools(
    ws.workspace,
    createTrackedBashOperations(),
    "web:default",
    registry,
    modelRegistry,
    () => undefined
  );

  expect(tools.length).toBe(4);
  expect(customTools.length).toBe(6);
  const names = customTools.map((tool) => tool.name).sort();
  expect(names).toEqual(["attach_file", "get_model_state", "list_models", "search_messages", "switch_model", "switch_thinking"]);
});

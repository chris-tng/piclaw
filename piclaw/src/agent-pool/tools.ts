import {
  createBashTool,
  createEditTool,
  createReadTool,
  createWriteTool,
  type AgentSession,
  type BashOperations,
  type ModelRegistry,
  type ToolDefinition,
} from "@mariozechner/pi-coding-agent";

import { createAttachmentTool, type AttachmentRegistry } from "./attachments.js";
import { createMessageSearchTool } from "./message-search.js";
import { createModelListTool } from "./model-list.js";
import { createModelStateTool } from "./model-state.js";
import { createModelSwitchTool } from "./model-switch.js";
import { createThinkingSwitchTool } from "./thinking-switch.js";

export function createSessionTools(
  workspaceDir: string,
  bashOperations: BashOperations,
  chatJid: string,
  attachments: AttachmentRegistry,
  modelRegistry: ModelRegistry,
  getSession: () => AgentSession | undefined
) {
  const tools = [
    createReadTool(workspaceDir),
    createBashTool(workspaceDir, { operations: bashOperations }),
    createEditTool(workspaceDir),
    createWriteTool(workspaceDir),
  ];
  const customTools: ToolDefinition[] = [
    createAttachmentTool(chatJid, attachments) as unknown as ToolDefinition,
    createMessageSearchTool(chatJid) as unknown as ToolDefinition,
    createModelListTool(modelRegistry, () => getSession()?.model) as unknown as ToolDefinition,
    createModelStateTool(getSession) as unknown as ToolDefinition,
    createModelSwitchTool(getSession, modelRegistry) as unknown as ToolDefinition,
    createThinkingSwitchTool(getSession) as unknown as ToolDefinition,
  ];

  return { tools, customTools };
}

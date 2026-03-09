/**
 * extensions/index.ts – Registry of built-in extension factories.
 *
 * These factories are passed to the pi-coding-agent's DefaultResourceLoader
 * so they load automatically without needing separate files on disk.
 * Each factory registers tools and/or commands on the pi ExtensionAPI.
 *
 * Extensions registered here:
 *   - fileAttachments: attach_file tool for delivering workspace files.
 *   - messageSearch: search_messages + get_message tools for querying/retrieving chat history.
 *   - modelControl: get_model_state, list_models, switch_model, switch_thinking.
 *   - internalTools: list_internal_tools for tool discovery.
 *   - keychainTools: keychain for listing/retrieving keychain entries.
 *   - sqlIntrospect: sql_introspect for read-only DB introspection.
 *   - scheduledTasks: /tasks and /scheduled commands for task listing.
 *   - workspaceSearch: search_workspace tool for FTS over workspace files.
 *
 * Consumers:
 *   - agent-pool/session.ts passes builtinExtensionFactories to the resource loader.
 */
import type { ExtensionFactory } from "@mariozechner/pi-coding-agent";
import { fileAttachments } from "./file-attachments.js";
import { messageSearch } from "./message-search.js";
import { modelControl } from "./model-control.js";
import { internalTools } from "./internal-tools.js";
import { keychainTools } from "./keychain-tools.js";
import { sqlIntrospect } from "./sql-introspect.js";
import { scheduledTasks } from "./scheduled-tasks.js";
import { workspaceSearch } from "./workspace-search.js";

/** Array of all built-in extension factories to register on session creation. */
export const builtinExtensionFactories: ExtensionFactory[] = [
  fileAttachments,
  messageSearch,
  modelControl,
  internalTools,
  keychainTools,
  sqlIntrospect,
  scheduledTasks,
  workspaceSearch,
];

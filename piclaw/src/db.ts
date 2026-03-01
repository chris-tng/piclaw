export { initDatabase, getDb } from "./db/connection.js";
export { clampWebContent } from "./db/web-content.js";
export {
  storeChatMetadata,
  storeMessage,
  getMessageByRowId,
  deleteMessageByRowId,
  getTimeline,
  hasOlderMessages,
  getMessagesByHashtag,
  searchMessages,
  getNewMessages,
  getMessagesSince,
  updateMessageLinkPreviews,
} from "./db/messages.js";
export {
  attachMediaToMessage,
  getMediaIdsForMessage,
  createMedia,
  getMediaById,
  getMediaInfoById,
} from "./db/media.js";
export {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getDueTasks,
  updateTaskAfterRun,
  logTaskRun,
  getTaskRunLogs,
} from "./db/tasks.js";
export {
  storeToolOutput,
  insertToolOutputChunk,
  getToolOutputById,
  deleteToolOutputById,
  deleteToolOutputsBefore,
  searchToolOutputSnippets,
} from "./db/tool-outputs.js";
export { getRouterState, setRouterState } from "./db/router-state.js";
export { storeTokenUsage } from "./db/token-usage.js";
export type {
  ChatInfo,
  InteractionContentMeta,
  InteractionData,
  InteractionRow,
  MediaRecord,
  ToolOutputRecord,
} from "./db/types.js";

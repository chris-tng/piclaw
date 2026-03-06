/**
 * db.ts – Public barrel export for the database layer.
 *
 * Re-exports everything from the db/* sub-modules so consumers can import
 * from a single path:
 *   import { initDatabase, storeMessage, getTimeline, ... } from "./db.js";
 *
 * This keeps internal module boundaries hidden from the rest of the codebase.
 */

export { initDatabase, getDb } from "./db/connection.js";
export { clampWebContent } from "./db/web-content.js";
export {
  storeChatMetadata,
  storeMessage,
  getMessageByRowId,
  getMessageRowIdById,
  deleteMessageByRowId,
  deleteThreadByRowId,
  getTimeline,
  hasOlderMessages,
  getMessagesByHashtag,
  searchMessages,
  getNewMessages,
  getMessagesSince,
  updateMessageLinkPreviews,
  replaceMessageContent,
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
export {
  getChatCursor,
  getAllChatCursors,
  setChatCursor,
  beginChatRun,
  endChatRun,
  endChatRunWithError,
  getFailedRun,
  clearFailedRun,
  getInflightRuns,
  rollbackInflightRun,
} from "./db/chat-cursors.js";
export type { InflightRun, FailedRunRecord } from "./db/chat-cursors.js";
export { storeTokenUsage } from "./db/token-usage.js";
export {
  DEFAULT_PASSKEY_USER_ID,
  createWebauthnEnrollment,
  getWebauthnEnrollment,
  consumeWebauthnEnrollment,
  listWebauthnCredentials,
  getWebauthnCredentialsForRpId,
  getWebauthnCredentialById,
  findWebauthnCredentialsByPrefix,
  storeWebauthnCredential,
  updateWebauthnCredentialCounter,
  deleteWebauthnCredential,
} from "./db/webauthn.js";
export {
  DEFAULT_WEB_USER_ID,
  createWebSession,
  getWebSession,
  deleteWebSession,
  deleteExpiredWebSessions,
} from "./db/web-sessions.js";
export type {
  ChatInfo,
  InteractionContentMeta,
  InteractionData,
  InteractionRow,
  MediaRecord,
  ToolOutputRecord,
} from "./db/types.js";

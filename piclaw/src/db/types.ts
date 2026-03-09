/**
 * db/types.ts – TypeScript interfaces for database row shapes.
 *
 * These types mirror the SQLite table schemas defined in db/connection.ts and
 * are used by every module that reads or writes the database:
 *   - db/messages.ts (ChatInfo, InteractionRow, InteractionData)
 *   - db/media.ts (MediaRecord)
 *   - db/tool-outputs.ts (ToolOutputRecord)
 *   - channels/web/* (rendering interactions in the timeline)
 *   - agent-pool.ts (storing agent responses as interactions)
 *   - agent-control/handlers/* (info/search commands query interactions)
 */

/**
 * Summary of a known chat, stored in the `chats` table.
 * Used by the router and agent-control info commands.
 */
export interface ChatInfo {
  /** Unique chat identifier (WhatsApp JID or web channel id). */
  jid: string;
  /** Human-readable chat name. */
  name: string;
  /** ISO-8601 timestamp of the most recent message in this chat. */
  last_message_time: string;
}

/**
 * Metadata attached to an interaction's content field when it has been
 * truncated (e.g. large tool outputs stored as previews).
 */
export interface InteractionContentMeta {
  /** True if the content was shortened to fit storage limits. */
  truncated: boolean;
  /** True if this is a preview rather than the full content. */
  preview?: boolean;
  /** Character length of the original, un-truncated content. */
  original_length: number;
  /** Maximum character length allowed for this interaction type. */
  max_length: number;
}

/**
 * The JSON payload stored in the `data` column of the `interactions` table.
 * Represents a single turn in a conversation: user message, agent response,
 * agent request (tool call), or draft (streaming partial response).
 */
export interface InteractionData {
  /** Discriminator for the kind of interaction. */
  type: "user_message" | "agent_response" | "agent_request" | "agent_draft" | string;
  /** The text content of the interaction. */
  content: string;
  /** Optional truncation metadata (present when content was clipped). */
  content_meta?: InteractionContentMeta;
  /** ID of the pi-agent that produced this interaction (agent responses). */
  agent_id?: string;
  /** Web-channel thread id this interaction belongs to. */
  thread_id?: number | null;
  /** Array of media table IDs attached to this interaction. */
  media_ids?: number[];
  /** Rich content blocks (images, code, etc.) from the web channel. */
  content_blocks?: unknown[];
  /** OpenGraph / URL preview data attached to the message. */
  link_previews?: unknown[];
}

/**
 * A single row from the `interactions` table.
 * Returned by db/messages.ts query functions and consumed by the web timeline
 * and agent-control info/search handlers.
 */
export interface InteractionRow {
  /** Auto-increment primary key. */
  id: number;
  /** ISO-8601 timestamp of when the interaction was recorded. */
  timestamp: string;
  /** The parsed JSON payload (see InteractionData). */
  data: InteractionData;
}

/**
 * A row from the `media` table – binary file storage for images, documents,
 * and other attachments uploaded via the web channel.
 * Managed by db/media.ts and served by channels/web/handlers/media.ts.
 */
export interface MediaRecord {
  /** Auto-increment primary key. */
  id: number;
  /** Original filename of the uploaded file. */
  filename: string;
  /** MIME type (e.g. "image/png"). */
  content_type: string;
  /** Raw binary content of the file. */
  data: Uint8Array;
  /** Optional down-scaled thumbnail for image previews. */
  thumbnail: Uint8Array | null;
  /** Arbitrary metadata (dimensions, EXIF, etc.). */
  metadata: Record<string, unknown> | null;
  /** ISO-8601 timestamp of when the file was stored. */
  created_at: string;
}

/**
 * A row from the `tool_outputs` table – stores large tool invocation results
 * (bash output, file reads) that are too big to inline in the interaction
 * content. Managed by db/tool-outputs.ts with automatic retention cleanup.
 */
export interface ToolOutputRecord {
  /** UUID primary key. */
  id: string;
  /** ISO-8601 timestamp of when the output was captured. */
  created_at: string;
  /** Name of the tool that produced this output (e.g. "bash", "read"). */
  source?: string | null;
  /** Size of the full output in bytes. */
  size_bytes?: number | null;
  /** Number of lines in the full output. */
  line_count?: number | null;
  /** Short summary/preview of the output for display. */
  summary?: string | null;
  /** Filesystem path associated with the tool call (if applicable). */
  path?: string | null;
  /** The full output content (may be null if only summary is stored). */
  content?: string | null;
}

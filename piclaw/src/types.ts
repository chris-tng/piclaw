/**
 * types.ts – Shared domain types used throughout the piclaw application.
 *
 * These interfaces define the core data shapes for chats, messages, scheduled
 * tasks, and callback signatures. They are imported by most modules including
 * the database layer (db/), channels (channels/), the agent pool (agent-pool.ts),
 * the task scheduler (task-scheduler.ts), IPC (ipc.ts), and the queue (queue.ts).
 */

/**
 * Configuration for a single chat endpoint (WhatsApp group, web chat, etc.).
 * Loaded from the config file and used by the router (router.ts) to decide
 * whether to process inbound messages.
 */
export interface ChatConfig {
  /** Unique identifier for the chat (WhatsApp JID or web channel id). */
  jid: string;
  /** Human-readable name for the chat, used in logging and UI. */
  name: string;
  /** When true, the agent only responds when explicitly triggered (e.g. mentioned). */
  requiresTrigger: boolean;
}

/**
 * Represents an inbound message arriving from any channel (WhatsApp, web, scheduled task).
 * Created by channel adapters and passed to the router/queue for processing.
 */
export interface NewMessage {
  /** Unique message identifier (channel-specific format). */
  id: string;
  /** JID of the chat this message belongs to. */
  chat_jid: string;
  /** Sender identifier (phone number, user id, etc.). */
  sender: string;
  /** Display name of the sender. */
  sender_name: string;
  /** Text content of the message. */
  content: string;
  /** ISO-8601 timestamp of when the message was sent. */
  timestamp: string;
  /** True if the message was sent by the bot itself. */
  is_from_me?: boolean;
  /** True if this message originated from an automated bot action. */
  is_bot_message?: boolean;
  /** Rich content blocks (images, attachments) from the web channel. */
  content_blocks?: unknown[];
  /** OpenGraph / URL preview metadata attached to the message. */
  link_previews?: unknown[];
  /** Thread id for threaded replies in the web channel. */
  thread_id?: number | null;
}

/**
 * A scheduled task persisted in the database (db/tasks.ts).
 * Created via IPC (ipc.ts) and executed by the task scheduler (task-scheduler.ts).
 */
export interface ScheduledTask {
  /** Unique task identifier. */
  id: string;
  /** JID of the chat where results are delivered. */
  chat_jid: string;
  /** The prompt to send to the agent when the task fires. */
  prompt: string;
  /** Optional model override for this task's agent session. */
  model?: string | null;
  /** How the task recurs: cron expression, fixed interval, or one-shot. */
  schedule_type: "cron" | "interval" | "once";
  /** The cron expression, interval duration, or ISO date for one-shot tasks. */
  schedule_value: string;
  /** ISO-8601 timestamp of the next scheduled execution (null if completed). */
  next_run: string | null;
  /** ISO-8601 timestamp of the most recent execution. */
  last_run: string | null;
  /** Summary of the most recent execution result. */
  last_result: string | null;
  /** Current lifecycle state of the task. */
  status: "active" | "paused" | "completed";
  /** ISO-8601 timestamp of when the task was created. */
  created_at: string;
}

/**
 * Log entry for a single execution of a ScheduledTask.
 * Stored by db/tasks.ts and surfaced in agent-control info commands.
 */
export interface TaskRunLog {
  /** ID of the parent ScheduledTask. */
  task_id: string;
  /** ISO-8601 timestamp of when this run started. */
  run_at: string;
  /** Wall-clock duration of the run in milliseconds. */
  duration_ms: number;
  /** Whether the run completed successfully or errored. */
  status: "success" | "error";
  /** The agent's response text on success. */
  result: string | null;
  /** Error message/stack on failure. */
  error: string | null;
}

/**
 * Callback invoked by channel adapters when a new inbound message arrives.
 * Registered by the runtime (runtime.ts) and wired to the router/queue pipeline.
 */
export type OnInboundMessage = (chatJid: string, message: NewMessage) => void;

/**
 * Callback invoked by channel adapters when chat metadata (name, last-seen
 * timestamp) is updated. Used by the router to maintain chat state in the DB.
 */
export type OnChatMetadata = (chatJid: string, timestamp: string, name?: string) => void;

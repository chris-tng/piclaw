export interface ChatConfig {
  jid: string;
  name: string;
  requiresTrigger: boolean;
}

export interface NewMessage {
  id: string;
  chat_jid: string;
  sender: string;
  sender_name: string;
  content: string;
  timestamp: string;
  is_from_me?: boolean;
  is_bot_message?: boolean;
  content_blocks?: unknown[];
  link_previews?: unknown[];
}

export interface ScheduledTask {
  id: string;
  chat_jid: string;
  prompt: string;
  model?: string | null;
  schedule_type: "cron" | "interval" | "once";
  schedule_value: string;
  next_run: string | null;
  last_run: string | null;
  last_result: string | null;
  status: "active" | "paused" | "completed";
  created_at: string;
}

export interface TaskRunLog {
  task_id: string;
  run_at: string;
  duration_ms: number;
  status: "success" | "error";
  result: string | null;
  error: string | null;
}

export type OnInboundMessage = (chatJid: string, message: NewMessage) => void;
export type OnChatMetadata = (chatJid: string, timestamp: string, name?: string) => void;

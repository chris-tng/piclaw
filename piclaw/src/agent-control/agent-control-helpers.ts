import type { AgentSession } from "@mariozechner/pi-coding-agent";
import type { Model } from "@mariozechner/pi-ai";
import { existsSync } from "fs";
import { PICLAW_CONFIG_PATH } from "../core/config.js";
import { readJsonConfig, writeJsonConfig } from "../core/config-store.js";

export const THINKING_LEVELS = ["off", "minimal", "low", "medium", "high", "xhigh"] as const;

export function resolveShellCwd(): string {
  const preferred = "/workspace";
  if (existsSync(preferred)) return preferred;
  return process.cwd();
}

export function formatShellBlock(command: string, output: string, meta: string[] = []): string {
  const lines: string[] = [`$ ${command}`];
  const trimmed = output.trimEnd();
  if (trimmed) {
    lines.push(trimmed);
  } else {
    lines.push("(no output)");
  }
  if (meta.length > 0) {
    lines.push(...meta);
  }
  return ["```", ...lines, "```"].join("\n");
}

export function formatCompactNumber(value: number): string {
  if (!Number.isFinite(value)) return String(value);
  const abs = Math.abs(value);
  const format = (divisor: number, suffix: string) => {
    const raw = (value / divisor).toFixed(1);
    const trimmed = raw.endsWith(".0") ? raw.slice(0, -2) : raw;
    return `${trimmed}${suffix}`;
  };
  if (abs >= 1_000_000_000) return format(1_000_000_000, "B");
  if (abs >= 1_000_000) return format(1_000_000, "M");
  if (abs >= 1_000) return format(1_000, "K");
  return String(value);
}

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return String(value);
  if (value === 0) return "$0";
  if (Math.abs(value) < 0.01) return `$${value.toFixed(4)}`;
  return `$${value.toFixed(2)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 1))}…`;
}

export function extractTextFromContent(content: any): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((b) => b && b.type === "text")
      .map((b) => b.text)
      .join("");
  }
  return "";
}

export function updateAssistantConfig(patch: { name?: string | null; avatar?: string | null }): {
  name?: string;
  avatar?: string;
} {
  const config = readJsonConfig(PICLAW_CONFIG_PATH);
  const assistant =
    config.assistant && typeof config.assistant === "object"
      ? { ...(config.assistant as Record<string, unknown>) }
      : {};
  const nameKeys = ["assistantName", "assistant_name", "agentName", "agent_name", "name", "ASSISTANT_NAME"];
  const avatarKeys = [
    "assistantAvatar",
    "assistant_avatar",
    "agentAvatar",
    "agent_avatar",
    "avatar",
    "ASSISTANT_AVATAR",
  ];

  const clearKeys = (keys: string[]) => {
    for (const key of keys) {
      if (key in assistant) delete assistant[key];
    }
  };

  if (patch.name !== undefined) {
    clearKeys(nameKeys);
    if (patch.name !== null) {
      assistant.assistantName = patch.name;
    }
  }

  if (patch.avatar !== undefined) {
    clearKeys(avatarKeys);
    if (patch.avatar !== null) {
      assistant.assistantAvatar = patch.avatar;
    }
  }

  if (Object.keys(assistant).length > 0) {
    config.assistant = assistant;
  } else {
    delete config.assistant;
  }

  writeJsonConfig(PICLAW_CONFIG_PATH, config);

  return {
    name: typeof assistant.assistantName === "string" ? assistant.assistantName : undefined,
    avatar: typeof assistant.assistantAvatar === "string" ? assistant.assistantAvatar : undefined,
  };
}

export async function runPromptAndCapture(session: AgentSession, text: string): Promise<string> {
  let assistantBuffer = "";
  const customBuffers: string[] = [];

  const onEvent = (event: any) => {
    if (event.type === "message_update") {
      const me = event.assistantMessageEvent;
      if (me && me.type === "text_delta") {
        assistantBuffer += me.delta || "";
      }
    }
    if (event.type === "message_end") {
      const msg = event.message;
      const text = extractTextFromContent(msg.content);
      if (msg.role === "assistant") {
        assistantBuffer = text || assistantBuffer;
      } else if (text) {
        customBuffers.push(text);
      }
    }
  };

  const unsub = session.subscribe(onEvent);
  try {
    await session.prompt(text);
  } finally {
    unsub();
  }

  const finalText = (assistantBuffer && assistantBuffer.trim())
    ? assistantBuffer.trim()
    : customBuffers.join("\n\n").trim();

  return finalText || "(no output)";
}

export function normalizeModelMatch(models: Model<any>[], provider: string, modelId: string): Model<any> | undefined {
  const providerLower = provider.toLowerCase();
  const modelLower = modelId.toLowerCase();
  return models.find((model) => model.provider.toLowerCase() === providerLower && model.id.toLowerCase() === modelLower);
}

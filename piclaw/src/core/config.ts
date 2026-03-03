import { resolve } from "path";
import { existsSync } from "fs";
import { readEnvFile } from "./env.js";
import { readJsonConfig } from "./config-store.js";

const envConfig = readEnvFile([
  "PICLAW_ASSISTANT_NAME",
  "PICLAW_ASSISTANT_AVATAR",
  "ASSISTANT_NAME",
  "ASSISTANT_AVATAR",
  "PICLAW_AGENT_TIMEOUT",
  "AGENT_TIMEOUT",
  "PICLAW_BACKGROUND_AGENT_TIMEOUT",
  "AGENT_TIMEOUT_BACKGROUND",
  "PICLAW_WHATSAPP_PHONE",
  "WHATSAPP_PHONE",
  "PUSHOVER_APP_TOKEN",
  "PUSHOVER_USER_KEY",
  "PUSHOVER_DEVICE",
  "PUSHOVER_PRIORITY",
  "PUSHOVER_SOUND",
  "PICLAW_WEB_TLS_CERT",
  "PICLAW_WEB_TLS_KEY",
]);

function pickString(config: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = config[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

function pickNumber(config: Record<string, unknown>, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = config[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim()) {
      const parsed = parseInt(value, 10);
      if (!Number.isNaN(parsed)) return parsed;
    }
  }
  return undefined;
}

export const POLL_INTERVAL = 2000;
export const SCHEDULER_POLL_INTERVAL = 60000;

// All paths are env-configurable so they work with any volume layout.
// Defaults assume /workspace is the persistent external volume.
export const WORKSPACE_DIR = resolve(process.env.PICLAW_WORKSPACE || "/workspace");
export const STORE_DIR = resolve(process.env.PICLAW_STORE || `${WORKSPACE_DIR}/.piclaw/store`);
export const DATA_DIR = resolve(process.env.PICLAW_DATA || `${WORKSPACE_DIR}/.piclaw/data`);

const DEFAULT_TLS_CERT_PATH = resolve(WORKSPACE_DIR, ".piclaw", "certs", "sandbox.local.crt");
const DEFAULT_TLS_KEY_PATH = resolve(WORKSPACE_DIR, ".piclaw", "certs", "sandbox.local.key");
const HAS_DEFAULT_TLS = existsSync(DEFAULT_TLS_CERT_PATH) && existsSync(DEFAULT_TLS_KEY_PATH);

export const PICLAW_CONFIG_PATH = resolve(WORKSPACE_DIR, ".piclaw", "config.json");
const piclawConfig = readJsonConfig(PICLAW_CONFIG_PATH);
const pushoverConfig =
  piclawConfig.pushover && typeof piclawConfig.pushover === "object"
    ? (piclawConfig.pushover as Record<string, unknown>)
    : piclawConfig;
const assistantConfig =
  piclawConfig.assistant && typeof piclawConfig.assistant === "object"
    ? (piclawConfig.assistant as Record<string, unknown>)
    : piclawConfig;
const configAppToken = pickString(pushoverConfig, ["appToken", "app_token", "PUSHOVER_APP_TOKEN"]);
const configUserKey = pickString(pushoverConfig, ["userKey", "user_key", "PUSHOVER_USER_KEY"]);
const configDevice = pickString(pushoverConfig, ["device", "PUSHOVER_DEVICE"]);
const configSound = pickString(pushoverConfig, ["sound", "PUSHOVER_SOUND"]);
const configPriority = pickNumber(pushoverConfig, ["priority", "PUSHOVER_PRIORITY"]);
const configWhatsappPhone = pickString(piclawConfig, ["whatsappPhone", "whatsapp_phone", "WHATSAPP_PHONE"]);
const configAssistantName = pickString(assistantConfig, [
  "assistantName",
  "assistant_name",
  "agentName",
  "agent_name",
  "name",
  "ASSISTANT_NAME",
]);
const configAssistantAvatar = pickString(assistantConfig, [
  "assistantAvatar",
  "assistant_avatar",
  "agentAvatar",
  "agent_avatar",
  "avatar",
  "ASSISTANT_AVATAR",
]);

function warnDeprecatedEnv(oldName: string, newName: string): void {
  const oldValue = process.env[oldName] ?? envConfig[oldName];
  const newValue = process.env[newName] ?? envConfig[newName];
  if (oldValue && !newValue) {
    console.warn(`[config] ${oldName} is deprecated; use ${newName}.`);
  }
}

warnDeprecatedEnv("ASSISTANT_NAME", "PICLAW_ASSISTANT_NAME");
warnDeprecatedEnv("ASSISTANT_AVATAR", "PICLAW_ASSISTANT_AVATAR");
warnDeprecatedEnv("AGENT_TIMEOUT", "PICLAW_AGENT_TIMEOUT");
warnDeprecatedEnv("AGENT_TIMEOUT_BACKGROUND", "PICLAW_BACKGROUND_AGENT_TIMEOUT");

export let ASSISTANT_NAME =
  process.env.PICLAW_ASSISTANT_NAME ||
  envConfig.PICLAW_ASSISTANT_NAME ||
  process.env.ASSISTANT_NAME ||
  envConfig.ASSISTANT_NAME ||
  configAssistantName ||
  "PiClaw";
export let ASSISTANT_AVATAR =
  process.env.PICLAW_ASSISTANT_AVATAR ||
  envConfig.PICLAW_ASSISTANT_AVATAR ||
  process.env.ASSISTANT_AVATAR ||
  envConfig.ASSISTANT_AVATAR ||
  configAssistantAvatar ||
  "";

export const AGENT_TIMEOUT = parseInt(
  process.env.PICLAW_AGENT_TIMEOUT ||
    envConfig.PICLAW_AGENT_TIMEOUT ||
    process.env.AGENT_TIMEOUT ||
    envConfig.AGENT_TIMEOUT ||
    "1800000",
  10
); // 30min default
export const BACKGROUND_AGENT_TIMEOUT = parseInt(
  process.env.PICLAW_BACKGROUND_AGENT_TIMEOUT ||
    envConfig.PICLAW_BACKGROUND_AGENT_TIMEOUT ||
    process.env.AGENT_TIMEOUT_BACKGROUND ||
    envConfig.AGENT_TIMEOUT_BACKGROUND ||
    "0",
  10
);
export const IPC_POLL_INTERVAL = 1000;

const CLI_ARGS = process.argv.slice(2);

function readCliArg(name: string, alias?: string): string | undefined {
  const names = [name, alias].filter(Boolean) as string[];
  for (let i = 0; i < CLI_ARGS.length; i += 1) {
    const arg = CLI_ARGS[i];
    for (const flag of names) {
      if (arg === flag) {
        return CLI_ARGS[i + 1];
      }
      if (arg.startsWith(`${flag}=`)) {
        return arg.slice(flag.length + 1);
      }
    }
  }
  return undefined;
}

function parsePort(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

const ENV_WEB_PORT = parseInt(process.env.PICLAW_WEB_PORT || "8080", 10);
const CLI_WEB_PORT = readCliArg("--port", "-p");
const CLI_WEB_HOST = readCliArg("--host");
const ENV_WEB_IDLE_TIMEOUT = parseInt(process.env.PICLAW_WEB_IDLE_TIMEOUT || "0", 10);
const CLI_WEB_IDLE_TIMEOUT = readCliArg("--idle-timeout");
const CLI_WEB_TLS_CERT = readCliArg("--tls-cert");
const CLI_WEB_TLS_KEY = readCliArg("--tls-key");

export const WEB_PORT = parsePort(CLI_WEB_PORT, ENV_WEB_PORT);
export const WEB_HOST = CLI_WEB_HOST || process.env.PICLAW_WEB_HOST || "0.0.0.0";
export const WEB_IDLE_TIMEOUT = parsePort(CLI_WEB_IDLE_TIMEOUT, ENV_WEB_IDLE_TIMEOUT);
export const WEB_TLS_CERT =
  CLI_WEB_TLS_CERT ||
  process.env.PICLAW_WEB_TLS_CERT ||
  envConfig.PICLAW_WEB_TLS_CERT ||
  (HAS_DEFAULT_TLS ? DEFAULT_TLS_CERT_PATH : "");
export const WEB_TLS_KEY =
  CLI_WEB_TLS_KEY ||
  process.env.PICLAW_WEB_TLS_KEY ||
  envConfig.PICLAW_WEB_TLS_KEY ||
  (HAS_DEFAULT_TLS ? DEFAULT_TLS_KEY_PATH : "");

export const SESSIONS_DIR = resolve(DATA_DIR, "sessions");

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export let TRIGGER_PATTERN = new RegExp(`(?:^|\\s)@${escapeRegex(ASSISTANT_NAME)}\\b`, "i");
export const TIMEZONE = process.env.TZ || Intl.DateTimeFormat().resolvedOptions().timeZone;

export function setAssistantName(name: string): void {
  ASSISTANT_NAME = name.trim() || "PiClaw";
  TRIGGER_PATTERN = new RegExp(`(?:^|\\s)@${escapeRegex(ASSISTANT_NAME)}\\b`, "i");
}

export function setAssistantAvatar(avatar: string): void {
  ASSISTANT_AVATAR = avatar.trim();
}

export const TOOL_OUTPUT_RETENTION_DAYS = parseInt(process.env.PICLAW_TOOL_OUTPUT_RETENTION_DAYS || "30", 10);
export const TOOL_OUTPUT_CLEANUP_INTERVAL_MS = parseInt(
  process.env.PICLAW_TOOL_OUTPUT_CLEANUP_INTERVAL_MS || String(12 * 60 * 60 * 1000),
  10
);

export const WHATSAPP_PHONE =
  process.env.WHATSAPP_PHONE ||
  envConfig.WHATSAPP_PHONE ||
  process.env.PICLAW_WHATSAPP_PHONE ||
  envConfig.PICLAW_WHATSAPP_PHONE ||
  configWhatsappPhone ||
  "";

// Pushover notification channel
export const PUSHOVER_APP_TOKEN = process.env.PUSHOVER_APP_TOKEN || envConfig.PUSHOVER_APP_TOKEN || configAppToken || "";
export const PUSHOVER_USER_KEY = process.env.PUSHOVER_USER_KEY || envConfig.PUSHOVER_USER_KEY || configUserKey || "";
export const PUSHOVER_DEVICE = process.env.PUSHOVER_DEVICE || envConfig.PUSHOVER_DEVICE || configDevice || "";
export const PUSHOVER_PRIORITY = parseInt(
  process.env.PUSHOVER_PRIORITY || envConfig.PUSHOVER_PRIORITY || (configPriority !== undefined ? String(configPriority) : "0"),
  10
);
export const PUSHOVER_SOUND = process.env.PUSHOVER_SOUND || envConfig.PUSHOVER_SOUND || configSound || "";

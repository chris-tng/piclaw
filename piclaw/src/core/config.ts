/**
 * core/config.ts – Centralised application configuration.
 *
 * All runtime settings are resolved here from three sources (in priority
 * order): CLI arguments, environment variables / `.env` file, and the JSON
 * config file at `<workspace>/.piclaw/config.json`.
 *
 * The exported constants and mutable variables are consumed throughout the
 * application:
 *   - WORKSPACE_DIR / STORE_DIR / DATA_DIR → db/, ipc.ts, task-scheduler.ts
 *   - WEB_* → channels/web.ts (HTTP/TLS server setup, auth)
 *   - ASSISTANT_NAME / ASSISTANT_AVATAR → agent-pool.ts, channels/formatting.ts
 *   - WHATSAPP_PHONE → channels/whatsapp.ts
 *   - PUSHOVER_* → channels/pushover.ts
 *   - AGENT_TIMEOUT / BACKGROUND_AGENT_TIMEOUT → agent-pool.ts, runtime.ts
 *   - TRIGGER_PATTERN → router.ts (decides whether to process a message)
 *   - TOOL_OUTPUT_* → db/tool-outputs.ts (retention / cleanup scheduling)
 *
 * Setter functions (setAssistantName, etc.) allow the agent-control layer to
 * update identity settings at runtime without a restart.
 */

import { resolve } from "path";
import { existsSync } from "fs";
import { readEnvFile } from "./env.js";
import { readJsonConfig } from "./config-store.js";

// ---------------------------------------------------------------------------
// .env file – loaded once at module init and merged with process.env below.
// ---------------------------------------------------------------------------
const envConfig = readEnvFile([
  "PICLAW_ASSISTANT_NAME",
  "PICLAW_ASSISTANT_AVATAR",
  "PICLAW_USER_NAME",
  "PICLAW_USER_AVATAR",
  "PICLAW_USER_AVATAR_BACKGROUND",
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
  "PICLAW_WEB_TOTP_SECRET",
  "PICLAW_WEB_TOTP_WINDOW",
  "PICLAW_WEB_SESSION_TTL",
  "PICLAW_WEB_INTERNAL_SECRET",
  "PICLAW_INTERNAL_SECRET",
]);

// ---------------------------------------------------------------------------
// Helpers for extracting typed values from a config object.
// ---------------------------------------------------------------------------

/** Return the first non-empty string value found under the given keys. */
function pickString(config: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = config[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

/** Return the first finite numeric value found under the given keys (strings are parsed). */
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

// ---------------------------------------------------------------------------
// Timing constants used by the runtime message loop and scheduler.
// ---------------------------------------------------------------------------

/** How often the router polls for new messages (ms). Used by runtime.ts. */
export const POLL_INTERVAL = 2000;
/** How often the task scheduler checks for due tasks (ms). Used by task-scheduler.ts. */
export const SCHEDULER_POLL_INTERVAL = 60000;

// ---------------------------------------------------------------------------
// Filesystem paths – all env-configurable for flexible volume layouts.
// Defaults assume /workspace is the persistent external volume.
// ---------------------------------------------------------------------------

/** Root of the persistent workspace (bind-mounted volume). */
export const WORKSPACE_DIR = resolve(process.env.PICLAW_WORKSPACE || "/workspace");
/** Directory for the SQLite database and related state. */
export const STORE_DIR = resolve(process.env.PICLAW_STORE || `${WORKSPACE_DIR}/.piclaw/store`);
/** Directory for runtime data (sessions, IPC files, etc.). */
export const DATA_DIR = resolve(process.env.PICLAW_DATA || `${WORKSPACE_DIR}/.piclaw/data`);

// ---------------------------------------------------------------------------
// TLS – optional HTTPS support for the web channel.
// ---------------------------------------------------------------------------

const DEFAULT_TLS_CERT_PATH = resolve(WORKSPACE_DIR, ".piclaw", "certs", "sandbox.local.crt");
const DEFAULT_TLS_KEY_PATH = resolve(WORKSPACE_DIR, ".piclaw", "certs", "sandbox.local.key");
/** True when default self-signed TLS certificates exist on disk. */
const HAS_DEFAULT_TLS = existsSync(DEFAULT_TLS_CERT_PATH) && existsSync(DEFAULT_TLS_KEY_PATH);

// ---------------------------------------------------------------------------
// JSON config file – loaded once and merged with env/CLI values below.
// ---------------------------------------------------------------------------

/** Absolute path to the JSON config file. */
export const PICLAW_CONFIG_PATH = resolve(WORKSPACE_DIR, ".piclaw", "config.json");
const piclawConfig = readJsonConfig(PICLAW_CONFIG_PATH);

// Sub-objects inside the config file for namespaced settings.
const pushoverConfig =
  piclawConfig.pushover && typeof piclawConfig.pushover === "object"
    ? (piclawConfig.pushover as Record<string, unknown>)
    : piclawConfig;
const assistantConfig =
  piclawConfig.assistant && typeof piclawConfig.assistant === "object"
    ? (piclawConfig.assistant as Record<string, unknown>)
    : piclawConfig;
const userConfig =
  piclawConfig.user && typeof piclawConfig.user === "object"
    ? (piclawConfig.user as Record<string, unknown>)
    : piclawConfig;
const webConfig =
  piclawConfig.web && typeof piclawConfig.web === "object"
    ? (piclawConfig.web as Record<string, unknown>)
    : piclawConfig;

// Extract individual settings from the JSON config, trying multiple key aliases.
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
const configUserName = pickString(userConfig, [
  "userName",
  "user_name",
  "name",
  "PICLAW_USER_NAME",
]);
const configUserAvatar = pickString(userConfig, [
  "userAvatar",
  "user_avatar",
  "avatar",
  "PICLAW_USER_AVATAR",
]);
const configUserAvatarBackground = pickString(userConfig, [
  "userAvatarBackground",
  "user_avatar_background",
  "userAvatarBg",
  "user_avatar_bg",
  "avatarBackground",
  "avatar_background",
  "PICLAW_USER_AVATAR_BACKGROUND",
]);
const configWebTotpSecret = pickString(webConfig, [
  "totpSecret",
  "totp_secret",
  "webTotpSecret",
  "web_totp_secret",
  "PICLAW_WEB_TOTP_SECRET",
  "PICLAW_TOTP_SECRET",
]);
const configWebTotpWindow = pickNumber(webConfig, [
  "totpWindow",
  "totp_window",
  "webTotpWindow",
  "web_totp_window",
  "PICLAW_WEB_TOTP_WINDOW",
]);
const configWebSessionTtl = pickNumber(webConfig, [
  "sessionTtl",
  "session_ttl",
  "webSessionTtl",
  "web_session_ttl",
  "PICLAW_WEB_SESSION_TTL",
]);
const configWebInternalSecret = pickString(webConfig, [
  "internalSecret",
  "internal_secret",
  "webInternalSecret",
  "web_internal_secret",
  "PICLAW_WEB_INTERNAL_SECRET",
  "PICLAW_INTERNAL_SECRET",
]);

// ---------------------------------------------------------------------------
// Deprecation warnings for renamed environment variables.
// ---------------------------------------------------------------------------

/** Emit a console warning if only the old env var name is set. */
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

// ---------------------------------------------------------------------------
// Mutable identity settings – can be changed at runtime via agent-control.
// ---------------------------------------------------------------------------

/** Display name of the assistant. Updated by setAssistantName(). */
export let ASSISTANT_NAME =
  process.env.PICLAW_ASSISTANT_NAME ||
  envConfig.PICLAW_ASSISTANT_NAME ||
  process.env.ASSISTANT_NAME ||
  envConfig.ASSISTANT_NAME ||
  configAssistantName ||
  "PiClaw";

/** URL or path to the assistant's avatar image. Updated by setAssistantAvatar(). */
export let ASSISTANT_AVATAR =
  process.env.PICLAW_ASSISTANT_AVATAR ||
  envConfig.PICLAW_ASSISTANT_AVATAR ||
  process.env.ASSISTANT_AVATAR ||
  envConfig.ASSISTANT_AVATAR ||
  configAssistantAvatar ||
  "";

/** Display name for the human user in the web UI. */
export let USER_NAME =
  process.env.PICLAW_USER_NAME ||
  envConfig.PICLAW_USER_NAME ||
  configUserName ||
  "";

/** URL or path to the user's avatar image. */
export let USER_AVATAR =
  process.env.PICLAW_USER_AVATAR ||
  envConfig.PICLAW_USER_AVATAR ||
  configUserAvatar ||
  "";

/** CSS background colour for the user avatar circle. */
export let USER_AVATAR_BACKGROUND =
  process.env.PICLAW_USER_AVATAR_BACKGROUND ||
  envConfig.PICLAW_USER_AVATAR_BACKGROUND ||
  configUserAvatarBackground ||
  "";

// ---------------------------------------------------------------------------
// Agent timeout settings – how long a single agent turn may run.
// ---------------------------------------------------------------------------

/** Max duration (ms) for a foreground agent turn. Default 30 minutes. */
export const AGENT_TIMEOUT = parseInt(
  process.env.PICLAW_AGENT_TIMEOUT ||
    envConfig.PICLAW_AGENT_TIMEOUT ||
    process.env.AGENT_TIMEOUT ||
    envConfig.AGENT_TIMEOUT ||
    "1800000",
  10
); // 30min default

/** Max duration (ms) for background (scheduled) agent turns. 0 = use AGENT_TIMEOUT. */
export const BACKGROUND_AGENT_TIMEOUT = parseInt(
  process.env.PICLAW_BACKGROUND_AGENT_TIMEOUT ||
    envConfig.PICLAW_BACKGROUND_AGENT_TIMEOUT ||
    process.env.AGENT_TIMEOUT_BACKGROUND ||
    envConfig.AGENT_TIMEOUT_BACKGROUND ||
    "0",
  10
);

/** How often (ms) the IPC watcher polls for new task files. */
export const IPC_POLL_INTERVAL = 1000;

// ---------------------------------------------------------------------------
// CLI argument parsing helpers.
// ---------------------------------------------------------------------------

const CLI_ARGS = process.argv.slice(2);

/** Read a CLI flag value, e.g. `--port 3000` or `--port=3000`. */
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

/** Parse a numeric port string, falling back to `fallback` on failure. */
function parsePort(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

// ---------------------------------------------------------------------------
// Web channel configuration (HTTP server, TLS, auth).
// ---------------------------------------------------------------------------

const ENV_WEB_PORT = parseInt(process.env.PICLAW_WEB_PORT || "8080", 10);
const CLI_WEB_PORT = readCliArg("--port", "-p");
const CLI_WEB_HOST = readCliArg("--host");
const ENV_WEB_IDLE_TIMEOUT = parseInt(process.env.PICLAW_WEB_IDLE_TIMEOUT || "0", 10);
const CLI_WEB_IDLE_TIMEOUT = readCliArg("--idle-timeout");
const CLI_WEB_TLS_CERT = readCliArg("--tls-cert");
const CLI_WEB_TLS_KEY = readCliArg("--tls-key");

/** TCP port for the web UI / API server. */
export const WEB_PORT = parsePort(CLI_WEB_PORT, ENV_WEB_PORT);
/** Bind address for the web server (defaults to all interfaces). */
export const WEB_HOST = CLI_WEB_HOST || process.env.PICLAW_WEB_HOST || "0.0.0.0";
/** Idle timeout (seconds) for HTTP connections. 0 = no timeout. */
export const WEB_IDLE_TIMEOUT = parsePort(CLI_WEB_IDLE_TIMEOUT, ENV_WEB_IDLE_TIMEOUT);

/** Path to the TLS certificate file (empty string = plain HTTP). */
export const WEB_TLS_CERT =
  CLI_WEB_TLS_CERT ||
  process.env.PICLAW_WEB_TLS_CERT ||
  envConfig.PICLAW_WEB_TLS_CERT ||
  (HAS_DEFAULT_TLS ? DEFAULT_TLS_CERT_PATH : "");
/** Path to the TLS private key file. */
export const WEB_TLS_KEY =
  CLI_WEB_TLS_KEY ||
  process.env.PICLAW_WEB_TLS_KEY ||
  envConfig.PICLAW_WEB_TLS_KEY ||
  (HAS_DEFAULT_TLS ? DEFAULT_TLS_KEY_PATH : "");

/** TOTP secret for web UI login (empty = auth disabled). Used by channels/web/auth.ts. */
export const WEB_TOTP_SECRET =
  process.env.PICLAW_WEB_TOTP_SECRET ||
  envConfig.PICLAW_WEB_TOTP_SECRET ||
  configWebTotpSecret ||
  "";
/** Number of 30-second windows to accept around the current TOTP code. */
export const WEB_TOTP_WINDOW = parseInt(
  process.env.PICLAW_WEB_TOTP_WINDOW ||
    envConfig.PICLAW_WEB_TOTP_WINDOW ||
    (configWebTotpWindow !== undefined ? String(configWebTotpWindow) : "1"),
  10
);
/** Session cookie lifetime in seconds (default 7 days). */
export const WEB_SESSION_TTL = parseInt(
  process.env.PICLAW_WEB_SESSION_TTL ||
    envConfig.PICLAW_WEB_SESSION_TTL ||
    (configWebSessionTtl !== undefined ? String(configWebSessionTtl) : String(7 * 24 * 60 * 60)),
  10
);
/** Shared secret for internal API calls between services. */
export const WEB_INTERNAL_SECRET =
  process.env.PICLAW_INTERNAL_SECRET ||
  process.env.PICLAW_WEB_INTERNAL_SECRET ||
  envConfig.PICLAW_INTERNAL_SECRET ||
  envConfig.PICLAW_WEB_INTERNAL_SECRET ||
  configWebInternalSecret ||
  "";

/** Directory for WhatsApp session auth files. */
export const SESSIONS_DIR = resolve(DATA_DIR, "sessions");

// ---------------------------------------------------------------------------
// Trigger pattern – used by router.ts to decide if a message mentions the bot.
// ---------------------------------------------------------------------------

/** Escape special regex characters in a literal string. */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Regex that matches `@AssistantName` at the start or after whitespace. */
export let TRIGGER_PATTERN = new RegExp(`(?:^|\\s)@${escapeRegex(ASSISTANT_NAME)}\\b`, "i");

/** IANA timezone string for the runtime environment (used by scheduler formatting). */
export const TIMEZONE = process.env.TZ || Intl.DateTimeFormat().resolvedOptions().timeZone;

// ---------------------------------------------------------------------------
// Runtime setters – called by agent-control handlers to update identity.
// ---------------------------------------------------------------------------

/** Update the assistant's display name and re-derive the trigger pattern. */
export function setAssistantName(name: string): void {
  ASSISTANT_NAME = name.trim() || "PiClaw";
  TRIGGER_PATTERN = new RegExp(`(?:^|\\s)@${escapeRegex(ASSISTANT_NAME)}\\b`, "i");
}

/** Update the assistant's avatar URL/path. */
export function setAssistantAvatar(avatar: string): void {
  ASSISTANT_AVATAR = avatar.trim();
}

/** Update the human user's display name. */
export function setUserName(name: string): void {
  USER_NAME = name.trim();
}

/** Update the human user's avatar URL/path. */
export function setUserAvatar(avatar: string): void {
  USER_AVATAR = avatar.trim();
}

/** Update the human user's avatar background colour. */
export function setUserAvatarBackground(background: string): void {
  USER_AVATAR_BACKGROUND = background.trim();
}

// ---------------------------------------------------------------------------
// Tool output retention settings – used by db/tool-outputs.ts.
// ---------------------------------------------------------------------------

/** Number of days to keep tool output records before automatic cleanup. */
export const TOOL_OUTPUT_RETENTION_DAYS = parseInt(process.env.PICLAW_TOOL_OUTPUT_RETENTION_DAYS || "30", 10);
/** Interval (ms) between automatic tool-output cleanup runs. Default 12 hours. */
export const TOOL_OUTPUT_CLEANUP_INTERVAL_MS = parseInt(
  process.env.PICLAW_TOOL_OUTPUT_CLEANUP_INTERVAL_MS || String(12 * 60 * 60 * 1000),
  10
);

// ---------------------------------------------------------------------------
// WhatsApp channel settings.
// ---------------------------------------------------------------------------

/** Phone number for the WhatsApp channel (empty = WhatsApp disabled). */
export const WHATSAPP_PHONE =
  process.env.WHATSAPP_PHONE ||
  envConfig.WHATSAPP_PHONE ||
  process.env.PICLAW_WHATSAPP_PHONE ||
  envConfig.PICLAW_WHATSAPP_PHONE ||
  configWhatsappPhone ||
  "";

// ---------------------------------------------------------------------------
// Pushover notification channel settings.
// ---------------------------------------------------------------------------

/** Pushover API application token. */
export const PUSHOVER_APP_TOKEN = process.env.PUSHOVER_APP_TOKEN || envConfig.PUSHOVER_APP_TOKEN || configAppToken || "";
/** Pushover user/group key. */
export const PUSHOVER_USER_KEY = process.env.PUSHOVER_USER_KEY || envConfig.PUSHOVER_USER_KEY || configUserKey || "";
/** Pushover target device name (empty = all devices). */
export const PUSHOVER_DEVICE = process.env.PUSHOVER_DEVICE || envConfig.PUSHOVER_DEVICE || configDevice || "";
/** Pushover notification priority (-2 to 2). */
export const PUSHOVER_PRIORITY = parseInt(
  process.env.PUSHOVER_PRIORITY || envConfig.PUSHOVER_PRIORITY || (configPriority !== undefined ? String(configPriority) : "0"),
  10
);
/** Pushover notification sound name. */
export const PUSHOVER_SOUND = process.env.PUSHOVER_SOUND || envConfig.PUSHOVER_SOUND || configSound || "";

/**
 * agent-control/agent-control-helpers.ts – Shared helpers for control handlers.
 *
 * Provides utility functions used across multiple handler modules:
 *   - THINKING_LEVELS constant array.
 *   - Shell command formatting (formatShellBlock, resolveShellCwd).
 *   - Session state inspection (getModelLabel, formatSessionState).
 *   - Config file persistence for identity changes.
 *   - Context usage and stats formatting.
 *
 * Consumers:
 *   - All handler modules under handlers/*.ts.
 *   - agent-pool.ts for model label resolution.
 */
import { existsSync } from "fs";
import { PICLAW_CONFIG_PATH } from "../core/config.js";
import { readJsonConfig, writeJsonConfig } from "../core/config-store.js";
/** Ordered list of supported thinking levels from off to xhigh. */
export const THINKING_LEVELS = ["off", "minimal", "low", "medium", "high", "xhigh"];
/** Return the preferred working directory for shell commands (/workspace or cwd). */
export function resolveShellCwd() {
    const preferred = "/workspace";
    if (existsSync(preferred))
        return preferred;
    return process.cwd();
}
/** Format a shell command and its output as a markdown-style code block. */
export function formatShellBlock(command, output, meta = []) {
    const lines = [`$ ${command}`];
    const trimmed = output.trimEnd();
    if (trimmed) {
        lines.push(trimmed);
    }
    else {
        lines.push("(no output)");
    }
    if (meta.length > 0) {
        lines.push(...meta);
    }
    return ["```", ...lines, "```"].join("\n");
}
/** Format a byte count using human-readable binary units. */
export function formatBytes(bytes) {
    if (!Number.isFinite(bytes))
        return String(bytes);
    const abs = Math.abs(bytes);
    const units = ["B", "KB", "MB", "GB", "TB"];
    let value = abs;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
        value /= 1024;
        unitIndex += 1;
    }
    const formatted = value >= 10 || unitIndex === 0 ? value.toFixed(0) : value.toFixed(1);
    const trimmed = formatted.endsWith(".0") ? formatted.slice(0, -2) : formatted;
    return `${bytes < 0 ? "-" : ""}${trimmed} ${units[unitIndex]}`;
}
/** Format a number with K/M suffixes for compact display. */
export function formatCompactNumber(value) {
    if (!Number.isFinite(value))
        return String(value);
    const abs = Math.abs(value);
    const format = (divisor, suffix) => {
        const raw = (value / divisor).toFixed(1);
        const trimmed = raw.endsWith(".0") ? raw.slice(0, -2) : raw;
        return `${trimmed}${suffix}`;
    };
    if (abs >= 1_000_000_000)
        return format(1_000_000_000, "B");
    if (abs >= 1_000_000)
        return format(1_000_000, "M");
    if (abs >= 1_000)
        return format(1_000, "K");
    return String(value);
}
/** Format a number as a USD currency string. */
export function formatCurrency(value) {
    if (!Number.isFinite(value))
        return String(value);
    if (value === 0)
        return "$0";
    if (Math.abs(value) < 0.01)
        return `$${value.toFixed(4)}`;
    return `$${value.toFixed(2)}`;
}
/** Truncate text to maxLen characters, appending '…' if truncated. */
export function truncateText(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return `${text.slice(0, Math.max(0, maxLength - 1))}…`;
}
/** Extract plain text from a pi-agent content block array. */
export function extractTextFromContent(content) {
    if (!content)
        return "";
    if (typeof content === "string")
        return content;
    if (Array.isArray(content)) {
        return content
            .map((block) => {
            if (!block || typeof block !== "object")
                return "";
            const textBlock = block;
            if (textBlock.type !== "text")
                return "";
            return typeof textBlock.text === "string" ? textBlock.text : "";
        })
            .join("");
    }
    return "";
}
/** Persist assistant identity changes (name, avatar) to the config file. */
export function updateAssistantConfig(patch) {
    const config = readJsonConfig(PICLAW_CONFIG_PATH);
    const assistant = config.assistant && typeof config.assistant === "object"
        ? { ...config.assistant }
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
    const clearKeys = (keys) => {
        for (const key of keys) {
            if (key in assistant)
                delete assistant[key];
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
    }
    else {
        delete config.assistant;
    }
    writeJsonConfig(PICLAW_CONFIG_PATH, config);
    return {
        name: typeof assistant.assistantName === "string" ? assistant.assistantName : undefined,
        avatar: typeof assistant.assistantAvatar === "string" ? assistant.assistantAvatar : undefined,
    };
}
/** Persist user identity changes (name, avatar, github) to the config file. */
export function updateUserConfig(patch) {
    const config = readJsonConfig(PICLAW_CONFIG_PATH);
    const user = config.user && typeof config.user === "object"
        ? { ...config.user }
        : {};
    const nameKeys = ["userName", "user_name", "name", "PICLAW_USER_NAME"];
    const avatarKeys = ["userAvatar", "user_avatar", "avatar", "PICLAW_USER_AVATAR"];
    const backgroundKeys = [
        "userAvatarBackground",
        "user_avatar_background",
        "userAvatarBg",
        "user_avatar_bg",
        "avatarBackground",
        "avatar_background",
        "PICLAW_USER_AVATAR_BACKGROUND",
    ];
    const clearKeys = (keys) => {
        for (const key of keys) {
            if (key in user)
                delete user[key];
        }
    };
    if (patch.name !== undefined) {
        clearKeys(nameKeys);
        if (patch.name !== null) {
            user.userName = patch.name;
        }
    }
    if (patch.avatar !== undefined) {
        clearKeys(avatarKeys);
        if (patch.avatar !== null) {
            user.userAvatar = patch.avatar;
        }
    }
    if (patch.avatarBackground !== undefined) {
        clearKeys(backgroundKeys);
        if (patch.avatarBackground !== null) {
            user.userAvatarBackground = patch.avatarBackground;
        }
    }
    if (Object.keys(user).length > 0) {
        config.user = user;
    }
    else {
        delete config.user;
    }
    writeJsonConfig(PICLAW_CONFIG_PATH, config);
    return {
        name: typeof user.userName === "string" ? user.userName : undefined,
        avatar: typeof user.userAvatar === "string" ? user.userAvatar : undefined,
        avatarBackground: typeof user.userAvatarBackground === "string" ? user.userAvatarBackground : undefined,
    };
}
/** Inject a prompt into the session and capture the streamed response text. */
export async function runPromptAndCapture(session, text, options) {
    let assistantBuffer = "";
    const customBuffers = [];
    const onEvent = (event) => {
        if (event.type === "message_update") {
            const messageUpdate = event.assistantMessageEvent;
            if (messageUpdate?.type === "text_delta") {
                assistantBuffer += messageUpdate.delta || "";
            }
            return;
        }
        if (event.type !== "message_end")
            return;
        const message = event.message;
        const text = extractTextFromContent(message.content);
        if (message.role === "assistant") {
            assistantBuffer = text || assistantBuffer;
        }
        else if (text) {
            customBuffers.push(text);
        }
    };
    const unsub = session.subscribe(onEvent);
    try {
        await session.prompt(text, options);
    }
    finally {
        unsub();
    }
    const finalText = (assistantBuffer && assistantBuffer.trim())
        ? assistantBuffer.trim()
        : customBuffers.join("\n\n").trim();
    return finalText || "(no output)";
}
/** Fuzzy-match a model input string against available models. */
export function normalizeModelMatch(models, provider, modelId) {
    const providerLower = provider.toLowerCase();
    const modelLower = modelId.toLowerCase();
    return models.find((model) => model.provider.toLowerCase() === providerLower && model.id.toLowerCase() === modelLower);
}

import { ASSISTANT_AVATAR, ASSISTANT_NAME, setAssistantAvatar, setAssistantName } from "../../core/config.js";
import { updateAssistantConfig } from "../agent-control-helpers.js";
export async function handleAgentName(_session, command) {
    if (!command.name) {
        return { status: "success", message: `Agent name: ${ASSISTANT_NAME}` };
    }
    const trimmed = command.name.trim();
    const normalized = trimmed.toLowerCase();
    const nextName = ["clear", "none", "off", "default"].includes(normalized) ? null : trimmed;
    const updated = updateAssistantConfig({ name: nextName });
    const fallback = process.env.ASSISTANT_NAME || "PiClaw";
    const effective = updated.name || fallback;
    setAssistantName(effective);
    return {
        status: "success",
        message: nextName ? `Agent name set to ${effective}.` : `Agent name reset to ${effective}.`,
    };
}
export async function handleAgentAvatar(_session, command) {
    if (!command.avatar) {
        const current = ASSISTANT_AVATAR || "(default)";
        return { status: "success", message: `Agent avatar: ${current}` };
    }
    const trimmed = command.avatar.trim();
    const normalized = trimmed.toLowerCase();
    const nextAvatar = ["clear", "none", "off", "default"].includes(normalized) ? null : trimmed;
    const updated = updateAssistantConfig({ avatar: nextAvatar });
    const fallback = process.env.ASSISTANT_AVATAR || "";
    const effective = updated.avatar || fallback;
    setAssistantAvatar(effective);
    return {
        status: "success",
        message: nextAvatar ? `Agent avatar set to ${effective || "(default)"}.` : "Agent avatar reset to default.",
    };
}

import { getMessagesSince, getNewMessages } from "../db.js";
import { parseControlCommand } from "../agent-control/index.js";
import { detectChannel, formatMessages, formatOutbound } from "../router.js";
export async function processMessages(chatJid, deps) {
    const since = deps.state.lastAgentTimestamp[chatJid] || "";
    const messages = getMessagesSince(chatJid, since, deps.assistantName);
    if (messages.length === 0)
        return true;
    const commandQueue = [];
    const promptMessages = [];
    for (const message of messages) {
        const command = !message.is_bot_message
            ? parseControlCommand(message.content, deps.triggerPattern)
            : null;
        if (command) {
            if (!deps.state.wasCommandProcessed(chatJid, message.id)) {
                commandQueue.push({ message, command });
            }
            continue;
        }
        promptMessages.push(message);
    }
    for (const { message, command } of commandQueue) {
        const result = await deps.agentPool.applyControlCommand(chatJid, command);
        await deps.whatsapp.sendMessage(chatJid, result.message);
        deps.state.markCommandProcessed(chatJid, message.id);
    }
    // Check trigger on non-command messages only
    const hasTrigger = promptMessages.some((m) => deps.triggerPattern.test(m.content.trim()));
    if (!hasTrigger)
        return true;
    const channel = detectChannel(chatJid);
    const prevCursor = deps.state.lastAgentTimestamp[chatJid] || "";
    deps.state.lastAgentTimestamp[chatJid] = messages[messages.length - 1].timestamp;
    deps.state.saveTimestamps();
    const stripTrigger = (text) => {
        if (!text)
            return "";
        const flags = deps.triggerPattern.flags.includes("g")
            ? deps.triggerPattern.flags
            : `${deps.triggerPattern.flags}g`;
        const pattern = new RegExp(deps.triggerPattern.source, flags);
        return text.replace(pattern, " ").trim();
    };
    const lastPrompt = promptMessages[promptMessages.length - 1];
    const cleaned = lastPrompt ? stripTrigger(lastPrompt.content) : "";
    if (promptMessages.length === 1 && cleaned.startsWith("/")) {
        console.log(`[piclaw] Executing slash command from ${chatJid}`);
        await deps.whatsapp.setTyping(chatJid, true);
        const result = await deps.agentPool.applySlashCommand(chatJid, cleaned);
        await deps.whatsapp.setTyping(chatJid, false);
        if (result.message) {
            const text = formatOutbound(result.message, channel);
            if (text)
                await deps.whatsapp.sendMessage(chatJid, text);
        }
        if (result.status === "error") {
            console.error(`[piclaw] Agent error: ${result.message}`);
        }
        return true;
    }
    const prompt = formatMessages(promptMessages, channel);
    console.log(`[piclaw] Processing ${promptMessages.length} messages from ${chatJid}`);
    await deps.whatsapp.setTyping(chatJid, true);
    const output = await deps.agentPool.runAgent(prompt, chatJid, {
        onTurnComplete: async (turn) => {
            if (turn.text) {
                const text = formatOutbound(turn.text, channel);
                if (text)
                    await deps.whatsapp.sendMessage(chatJid, text);
            }
        },
    });
    await deps.whatsapp.setTyping(chatJid, false);
    if (output.status === "error") {
        deps.state.lastAgentTimestamp[chatJid] = prevCursor;
        deps.state.saveTimestamps();
        console.error(`[piclaw] Agent error: ${output.error}`);
        return false;
    }
    if (output.result) {
        const text = formatOutbound(output.result, channel);
        if (text)
            await deps.whatsapp.sendMessage(chatJid, text);
    }
    return true;
}
export async function runMessageLoop(deps) {
    console.log(`[piclaw] Running (trigger: @${deps.assistantName})`);
    while (true) {
        try {
            const jids = [...deps.state.chatJids];
            const { messages, newTimestamp } = getNewMessages(jids, deps.state.lastTimestamp, deps.assistantName);
            if (messages.length > 0) {
                deps.state.lastTimestamp = newTimestamp;
                deps.state.saveTimestamps();
                // Deduplicate by chat
                const byChat = new Map();
                for (const msg of messages)
                    byChat.set(msg.chat_jid, true);
                for (const chatJid of byChat.keys()) {
                    deps.queue.enqueue(async () => {
                        const ok = await deps.processMessages(chatJid);
                        if (!ok)
                            throw new Error(`Agent processing failed for ${chatJid}`);
                    }, `chat:${chatJid}`);
                }
            }
        }
        catch (err) {
            console.error("[piclaw] Message loop error:", err);
        }
        await Bun.sleep(deps.pollIntervalMs);
    }
}

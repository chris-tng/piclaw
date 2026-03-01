import { runPromptAndCapture } from "../agent-control-helpers.js";
export async function handleQueue(session, command) {
    const queuedText = command.message?.trim();
    const useBatch = command.type === "queue_all";
    const mode = useBatch ? "all" : "one-at-a-time";
    if (!queuedText) {
        return {
            status: "error",
            message: useBatch ? "Usage: /queue-all <message>" : "Usage: /queue <message>",
        };
    }
    if (session.followUpMode !== mode) {
        session.setFollowUpMode(mode);
    }
    if (session.isStreaming) {
        try {
            await session.prompt(queuedText, { streamingBehavior: "followUp" });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            return { status: "error", message };
        }
        return {
            status: "success",
            message: useBatch
                ? "Queued as a follow-up (batch mode: all)."
                : "Queued as a follow-up (one-at-a-time).",
            queued_followup: true,
        };
    }
    try {
        const response = await runPromptAndCapture(session, queuedText);
        return { status: "success", message: response };
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { status: "error", message };
    }
}
export async function handleSteeringMode(session, command) {
    const hasArgs = command.raw.trim().split(/\s+/).length > 1;
    if (!command.mode) {
        if (hasArgs) {
            return { status: "error", message: "Usage: /steering-mode all|one" };
        }
        return { status: "success", message: `Steering mode: ${session.steeringMode}.` };
    }
    session.setSteeringMode(command.mode);
    return { status: "success", message: `Steering mode set to ${command.mode}.` };
}
export async function handleFollowupMode(session, command) {
    const hasArgs = command.raw.trim().split(/\s+/).length > 1;
    if (!command.mode) {
        if (hasArgs) {
            return { status: "error", message: "Usage: /followup-mode all|one" };
        }
        return { status: "success", message: `Follow-up mode: ${session.followUpMode}.` };
    }
    session.setFollowUpMode(command.mode);
    return { status: "success", message: `Follow-up mode set to ${command.mode}.` };
}

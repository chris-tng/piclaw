import { handleAbort, handleAbortBash, handleAbortRetry, handleAutoCompact, handleAutoRetry, handleCompact, handleRestart, } from "./handlers/control.js";
import { handleAgentAvatar, handleAgentName } from "./handlers/agent.js";
import { handleCommands, handleContext, handleLast, handleState, handleStats, } from "./handlers/info.js";
import { handleCycleModel, handleCycleThinking, handleModel, handleThinking, } from "./handlers/model.js";
import { handleBash, handleShell } from "./handlers/operations.js";
import { handleFollowupMode, handleQueue, handleSteeringMode } from "./handlers/queue.js";
import { handleExportHtml, handleFork, handleForks, handleNewSession, handleSessionName, handleSwitchSession, } from "./handlers/session.js";
import { handleLabel, handleLabels, handleTree } from "./handlers/tree.js";
export async function applyControlCommand(session, modelRegistry, command) {
    switch (command.type) {
        case "restart":
            return handleRestart(session, command);
        case "shell":
            return handleShell(session, command);
        case "bash":
            return handleBash(session, command);
        case "queue":
        case "queue_all":
            return handleQueue(session, command);
        case "state":
            return handleState(session, command);
        case "stats":
            return handleStats(session, command);
        case "context":
            return handleContext(session, command);
        case "last":
            return handleLast(session, command);
        case "compact":
            return handleCompact(session, command);
        case "auto_compact":
            return handleAutoCompact(session, command);
        case "auto_retry":
            return handleAutoRetry(session, command);
        case "abort":
            return handleAbort(session, command);
        case "abort_retry":
            return handleAbortRetry(session, command);
        case "abort_bash":
            return handleAbortBash(session, command);
        case "cycle_model":
            return handleCycleModel(session, modelRegistry, command);
        case "cycle_thinking":
            return handleCycleThinking(session, modelRegistry, command);
        case "steering_mode":
            return handleSteeringMode(session, command);
        case "followup_mode":
            return handleFollowupMode(session, command);
        case "session_name":
            return handleSessionName(session, command);
        case "new_session":
            return handleNewSession(session, command);
        case "switch_session":
            return handleSwitchSession(session, command);
        case "fork":
            return handleFork(session, command);
        case "forks":
            return handleForks(session, command);
        case "export_html":
            return handleExportHtml(session, command);
        case "tree":
            return handleTree(session, command);
        case "label":
            return handleLabel(session, command);
        case "labels":
            return handleLabels(session, command);
        case "agent_name":
            return handleAgentName(session, command);
        case "agent_avatar":
            return handleAgentAvatar(session, command);
        case "model":
            return handleModel(session, modelRegistry, command);
        case "commands":
            return handleCommands(session, command);
        case "thinking":
            return handleThinking(session, modelRegistry, command);
        default:
            return {
                status: "error",
                message: "Unsupported command.",
            };
    }
}

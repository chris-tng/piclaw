/**
 * agent-control/command-registry.ts – Command metadata and alias resolution.
 *
 * Defines the list of all known control commands, their descriptions, and
 * aliases (e.g. /models → /model, /ctx → /context). Provides
 * normalizeControlCommandName() to resolve aliases before parser lookup.
 *
 * Consumers:
 *   - agent-control-parser.ts uses normalizeControlCommandName().
 *   - handlers/info.ts uses CONTROL_COMMAND_DEFINITIONS for /commands output.
 */
/** Metadata for all control commands: name, description, aliases. */
export const CONTROL_COMMAND_DEFINITIONS = [
    { name: "/model", description: "Select model or list available models (alias /models)", aliases: ["/models"] },
    { name: "/cycle-model", description: "Cycle to the next available model" },
    { name: "/thinking", description: "Show or set thinking level" },
    { name: "/cycle-thinking", description: "Cycle thinking level" },
    { name: "/state", description: "Show current session state" },
    { name: "/stats", description: "Show session token and cost stats" },
    { name: "/context", description: "Show context window usage", aliases: ["/ctx"] },
    { name: "/last", description: "Show last assistant response" },
    { name: "/compact", description: "Manually compact the session" },
    { name: "/auto-compact", description: "Toggle auto-compaction" },
    { name: "/auto-retry", description: "Toggle auto-retry" },
    { name: "/abort", description: "Abort the current response" },
    { name: "/abort-retry", description: "Abort retry backoff" },
    { name: "/abort-bash", description: "Abort running bash command" },
    { name: "/shell", description: "Run a shell command and return output" },
    { name: "/bash", description: "Run a shell command and add output to context" },
    { name: "/queue", description: "Queue a follow-up message (one-at-a-time)" },
    { name: "/queue-all", description: "Queue a follow-up message (batch all)" },
    { name: "/steer", description: "Send immediate steering input" },
    { name: "/steering-mode", description: "Set steering mode (all|one)" },
    { name: "/followup-mode", description: "Set follow-up mode (all|one)" },
    { name: "/session-name", description: "Set or show the session name" },
    { name: "/new-session", description: "Start a new session" },
    { name: "/switch-session", description: "Switch to a session file" },
    { name: "/session-rotate", description: "Rotate the current persisted session into an archived file" },
    { name: "/fork", description: "Fork from a previous message" },
    { name: "/forks", description: "List forkable messages" },
    { name: "/tree", description: "List the session tree (default tail 10) and navigate branches" },
    { name: "/label", description: "Set or clear a label on a tree entry" },
    { name: "/labels", description: "List labeled entries" },
    { name: "/agent-name", description: "Set or show the agent display name" },
    { name: "/agent-avatar", description: "Set or show the agent avatar URL" },
    { name: "/user-name", description: "Set or show your display name" },
    { name: "/user-avatar", description: "Set or show your avatar URL" },
    { name: "/user-github", description: "Set your name/avatar from a GitHub profile URL" },
    { name: "/export-html", description: "Export session to HTML" },
    { name: "/passkey", description: "Manage passkeys (enrol/list/delete)", aliases: ["/passkeys"] },
    { name: "/totp", description: "Show a TOTP enrolment QR code" },
    { name: "/qr", description: "Generate a QR code for text or a URL" },
    { name: "/search", description: "Search notes and skills in the workspace" },
    { name: "/restart", description: "Restart the agent and stop subprocesses" },
    { name: "/commands", description: "List available commands" },
];
const ALIAS_MAP = new Map();
for (const def of CONTROL_COMMAND_DEFINITIONS) {
    ALIAS_MAP.set(def.name, def.name);
    const dashAlias = def.name.replace(/-/g, "_");
    if (dashAlias !== def.name)
        ALIAS_MAP.set(dashAlias, def.name);
    for (const alias of def.aliases ?? []) {
        ALIAS_MAP.set(alias, def.name);
    }
}
/** Resolve command aliases (e.g. /models → /model, /ctx → /context). */
export function normalizeControlCommandName(name) {
    const normalized = name.trim().toLowerCase().replace(/_/g, "-");
    return ALIAS_MAP.get(normalized) ?? normalized;
}

import { normalizeControlCommandName } from "./command-registry.js";
import { stripTrigger } from "./parser-utils.js";
import { COMMAND_PARSERS } from "./command-parsers.js";
export function parseControlCommand(text, triggerPattern) {
    if (!text)
        return null;
    const cleaned = stripTrigger(text, triggerPattern);
    if (!cleaned.startsWith("/"))
        return null;
    const [command, ...rest] = cleaned.split(/\s+/);
    const args = rest.join(" ").trim();
    const commandLower = normalizeControlCommandName(command.toLowerCase());
    const parser = COMMAND_PARSERS[commandLower];
    if (!parser)
        return null;
    return parser(args, cleaned);
}

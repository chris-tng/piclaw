import { readFileSync } from "fs";
import { join } from "path";
import { initDatabase } from "./db.js";
import { deleteKeychainEntry, getKeychainEntry, listKeychainEntries, setKeychainEntry, } from "./secure/keychain.js";
const HELP_TEXT = `piclaw - Pi Coding Agent Assistant

Usage:
  piclaw [options]
  piclaw keychain <command> [args]

Options:
  -h, --help                 Show this help
  -v, --version              Show version
  -p, --port <number>        Web UI port (default: 8080)
      --host <addr>          Web UI host (default: 0.0.0.0)
      --idle-timeout <secs>  Web idle timeout in seconds (default: 0 = disabled)

Keychain commands:
  piclaw keychain set <name> --secret <value> [--type token|password|basic|secret] [--username <value>]
  piclaw keychain set <name> --secret-file <path> [--type token|password|basic|secret] [--username <value>]
  piclaw keychain get <name>
  piclaw keychain list
  piclaw keychain delete <name>
`;
export function getVersion() {
    try {
        const packagePath = join(import.meta.dir, "..", "package.json");
        const data = JSON.parse(readFileSync(packagePath, "utf-8"));
        return data.version || "unknown";
    }
    catch {
        return "unknown";
    }
}
function getFlagValue(args, flag) {
    const index = args.indexOf(flag);
    if (index < 0)
        return undefined;
    const value = args[index + 1];
    if (!value || value.startsWith("-"))
        return undefined;
    return value;
}
async function handleKeychainCommand(args) {
    const [subcommand, name] = args;
    initDatabase();
    switch (subcommand) {
        case "set": {
            if (!name)
                throw new Error("Keychain name is required.");
            const type = (getFlagValue(args, "--type") || "secret");
            const username = getFlagValue(args, "--username") || null;
            const secret = getFlagValue(args, "--secret");
            const secretFile = getFlagValue(args, "--secret-file");
            let resolvedSecret = secret || "";
            if (!resolvedSecret && secretFile) {
                resolvedSecret = readFileSync(secretFile, "utf8").trim();
            }
            if (!resolvedSecret)
                throw new Error("Keychain secret is required.");
            await setKeychainEntry({ name, type, secret: resolvedSecret, username });
            console.log(`Stored keychain entry ${name}.`);
            return;
        }
        case "get": {
            if (!name)
                throw new Error("Keychain name is required.");
            const entry = await getKeychainEntry(name);
            console.log(JSON.stringify(entry, null, 2));
            return;
        }
        case "list": {
            const entries = listKeychainEntries();
            console.log(JSON.stringify(entries, null, 2));
            return;
        }
        case "delete": {
            if (!name)
                throw new Error("Keychain name is required.");
            const removed = deleteKeychainEntry(name);
            if (!removed) {
                console.log(`Keychain entry not found: ${name}`);
            }
            else {
                console.log(`Deleted keychain entry ${name}.`);
            }
            return;
        }
        default: {
            throw new Error("Unknown keychain command.");
        }
    }
}
export async function handleCliOptions(args = process.argv.slice(2)) {
    if (args.includes("-h") || args.includes("--help")) {
        console.log(HELP_TEXT.trim());
        return true;
    }
    if (args.includes("-v") || args.includes("--version")) {
        console.log(getVersion());
        return true;
    }
    if (args[0] === "keychain") {
        try {
            await handleKeychainCommand(args.slice(1));
        }
        catch (error) {
            console.error(error.message);
            return true;
        }
        return true;
    }
    return false;
}

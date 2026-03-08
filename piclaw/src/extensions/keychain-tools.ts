/**
 * keychain-tools – registers a keychain tool for listing and retrieving entries.
 */
import { Type } from "@sinclair/typebox";
import type { ExtensionAPI, ExtensionFactory } from "@mariozechner/pi-coding-agent";

import { getKeychainEntry, listKeychainEntries, setKeychainEntry } from "../secure/keychain.js";

const KeychainToolSchema = Type.Object({
  action: Type.Union([Type.Literal("list"), Type.Literal("get"), Type.Literal("set")], {
    description: "Operation to perform: list entries, get a value, or store/update an entry.",
  }),
  name: Type.Optional(Type.String({ description: "Keychain entry name (required for action=get/set)." })),
  field: Type.Optional(
    Type.Union([Type.Literal("secret"), Type.Literal("username")], {
      description: "Field to return for action=get (default: secret).",
    }),
  ),
  type: Type.Optional(
    Type.Union([Type.Literal("token"), Type.Literal("password"), Type.Literal("basic"), Type.Literal("secret")], {
      description: "Entry type for action=set (default: secret).",
    }),
  ),
  secret: Type.Optional(Type.String({ description: "Plaintext secret for action=set." })),
  username: Type.Optional(Type.String({ description: "Optional username for action=set." })),
  limit: Type.Optional(Type.Integer({ description: "Max entries for action=list (1-200).", minimum: 1, maximum: 200 })),
});

function clampLimit(value: number | undefined, fallback = 100): number {
  if (!Number.isFinite(value)) return fallback;
  const num = Number(value);
  if (Number.isNaN(num)) return fallback;
  return Math.min(Math.max(num, 1), 200);
}

const KEYCHAIN_HINT = [
  "## Keychain",
  "Use keychain for listing available key names and retrieving entry secrets/usernames.",
  "Only reveal secrets to the user when explicitly requested.",
].join("\n");

/** Extension factory that registers keychain. */
export const keychainTools: ExtensionFactory = (pi: ExtensionAPI) => {
  pi.on("before_agent_start", async (event) => ({
    systemPrompt: `${event.systemPrompt}\n\n${KEYCHAIN_HINT}`,
  }));

  pi.registerTool({
    name: "keychain",
    label: "keychain",
    description: "List keychain entries, retrieve values, or store/update keychain entries.",
    parameters: KeychainToolSchema,
    async execute(_toolCallId, params) {
      if (params.action === "list") {
        const limit = clampLimit(params.limit, 100);
        const entries = listKeychainEntries().slice(0, limit);
        if (entries.length === 0) {
          return {
            content: [{ type: "text", text: "No keychain entries found." }],
            details: { count: 0, entries: [], name: "", field: "", type: "" },
          };
        }

        const lines = entries.map((entry) => `• ${entry.name} (${entry.type})`);
        return {
          content: [{ type: "text", text: `Keychain entries (${entries.length}):\n${lines.join("\n")}` }],
          details: { count: entries.length, entries, name: "", field: "", type: "" },
        };
      }

      const name = params.name?.trim();
      if (!name) {
        return {
          content: [{ type: "text", text: `Provide name for action=${params.action}.` }],
          details: { count: 0, entries: [], name: "", field: "", type: "" },
        };
      }

      if (params.action === "set") {
        const secret = String(params.secret ?? "");
        if (!secret) {
          return {
            content: [{ type: "text", text: "Provide secret for action=set." }],
            details: { count: 0, entries: [], name, field: "", type: "" },
          };
        }

        const type =
          params.type === "token" ||
          params.type === "password" ||
          params.type === "basic" ||
          params.type === "secret"
            ? params.type
            : "secret";

        try {
          await setKeychainEntry({
            name,
            type,
            secret,
            username: params.username ? String(params.username) : undefined,
          });
          return {
            content: [{ type: "text", text: `Stored keychain entry ${name} (${type}).` }],
            details: { count: 1, entries: [], name, field: "", type },
          };
        } catch (error) {
          return {
            content: [{ type: "text", text: (error as Error).message || "Failed to store keychain entry." }],
            details: { count: 0, entries: [], name, field: "", type: "" },
          };
        }
      }

      const field = params.field === "username" ? "username" : "secret";
      try {
        const entry = await getKeychainEntry(name);
        if (field === "username") {
          if (!entry.username) {
            return {
              content: [{ type: "text", text: `Entry ${name} has no username.` }],
              details: { count: 0, entries: [], name, field, type: entry.type },
            };
          }
          return {
            content: [{ type: "text", text: entry.username }],
            details: { count: 1, entries: [], name, field, type: entry.type },
          };
        }

        return {
          content: [{ type: "text", text: entry.secret }],
          details: { count: 1, entries: [], name, field, type: entry.type },
        };
      } catch (error) {
        return {
          content: [{ type: "text", text: (error as Error).message || "Failed to read keychain entry." }],
          details: { count: 0, entries: [], name, field, type: "" },
        };
      }
    },
  });
};

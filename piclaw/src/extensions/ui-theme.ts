/**
 * ui-theme – registers /theme and /tint commands for the web UI.
 *
 * /theme <name>   → switch to a named theme (use /theme list)
 * /tint <#hex>    → tint the default light/dark theme
 * /tint off       → clear tint and restore default light/dark
 */
import type { ExtensionAPI, ExtensionFactory } from "@mariozechner/pi-coding-agent";

const THEME_PRESETS = [
  { name: "default", label: "Default" },
  { name: "tango", label: "Tango" },
  { name: "xterm", label: "XTerm" },
  { name: "monokai", label: "Monokai" },
  { name: "monokai-pro", label: "Monokai Pro" },
  { name: "ristretto", label: "Ristretto" },
  { name: "dracula", label: "Dracula" },
  { name: "catppuccin", label: "Catppuccin" },
  { name: "nord", label: "Nord" },
  { name: "gruvbox", label: "Gruvbox" },
  { name: "solarized", label: "Solarized" },
  { name: "tokyo", label: "Tokyo" },
  { name: "miasma", label: "Miasma" },
  { name: "github", label: "GitHub" },
  { name: "gotham", label: "Gotham" },
];

const THEME_ALIASES = new Map([
  ["default", "default"],
  ["auto", "default"],
  ["tango", "tango"],
  ["xterm", "xterm"],
  ["monokai", "monokai"],
  ["monokai-pro", "monokai-pro"],
  ["ristretto", "ristretto"],
  ["drac", "dracula"],
  ["dracula", "dracula"],
  ["catpp", "catppuccin"],
  ["catppuccin", "catppuccin"],
  ["nord", "nord"],
  ["gruv", "gruvbox"],
  ["gruvbox", "gruvbox"],
  ["solarized", "solarized"],
  ["solarized-dark", "solarized"],
  ["solarized-light", "solarized"],
  ["tokyo", "tokyo"],
  ["tokyo-night", "tokyo"],
  ["miasma", "miasma"],
  ["github", "github"],
  ["github-dark", "github"],
  ["github-light", "github"],
  ["gotham", "gotham"],
]);

const CLEAR_VALUES = new Set(["off", "clear", "none", "reset", "default"]);

function normalizeTheme(input: string): string | null {
  const raw = input.trim().toLowerCase();
  if (!raw) return null;
  return THEME_ALIASES.get(raw) ?? null;
}

function normalizeHex(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  const hex = raw.startsWith("#") ? raw.slice(1) : raw;
  if (!/^[0-9a-fA-F]{3}$/.test(hex) && !/^[0-9a-fA-F]{6}$/.test(hex)) return null;
  const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
  return `#${full.toLowerCase()}`;
}

function normalizeTint(input: string): string | null {
  const hex = normalizeHex(input);
  if (hex) return hex;
  const named = input.trim().toLowerCase();
  if (!named) return null;
  if (/^[a-z]+$/.test(named)) return named;
  return null;
}

function formatThemeList(): string {
  const items = THEME_PRESETS.map((theme) => `• ${theme.name} — ${theme.label}`);
  return ["Available themes:", ...items, "", "Usage: /theme <name>"].join("\n");
}

function sendThemeMessage(pi: ExtensionAPI, content: string) {
  pi.sendMessage({
    customType: "ui-theme",
    content,
    display: true,
  });
}

type WebUiThemePayload = { name: string; tint: string | null };

function setWebUiTheme(ctx: { ui: unknown }, payload: WebUiThemePayload): { success: boolean; error?: string } {
  const ui = ctx.ui as { setTheme(theme: string | { name: string; tint: string | null }): { success: boolean; error?: string } };
  return ui.setTheme(payload);
}

/** Extension factory that exposes `/theme` command and UI theme controls. */
export const uiThemeExtension: ExtensionFactory = (pi: ExtensionAPI) => {
  pi.registerCommand("theme", {
    description: "Set UI theme (usage: /theme <name> or /theme list)",
    handler: async (args, ctx) => {
      if (!ctx?.hasUI) {
        sendThemeMessage(pi, "UI theme controls are only available in the web UI.");
        return;
      }

      const trimmed = args.trim();
      if (!trimmed || trimmed.toLowerCase() === "list") {
        sendThemeMessage(pi, formatThemeList());
        return;
      }

      const theme = normalizeTheme(trimmed);
      if (!theme) {
        sendThemeMessage(pi, `Unknown theme: ${trimmed}. Use /theme list for options.`);
        return;
      }

      const result = setWebUiTheme(ctx, { name: theme, tint: null });
      if (!result?.success) {
        sendThemeMessage(pi, `Failed to set theme: ${result?.error || "unknown error"}.`);
        return;
      }

      const label = THEME_PRESETS.find((item) => item.name === theme)?.label || theme;
      sendThemeMessage(pi, `Theme set to ${label}.`);
    },
  });

  pi.registerCommand("tint", {
    description: "Tint default theme (usage: /tint #hex or /tint off)",
    handler: async (args, ctx) => {
      if (!ctx?.hasUI) {
        sendThemeMessage(pi, "UI theme controls are only available in the web UI.");
        return;
      }

      const trimmed = args.trim();
      if (!trimmed) {
        sendThemeMessage(pi, "Usage: /tint #hex (e.g. /tint #3b82f6), /tint orange, or /tint off");
        return;
      }

      const normalized = trimmed.toLowerCase();
      if (CLEAR_VALUES.has(normalized)) {
        const result = setWebUiTheme(ctx, { name: "default", tint: null });
        if (!result?.success) {
          sendThemeMessage(pi, `Failed to clear tint: ${result?.error || "unknown error"}.`);
          return;
        }
        sendThemeMessage(pi, "Tint cleared (default light/dark restored)." );
        return;
      }

      const tint = normalizeTint(trimmed);
      if (!tint) {
        sendThemeMessage(pi, `Invalid tint value: ${trimmed}. Use a hex color (e.g. #3b82f6), a named color (e.g. orange), or /tint off.`);
        return;
      }

      const result = setWebUiTheme(ctx, { name: "default", tint });
      if (!result?.success) {
        sendThemeMessage(pi, `Failed to set tint: ${result?.error || "unknown error"}.`);
        return;
      }

      sendThemeMessage(pi, `Tint set to ${tint}.`);
    },
  });
};

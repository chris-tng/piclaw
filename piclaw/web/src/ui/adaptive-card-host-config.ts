/**
 * ui/adaptive-card-host-config.ts – HostConfig for Adaptive Cards mapped from PiClaw CSS vars.
 *
 * Maps PiClaw theme tokens into the Microsoft Adaptive Cards HostConfig format
 * so cards render consistently in both light and dark themes.
 */

/** Build an Adaptive Cards HostConfig from computed CSS variables. */
export function buildHostConfig(): Record<string, unknown> {
  const style = getComputedStyle(document.documentElement);
  const getAny = (names: string[], fallback: string) => {
    for (const name of names) {
      const value = style.getPropertyValue(name).trim();
      if (value) return value;
    }
    return fallback;
  };

  const fg = getAny(["--text-primary", "--color-text"], "#0f1419");
  const fgMuted = getAny(["--text-secondary", "--color-text-muted"], "#536471");
  const bg = getAny(["--bg-secondary", "--color-bg-secondary"], "#f7f9fa");
  const bgEmphasis = getAny(["--bg-hover", "--bg-tertiary", "--color-bg-tertiary"], "#e8ebed");
  const accent = getAny(["--accent-color", "--color-accent"], "#1d9bf0");
  const good = getAny(["--success-color", "--color-success"], "#00ba7c");
  const warning = getAny(["--warning-color", "--color-warning", "--accent-color"], "#f0b429");
  const attention = getAny(["--danger-color", "--color-error"], "#f4212e");
  const border = getAny(["--border-color", "--color-border"], "#eff3f4");
  const fontFamily = getAny(["--font-family"], "system-ui, sans-serif");

  return {
    fontFamily,
    containerStyles: {
      default: {
        backgroundColor: bg,
        foregroundColors: {
          default: { default: fg, subtle: fgMuted },
          accent: { default: accent, subtle: accent },
          good: { default: good, subtle: good },
          warning: { default: warning, subtle: warning },
          attention: { default: attention, subtle: attention },
        },
      },
      emphasis: {
        backgroundColor: bgEmphasis,
        foregroundColors: {
          default: { default: fg, subtle: fgMuted },
          accent: { default: accent, subtle: accent },
          good: { default: good, subtle: good },
          warning: { default: warning, subtle: warning },
          attention: { default: attention, subtle: attention },
        },
      },
    },
    actions: {
      actionsOrientation: "horizontal",
      actionAlignment: "left",
      buttonSpacing: 8,
      maxActions: 5,
      showCard: { actionMode: "inline" },
      spacing: "default",
    },
    adaptiveCard: {
      allowCustomStyle: false,
    },
    spacing: {
      small: 4,
      default: 8,
      medium: 12,
      large: 16,
      extraLarge: 24,
      padding: 12,
    },
    separator: {
      lineThickness: 1,
      lineColor: border,
    },
    fontSizes: {
      small: 12,
      default: 14,
      medium: 16,
      large: 18,
      extraLarge: 22,
    },
    fontWeights: {
      lighter: 300,
      default: 400,
      bolder: 600,
    },
    imageSizes: {
      small: 40,
      medium: 80,
      large: 120,
    },
    textBlock: {
      headingLevel: 2,
    },
  };
}

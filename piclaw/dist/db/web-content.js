const DEFAULT_WEB_CONTENT_MAX_CHARS = 262_144;
const WEB_CONTENT_MAX_CHARS = (() => {
    const raw = Number.parseInt(process.env.PICLAW_WEB_MAX_CONTENT_CHARS || "", 10);
    return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_WEB_CONTENT_MAX_CHARS;
})();
export function clampWebContent(content) {
    const safeContent = typeof content === "string" ? content : String(content ?? "");
    const length = safeContent.length;
    if (length <= WEB_CONTENT_MAX_CHARS)
        return { content: safeContent };
    return {
        content: "",
        meta: {
            truncated: true,
            original_length: length,
            max_length: WEB_CONTENT_MAX_CHARS,
        },
    };
}

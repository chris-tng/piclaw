const DEFAULT_WEB_CONTENT_MAX_CHARS = 262_144;
const DEFAULT_WEB_CONTENT_PREVIEW_CHARS = 16_000;
const WEB_CONTENT_MAX_CHARS = (() => {
    const raw = Number.parseInt(process.env.PICLAW_WEB_MAX_CONTENT_CHARS || "", 10);
    return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_WEB_CONTENT_MAX_CHARS;
})();
const WEB_CONTENT_PREVIEW_CHARS = (() => {
    const raw = Number.parseInt(process.env.PICLAW_WEB_PREVIEW_CHARS || "", 10);
    if (Number.isFinite(raw) && raw > 0)
        return Math.min(raw, WEB_CONTENT_MAX_CHARS);
    return Math.min(DEFAULT_WEB_CONTENT_PREVIEW_CHARS, WEB_CONTENT_MAX_CHARS);
})();
const SVG_HINT = /data:image\/svg\+xml|<svg[\s>]/i;
export function isSvgContent(content) {
    return SVG_HINT.test(content);
}
export function shouldPreviewWebContent(content) {
    if (!content)
        return false;
    if (content.length <= WEB_CONTENT_PREVIEW_CHARS)
        return false;
    if (isSvgContent(content))
        return false;
    return true;
}
export function getWebPreviewMaxChars() {
    return WEB_CONTENT_PREVIEW_CHARS;
}
export function clampWebContent(content) {
    const safeContent = typeof content === "string" ? content : String(content ?? "");
    const length = safeContent.length;
    if (length > WEB_CONTENT_MAX_CHARS) {
        return {
            content: "",
            meta: {
                truncated: true,
                original_length: length,
                max_length: WEB_CONTENT_MAX_CHARS,
            },
        };
    }
    if (shouldPreviewWebContent(safeContent)) {
        const preview = safeContent.slice(0, WEB_CONTENT_PREVIEW_CHARS).trimEnd();
        return {
            content: preview,
            meta: {
                truncated: true,
                preview: true,
                original_length: length,
                max_length: WEB_CONTENT_PREVIEW_CHARS,
            },
        };
    }
    return { content: safeContent };
}

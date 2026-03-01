export function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
export function clampInt(value, fallback, min, max) {
    const parsed = value ? parseInt(value, 10) : fallback;
    if (Number.isNaN(parsed))
        return fallback;
    return Math.min(Math.max(parsed, min), max);
}
export function parseOptionalInt(value) {
    if (!value)
        return null;
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
}

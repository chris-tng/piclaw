/**
 * runtime/console-timestamps.ts – Patches console.log/warn/error to prefix ISO timestamps.
 *
 * Called once at startup. Each log line gets a `[2026-03-12T13:47:52.369Z]` prefix.
 * Falls back silently to unprefixed output if the timestamp prefix fails.
 */
/** Patch console.log, console.warn, and console.error to prefix ISO 8601 UTC timestamps. */
export function patchConsoleTimestamps() {
    const origLog = console.log;
    const origWarn = console.warn;
    const origError = console.error;
    function withTimestamp(origFn) {
        return function (...args) {
            try {
                const ts = new Date().toISOString();
                origFn.call(console, `[${ts}]`, ...args);
            }
            catch {
                origFn.apply(console, args);
            }
        };
    }
    console.log = withTimestamp(origLog);
    console.warn = withTimestamp(origWarn);
    console.error = withTimestamp(origError);
}

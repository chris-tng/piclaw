export const DEFAULT_MAX_RETRIES = 3;
export const DEFAULT_BASE_RETRY_MS = 5000;
export function shouldRetry(retries, maxRetries, shuttingDown) {
    return !shuttingDown && retries < maxRetries;
}
export function getRetryDelay(retryCount, baseMs) {
    if (retryCount <= 0)
        return 0;
    return baseMs * Math.pow(2, retryCount - 1);
}

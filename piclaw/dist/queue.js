import { DEFAULT_BASE_RETRY_MS, DEFAULT_MAX_RETRIES, getRetryDelay, shouldRetry } from "./queue/retry-policy.js";
export class AgentQueue {
    running = false;
    pending = [];
    current = null;
    shuttingDown = false;
    runningPromise = null;
    enqueue(fn, id) {
        if (this.shuttingDown)
            return;
        // Deduplicate by id if provided
        if (id) {
            if (this.current?.id === id)
                return;
            if (this.pending.some((p) => p.id === id))
                return;
        }
        const item = { id, fn, retries: 0 };
        if (this.running) {
            this.pending.push(item);
            return;
        }
        this.runItem(item);
    }
    enqueueTask(taskId, fn) {
        this.enqueue(fn, `task:${taskId}`);
    }
    runItem(item) {
        this.running = true;
        this.current = item;
        this.runningPromise = this.executeItem(item);
    }
    async executeItem(item) {
        try {
            await item.fn();
        }
        catch (err) {
            console.error("[queue] Error:", err);
            this.scheduleRetry(item);
        }
        finally {
            this.running = false;
            this.current = null;
            this.runningPromise = null;
            if (this.pending.length > 0 && !this.shuttingDown) {
                const next = this.pending.shift();
                this.runItem(next);
            }
        }
    }
    scheduleRetry(item) {
        if (!shouldRetry(item.retries, DEFAULT_MAX_RETRIES, this.shuttingDown))
            return;
        item.retries++;
        const delay = getRetryDelay(item.retries, DEFAULT_BASE_RETRY_MS);
        console.log(`[queue] Retry ${item.retries}/${DEFAULT_MAX_RETRIES} in ${delay}ms${item.id ? ` (${item.id})` : ""}`);
        setTimeout(() => {
            if (this.shuttingDown)
                return;
            if (this.running) {
                this.pending.push(item);
            }
            else {
                this.runItem(item);
            }
        }, delay);
    }
    async shutdown(ms) {
        this.shuttingDown = true;
        this.pending = [];
        if (this.runningPromise) {
            await Promise.race([this.runningPromise, Bun.sleep(ms)]);
        }
    }
}

import { DEFAULT_BASE_RETRY_MS, DEFAULT_MAX_RETRIES, getRetryDelay, shouldRetry } from "./queue/retry-policy.js";

interface QueueItem {
  id?: string;
  fn: () => Promise<void>;
  retries: number;
}

export class AgentQueue {
  private running = false;
  private pending: QueueItem[] = [];
  private current: QueueItem | null = null;
  private shuttingDown = false;
  private runningPromise: Promise<void> | null = null;

  enqueue(fn: () => Promise<void>, id?: string): void {
    if (this.shuttingDown) return;
    // Deduplicate by id if provided
    if (id) {
      if (this.current?.id === id) return;
      if (this.pending.some((p) => p.id === id)) return;
    }
    const item: QueueItem = { id, fn, retries: 0 };
    if (this.running) {
      this.pending.push(item);
      return;
    }
    this.runItem(item);
  }

  enqueueTask(taskId: string, fn: () => Promise<void>): void {
    this.enqueue(fn, `task:${taskId}`);
  }

  private runItem(item: QueueItem): void {
    this.running = true;
    this.current = item;
    this.runningPromise = this.executeItem(item);
  }

  private async executeItem(item: QueueItem): Promise<void> {
    try {
      await item.fn();
    } catch (err) {
      console.error("[queue] Error:", err);
      this.scheduleRetry(item);
    } finally {
      this.running = false;
      this.current = null;
      this.runningPromise = null;
      if (this.pending.length > 0 && !this.shuttingDown) {
        const next = this.pending.shift()!;
        this.runItem(next);
      }
    }
  }

  private scheduleRetry(item: QueueItem): void {
    if (!shouldRetry(item.retries, DEFAULT_MAX_RETRIES, this.shuttingDown)) return;
    item.retries++;
    const delay = getRetryDelay(item.retries, DEFAULT_BASE_RETRY_MS);
    console.log(
      `[queue] Retry ${item.retries}/${DEFAULT_MAX_RETRIES} in ${delay}ms${item.id ? ` (${item.id})` : ""}`
    );
    setTimeout(() => {
      if (this.shuttingDown) return;
      if (this.running) {
        this.pending.push(item);
      } else {
        this.runItem(item);
      }
    }, delay);
  }

  async shutdown(ms: number): Promise<void> {
    this.shuttingDown = true;
    this.pending = [];
    if (this.runningPromise) {
      await Promise.race([this.runningPromise, Bun.sleep(ms)]);
    }
  }
}

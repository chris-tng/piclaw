/**
 * queue.ts – Serial execution queue with retry for agent runs.
 *
 * Ensures only one agent task runs at a time per queue instance. Failed tasks
 * are retried with exponential back-off up to DEFAULT_MAX_RETRIES times.
 * Items can be deduplicated by an optional string `id` (useful for scheduled
 * tasks that shouldn't stack up).
 *
 * Consumers:
 *   - runtime.ts creates a single AgentQueue and passes it to the router
 *     and task scheduler.
 *   - router.ts calls enqueue() for each inbound message that needs processing.
 *   - task-scheduler.ts calls enqueueTask() for due scheduled tasks.
 *   - channels/web.ts calls enqueue() for web channel interactions.
 */

import { DEFAULT_BASE_RETRY_MS, DEFAULT_MAX_RETRIES, getRetryDelay, shouldRetry } from "./queue/retry-policy.js";

/** Internal representation of a queued work item. */
interface QueueItem {
  /** Optional deduplication key. */
  id?: string;
  /** The async function to execute. */
  fn: () => Promise<void>;
  /** Number of times this item has been retried after failure. */
  retries: number;
}

/** In-memory counters for queue behavior/health visibility. */
export interface QueueMetrics {
  enqueued: number;
  deduplicated: number;
  started: number;
  succeeded: number;
  failed: number;
  retriesScheduled: number;
}

/**
 * A serial execution queue: items run one at a time, in FIFO order.
 * If an item fails, it is re-enqueued after an exponential delay.
 */
export class AgentQueue {
  private running = false;
  private pending: QueueItem[] = [];
  private current: QueueItem | null = null;
  private shuttingDown = false;
  private runningPromise: Promise<void> | null = null;
  private metrics: QueueMetrics = {
    enqueued: 0,
    deduplicated: 0,
    started: 0,
    succeeded: 0,
    failed: 0,
    retriesScheduled: 0,
  };

  /**
   * Add a work item to the queue. If the queue is idle, execution starts
   * immediately; otherwise the item is appended to the pending list.
   * Items with the same `id` are deduplicated (skipped if already queued).
   */
  enqueue(fn: () => Promise<void>, id?: string): void {
    if (this.shuttingDown) return;
    // Deduplicate by id if provided
    if (id) {
      if (this.current?.id === id) {
        this.metrics.deduplicated += 1;
        return;
      }
      if (this.pending.some((p) => p.id === id)) {
        this.metrics.deduplicated += 1;
        return;
      }
    }
    const item: QueueItem = { id, fn, retries: 0 };
    this.metrics.enqueued += 1;
    if (this.running) {
      this.pending.push(item);
      return;
    }
    this.runItem(item);
  }

  /** Convenience wrapper that prefixes the id with "task:" for scheduled tasks. */
  enqueueTask(taskId: string, fn: () => Promise<void>): void {
    this.enqueue(fn, `task:${taskId}`);
  }

  /** Start executing an item (sets running state, stores the promise). */
  private runItem(item: QueueItem): void {
    this.running = true;
    this.current = item;
    this.metrics.started += 1;
    this.runningPromise = this.executeItem(item);
  }

  /** Run the item's function, handle errors with retry, and advance to the next item. */
  private async executeItem(item: QueueItem): Promise<void> {
    try {
      await item.fn();
      this.metrics.succeeded += 1;
    } catch (err) {
      this.metrics.failed += 1;
      console.error("[queue] Error:", err);
      this.scheduleRetry(item);
    } finally {
      this.running = false;
      this.current = null;
      this.runningPromise = null;
      // Advance to next pending item if available.
      if (this.pending.length > 0 && !this.shuttingDown) {
        const next = this.pending.shift()!;
        this.runItem(next);
      }
    }
  }

  /** Schedule an exponential-backoff retry for a failed item. */
  private scheduleRetry(item: QueueItem): void {
    if (!shouldRetry(item.retries, DEFAULT_MAX_RETRIES, this.shuttingDown)) return;
    item.retries++;
    this.metrics.retriesScheduled += 1;
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

  /**
   * Gracefully shut down the queue: clear pending items and wait up to `ms`
   * milliseconds for the currently running item to finish.
   */
  async shutdown(ms = 5000): Promise<void> {
    this.shuttingDown = true;
    this.pending = [];
    if (this.runningPromise) {
      await Promise.race([this.runningPromise, Bun.sleep(ms)]);
    }
  }

  /** Snapshot queue counters for diagnostics and tests. */
  getMetrics(): QueueMetrics {
    return { ...this.metrics };
  }
}

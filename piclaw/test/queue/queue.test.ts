import { describe, test, expect } from "bun:test";
import "../helpers.js";

import { AgentQueue } from "../../src/queue.js";
import { getRetryDelay, shouldRetry } from "../../src/queue/retry-policy.js";

describe("AgentQueue", () => {
  test("executes tasks sequentially", async () => {
    const queue = new AgentQueue();
    const order: number[] = [];

    queue.enqueue(async () => {
      await Bun.sleep(10);
      order.push(1);
    });
    queue.enqueue(async () => {
      order.push(2);
    });

    // Wait for both to complete
    await Bun.sleep(100);
    expect(order).toEqual([1, 2]);
    await queue.shutdown(100);
  });

  test("deduplicates by id", async () => {
    const queue = new AgentQueue();
    let count = 0;

    queue.enqueue(async () => {
      await Bun.sleep(50);
      count++;
    }, "task-1");

    // This should be ignored (same id, first is still running)
    queue.enqueue(async () => {
      count++;
    }, "task-1");

    await Bun.sleep(200);
    expect(count).toBe(1);
    await queue.shutdown(100);
  });

  test("enqueueTask prefixes id with task:", async () => {
    const queue = new AgentQueue();
    let ran = false;

    queue.enqueueTask("abc", async () => {
      ran = true;
    });

    await Bun.sleep(50);
    expect(ran).toBe(true);
    await queue.shutdown(100);
  });

  test("shutdown prevents new tasks", async () => {
    const queue = new AgentQueue();
    await queue.shutdown(100);

    let ran = false;
    queue.enqueue(async () => {
      ran = true;
    });

    await Bun.sleep(50);
    expect(ran).toBe(false);
  });

  test("allows different ids in queue", async () => {
    const queue = new AgentQueue();
    const order: string[] = [];

    queue.enqueue(async () => {
      await Bun.sleep(20);
      order.push("a");
    }, "id-a");

    queue.enqueue(async () => {
      order.push("b");
    }, "id-b");

    await Bun.sleep(150);
    expect(order).toEqual(["a", "b"]);
    await queue.shutdown(100);
  });

  test("retry policy helpers", () => {
    expect(shouldRetry(0, 3, false)).toBe(true);
    expect(shouldRetry(3, 3, false)).toBe(false);
    expect(shouldRetry(1, 3, true)).toBe(false);
    expect(getRetryDelay(1, 1000)).toBe(1000);
    expect(getRetryDelay(2, 1000)).toBe(2000);
    expect(getRetryDelay(3, 1000)).toBe(4000);
  });
});

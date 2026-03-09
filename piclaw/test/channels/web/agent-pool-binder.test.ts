import { describe, expect, test } from "bun:test";
import type { AgentPool } from "../../../src/agent-pool.js";
import { bindWebUiSessionBinder } from "../../../src/channels/web/agent-pool-binder.js";

describe("agent pool binder helper", () => {
  test("binds session binder when agent pool supports setSessionBinder", () => {
    let assigned = false;
    const pool = {
      setSessionBinder: () => {
        assigned = true;
      },
    } as unknown as AgentPool;

    bindWebUiSessionBinder(pool, () => {});
    expect(assigned).toBeTrue();
  });

  test("no-ops when setSessionBinder is unavailable", () => {
    const pool = {} as unknown as AgentPool;
    expect(() => bindWebUiSessionBinder(pool, () => {})).not.toThrow();
  });
});

import { expect, test } from "bun:test";
import { getTestWorkspace } from "../helpers.js";
import { createTrackedBashOperations } from "../../src/tools/tracked-bash.js";

test("tracked bash executes commands and captures output", async () => {
  const ws = getTestWorkspace();
  const ops = createTrackedBashOperations();
  let output = "";

  const result = await ops.exec("echo hello", ws.workspace, {
    onData: (data) => {
      output += data.toString("utf8");
    },
    timeout: 5,
  });

  expect(result.exitCode).toBe(0);
  expect(output).toContain("hello");
});

test("tracked bash rejects missing working directory", async () => {
  const ops = createTrackedBashOperations();
  let error: Error | null = null;
  try {
    await ops.exec("echo hi", "/no/such/dir", { onData: () => {} });
  } catch (err) {
    error = err as Error;
  }

  expect(error).not.toBeNull();
  expect(error?.message).toContain("Working directory does not exist");
});

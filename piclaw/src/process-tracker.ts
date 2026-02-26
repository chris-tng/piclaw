import { spawn } from "child_process";

type TrackedProcess = {
  pid: number;
  createdAt: number;
};

const tracked = new Map<number, TrackedProcess>();

export function registerProcess(pid: number): void {
  if (!Number.isFinite(pid)) return;
  tracked.set(pid, { pid, createdAt: Date.now() });
}

export function unregisterProcess(pid: number): void {
  tracked.delete(pid);
}

export function listTrackedProcesses(): number[] {
  return [...tracked.keys()];
}

export function killProcessTree(pid: number): void {
  if (!Number.isFinite(pid)) return;
  if (process.platform === "win32") {
    try {
      spawn("taskkill", ["/F", "/T", "/PID", String(pid)], {
        stdio: "ignore",
        detached: true,
      });
    } catch {
      // Ignore errors if taskkill fails
    }
    return;
  }

  try {
    process.kill(-pid, "SIGKILL");
  } catch {
    try {
      process.kill(pid, "SIGKILL");
    } catch {
      // Process already dead
    }
  }
}

export function killTrackedProcesses(): number {
  const pids = [...tracked.keys()];
  for (const pid of pids) {
    killProcessTree(pid);
    tracked.delete(pid);
  }
  return pids.length;
}

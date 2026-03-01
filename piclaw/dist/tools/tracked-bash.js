import { spawn } from "child_process";
import { existsSync } from "fs";
import { killProcessTree, registerProcess, unregisterProcess } from "../utils/process-tracker.js";
function resolveShellConfig() {
    if (process.platform === "win32") {
        return { shell: "bash.exe", args: ["-c"] };
    }
    if (process.env.SHELL && existsSync(process.env.SHELL)) {
        return { shell: process.env.SHELL, args: ["-c"] };
    }
    if (existsSync("/bin/bash")) {
        return { shell: "/bin/bash", args: ["-c"] };
    }
    return { shell: "bash", args: ["-c"] };
}
export function createTrackedBashOperations() {
    return {
        exec: (command, cwd, { onData, signal, timeout, env }) => {
            return new Promise((resolve, reject) => {
                const { shell, args } = resolveShellConfig();
                if (!existsSync(cwd)) {
                    reject(new Error(`Working directory does not exist: ${cwd}\nCannot execute bash commands.`));
                    return;
                }
                const child = spawn(shell, [...args, command], {
                    cwd,
                    detached: true,
                    env: env ?? { ...process.env },
                    stdio: ["ignore", "pipe", "pipe"],
                });
                if (child.pid) {
                    registerProcess(child.pid);
                }
                let timedOut = false;
                let aborted = false;
                let timeoutHandle;
                if (timeout !== undefined && timeout > 0) {
                    timeoutHandle = setTimeout(() => {
                        timedOut = true;
                        if (child.pid) {
                            killProcessTree(child.pid);
                        }
                    }, timeout * 1000);
                }
                const cleanup = () => {
                    if (timeoutHandle)
                        clearTimeout(timeoutHandle);
                    if (signal)
                        signal.removeEventListener("abort", onAbort);
                    if (child.pid)
                        unregisterProcess(child.pid);
                };
                const onAbort = () => {
                    aborted = true;
                    if (child.pid) {
                        killProcessTree(child.pid);
                    }
                };
                if (signal) {
                    if (signal.aborted) {
                        onAbort();
                    }
                    else {
                        signal.addEventListener("abort", onAbort, { once: true });
                    }
                }
                if (child.stdout) {
                    child.stdout.on("data", onData);
                }
                if (child.stderr) {
                    child.stderr.on("data", onData);
                }
                child.on("error", (err) => {
                    cleanup();
                    reject(err);
                });
                child.on("close", (code) => {
                    cleanup();
                    if (aborted || signal?.aborted) {
                        reject(new Error("aborted"));
                        return;
                    }
                    if (timedOut) {
                        reject(new Error(`timeout:${timeout}`));
                        return;
                    }
                    resolve({ exitCode: code });
                });
            });
        },
    };
}

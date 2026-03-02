#!/usr/bin/env bun
import { handleCliOptions } from "./cli.js";
import { main } from "./runtime.js";

const handled = await handleCliOptions();
if (handled) {
  process.exit(0);
}

main().catch((err) => {
  console.error("[piclaw] Fatal:", err);
  process.exit(1);
});

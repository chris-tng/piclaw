/**
 * scripts/stamp-cache-buster.ts
 *
 * Replaces all `?v=<digits>` cache-buster query strings in index.html
 * with a fresh unix-epoch-seconds timestamp.  Run automatically at the
 * end of `build:web`.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const INDEX = resolve(import.meta.dir, "../web/static/index.html");
const stamp = Math.floor(Date.now() / 1000).toString();

let html = readFileSync(INDEX, "utf-8");
const replaced = html.replace(/\?v=\d+/g, `?v=${stamp}`);

if (replaced !== html) {
  writeFileSync(INDEX, replaced, "utf-8");
  console.log(`[cache-buster] stamped index.html → v=${stamp}`);
} else {
  console.log(`[cache-buster] no ?v= tokens found in index.html`);
}

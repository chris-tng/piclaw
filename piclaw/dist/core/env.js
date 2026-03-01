import { readFileSync } from "fs";
import { join } from "path";
export function readEnvFile(keys) {
    const envFile = join(process.cwd(), ".env");
    let content;
    try {
        content = readFileSync(envFile, "utf-8");
    }
    catch {
        return {};
    }
    const result = {};
    const wanted = new Set(keys);
    for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#"))
            continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx === -1)
            continue;
        const key = trimmed.slice(0, eqIdx).trim();
        if (!wanted.has(key))
            continue;
        let value = trimmed.slice(eqIdx + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        if (value)
            result[key] = value;
    }
    return result;
}

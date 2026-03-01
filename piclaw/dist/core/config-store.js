import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname } from "path";
export function readJsonConfig(filePath) {
    try {
        const raw = readFileSync(filePath, "utf-8");
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object")
            return parsed;
    }
    catch {
        // ignore
    }
    return {};
}
export function writeJsonConfig(filePath, config) {
    mkdirSync(dirname(filePath), { recursive: true });
    const next = JSON.stringify(config, null, 2);
    writeFileSync(filePath, `${next}\n`, "utf-8");
}

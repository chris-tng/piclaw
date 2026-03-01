import { clampInt, jsonResponse, parseOptionalInt } from "./http-utils.js";
import { serveDocsStatic, serveStatic } from "./static.js";
export class ResponseService {
    json(data, status = 200) {
        return jsonResponse(data, status);
    }
    async serveStatic(relPath) {
        return serveStatic(relPath, () => this.json({ error: "Not found" }, 404));
    }
    async serveDocsStatic(relPath) {
        return serveDocsStatic(relPath, () => this.json({ error: "Not found" }, 404));
    }
    clampInt(value, fallback, min, max) {
        return clampInt(value, fallback, min, max);
    }
    parseOptionalInt(value) {
        return parseOptionalInt(value);
    }
}

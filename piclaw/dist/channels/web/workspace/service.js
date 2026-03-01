import { WorkspaceFileService } from "./file-service.js";
import { WorkspaceTreeCache } from "./tree-cache.js";
import { startWorkspaceWatcher } from "./watcher.js";
export { createWorkspaceUpdateThrottle } from "./watcher.js";
export class WorkspaceService {
    treeCache = new WorkspaceTreeCache();
    fileService = new WorkspaceFileService();
    getTree(pathParam, depthParam, includeHidden = false) {
        return this.treeCache.getTree(pathParam, depthParam, includeHidden);
    }
    getFile(pathParam, maxParam) {
        return this.fileService.getFile(pathParam, maxParam);
    }
    getRaw(pathParam) {
        return this.fileService.getRaw(pathParam);
    }
    attachFile(pathParam) {
        return this.fileService.attachFile(pathParam);
    }
    startWatcher(onUpdate, includeHidden) {
        return startWorkspaceWatcher(onUpdate, includeHidden);
    }
}

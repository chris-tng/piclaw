import { fileAttachments } from "./file-attachments.js";
import { messageSearch } from "./message-search.js";
import { modelControl } from "./model-control.js";
import { scheduledTasks } from "./scheduled-tasks.js";
export const builtinExtensionFactories = [
    fileAttachments,
    messageSearch,
    modelControl,
    scheduledTasks,
];

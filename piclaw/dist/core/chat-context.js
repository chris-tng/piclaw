import { AsyncLocalStorage } from "async_hooks";
const storage = new AsyncLocalStorage();
export async function withChatContext(chatJid, channel, fn) {
    return storage.run({ chatJid, channel }, fn);
}
export function getChatContext() {
    return storage.getStore() ?? null;
}
export function getChatJid(defaultValue = "web:default") {
    return storage.getStore()?.chatJid ?? defaultValue;
}
export function getChatChannel(defaultValue = "web") {
    return storage.getStore()?.channel ?? defaultValue;
}

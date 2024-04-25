import { createJSONStorage } from "zustand/middleware";

export function generateId() {
    const uuid = crypto.randomUUID();
    console.log(uuid)
    return uuid
}

export function createLocalStorageProvider() {
    return createJSONStorage(() => localStorage);
}

export function getStorageEngine() {
    return createLocalStorageProvider();
}
import { createJSONStorage } from "zustand/middleware";


export function generateId() {
    return String(Date.now());
}

export function createLocalStorageProvider() {
    return createJSONStorage(() => localStorage);
}

export function getStorageEngine() {
    return createLocalStorageProvider();
}
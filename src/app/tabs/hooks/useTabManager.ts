import { useState } from "react";

export interface Tab {
    id: string,
    name: string
}

export function useTabManager() {
    const [tabs, setTabs] = useState([{ id: "first", name: "Autonomous" }, { id: String(Date.now()), name: "Teleop" }] as Tab[]);
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const addTab = () => {
        setTabs(t => [...t, { id: String(Date.now()), name: "New Tab" }])
    }

    const deleteTab = (id: string) => {
        setTabs(t => [...t].filter(a => a.id !== id));
    }

    const renameTab = (id: string, name: string) => {
        setTabs(t => [...t].map(a => a.id === id ? { id: a.id, name } : a));
    }

    return { addTab, deleteTab, tabs, activeTab, renameTab, setActiveTab }
}
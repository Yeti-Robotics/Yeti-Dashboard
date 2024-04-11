import { Dispatch, SetStateAction, useState } from "react";

export interface Tab {
    id: string,
    name: string
}

export function useTabManager(): TabContext {
    const [tabs, setTabs] = useState([
        { id: "first", name: "Autonomous" }, { id: String(Date.now()), name: "Teleop" },
    ] as Tab[]);
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    const addTab = () => {
        setTabs(t => {
            const id = String(Date.now());
            const nt = [...t, { id, name: "New Tab" }];
            setActiveTab(id);
            return nt;
        })
    }

    const deleteTab = (id: string) => {
        setTabs(t => {
            let index = 0;
            const nt = [...t].filter((a, i) => {
                if (a.id === id) {
                    index = i;
                    return false;
                }
                return true;
            });

            let at;

            if (index === -1) {
                at = (nt[0].id);
            } else if (index === t.length - 1) {
                at = (nt[nt.length - 1].id)
            } else {
                at = nt[index].id;
            }

            setActiveTab(at);

            return nt;
        });
    }

    const renameTab = (id: string, name: string) => {
        setTabs(t => [...t].map(a => a.id === id ? { id: a.id, name } : a));
    }

    return { addTab, deleteTab, tabs, activeTab, renameTab, setActiveTab }
}

export interface TabContext {
    addTab: () => void,
    deleteTab: (id: string) => void,
    tabs: Tab[],
    activeTab: string,
    setActiveTab: Dispatch<SetStateAction<string>>,
    renameTab: (id: string, name: string) => void
}
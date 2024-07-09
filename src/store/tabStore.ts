import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";
import { generateId, getStorageEngine } from "./util";
type Tab = {
  id: string;
  name: string;
  deleted: boolean;
};

export type TabStore = {
  tabs: Tab[];
  activeTab: string;
  actions: Actions;
};

export type Actions = {
  addTab: () => void;
  deleteTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  renameTab: (id: string, name: string) => void;
};

const immerActions = {
  addTab: (tabs: Tab[]) =>
    produce(tabs, (nextState) => {
      nextState.push({ id: generateId(), name: "New Tab", deleted: false });
    }),
  deleteTab: (tabs: Tab[], setActiveTab: (id: string) => void, id: string) =>
    produce(tabs, (nextState) => {
      let index = 0;
      const nt = nextState.filter((a, i) => {
        if (a.id === id) {
          index = i;
          a.deleted = true;
          return false;
        }
        return true;
      });

      let at;

      if (index === -1) {
        at = nt[0].id;
      } else if (index === nextState.length - 1) {
        at = nt[nt.length - 1].id;
      } else {
        at = nt[index].id;
      }

      setActiveTab(at);
    }),
  renameTab: (tabs: Tab[], id: string, name: string) =>
    produce(tabs, (nextState) => {
      const n = nextState.find((z) => z.id === id);
      if (n) {
        n.name = name;
      }
    }),
};

export const useTabStore = create<TabStore>()(
  persist(
    (set, get) => ({
      tabs: [
        { id: generateId(), name: "Autonomous", deleted: false },
        { id: generateId(), name: "Teleop", deleted: false },
      ],
      activeTab: "first",
      actions: {
        setActiveTab: (id: string) => set({ activeTab: id }),
        addTab: () => set({ tabs: immerActions.addTab(get().tabs) }),
        deleteTab: (id: string) =>
          set({
            tabs: immerActions.deleteTab(
              get().tabs,
              get().actions.setActiveTab,
              id
            ),
          }),
        renameTab: (id: string, name: string) =>
          set({ tabs: immerActions.renameTab(get().tabs, id, name) }),
      },
    }),
    {
      name: "tabStore",
      storage: getStorageEngine(),
      partialize: (state) => ({
        tabs: state.tabs,
        activeTab: state.activeTab,
      }),
    }
  )
);

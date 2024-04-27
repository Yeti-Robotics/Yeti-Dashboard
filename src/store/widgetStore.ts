import { create } from "zustand"
import { persist } from "zustand/middleware"
import { generateId, getStorageEngine } from "./util"
import { produce } from "immer"

export interface WidgetData {
    dataKey: string,
    widgetType?: string,
    widgetId: string,
    label?: string,
    position: {
        x: number, y: number, width: number, height: number
    }
}

interface WidgetTree {
    [x: string]: WidgetData
}

type Actions = {
    addWidget: (el: WidgetData) => void,
    deleteWidget: (id: string) => void,
    setWidgetOnTop: (id: string) => void
    updateWidget: (id: string, widget: Partial<WidgetData>) => void
}

export interface WidgetStore {
    widgets: WidgetTree,
    widgetOnTopId: string,
    actions: Actions
}

const immerActions = {
    addWidget: (widgets: WidgetTree, el: WidgetData) => produce(widgets, nextState => {
        el.widgetId = generateId();
        nextState[el.widgetId] = el;
    }),
    deleteWidget: (widgets: WidgetTree, id: string) => produce(widgets, nextState => {
        delete nextState[id];
    }),
    updateWidget: (widgets: WidgetTree, id: string, widgetUpdate: Partial<WidgetData>) => produce(widgets, nextState => {
        nextState[id] = { ...nextState[id], ...widgetUpdate };
    })
};

export const createWidgetStore = (tabId: string) => {
    return create<WidgetStore>()(
        persist((set, get) => ({
            widgets: {},
            widgetOnTopId: "",
            actions: {
                setWidgetOnTop: (id: string) => set({ widgetOnTopId: id }),
                addWidget: (el: WidgetData) => set({ widgets: immerActions.addWidget(get().widgets, el) }),
                deleteWidget: (id: string) => set({ widgets: immerActions.deleteWidget(get().widgets, id) }),
                updateWidget: (id: string, widget: Partial<WidgetData>) => set({ widgets: immerActions.updateWidget(get().widgets, id, widget) })
            }
        }), {
            name: `${tabId}-widgets`,
            storage: getStorageEngine(),
            partialize: (state) => ({
                widgets: state.widgets,
            })
        }));
}
import { useContext, useState } from "react";

export interface WidgetData {
    initialX: number,
    initialY: number,
    dataKey: string,
    widgetType?: string,
    widgetId: string
}

interface WidgetTree {
    [x: string]: WidgetData
}

export function useWidgetManager(): WidgetContext {
    const [widgets, setWidgets] = useState({} as WidgetTree);
    const [widgetOnTopId, setWidgetOnTop] = useState("");

    const addWidget = (el: WidgetData) => {
        return setWidgets(w => ({ ...w, [el.widgetId]: el }));
    }

    const deleteWidget = (wId: string) => {
        return setWidgets(w => {
            const newW = { ...w };
            delete newW[wId];
            return newW;
        });
    }

    return { widgets: Object.values(widgets), addWidget, deleteWidget, widgetOnTopId, setWidgetOnTop }
}

export const DefaultWidgetContext: WidgetContext = {
    widgets: [],
    addWidget: () => { },
    deleteWidget: () => { },
    widgetOnTopId: "",
    setWidgetOnTop: () => { }
}

export interface WidgetContext {
    widgets: WidgetData[]
    widgetOnTopId: string,
    setWidgetOnTop: (id: string) => void
    addWidget: (e: WidgetData) => void
    deleteWidget: (id: string) => void
}
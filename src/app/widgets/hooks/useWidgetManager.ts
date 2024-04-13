import { useState } from "react";

interface WidgetData {
    initialX: number,
    initialY: number,
    dataKey: string
}

export function useWidgetManager() {
    const [widgets, setWidgets] = useState([] as WidgetData[]);

    const addWidget = (el: WidgetData) => {
        return setWidgets(w => [...w, el]);
    }

    return { widgets, addWidget }
}
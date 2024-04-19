import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

interface DragAndDropContext {
    getDataKey: () => string,
    setDataKey: Dispatch<SetStateAction<string>>
}

export function provideDragAndDrop() {
    const [dataKey, setDataKey] = useState("")
    const getDataKey =() => {
        const c = dataKey;
        setDataKey("");
        return c;
    }
    return { getDataKey, setDataKey };
}

export const DragDropContext = createContext<DragAndDropContext>({
    getDataKey: () => "",
    setDataKey: () => { }
});


export function useWidgetDragAndDrop() {
    return useContext(DragDropContext);
}

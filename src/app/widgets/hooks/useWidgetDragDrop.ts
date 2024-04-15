import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"

interface DragAndDropContext {
    dataKey: string,
    setDataKey: Dispatch<SetStateAction<string>>
}

export function provideDragAndDrop() {
    const [dataKey, setDataKey] = useState("")
    return { dataKey, setDataKey };
}

export const DragDropContext = createContext<DragAndDropContext>({
    dataKey: "",
    setDataKey: () => { }
});


export function useWidgetDragAndDrop() {
    return useContext(DragDropContext);
}

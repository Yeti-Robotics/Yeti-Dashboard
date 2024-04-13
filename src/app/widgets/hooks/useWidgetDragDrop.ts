import { Dispatch, SetStateAction, createContext, useState } from "react"

interface DragAndDropContext {
    dataKey: string,
    setDataKey: Dispatch<SetStateAction<string>>
}

export function useWidgetDragDrop() {
    const [dataKey, setDataKey] = useState("")
    return { dataKey, setDataKey };
}

export const DragDropContext = createContext<DragAndDropContext>({
    dataKey: "",
    setDataKey: () => { }
});
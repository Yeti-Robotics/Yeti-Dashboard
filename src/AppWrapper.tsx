import App from "./App";
import { DragDropContext, useWidgetDragDrop } from "./app/widgets/hooks/useWidgetDragDrop";


export function AppWrapper() {
    return (
        <DragDropContext.Provider value={useWidgetDragDrop()}>
            <App />
        </DragDropContext.Provider>
    );
}
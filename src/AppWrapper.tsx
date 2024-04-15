import App from "./App";
import { DragDropContext, provideDragAndDrop } from "./app/widgets/hooks/useWidgetDragDrop";


export function AppWrapper() {
    return (
        <DragDropContext.Provider value={provideDragAndDrop()}>
            <App />
        </DragDropContext.Provider>
    );
}
import { NT4Provider } from "@frc-web-components/react";
import App from "./App";
import { DragDropContext, provideDragAndDrop } from "./app/widgets/hooks/useWidgetDragDrop";


export function AppWrapper() {
    return (
        <NT4Provider address="localhost">
            <DragDropContext.Provider value={provideDragAndDrop()}>
                <App />
            </DragDropContext.Provider>
        </NT4Provider>
    );
}
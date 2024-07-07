import { NT4Provider } from "@frc-web-components/react";
import App from "./App";
import { DragDropContext, provideDragAndDrop } from "./app/widgets/hooks/useWidgetDragDrop";
import { useConnection } from "./app/connection/useConnection";


export function AppWrapper() {
    const { connectionIp } = useConnection();
    return (
        <NT4Provider address={connectionIp}>
            <DragDropContext.Provider value={provideDragAndDrop()}>
                <App />
            </DragDropContext.Provider>
        </NT4Provider >
    );
}
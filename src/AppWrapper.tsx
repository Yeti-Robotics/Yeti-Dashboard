import { NT4Provider, useNt4 } from "@frc-web-components/react";
import App from "./App";
import { DragDropContext, provideDragAndDrop } from "./app/widgets/hooks/useWidgetDragDrop";
import { useConnection } from "./app/connection/useConnection";
import { Footer } from "./app/connection/Footer";


export function AppWrapper() {
    const { connectionIp } = useConnection();
    return (
        <NT4Provider address={connectionIp}>
            <DragDropContext.Provider value={provideDragAndDrop()}>
                <App />
                <Footer />
            </DragDropContext.Provider>
        </NT4Provider >
    );
}
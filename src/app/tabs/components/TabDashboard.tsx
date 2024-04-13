import { Widget } from "@/app/widgets/components/Widget";
import { useContext, useState } from "react";
import { useWidgetManager } from "../../widgets/hooks/useWidgetManager";
import { DragDropContext } from "@/app/widgets/hooks/useWidgetDragDrop";


export function TabDashboard({ id, activeTab }: { id: string, activeTab: string }) {
    const { widgets, addWidget } = useWidgetManager();
    const { dataKey } = useContext(DragDropContext);
    return (
        <div className={`h-full w-full absolute ${activeTab === id ? "" : "hidden"}`}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
                console.log("Dropped!")
                console.log(`Transferred data: ${dataKey}`)
                addWidget({ initialX: e.nativeEvent.offsetX, initialY: e.nativeEvent.offsetY, dataKey });
                e.preventDefault();
            }}>
            {widgets.map((props, i) => <Widget key={i} {...props} />)}
        </div>
    );
}
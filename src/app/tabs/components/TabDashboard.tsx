import { Widget } from "@/app/widgets/components/Widget";
import { useWidgetDragAndDrop } from "@/app/widgets/hooks/useWidgetDragDrop";
import { createWidgetStore } from "@/store/widgetStore";
import { useTabStore } from "@/store/tabStore";

export function TabDashboard({ id }: { id: string }) {
  const tabCtx = useTabStore();
  const { getDataKey } = useWidgetDragAndDrop();
  const manager = createWidgetStore(id)();
  const {
    widgets,
    actions: { addWidget },
  } = manager;
  return (
    <div
      className={`h-full w-full absolute ${
        tabCtx.activeTab === id ? "" : "hidden"
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const dataKey = getDataKey();
        console.log("Dropped!");
        console.log(`Transferred data: ${dataKey}`);
        if (!dataKey.length) return;
        addWidget({
          widgetId: "",
          position: {
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
            width: -1,
            height: -1,
          },
          dataKey,
        });
        e.preventDefault();
      }}
    >
      {Object.values(widgets).map((props) => (
        <Widget widgetContext={manager} key={props.widgetId} {...props} />
      ))}
    </div>
  );
}

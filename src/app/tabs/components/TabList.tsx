import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTabStore } from "@/store/tabStore";
import { Tab } from "../hooks/useTabManager";
import { useState } from "react";
import { EditableLabel } from "@/app/editable/EditableLabel";

function TabItem({ tab }: { tab: Tab }) {
  const tabCtx = useTabStore();
  const [label, setLabel] = useState(tab.name);

  return (
    <div className="space-x-1 flex">
      <EditableLabel label={label} setLabel={setLabel} />
      {tabCtx.activeTab === tab.id && tabCtx.tabs.length > 1 && (
        <span onClick={() => tabCtx.actions.deleteTab(tab.id)}>&times;</span>
      )}
    </div>
  );
}

export function TabList() {
  const tabCtx = useTabStore();
  const tabView = useTabStore((state) => state.tabs.filter((t) => !t.deleted));

  return (
    <TabsList>
      {tabView.map((tab) => (
        <TabsTrigger
          className="transition-all duration-200 ease-in-out"
          key={tab.id}
          value={tab.id}
        >
          <TabItem tab={tab} />
        </TabsTrigger>
      ))}
      <span
        onClick={() => tabCtx.actions.addTab()}
        className="cursor-pointer p-2 font-bold text-lg"
      >
        +
      </span>
    </TabsList>
  );
}

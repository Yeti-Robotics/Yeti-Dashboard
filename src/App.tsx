import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Tabs } from "./components/ui/tabs";
import { TabDashboard } from "./app/tabs/components/TabDashboard";
import { WidgetChooser } from "./app/widgets/components/WidgetChooser";
import { useState } from "react";
import { useTabStore } from "./store/tabStore";
import { TabList } from "./app/tabs/components/TabList";

interface NavProps {
  setShowWidgetDialog: (show: boolean) => void;
}

interface ConfigBarProps {
  setShowWidgetDialog: (show: boolean) => void;
}

function ConfigBar({ setShowWidgetDialog }: ConfigBarProps) {
  return (
    <Menubar className="border-0">
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Open config...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Dash</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => setShowWidgetDialog(true)}>
            Open widget dialog
          </MenubarItem>
          <MenubarItem>Open tab history</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Settings</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => alert("not yet")}>Dark mode</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function Nav({ setShowWidgetDialog }: NavProps) {
  const tabCtx = useTabStore();

  return (
    <header className="flex w-full items-center justify-between px-4 py-2">
      <div className="flex space-x-2 items-center">
        <img src="/yeti.png" className="size-12" />
        <ConfigBar setShowWidgetDialog={setShowWidgetDialog} />
      </div>
      <Tabs
        value={tabCtx.activeTab}
        onValueChange={tabCtx.actions.setActiveTab}
      >
        <TabList />
      </Tabs>
    </header>
  );
}

function App() {
  const tabView = useTabStore((state) => state.tabs.filter((t) => !t.deleted));
  const [showWidgetDialog, setShowWidgetDialog] = useState(true);

  return (
    <>
      <div className="h-screen">
        <Nav setShowWidgetDialog={setShowWidgetDialog} />
        <div className="w-full">
          {tabView.map((tab) => (
            <TabDashboard key={tab.id} id={tab.id} />
          ))}
        </div>

        <WidgetChooser show={showWidgetDialog} setShow={setShowWidgetDialog} />
      </div>
    </>
  );
}

export default App;

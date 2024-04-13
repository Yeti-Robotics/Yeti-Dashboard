import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useTabManager } from "./app/tabs/hooks/useTabManager";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "./components/ui/tabs";
import { TabLabel } from "./app/tabs/components/TabLabel";
import { TabDashboard } from "./app/tabs/components/TabDashboard";
import { WidgetChooser } from "./app/widgets/components/WidgetChooser";
import { useState } from "react";

function App() {
  const tabCtx = useTabManager();
  const [showWidgetDialog, setShowWidgetDialog] = useState(true);

  return (<>
    <div className="App">
      <Tabs value={tabCtx.activeTab} onValueChange={tabCtx.setActiveTab}>
        <div className="p-3 flex flex-wrap items-center space-x-5 divide-x-2 divide-black border-b-2 border-black">
          <div className="flex items-center space-x-3">
            <img src="/yeti.png" className="w-[50px] h-[50px]" />
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    Open config...
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Widgets</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => setShowWidgetDialog(true)}>
                    Open widget dialog
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Settings</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    Dark mode
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
          <div className="pl-4">
            <TabsList>
              {
                tabCtx.tabs.map(tab => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    <TabLabel tabCtx={tabCtx} id={tab.id}>{tab.name}</TabLabel>
                  </TabsTrigger>
                ))
              }
              <span onClick={() => tabCtx.addTab()} className="cursor-pointer p-2 font-bold text-lg">+</span>
            </TabsList>
          </div>
        </div>
        <div className="h-full">
          {tabCtx.tabs.map(tab => (
            <TabsContent value={tab.id} key={tab.id}>
              <TabDashboard id={tab.id} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
    <WidgetChooser show={showWidgetDialog} setShow={setShowWidgetDialog} />
  </>
  );
}

export default App;

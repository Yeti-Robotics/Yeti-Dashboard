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
import { useTabStore } from "./store/tabStore";

function App() {
  const tabCtx = useTabStore();
  const tabView = useTabStore(state => state.tabs.filter(t => !t.deleted))
  const [showWidgetDialog, setShowWidgetDialog] = useState(true)
  
  return (<>
    <div className="h-full bg-gradient-to-b from-blue-400 to-20% to-white">
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
              <MenubarTrigger>Dash</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => setShowWidgetDialog(true)}>
                  Open widget dialog
                </MenubarItem>
                <MenubarItem>
                  Open tab history
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Settings</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => alert("not yet")}>
                  Dark mode
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="pl-4">
          <Tabs value={tabCtx.activeTab} onValueChange={tabCtx.actions.setActiveTab}>
            <TabsList>
              {
                tabView.map(tab => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    <TabLabel tabCtx={tabCtx} id={tab.id}>{tab.name}</TabLabel>
                  </TabsTrigger>
                ))
              }
              <span onClick={() => tabCtx.actions.addTab()} className="cursor-pointer p-2 font-bold text-lg">+</span>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="h-screen w-full">
        {tabView.map(tab => (
          <TabDashboard key={tab.id} id={tab.id} activeTab={tabCtx.activeTab} />
        ))}
      </div>
    </div >

    <WidgetChooser show={showWidgetDialog} setShow={setShowWidgetDialog} />
  </>
  );
}

export default App;

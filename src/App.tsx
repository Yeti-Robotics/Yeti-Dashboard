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
import { Tabs, TabsTrigger, TabsList } from "./components/ui/tabs";
import { TabLabel } from "./app/tabs/components/TabLabel";

function App() {
  const { activeTab, setActiveTab, addTab, deleteTab, tabs } = useTabManager();
  return (
    <div className="App">
      <div className="p-3 divide-x-2 divide-black flex items-center space-x-5 border-b-2 border-black">
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
                <MenubarItem>
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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              {
                tabs.map(tab => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    <TabLabel addTab={addTab} deleteTab={deleteTab}>{tab.name}</TabLabel>
                  </TabsTrigger>
                ))
              }
            </TabsList>
            <div className="space-x-4">
              {
                tabs.map(t => <span key={t.id}>{t.id}</span>)
              }
            </div>
          </Tabs>
        </div>
      </div>
      <div className="h-full">

      </div>
    </div>
  );
}

export default App;

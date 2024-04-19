import { MutableRefObject, useEffect, useRef, useState } from "react"
import { useClickedOut } from "../hooks/useClickedOut";
import { TabContext } from "../hooks/useTabManager";
import { EditableLabel } from "../../editable/EditableLabel";
import { Actions, TabStore } from "@/store/tabStore";


export function TabLabel({ tabCtx, children, id }: { id: string, tabCtx: TabStore, children: string }) {
    const [label, setLabel] = useState(children)
    
    useEffect(() => {
        tabCtx.actions.renameTab(id, label);
    }, [label])

    return (
        <div className="space-x-1 flex">
            <EditableLabel label={label} setLabel={setLabel} />
            {tabCtx.activeTab === id && tabCtx.tabs.length > 1 && <span onClick={() => tabCtx.actions.deleteTab(id)}>&times;</span>}
        </div>
    )
}
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { useClickedOut } from "../hooks/useClickedOut";


export function TabLabel({ deleteTab, children }: { addTab: () => void, deleteTab: (id: string) => void, children: string }) {
    const [label, setLabel] = useState("Cheesus christ")
    const [editedLabel, setEditedLabel] = useState("Cheesus christ");
    const editedRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);

    const [editing, setEditing] = useState(false);
    const { componentRef, clickedOut } = useClickedOut();

    useEffect(() => {
        if (clickedOut) {
            handleFinishedEdit();
        }
    }, [clickedOut])

    const handleFinishedEdit = () => {
        console.log("Handle edit")
        console.log(label)
        console.log(editedLabel);
        if (!editedRef.current) return;
        const newLabel = editedRef?.current.textContent;
        if (!newLabel || newLabel.length < 1) {
            setEditedLabel(label);
        } else {
            setLabel(editedLabel);
        }

        setEditing(false);
    }

    return (
        <div>
            <span
                ref={componentRef} onDoubleClick={() => setEditing(true)} onKeyDown={e => {
                    if (e.key === "Enter") { handleFinishedEdit() }
                }}>
                {!editing ?
                    <span contentEditable={false} className="text-red-400">{label}</span> :
                    <span
                        ref={editedRef}
                        suppressContentEditableWarning={true}
                        contentEditable={editing}>{editedLabel}</span>}
            </span >
        </div>
    )
}
import { useEffect, useState, useRef, MutableRefObject, Dispatch, SetStateAction } from "react";
import { useClickedOut } from "../tabs/hooks/useClickedOut";


export function EditableLabel({ label, setLabel }: { label: string, setLabel: Dispatch<SetStateAction<string>> }) {
    const [editedLabel, setEditedLabel] = useState(label);
    const editedRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);

    const [editing, setEditing] = useState(false);
    const { componentRef, clickedOut } = useClickedOut();

    const updateEditLabel = (s: string) => {
        if (editedRef.current) {
            editedRef.current.textContent = s;
        }
    }

    useEffect(() => {
        if (editing) {
            clickedOut ? handleFinishedEdit() : updateEditLabel(label);
        }
    }, [clickedOut, editing])

    const handleFinishedEdit = () => {
        setEditing(false);

        const newLabel = editedRef.current?.textContent!;

        if (!newLabel || newLabel.length < 1) {
            setEditedLabel(label)
        } else {
            setLabel(newLabel);
        }
    }

    return (
        <div>
            <span
                ref={componentRef} onDoubleClick={() => setEditing(true)} onKeyDown={e => {
                    if (e.key === "Enter") { handleFinishedEdit() }
                }}>
                <span className={`${editing ? "hidden" : ""}`}>{label}</span>
                <span
                    ref={editedRef}
                    className={`${editing ? "" : "hidden"}`}
                    suppressContentEditableWarning={true}
                    contentEditable={editing}>{editedLabel}</span>
            </span >
        </div>
    )
}
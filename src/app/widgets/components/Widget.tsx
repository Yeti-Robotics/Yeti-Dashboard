import { BasicFmsInfo, useEntry } from "@frc-web-components/react";
import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";


export function Widget() {
    const [isDraggable, setDraggable] = useState(false);
    const [entry, setEntry] = useEntry("", null)

    useEffect(() => {
        console.log("Entry")
        console.log(entry)
    }, [isDraggable])

    return (
        <Rnd
            disableDragging={!isDraggable}
            className="flex bg-green-500 p-3 rounded-xl w-full"
        >
            <div onMouseOver={() => setDraggable(true)} onMouseOut={() => setDraggable(false)} className="bg-blue-500 w-full">
                drag me here
            </div>
            <div>
                <BasicFmsInfo source-key="/FMSInfo" />
                <button className="bg-orange-200">stuff</button>
            </div>
        </Rnd>
    )
}
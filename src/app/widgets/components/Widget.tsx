import { BasicFmsInfo, useEntry } from "@frc-web-components/react";
import { isValidElement, useEffect, useMemo, useState } from "react";
import { Rnd } from "react-rnd";
import { components, componentsMap, findWidgetComponent } from "../mappings";

interface WidgetProps {
    initialX: number,
    initialY: number,
    dataKey: string,
    widgetType?: string,
}

// make typescript happy :) i know im not
function WidgetComponentRenderer({ component: Component, props }: { component: any, props: any }) {
    return <Component {...props} />;
}

export function Widget({ initialX, initialY, dataKey, widgetType }: WidgetProps) {
    const [isDraggable, setDraggable] = useState(false);
    const [entry] = useEntry(dataKey, null);
    const [widgetName, setWidgetName] = useState(widgetType ?? "");
    const Component = useMemo(() => componentsMap[widgetName], [widgetName]);

    const [position, setPosition] = useState({ x: initialX, y: initialY, width: -1, height: -1 });

    useEffect(() => {
        if (entry != null && !widgetName.length) {
            const name = findWidgetComponent(entry, dataKey);
            console.log(`name: ${name}`);
            setWidgetName(name);
        }
    }, [entry])


    return (
        <Rnd
            position={{ x: position.x, y: position.y }}
            onDragStop={(_e, d) => {
                setPosition(p => ({ ...p, x: d.x, y: d.y }))
            }}
            onResizeStop={(_e, _direction, ref, _delta, position) => {
                setPosition({
                    width: ref.offsetWidth,
                    height: ref.offsetHeight,
                    x: position.x,
                    y: position.y
                });
            }}
            disableDragging={!isDraggable}
            className="flex bg-green-500 p-3 rounded-xl w-full"
        >
            <div onMouseOver={() => setDraggable(true)} onMouseOut={() => setDraggable(false)} className="bg-blue-500 w-full">
                drag me here
            </div>
            <div>
                {
                    Component && <WidgetComponentRenderer props={{ "source-key": dataKey }} component={Component} />
                }
            </div>
        </Rnd>
    )
}
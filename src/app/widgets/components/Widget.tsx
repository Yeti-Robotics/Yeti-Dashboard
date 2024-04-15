import { BasicFmsInfo, useEntry, useKeyListener } from "@frc-web-components/react";
import { isValidElement, useEffect, useMemo, useState } from "react";
import { Rnd } from "react-rnd";
import { components, componentsMap, findWidgetComponent } from "../mappings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bars2Icon } from "@heroicons/react/16/solid";
import { EditableLabel } from "@/app/editable/EditableLabel";

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
    // const entry = null
    // const key = useKeyListener(dataKey, (k, v) => {
    //     console.log("key listener")
    //     console.log(v === undefined)
    //     console.log(v);
    // }, true)
    const [widgetName, setWidgetName] = useState(widgetType ?? "");
    const [label, setLabel] = useState(dataKey.split("/").pop() ?? "");
    // const [z, setZ] = useState(0);
    const Component = useMemo(() => componentsMap[widgetName], [widgetName]);

    const [position, setPosition] = useState({ x: initialX, y: initialY, width: -1, height: -1 });

    useEffect(() => {
        if (entry != null && !widgetName.length) {
            const name = findWidgetComponent(entry, dataKey);
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
            className="flex rounded-xl w-full absolute"
        >
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="text-center">
                        <div
                            className="flex flex-col justify-center items-center space-y-4 select-none">
                            <div className="flex flex-col justify-center items-center space-y-2"
                            >
                                <Bars2Icon onMouseOver={() => setDraggable(true)}
                                    onMouseOut={() => setDraggable(false)}
                                    className="w-4 h-4" />
                                <h1><EditableLabel label={label} setLabel={setLabel} /></h1>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center">
                        {
                            Component &&
                            <WidgetComponentRenderer component={Component} props={{ "source-key": dataKey }} />
                        }
                    </div>
                </CardContent>
            </Card>
        </Rnd >
    )
}
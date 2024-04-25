import { BasicFmsInfo, useEntry, useKeyListener } from "@frc-web-components/react";
import { Context, isValidElement, memo, useContext, useEffect, useMemo, useState } from "react";
import { Rnd } from "react-rnd";
import { componentsMap, findWidgetComponent } from "../mappings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bars2Icon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { EditableLabel } from "@/app/editable/EditableLabel";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { WidgetStore, WidgetData } from "@/store/widgetStore";


// make typescript happy :) i know im not
function WidgetComponentRenderer({ component: Component, props }: { component: any, props: any }) {
    if (!Component) return null;
    return <Component {...props} />;
}

interface WithWidgetContext {
    widgetContext: WidgetStore
}

export function Widget({ position: pos, dataKey, widgetType, widgetId, widgetContext, label: lbl }: WidgetData & WithWidgetContext) {
    const { actions: { deleteWidget, setWidgetOnTop, updateWidget }, widgetOnTopId } = widgetContext;
    const [isDraggable, setDraggable] = useState(false);
    const [entry] = useEntry(dataKey, null);
    // const [entry, setEntry] = useState(null);
    const [widgetName, setWidgetName] = useState(widgetType ?? "");
    const Component = useMemo(() => componentsMap[widgetName], [widgetName]);
    console.log(`Widget: ${widgetId} ${widgetName} ${lbl} ${dataKey}`)
    console.log(pos)
    const [label, setLabel] = useState(lbl ?? dataKey.split("/").pop() ?? "");
    const [position, setPosition] = useState({ x: pos.x, y: pos.y, width: pos?.width, height: pos?.height });

    useEffect(() => {
        if (entry !== null && !widgetName.length) {
            const name = findWidgetComponent(entry, dataKey);
            setWidgetName(name)
        }
    }, [entry])
    useEffect(() => {
        updateWidget(widgetId, { label, position });
    }, [label, position])
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
            style={{ zIndex: widgetOnTopId === widgetId ? 30 : 0 }}
            className="flex rounded-xl w-full absolute"
        >
            <Dialog>
                <ContextMenu>
                    <ContextMenuTrigger>
                        <Card onClick={() => setWidgetOnTop(widgetId)} className="h-full">
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
                                        <WidgetComponentRenderer component={Component} props={{
                                            "source-key": dataKey,
                                            width: position.width,
                                            height: position.height
                                        }} />
                                    }
                                </div>
                            </CardContent>
                        </Card>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <DialogTrigger asChild>
                            <ContextMenuItem>
                                <span className="flex items-center justify-between space-x-3">
                                    <PencilIcon className="w-4 h-4" />
                                    <div>Edit</div>
                                </span>
                            </ContextMenuItem>
                        </DialogTrigger>
                        <ContextMenuItem onClick={() => {
                            deleteWidget(widgetId)
                        }}>
                            <span className="flex items-center justify-between space-x-3 text-red-600">
                                <TrashIcon className=" fill-red-600 w-4 h-4" />
                                <div>Delete</div>
                            </span>
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. Are you sure you want to permanently
                            delete this file from our servers?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <button type="submit">Confirm</button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Rnd >
    )
}
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Rnd } from "react-rnd";
import { useWindowSize } from "../hooks/useWindowSize";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { WidgetChooserAccordion } from "./WidgetChooserAccordion";
import { useEntryCustom } from "../hooks/useEntryCustom";
import { GripVertical } from "lucide-react";
import { CardDescription } from "@/components/ui/card";

const recalcPos = (windowWidth: number, windowHeight: number) => ({
    x: 0.6 * windowWidth,
    y: 0.15 * windowHeight,
    width: 0.3 * windowWidth,
    height: 0.7 * windowHeight
});

export interface WidgetChooserNode {
    key: string;
    title: string;
    content: WidgetChooserNode[] | unknown;
}

const parse = (object: object | null, dir: string) => {
    if (!object) return;
    const nodes = [];
    for (const [key, value] of Object.entries(object)) {
        if (key.startsWith(".")) continue;
        const parentObj: WidgetChooserNode = {
            key: `${dir}/${key}`,
            title: key,
            content: ""
        };
        if (typeof value === "object") {
            parentObj.content = parse(value, parentObj.key);
        } else {
            parentObj.content = value;
        }

        nodes.push(parentObj);
    }

    return nodes;
};

export function WidgetChooser({
    show,
    setShow
}: {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}) {
    const [isDraggable, setDraggable] = useState(false);
    const [entry] = useEntryCustom("", null);
    const accordionEntries = useMemo(() => parse(entry, ""), [entry]);

    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const [{ x, y }, setPosition] = useState(
        recalcPos(window.innerWidth, window.innerHeight)
    );

    useEffect(() => {
        setPosition(recalcPos(windowWidth, windowHeight));
    }, [windowWidth, windowHeight]);

    return (
        <>
            {show && (
                <Rnd
                    disableDragging={!isDraggable}
                    position={{ x, y }}
                    onDragStop={(_event, delta) => {
                        setPosition(p => ({ ...p, x: delta.x, y: delta.y }));
                    }}
                    onResize={(
                        _event,
                        _direction,
                        elementRef,
                        _delta,
                        position
                    ) => {
                        setPosition({
                            width: elementRef.offsetWidth,
                            height: elementRef.offsetHeight,
                            x: position.x,
                            y: position.y
                        });
                    }}
                    className="flex relative bg-white shadow-md rounded-xl w-full pb-4"
                >
                    <div className="fixed w-full top-0 z-50 left-0 p-4">
                        <div className="flex w-full h-fit left-0 top-0 flex-col space-y-3 items-center justify-between">
                            <CardDescription
                                onMouseOver={() => setDraggable(true)}
                                onMouseOut={() => setDraggable(false)}
                                className="flex w-full items-center justify-between"
                            >
                                <GripVertical className="size-4" />
                                <h2 className="text-center">Widget Chooser</h2>
                                <XMarkIcon
                                    onClick={() => setShow(false)}
                                    className="w-6 h-6 float-right cursor-pointer"
                                />
                            </CardDescription>
                        </div>
                    </div>
                    <div className="h-[60px] relative"></div>
                    <div className="w-full max-h-80 overflow-y-auto px-2 font-['Libre Franklin']">
                        <WidgetChooserAccordion entries={accordionEntries} />
                    </div>
                </Rnd>
            )}
        </>
    );
}

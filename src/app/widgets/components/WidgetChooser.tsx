import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Rnd } from "react-rnd";
import { useWindowSize } from "../hooks/useWindowSize";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { WidgetChooserAccordion } from "./WidgetChooserAccordion";
import { useEntryCustom } from "../hooks/useEntryCustom";

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
    const [{ x, y, width, height }, setPosition] = useState(
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
                    size={{ width, height }}
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
                    className="flex border-4 bg-white border-black rounded-xl z-40 w-full overflow-y-auto pb-3"
                >
                    <div className="sticky top-0 bg-white z-50 left-0 p-3">
                        <div className="flex w-full h-fit left-0 top-0 flex-col space-y-3 items-center justify-between">
                            <div className="flex justify-between w-full">
                                <div className="flex-1"></div>
                                <div
                                    onMouseOver={() => setDraggable(true)}
                                    onMouseOut={() => setDraggable(false)}
                                    className="flex flex-col items-center justify-center"
                                >
                                    <Bars2Icon className="w-6 h-6" />
                                    <h1 className="text-center text-3xl">
                                        Widget chooser
                                    </h1>
                                </div>
                                <div className="flex-1">
                                    <XMarkIcon
                                        onClick={() => setShow(false)}
                                        className="w-6 h-6 float-right cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full min-h-full px-2">
                        <WidgetChooserAccordion entries={accordionEntries} />
                    </div>
                </Rnd>
            )}
        </>
    );
}

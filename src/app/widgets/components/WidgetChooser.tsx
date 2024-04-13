import { BasicFmsInfo, useEntry } from "@frc-web-components/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import { useWindowSize } from "../hooks/useWindowSize";
import { Bars2Icon } from "@heroicons/react/16/solid";
import { Accordion, AccordionAccordion } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'

const recalcPos = (windowWidth: number, windowHeight: number) => (
    {
        x: 0.6 * windowWidth,
        y: 0.15 * windowHeight,
        width: 0.3 * windowWidth,
        height: 0.7 * windowHeight
    }
)

const parse = (object: object) => {
    if (!object) return;
    const nodes = [];
    for (const [key, value] of Object.entries(object)) {
        const parentObj: any = {};
        parentObj.key = key;
        parentObj.title = key;

        if (typeof value === "object") {
            parentObj.content = { content: parse(value) }
        } else {
            parentObj.content = value;
        }

        nodes.push(parentObj)
    }

    return nodes;
}

export function WidgetChooser({ show, setShow }: { show: boolean, setShow: Dispatch<SetStateAction<boolean>> }) {
    const [isDraggable, setDraggable] = useState(false);
    const [entry, setEntry] = useEntry("", null)

    useEffect(() => {
        console.log(entry)
        if (entry != null) {
            console.log(parse(entry))
        }
    }, [entry])

    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const [{ x, y, width, height }, setPosition] =
        useState(recalcPos(window.innerWidth, window.innerHeight));

    useEffect(() => {
        setPosition(recalcPos(windowWidth, windowHeight))
    }, [windowWidth, windowHeight])

    return (
        <>
            {
                show && <Rnd
                    disableDragging={!isDraggable}
                    size={{ width, height }}
                    position={{ x, y }}
                    onDragStop={(e, d) => {
                        setPosition(p => ({ ...p, x: d.x, y: d.y }))
                    }}
                    onResize={(_e: any, _: any, ref: { offsetWidth: any; offsetHeight: any; }, _d: any, position: { x: any; y: any; }) => {
                        setPosition({
                            width: ref.offsetWidth,
                            height: ref.offsetHeight,
                            x: position.x,
                            y: position.y
                        });
                    }} className="flex border-4 bg-white border-black p-3 rounded-xl w-full"
                >
                    <div className="flex flex-col space-y-3 items-center justify-center">
                        <div onMouseOver={() => setDraggable(true)} onMouseOut={() => setDraggable(false)} >
                            <div className="flex flex-col items-center justify-center">
                                <Bars2Icon className="w-6 h-6" />
                                <h1 className="text-3xl">Widget chooser</h1>
                            </div>
                        </div>
                        <div className="w-full">
                            {
                                <AccordionAccordion panels={[
                                    <Accordion panels={[{
                                        key: "asdf",
                                        title: "asdf",
                                        content: "asdf"
                                    }]}/>
                                ]} />
                            }
                        </div>
                    </div>
                </Rnd>
            }
        </>
    )
}
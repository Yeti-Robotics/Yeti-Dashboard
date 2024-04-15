
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import React, { useContext } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "react-headless-accordion";
import { DragDropContext, useWidgetDragAndDrop } from "../hooks/useWidgetDragDrop";

function DatakeyWrapper({ dataKey, children }: { dataKey: string, children: React.ReactNode | React.ReactNode[] }) {
    const { setDataKey } = useWidgetDragAndDrop();

    return (<div onDragStart={e => {
        console.log("Drag start for " + dataKey);
        setDataKey(dataKey);
    }}>{children}</div>)
}

function AccordionTitle({ dataKey, title, open }: { title: string, open: boolean, dataKey: string }) {

    return (
        <DatakeyWrapper dataKey={dataKey}>
            <AccordionHeader className="inline-flex items-center">
                <ChevronRightIcon className={`w-4 h-4 ${open ? "rotate-90" : ""}`} />
                <h1 draggable={true}>{title}</h1>
            </AccordionHeader>
        </DatakeyWrapper>
    );
}

function createSubAccordion(content: any, lvl: number) {
    return (
        <AccordionBody>
            {content.sort((a: any, b: any) => {
                if (a.content instanceof Array) {
                    return 1;
                } else if (b.content instanceof Array) {
                    return -1;
                }
            }).map((c: any) => (
                <div key={c.key} style={{ marginLeft: `${lvl * (c.content instanceof Array ? 11 : 16)}px` }}>
                    <AccordionItem key={c.key}>
                        {({ open }: { open: boolean }) => (
                            c.content instanceof Array ? (
                                <div key={c.key}>
                                    <AccordionTitle dataKey={c.key} title={c.title} open={open} />
                                    {createSubAccordion(c.content, lvl + 1)}
                                </div>) : (<DatakeyWrapper dataKey={c.key}>
                                    <p className="flex justify-between" draggable={true}>
                                        <span>{c.title}</span>{" "}
                                        <span className="truncate overflow-hidden text-gray-700 pr-3">{typeof c.content}</span>
                                    </p>
                                </DatakeyWrapper>)
                        )}
                    </AccordionItem>
                </div>
            ))
            }
        </AccordionBody>
    );
}

export function WidgetChooserAccordion({ entries, size }: { entries: any, size: number }) {
    return (
        <div className="overflow-y-auto pb-2" style={{ maxHeight: size }}>
            <Accordion className="relative" alwaysOpen={true}>
                {entries.map((e: any) => (
                    <AccordionItem key={e.key}>
                        {({ open }: { open: boolean }) => (
                            <>
                                <AccordionTitle dataKey={e.key} title={e.title} open={open} />
                                {createSubAccordion(e.content, 1)}
                            </>
                        )}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );

}
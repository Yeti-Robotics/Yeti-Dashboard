import { ChevronRightIcon } from "@heroicons/react/16/solid";
import React from "react";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem
} from "react-headless-accordion";
import { useWidgetDragAndDrop } from "../hooks/useWidgetDragDrop";
import { WidgetChooserNode } from "./WidgetChooser";

function DatakeyWrapper({
    dataKey,
    children
}: {
    dataKey: string;
    children: React.ReactNode | React.ReactNode[];
}) {
    const { setDataKey } = useWidgetDragAndDrop();

    return (
        <div
            onDragStart={() => {
                console.log("Drag start for " + dataKey);
                setDataKey(dataKey);
            }}
        >
            {children}
        </div>
    );
}

function AccordionTitle({
    dataKey,
    title,
    open
}: {
    title: string;
    open: boolean;
    dataKey: string;
}) {
    return (
        <DatakeyWrapper dataKey={dataKey}>
            <AccordionHeader className="inline-flex items-center">
                <ChevronRightIcon
                    className={`w-4 h-4 ${open ? "rotate-90" : ""}`}
                />
                <h1 draggable={true}>{title}</h1>
            </AccordionHeader>
        </DatakeyWrapper>
    );
}

function SubWidgetChooserAccordion({
    entries,
    indent
}: {
    entries: WidgetChooserNode;
    indent: number;
}) {
    if (!(entries.content instanceof Array)) {
        return (
            <DatakeyWrapper dataKey={entries.key}>
                <p
                    className="flex justify-between"
                    draggable={true}
                    style={{ marginLeft: indent + 16 + "px" }}
                >
                    <span>{entries.title}</span>{" "}
                    <span className="truncate overflow-hidden text-gray-700 pr-3">
                        {typeof entries.content}
                    </span>
                </p>
            </DatakeyWrapper>
        );
    }

    const accordionItems: JSX.Element[] = (
        entries.content as WidgetChooserNode[]
    ).map(contentItem => {
        return (
            <SubWidgetChooserAccordion
                key={contentItem.key}
                entries={contentItem}
                indent={indent + 2}
            />
        );
    });

    return (
        <AccordionItem key={entries.key}>
            {({ open }: { open: boolean }) => (
                <div style={{ marginLeft: indent + "px" }}>
                    <AccordionTitle
                        dataKey={entries.key}
                        title={entries.title}
                        open={open}
                    />
                    <AccordionBody>{accordionItems}</AccordionBody>
                </div>
            )}
        </AccordionItem>
    );
}

export function WidgetChooserAccordion({
    entries
}: {
    entries: WidgetChooserNode[] | undefined;
}) {
    if (!entries) {
        return null;
    }
    return (
        <div className="min-h-min w-full flex">
            <Accordion className="relative w-full" alwaysOpen>
                {entries.map(e => (
                    <SubWidgetChooserAccordion
                        key={e.key}
                        entries={e}
                        indent={8}
                    />
                ))}
            </Accordion>
        </div>
    );
}

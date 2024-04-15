import { Field, FieldRobot, useEntry } from "@frc-web-components/react";
import { useEffect, useMemo } from "react";
import { useEntryCustom } from "../hooks/useEntryCustom";

function convertEntry(entry: any) {
    if (typeof entry !== "object" || !entry) {
        return [{ label: "Value", value: entry }]
    } else {
        return Object.entries(entry).map(([k, v]) => ({ label: k, value: v }));
    }
}

export function ValueDisplay(props: { "source-key": string }) {
    const [entry] = useEntryCustom(props["source-key"], null) as [any | null, any];

    return (
        <div className="flex flex-col w-full">
            <h1>fallback</h1>
            {convertEntry(entry).map((e, i) =>
                (<span className="w-full" key={i}>{e.label} - {e.value}</span>)
            )}
        </div>
    );
}
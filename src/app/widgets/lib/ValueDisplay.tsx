/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEntryCustom } from "../hooks/useEntryCustom";

function convertEntry(entry: any): { label: string; value: string }[] {
    if (typeof entry !== "object" || !entry) {
        return [{ label: "", value: `${entry}` }];
    } else {
        const entries = [];
        for (const [k, v] of Object.entries(entry)) {
            if (
                (typeof v === "object" && !(v instanceof Array)) ||
                k.startsWith(".")
            )
                continue;
            entries.push({ label: k, value: `${v}` });
        }
        return entries;
    }
}

export function ValueDisplay(props: { "source-key": string }) {
    const [entry] = useEntryCustom(props["source-key"], null) as [
        any | null,
        any
    ];

    return (
        <div className="flex flex-col w-full">
            {convertEntry(entry).map((e, i) => (
                <span
                    className={`w-full ${
                        e.label.length
                            ? "text-lg"
                            : "text-center text-xl font-bold"
                    }`}
                    key={i}
                >
                    {e.label.length ? `${e.label} - ${e.value}` : e.value}
                </span>
            ))}
        </div>
    );
}

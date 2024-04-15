import { Field, FieldRobot, useEntry } from "@frc-web-components/react";
import { useEffect, useMemo } from "react";
import { useEntryCustom } from "../hooks/useEntryCustom";

export function Field2d(props: { "source-key": string }) {
    const [entry] = useEntryCustom(props["source-key"], null) as [any | null, any];
    const [fmsEntry] = useEntry("/FMSInfo/IsRedAlliance", null) as [boolean | null, any]
    const pose = useMemo(() => entry && entry.robotPose ? entry.robotPose : entry instanceof Array ? entry : [0, 0, 0], [entry]);

    useEffect(() => { console.log(entry); console.log(entry instanceof Array) }, [])

    return (
        <div className={`${fmsEntry != null ? "top-24" : ""} ${fmsEntry != null ? fmsEntry ? "rotate-90" : "-rotate-90" : ""} relative h-full`}>
            <Field>
                <FieldRobot rotationUnit="radian" width={0.5} length={0.5} pose={pose} />
            </Field>
        </div>
    );
}
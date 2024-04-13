import { Field, FieldRobot, useEntry } from "@frc-web-components/react";
import { useEffect, useMemo } from "react";


export function Field2d(props: { "source-key": string }) {
    const [entry] = useEntry(props["source-key"], null) as [any | null, () => void];
    const pose = useMemo(() => entry && entry.robotPose ? entry.robotPose : entry instanceof Array ? entry : [0, 0, 0], [entry]);

    return (
        <Field>
            <FieldRobot pose={pose} />
        </Field>
    );
}
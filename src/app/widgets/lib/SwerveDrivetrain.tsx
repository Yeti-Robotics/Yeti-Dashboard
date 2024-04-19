import { Swerve } from "@frc-web-components/react";

export function SwerveDrivetrain(props: { "source-key": string, height: number, width: number }) {
    return (
        <div style={{
            scale: `${props.height / 2}%`
        }} className="flex justify-center items-center">
            <Swerve className="absolute top-10" source-key={props["source-key"]} />
        </div>
    )
}
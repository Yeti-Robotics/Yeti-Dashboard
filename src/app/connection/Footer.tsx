import { useNt4 } from "@frc-web-components/react";


export function Footer() {
    const { nt4Provider } = useNt4();

    return (
        <div className="bottom-0 bg-white flex justify-between">
            <div className="flex-1">
                <span className={nt4Provider.isConnected() ? "text-green-400" : "text-rose-700"}>
                    Network Tables: {nt4Provider.isConnected() ? "Connected" : "Disconnected"} ({nt4Provider.getServerAddress()})</span>
            </div>
        </div>
    )
}
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"


export interface ConnectionContextType {
    connectionIp: string,
    setConnectionIp: Dispatch<SetStateAction<string>>
}

export function provideConnectionToggle() {
    const [connectionIp, setConnectionIp] = useState("localhost");

    return { connectionIp, setConnectionIp };
}

export const ConnectionContext = createContext<ConnectionContextType>({
    connectionIp: "localhost",
    setConnectionIp: () => { }
});

export function useConnection() {
    return useContext(ConnectionContext);
}
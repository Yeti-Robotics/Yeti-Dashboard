import { useEffect, useState } from "react";


export function useWindowSize() {
    const [dims, setDims] = useState({ width: 0, height: 0 });

    const updateWindowSize = () => {
        setDims({ width: window.innerWidth, height: window.innerHeight });
    }
    
    useEffect(() => {
        updateWindowSize();

        window.addEventListener("resize", updateWindowSize);

        return () => window.removeEventListener("resize", updateWindowSize);
    }, []);

    return dims;
}
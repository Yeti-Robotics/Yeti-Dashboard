import { MutableRefObject, useEffect, useRef, useState } from "react";


export function useClickedOut() {
    const componentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const [clickedOut, setClickedOut] = useState(false);

    const handleOutClick = (e: any) => {
        if (componentRef.current && !componentRef.current.contains(e.target)) {
            setClickedOut(true);
        } else {
            setClickedOut(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutClick);
        return () => document.removeEventListener('mousedown', handleOutClick);
    }, []);

    return { componentRef, clickedOut };
}
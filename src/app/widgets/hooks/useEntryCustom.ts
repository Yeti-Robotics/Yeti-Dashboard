import { useKeyListener, useNt4 } from "@frc-web-components/react";
import { useState, useCallback } from "react";

// copied from frc web components to subscribe to objects as well
export function useEntryCustom<T>(
    key: string,
    defaultValue: T
): [T, (value: T) => void] {
    const { nt4Provider } = useNt4();

    const [value, setValue] = useState<T>(defaultValue);

    const updateNtValue = useCallback((newValue: unknown) => {
        nt4Provider.userUpdate(key, newValue);
    }, []);

    useKeyListener<T>(
        key,
        (_, newValue: any) => {
            if (newValue === undefined) {
                setValue(defaultValue);
            } else {
                let newV = newValue;

                if (typeof newV === "object" && !(newV instanceof Array)) {
                    newV = { ...newV };
                }

                setValue(newV);
            }
        },
        true
    );

    return [value, updateNtValue];
}
import { BasicFmsInfo, BooleanBox, Field, Field3d, SendableChooser, ToggleSwitch } from "@frc-web-components/react";

type CheckerFunction = (data: any, key: string) => boolean

const typeChecker = (typeName: string): CheckerFunction => {
    return (data: any, key: string) => {
        return data[".type"] && typeName === data[".type"];
    }
}

const labelChecker = (label: string): CheckerFunction => {
    return (data: any, key: string) => {
        return key.includes(label);
    }
}

const hasAttributeChecker = (attr: string): CheckerFunction => {
    return (data: any, key: string) => {
        return attr in data;
    }
}

const attributeValueChecker = (attr: string, value: any): CheckerFunction => {
    return (data: any, key: string) => {
        return attr in data && data[attr] === value
    }
}

const typeOfChecker = (attr: string, tp: string): CheckerFunction => {
    return (data: any, key: string) => {
        return typeof data[attr] === tp;
    }
}


const allCheck = (...funcs: CheckerFunction[]): CheckerFunction => {
    return (data: any, key: string) => {
        for (const func of funcs) {
            if (!func(data, key)) {
                return false;
            }
        }
        return true;
    }
}


export const fallbackComponent = null;

export const components = [
    {
        checkers: [typeChecker("FMSInfo"), labelChecker("FMSInfo")],
        component: BasicFmsInfo
    },
    {
        checkers: [typeChecker("Field2d")],
        component: Field
    },
    {
        checkers: [typeChecker("Field3d")],
        component: Field3d
    },
    {
        checkers: [allCheck(attributeValueChecker(".controllable", true), typeOfChecker("Value", "boolean"))],
        component: ToggleSwitch
    },
    {
        checkers: [typeOfChecker("Value", "boolean")],
        component: BooleanBox
    },
    {
        checkers: [labelChecker("Auto Chooser"), attributeValueChecker(".name", "Auto Chooser"), attributeValueChecker(".type", "String Chooser")],
        component: SendableChooser
    }
]
import { BasicFmsInfo, BooleanBox, Field, Field3d, SendableChooser, ToggleSwitch } from "@frc-web-components/react";
import { Field2d } from "./lib/Field2d";

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
        return !!data[attr];
    }
}

const attributeValueChecker = (attr: string, value: any): CheckerFunction => {
    return (data: any, key: string) => {
        return !!data[attr] && data[attr] === value
    }
}

const typeOfChecker = (attr: string, tp: string): CheckerFunction => {
    return (data: any, key: string) => {
        return typeof (attr.length ? data[attr] : data) === tp;
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


export const fallbackComponent = {
    name: "default",
    component: null
};

export const components = [
    {
        name: "basicfmsinfo",
        checkers: [typeChecker("FMSInfo"), labelChecker("FMSInfo")],
        component: BasicFmsInfo
    },
    {
        name: "field",
        checkers: [typeChecker("Field2d"), labelChecker("robotPose")],
        component: Field2d
    },
    {
        name: "field3d",
        checkers: [typeChecker("Field3d")],
        component: Field3d
    },
    {
        name: "toggleswitch",
        checkers: [allCheck(attributeValueChecker(".controllable", true), typeOfChecker("Value", "boolean"))],
        component: ToggleSwitch
    },
    {
        name: "booleanbox",
        checkers: [typeOfChecker("Value", "boolean"), typeOfChecker("", "boolean")],
        component: BooleanBox
    },
    {
        name: "sendablechooser",
        checkers: [labelChecker("Auto Chooser"), attributeValueChecker(".name", "Auto Chooser"), attributeValueChecker(".type", "String Chooser")],
        component: SendableChooser
    }
]

const convertArrayToObject = (array: any[], key: string) => {
    const initialValue = {};
    return array.reduce((obj: any, item: any) => {
        return {
            ...obj,
            [item[key]]: item.component,
        };
    }, initialValue);
};

export const componentsMap = convertArrayToObject(components, "name") as { [x: string]: JSX.Element | React.ReactNode }

export function findWidgetComponent(data: any, key: string) {
    for (const comp of components) {
        for (const check of comp.checkers) {
            if (check(data, key)) {
                return comp.name;
            }
        }
    }

    return fallbackComponent.name;
}
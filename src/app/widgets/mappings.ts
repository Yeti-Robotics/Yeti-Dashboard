import { BasicFmsInfo, BooleanBox, Field, Field3d, Mechanism2d, NumberSlider, SendableChooser, Swerve, ToggleSwitch } from "@frc-web-components/react";
import { Field2d } from "./lib/Field2d";
import { Variable } from "lucide-react";
import { ValueDisplay } from "./lib/ValueDisplay";
import { SwerveDrivetrain } from "./lib/SwerveDrivetrain";

type CheckerFunction = (data: any, key: string) => boolean

const typeChecker = (typeName: string): CheckerFunction => {
    return (data: any, key: string) => {
        return data[".type"] && typeName === data[".type"];
    }
}

const labelChecker = (label: string): CheckerFunction => {
    return (_data: any, key: string) => {
        console.log(key)
        return key.toLowerCase().includes(label);
    }
}

const hasAttributeChecker = (attr: string): CheckerFunction => {
    return (data: any, _key: string) => {
        return !!data[attr];
    }
}

const attributeValueChecker = (attr: string, value: any): CheckerFunction => {
    return (data: any, _key: string) => {
        return !!data[attr] && data[attr] === value
    }
}

const typeOfChecker = (attr: string, tp: string): CheckerFunction => {
    return (data: any, _key: string) => {
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
    component: ValueDisplay
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
        name: "booleanbox",
        checkers: [allCheck(typeOfChecker("Value", "boolean"),
            attributeValueChecker(".controllable", false)),
        allCheck(typeOfChecker("", "boolean"),
            attributeValueChecker(".controllable", false)), attributeValueChecker(".type", "Digital Input")],
        component: BooleanBox
    },
    {
        name: "toggleswitch",
        checkers: [allCheck(attributeValueChecker(".controllable", true), typeOfChecker("Value", "boolean"))],
        component: ToggleSwitch
    },
    {
        name: "sendablechooser",
        checkers: [labelChecker("Auto Chooser"), attributeValueChecker(".name", "Auto Chooser"), attributeValueChecker(".type", "String Chooser")],
        component: SendableChooser
    },
    {
        name: "mechanism2d",
        checkers: [attributeValueChecker(".type", "Mechanism2d")],
        component: Mechanism2d
    },

    {
        name: "swerve",
        checkers: [allCheck(labelChecker("swerve"),
            (data: any, _key: string) => {
                return data instanceof Array && data.length > 7;
            }
        )],
        component: SwerveDrivetrain
    },
    {
        name: "numberslider",
        checkers: [attributeValueChecker(".type", "Motor Controller")],
        component: NumberSlider
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

const cmpMap = convertArrayToObject(components, "name") as { [x: string]: any };
cmpMap["default"] = fallbackComponent.component as unknown;

export const componentsMap = cmpMap;

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
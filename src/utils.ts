import { LOCALSTORAGE_GRADES_KEY, LOCALSTORAGE_HOTKEYS_KEY } from "./config";

export class AlertPanic extends Error {
    public constructor(message: string) {
        alert(
            "OCP: Something has gone wrong. See the developer console for more information."
        );
        localStorage.removeItem(LOCALSTORAGE_GRADES_KEY);
        localStorage.removeItem(LOCALSTORAGE_HOTKEYS_KEY);
        console.error("OCP Error vvv");
        super(message);
    }
}

export class LSWrapper<T> {
    private value: T;

    public constructor(
        private readonly location: string,
        defaultValue: T
    ) {
        const currentValue = localStorage.getItem(location);

        if (currentValue === null) {
            localStorage.setItem(location, JSON.stringify(defaultValue));
            this.value = defaultValue;
            return;
        }

        try {
            this.value = JSON.parse(currentValue) as T;
        } catch (error) {
            throw new AlertPanic(
                `Failed to parse localStorage value. Original error: ${String(error)}`
            );
        }
    }

    public get(): T {
        return this.value;
    }

    public set(newValue: T): void {
        localStorage.setItem(this.location, JSON.stringify(newValue));
        this.value = newValue;
    }
}

const OCPDebug = process.env.NODE_ENV === "development";

export const debug = (message: string): void => {
    if (OCPDebug) {
        console.log("OCP: " + message);
    }
};

export const sleep = (ms: number): Promise<void> =>
    new Promise((r) => setTimeout(r, ms));

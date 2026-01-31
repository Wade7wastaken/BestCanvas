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

const OCPDebug = process.env.NODE_ENV === "development";

export const debug = (message: string): void => {
    if (OCPDebug) {
        console.log("OCP: " + message);
    }
};

export const sleep = (ms: number): Promise<void> =>
    new Promise((r) => setTimeout(r, ms));

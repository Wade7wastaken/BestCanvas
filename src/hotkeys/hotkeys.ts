import { LOCALSTORAGE_HOTKEYS_KEY, WAIT_FOR_ELEMENT_DELAY } from "../config";
import { LSWrapper } from "../lsWrapper";
import { AlertPanic, debug, sleep } from "../utils";

const parseClassSpecifier = (s: string): number | undefined => {
    if (s.length !== 1) {
        return undefined;
    }
    const codePoint = s.codePointAt(0);
    if (codePoint === undefined) {
        return undefined;
    }
    const index = codePoint - 48;

    if (index >= 10) {
        return undefined;
    }

    return index;
};

const parsePageSpecifier = (s: string): string | undefined => {
    switch (s) {
        // Home
        case "h": {
            return "";
        }
        // Assignments
        case "a": {
            return "assignments";
        }
        // Discussions
        case "d": {
            return "discussion_topics";
        }
        // Grades
        case "g": {
            return "grades";
        }
        // Modules
        case "m": {
            return "modules";
        }

        default: {
            return undefined;
        }
    }
};

type HotkeyMap = number[] | undefined;

const setHotkeys = async (hotkeyMapLS: LSWrapper<HotkeyMap>): Promise<void> => {
    if (globalThis.location.pathname !== "/") {
        return;
    }

    while ($(".ic-DashboardCard__link").length <= 0) {
        debug("Hotkeys: waiting for cards");
        await sleep(WAIT_FOR_ELEMENT_DELAY);
    }

    debug("Hotkeys: attempting to set hotkeys");

    const courseIds = $(".ic-DashboardCard__link")
        .toArray()
        .map((card) => {
            const courseIdStr = card.getAttribute("href")?.split("/").at(-1);
            if (courseIdStr === undefined) {
                throw new AlertPanic("Couldn't find course id");
            }
            return Number.parseInt(courseIdStr);
        })
        .slice(0, 10);

    const last = courseIds.pop();
    if (last === undefined) {
        debug("Hotkeys: not hotkeys, exiting");
        return;
    }
    courseIds.unshift(last);

    debug(`Hotkeys: setting hotkeys to ${JSON.stringify(courseIds)}`);
    hotkeyMapLS.set(courseIds);
};

export const hotkeys = (): void => {
    debug("Hotkeys: running");

    const hotkeyMapLS = new LSWrapper<HotkeyMap>(
        LOCALSTORAGE_HOTKEYS_KEY,
        undefined
    );

    void setHotkeys(hotkeyMapLS);

    let first = "";
    let second = "";

    document.addEventListener("keydown", (e) => {
        const active = document.activeElement;
        if (active?.tagName === "INPUT" || active?.tagName === "TEXTAREA") {
            return;
        }

        first = second;
        second = e.key;

        if (second === "z" && globalThis.location.pathname !== "/") {
            globalThis.location.pathname = "/";
        }

        const classSpecifier = parseClassSpecifier(first);
        const pageSpecifier = parsePageSpecifier(second);

        if (classSpecifier === undefined || pageSpecifier === undefined) {
            return;
        }

        const hotkeyMap = hotkeyMapLS.get();
        if (hotkeyMap === undefined) {
            debug("Hotkeys: no hotkey map, exiting");
            return;
        }

        const location = `/courses/${hotkeyMap[classSpecifier]}/${pageSpecifier}`;

        debug(`Hotkeys: redirecting to ${location}`);

        globalThis.location.pathname = location;
    });

    debug("Hotkeys: done");
};

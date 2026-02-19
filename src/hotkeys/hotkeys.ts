import { LOCALSTORAGE_HOTKEYS_KEY, WAIT_FOR_ELEMENT_DELAY } from "../config";
import { LSWrapper } from "../lsWrapper";
import { AlertPanic, debug, sleep } from "../utils";

/**
 * Parses a pressed key into a number from 0 to 9 inclusive.
 * @param s The key pressed.
 * @returns The integer representing the class or undefined if the input is
 * invalid.
 */
const parseClassIndex = (s: string): number | undefined => {
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

    // Set the 0 key to the last index, and shift everything else over.
    return index === 0 ? 9 : index - 1;
};

const pageSpecifierMap: Record<string, string> = {
    h: "", // Home
    n: "announcements", // Announcements
    m: "modules", // Modules
    p: "pages", // Pages
    f: "files", // Files
    a: "assignments", // Assignments
    g: "grades", // Grades
    u: "users", // People
    d: "discussion_topics", // Discussions
    c: "collaborations", // Collaborations
    s: "assignments/syllabus", // Syllabus
};

/**
 * Returns the path segment of the course page corresponding to a pressed
 * hotkey.
 * @param s The key pressed.
 * @returns The path segment of the page corresponding to the hotkey, or
 * undefined if the hotkey is invalid.
 */
const parsePageSpecifier = (s: string): string | undefined =>
    pageSpecifierMap[s];

type HotkeyMap = number[] | undefined;

/**
 * Sets the hotkeys to the first 10 courses on the canvas home page.
 * @param hotkeyMapLS The LSWrapper to put the hotkeys in.
 * @returns A Promise.
 */
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

    const hkHome = (): string | undefined => {
        if (second === "z" && globalThis.location.pathname !== "/") {
            return "/";
        }
        return undefined;
    };

    const hkCourseAndPage = (): string | undefined => {
        const classIndex = parseClassIndex(first);
        const pageSpecifier = parsePageSpecifier(second);

        if (classIndex === undefined || pageSpecifier === undefined) {
            return undefined;
        }

        const hotkeyMap = hotkeyMapLS.get();
        if (hotkeyMap === undefined) {
            debug("Hotkeys: no hotkey map, exiting");
            return undefined;
        }
        
        const classId = hotkeyMap[classIndex];
        if (classId === undefined) {
            return undefined;
        }

        const location = `/courses/${classId}/${pageSpecifier}`;

        debug(`Hotkeys: redirecting to ${location}`);

        return location;
    };

    const hkPage = (): string | undefined => {
        const pageSpecifier = parsePageSpecifier(second);
        if (pageSpecifier === undefined) {
            return undefined;
        }

        let courseId = undefined;
        for (const section of globalThis.location.pathname.split("/")) {
            const parsed = Number.parseInt(section);
            if (!Number.isNaN(parsed)) {
                courseId = parsed;
                break;
            }
        }

        if (courseId === undefined) {
            return undefined;
        }

        const location = `/courses/${courseId}/${pageSpecifier}`;

        debug(`Hotkeys: redirecting to ${location}`);

        return location;
    };

    document.addEventListener("keydown", (e) => {
        const active = document.activeElement;
        if (active?.tagName === "INPUT" || active?.tagName === "TEXTAREA") {
            return;
        }

        first = second;
        second = e.key;

        for (const hotkeyHandler of [hkHome, hkCourseAndPage, hkPage]) {
            const target = hotkeyHandler();
            if (target != undefined) {
                globalThis.location.search = "";
                globalThis.location.pathname = target;
                break;
            }
        }
    });

    debug("Hotkeys: done");
};

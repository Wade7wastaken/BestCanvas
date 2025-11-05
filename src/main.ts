import { calcChanges } from "./calcChanges";
import { LOCALSTORAGE_HOTKEYS_KEY, WAIT_FOR_ELEMENT_DELAY } from "./config";
import { LSWrapper } from "./helpers/lsWrapper";
import { AlertPanic, debug, sleep } from "./helpers/utils";
import { renderChanges } from "./renderChanges";
import tile from "./resources/tile.html";

import type { Course } from "./types";

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Window {
        OCP_ran: boolean | undefined;
    }
}

const extractData = (): Course[] =>
    $(".ic-DashboardCard__header")
        .map((_, row) => ({
            title: $(row).find(".ic-DashboardCard__header-title").text().trim(),
            grade: Number.parseFloat(
                $(row)
                    .find(".bettercanvas-card-grade")
                    .text()
                    .trim()
                    .slice(0, -1)
            ),
        }))
        .filter((_, { grade }) => !Number.isNaN(grade))
        .toArray();

const gradeChanges = async (): Promise<void> => {
    if (globalThis.location.pathname !== "/") {
        return;
    }

    debug("Grades: running");

    while ($(".bettercanvas-card-grade").length <= 0) {
        debug("Grades: waiting for grades");
        await sleep(WAIT_FOR_ELEMENT_DELAY);
    }

    const gpaButton = $(".bettercanvas-gpa-edit-btn")[0];

    if (gpaButton === undefined) {
        throw new AlertPanic("Couldn't find GPA button.");
    }

    gpaButton.insertAdjacentHTML("afterend", tile);

    const currentGrades = extractData();

    const changes = calcChanges(currentGrades);
    renderChanges(changes);

    debug("Grades: done");
};

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

const hotkeys = (): void => {
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

        const location = `https://canvas.umn.edu/courses/${hotkeyMap[classSpecifier]}/${pageSpecifier}`;

        debug(`Hotkeys: redirecting to ${location}`);

        globalThis.location.href = location;
    });

    debug("Hotkeys: done");
};

const main = async (): Promise<void> => {
    debug("Main: running");

    if (globalThis.window.OCP_ran === true) {
        debug("Main: already ran, stopping");
        return;
    }
    globalThis.window.OCP_ran = true;

    // Check for jQuery
    while (typeof jQuery === "undefined") {
        debug("Main: waiting for jquery");
        await sleep(WAIT_FOR_ELEMENT_DELAY);
    }

    hotkeys();

    void gradeChanges();

    debug("Main: done");
};

void main();

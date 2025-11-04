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
    while ($(".bettercanvas-card-grade").length <= 0) {
        debug("Waiting for grades");
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

    debug("Done with grade changes");
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

const setHotkeys = (hotkeyMapLS: LSWrapper<HotkeyMap>): void => {
    if (globalThis.location.pathname !== "/") {
        return;
    }

    const courseIds = $(".ic-DashboardCard__link")
        .toArray()
        .map((card) => {
            console.log(card);
            const courseIdStr = card.getAttribute("href")?.split("/").at(-1);
            if (courseIdStr === undefined) {
                throw new AlertPanic("Couldn't find course id");
            }
            return Number.parseInt(courseIdStr);
        })
        .slice(0, 10);

    const last = courseIds.pop();
    if (last === undefined) {
        return;
    }
    courseIds.unshift(last);

    console.log(courseIds);
    hotkeyMapLS.set(courseIds);
};

const hotkeys = (): void => {
    const hotkeyMapLS = new LSWrapper<HotkeyMap>(
        LOCALSTORAGE_HOTKEYS_KEY,
        undefined
    );

    setHotkeys(hotkeyMapLS);

    const hotkeyMap = hotkeyMapLS.get();
    if (hotkeyMap === undefined) {
        return;
    }

    let first = "";
    let second = "";

    document.addEventListener("keydown", (e) => {
        first = second;
        second = e.key;

        console.log(`first: ${first}, second: ${second}`);

        const classSpecifier = parseClassSpecifier(first);
        const pageSpecifier = parsePageSpecifier(second);

        if (classSpecifier === undefined || pageSpecifier === undefined) {
            return;
        }

        globalThis.location.href = `https://canvas.umn.edu/courses/${hotkeyMap[classSpecifier]}/${pageSpecifier}`;
    });
};

const main = async (): Promise<void> => {
    debug("Running");

    if (globalThis.window.OCP_ran === true) {
        debug("Already ran, stopping");
        return;
    }
    globalThis.window.OCP_ran = true;

    // Check for jQuery
    while (typeof jQuery === "undefined") {
        debug("Waiting for jquery");
        await sleep(WAIT_FOR_ELEMENT_DELAY);
    }

    hotkeys();

    if (globalThis.location.pathname !== "/") {
        void gradeChanges();
    }
};

void main();

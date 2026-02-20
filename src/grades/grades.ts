import { WAIT_FOR_ELEMENT_DELAY } from "../config";
import { AlertPanic, debug, sleep } from "../utils";

import { generateReport } from "./calcChanges";
import { renderReport } from "./renderChanges";
import tile from "./resources/tile.html";

export type Course = {
    title: string;
    grade: number;
};

export type CoursesSnapshot = {
    courses: Course[];
    timestamp: number | undefined;
};

export type GradeChange = {
    title: string;
    oldGrade: number;
    newGrade: number;
};

export type GradeReport = {
    changes: GradeChange[];
    timeSaved: number | undefined;
    now: number;
};

const extractCourseData = (): Course[] =>
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

export const grades = async (): Promise<void> => {
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

    const currentCourses = extractCourseData();

    const report = generateReport(currentCourses);
    renderReport(report);

    debug("Grades: done");
};

import { LOCALSTORAGE_GRADES_KEY, WAIT_FOR_ELEMENT_DELAY } from "../config";
import { LSWrapper } from "../lsWrapper";
import { AlertPanic, debug, sleep } from "../utils";

import greenArrow from "./resources/greenArrow.min.svg";
import redArrow from "./resources/redArrow.min.svg";
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

const DEFAULT_LS_DATA: CoursesSnapshot = {
    courses: [],
    timestamp: undefined,
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

export const generateReport = (currentCourses: Course[]): GradeReport => {
    const snapshotLS = new LSWrapper<CoursesSnapshot>(
        LOCALSTORAGE_GRADES_KEY,
        DEFAULT_LS_DATA
    );
    const snapshot = snapshotLS.get();

    const now = Date.now();

    snapshotLS.set({ courses: currentCourses, timestamp: now });

    const changes: GradeChange[] = [];

    for (const cur of currentCourses) {
        const old = snapshot.courses.find(({ title }) => title === cur.title);
        if (old === undefined || old.grade === cur.grade) {
            continue;
        }
        changes.push({
            title: cur.title,
            newGrade: cur.grade,
            oldGrade: old.grade,
        });
    }

    return {
        changes,
        now,
        timeSaved: snapshot.timestamp,
    };
};

const getArrow = ({ oldGrade, newGrade }: GradeChange): string =>
    newGrade < oldGrade ? redArrow : greenArrow;

const formatPercentage = (percentage: number): string =>
    `${percentage.toFixed(2)}%`;

const generateText = ({ title, oldGrade, newGrade }: GradeChange): string =>
    `${title} used to be <b>${formatPercentage(
        oldGrade
    )}</b>, now it's <b>${formatPercentage(newGrade)}</b>`;

const formatResult = (value: number, unit: string, includeAgo = true): string =>
    `${Math.round(value)} ${unit}${value === 1 ? "" : "s"}${includeAgo ? " ago" : ""}`;

const formatDuration = (minutes: number): string => {
    if (minutes < 1) {
        return "less than a minute ago";
    } else if (minutes < 60) {
        return formatResult(minutes, "minute");
    } else if (minutes % 60 === 0) {
        return formatResult(minutes / 60, "hour");
    } else {
        return `${formatResult(
            (minutes - (minutes % 60)) / 60,
            "hour",
            false
        )} and ${formatResult(minutes % 60, "minute")}`;
    }
};

export const renderReport = (report: GradeReport): void => {
    const parent = $("#gradeChanges");

    if (report.timeSaved === undefined) {
        parent.text(
            "Your current grades have been saved. Check back later to see how they have changed."
        );
        return;
    }

    const deltaT = Math.floor((report.now - report.timeSaved) / (1000 * 60));

    const formattedDuration = formatDuration(deltaT);

    if (report.changes.length === 0) {
        parent.text(
            `Your grades are the same as the last time you checked ${formattedDuration}.`
        );
        return;
    }

    const text = $("<div>")
        .css({ "margin-bottom": "10px" })
        .text(
            `Your grades have changed since you last checked ${formattedDuration}.`
        );

    parent.append(text);

    const renderedChanges = report.changes.map((change) => {
        const arrow = $("<img>")
            .attr("src", getArrow(change))
            .attr("width", 14)
            .css({ "margin-right": "2px" });

        const text = $("<span>").html(generateText(change));

        return $("<div>").css({ "margin-bottom": "5px" }).append(arrow, text);
    });

    parent.append(renderedChanges);
};

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

    renderReport(generateReport(extractCourseData()));

    debug("Grades: done");
};

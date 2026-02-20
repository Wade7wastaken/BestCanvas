import greenArrow from "./resources/greenArrow.min.svg";
import redArrow from "./resources/redArrow.min.svg";

import type { GradeChange, GradeReport } from "./grades";

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

import greenArrow from "./resources/greenArrow.min.svg";
import redArrow from "./resources/redArrow.min.svg";

import type { GradeChange, GradeChanges } from "./types";

const getArrow = (change: GradeChange): string =>
    change.newGrade < change.oldGrade ? redArrow : greenArrow;

const formatPercentage = (percentage: number): string =>
    `${percentage.toFixed(2)}%`;

const generateText = (change: GradeChange): string =>
    `${change.title} used to be <b>${formatPercentage(
        change.oldGrade
    )}</b>, now it's <b>${formatPercentage(change.newGrade)}</b>`;

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

export const renderChanges = (changes: GradeChanges): void => {
    const parent = $("#gradeChanges");

    if (changes.timeSaved === undefined) {
        parent.text(
            "Your current grades have been saved. Check back later to see how they have changed."
        );
    } else {
        const deltaT = Math.floor(
            (changes.now - changes.timeSaved) / (1000 * 60)
        );

        const formattedDuration = formatDuration(deltaT);

        if (changes.changes.length === 0) {
            parent.text(
                `Your grades are the same as the last time you checked ${formattedDuration}.`
            );
            return;
        }

        const text = $("<div>").css({ "margin-bottom": "10px" });
        text.text(
            `Your grades have changed since you last checked ${formattedDuration}.`
        );

        parent.append(text);
    }

    for (const change of changes.changes) {
        const changeDiv = $("<div>").css({ "margin-bottom": "5px" });

        const arrow = $("<img>")
            .attr("src", getArrow(change))
            .attr("width", 14)
            .css({ "margin-right": "2px" });

        const text = $("<span>").html(generateText(change));

        changeDiv.append(arrow, text);
        parent.append(changeDiv);
    }
};

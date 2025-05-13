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

export const renderChanges = (changes: GradeChanges): void => {
	const parent = $("#gradeChanges");

	if (changes.changes.length === 0) {
		parent.text("Your grades are the same as the last time you checked.");
		return;
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

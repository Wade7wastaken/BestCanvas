import { calcChanges } from "./calcChanges";
import { WAIT_FOR_ELEMENT_DELAY } from "./config";
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

const main = async (): Promise<void> => {
	debug("Running");

	if (globalThis.window.OCP_ran === true) {
		debug("Already ran, stopping");
		return;
	}
	globalThis.window.OCP_ran = true;

	if (globalThis.location.pathname !== "/") {
		debug("Wrong location");
		return;
	}

	if (
		!globalThis.location.href.includes("canvas.") &&
		!confirm(
			"This script is only meant to run on canvas. Do you want to continue?"
		)
	) {
		throw new AlertPanic("Canceled by user");
	}

	// Check for jQuery
	while (typeof jQuery === "undefined") {
		debug("Waiting for jquery");
		await sleep(WAIT_FOR_ELEMENT_DELAY);
	}

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

	// console.log(currentGrades);

	const changes = calcChanges(currentGrades);
	renderChanges(changes);

	debug("Done");
};

void main();

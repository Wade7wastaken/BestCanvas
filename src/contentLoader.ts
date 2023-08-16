import { getFirstElementSafe, waitForElement } from "./helpers/jQueryHelpers";
import tile from "./resources/tile.html";

const waitForPageLoad = async (): Promise<void> => {
	await waitForElement(".muted");
	await waitForElement(".ch.col-md-4");
};

const reduceCardSizes = (): void => {
	$(".ch.col-md-4").each((_, elem) => {
		elem.classList.replace("col-md-4", "col-md-3");
	});
};

const loadHTML = (): void => {
	getFirstElementSafe("#performance").insertAdjacentHTML("afterend", tile);
	getFirstElementSafe(
		"#performance .bb-tile-header-with-content"
	).classList.add("fix-performance");
	getFirstElementSafe("#attendance .bb-tile-header").textContent =
		"Attendance";
};

export const contentLoader = async (): Promise<void> => {
	await waitForPageLoad();
	reduceCardSizes();
	loadHTML();
};

export const reload = async (): Promise<void> => {
	await waitForPageLoad();
	reduceCardSizes();
	loadHTML();
};

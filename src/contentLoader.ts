import { getFirstElementSafe, waitForElement } from "./helpers/jQueryHelpers";
import tile from "./resources/tile.html";

const waitForPageLoad = async (): Promise<void> => {
	await waitForElement(".muted");
	await waitForElement(".ch.col-md-4");
	await waitForElement(".showGrade");
};

const loadHTML = (): void => {
	getFirstElementSafe(
		"#performanceCollapse > div.bb-tile-content-section"
	).insertAdjacentHTML("beforeend", tile);
};

export const contentLoader = async (): Promise<void> => {
	await waitForPageLoad();
	loadHTML();
};

export const reload = async (): Promise<void> => {
	await waitForPageLoad();
	loadHTML();
};

import { getFirstElementSafe, waitForElement } from "./helpers/jQueryHelpers";
import tile from "./resources/tile.html";

const waitForPageLoad = async (): Promise<void> => {
	await waitForElement(".muted");
	await waitForElement(".ch.col-md-4");
};

const loadHTML = (): void => {
	getFirstElementSafe(
		"#site-main > div > div > div > div:nth-child(3)"
	).insertAdjacentHTML("afterend", tile);
};

export const contentLoader = async (): Promise<void> => {
	await waitForPageLoad();
	loadHTML();
};

export const reload = async (): Promise<void> => {
	await waitForPageLoad();
	loadHTML();
};

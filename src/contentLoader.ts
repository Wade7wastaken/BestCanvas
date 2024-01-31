import { getFirstElementSafe, waitForElement } from "./helpers/jQueryHelpers";
import css from "./resources/styles.css";
import tile from "./resources/tile.html";

const waitForPageLoad = async (): Promise<void> => {
	await waitForElement(".muted");
	await waitForElement(".ch.col-md-4");
};

const loadCSS = (): void => {
	$("head").append($("<style>").html(css));
};

const loadHTML = (): void => {
	getFirstElementSafe(
		"#site-main > div > div > div > div:nth-child(3)"
	).insertAdjacentHTML("afterend", tile);
};

export const contentLoader = async (): Promise<void> => {
	await waitForPageLoad();
	loadCSS();
	loadHTML();
};

export const reload = async (): Promise<void> => {
	await waitForPageLoad();
	loadHTML();
};

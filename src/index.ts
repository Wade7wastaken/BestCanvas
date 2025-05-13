import { calcChanges } from "./calcChanges";
import { extractData } from "./extractData";
import { gpaCalc, maxGpaCalc } from "./gpaCalc";
import {
	checkJQuery,
	getFirstElementSafe,
	setUpJQuery,
	waitForElement,
} from "./helpers/jQueryHelpers";
import { renderChanges } from "./renderChanges";
import tile from "./resources/tile.html";

// need to use var to avoid redeclaration
// eslint-disable-next-line no-var
var OCP_ran: boolean | undefined;

const reRunProtection = (): boolean => {
	if (OCP_ran == true) {
		console.log("already ran");
		return true;
	}
	OCP_ran = true;
	return false;
};

const domainChecker = (): void => {
	if (
		!globalThis.location.href.includes("myschoolapp.com") &&
		!confirm(
			"This script is only meant to run on mySFHS. Do you want to continue?"
		)
	) {
		throw new Error("Canceled by user");
	}
};

const reload = async (): Promise<void> => {
	if (globalThis.location.hash === "#studentmyday/progress") {
		await waitForPageLoad();
		loadHTML();
		insertData();
	}
};

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

const insertData = (): void => {
	const currentGrades = extractData();

	const gpa = gpaCalc(currentGrades);
	const maxGpa = maxGpaCalc(currentGrades);
	$("#gpa").text(
		`GPA: ${gpa.toFixed(2)}/${maxGpa.toFixed(2)} (${((gpa / maxGpa) * 100).toFixed(0)}%)`
	);

	const changes = calcChanges(currentGrades);
	renderChanges(changes);

	console.log("done");
};

await (async (): Promise<void> => {
	console.log("Running OCP");
	if (reRunProtection()) {
		return;
	}
	domainChecker();
	await checkJQuery();
	setUpJQuery();

	// whenever the user goes to the progress page, load the content again
	$(globalThis).on("hashchange", () => {
		void reload();
	});

	void reload();
})();

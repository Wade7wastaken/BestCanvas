import { reload } from "./contentLoader";
import { checkJQuery } from "./helpers/jQueryHelpers";
import { AlertPanic } from "./helpers/utils";

const domainChecker = (): void => {
	if (
		!window.location.href.includes("myschoolapp.com") &&
		!confirm(
			"This script is only meant to run on mySFHS. Do you want to continue?"
		)
	)
		throw new AlertPanic("Script canceled by user.");
};

const goToProgress = (): void => {
	window.location.hash = "#studentmyday/progress";

	// whenever the user goes to a new page, load the content again. Important
	// to put this after setting the hash for the first time
	$(window).on("hashchange", () => {
		if (window.location.hash === "#studentmyday/progress") {
			void reload();
		}
	});
};

export const init = (): void => {
	checkJQuery();
	domainChecker();
	goToProgress();
};


import { cont, locationWarning, str } from "./data/strings";
import { getFirstElementSafe } from "./helpers/jQueryHelpers";
import { panic } from "./helpers/utils";



const domainChecker = (): void => {
	if (
		!window.location.href.includes("myschoolapp.com") &&
		!confirm(str(locationWarning, cont))
	)
		panic("Script canceled by user.");
};

const goToProgress = (): void => {
	getFirstElementSafe("#topnav-container > ul > li > a").click();
};



domainChecker();
goToProgress();

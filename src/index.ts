import { calcChanges } from "./calcChanges";
import { initColorSlider } from "./colors";
import { contentLoader } from "./contentLoader";
import { extractData } from "./extractData";
import { gpaCalc } from "./gpaCalc";
import { init } from "./init";
import { renderChanges } from "./renderChanges";

void (async (): Promise<void> => {
	init();
	await contentLoader();
	const currentGrades = extractData();
	const changes = calcChanges(currentGrades);

	console.log(gpaCalc(currentGrades));

	renderChanges(changes);

	initColorSlider();

	console.log("done");
})();

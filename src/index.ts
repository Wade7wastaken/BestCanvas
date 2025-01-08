import { calcChanges } from "./calcChanges";
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

	const gpa = gpaCalc(currentGrades);
	$("#gpa").text("GPA: " + gpa.toFixed(2));

	renderChanges(changes);

	console.log("done");
})();

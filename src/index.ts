import { contentLoader } from "./contentLoader";
import { calcChanges, extractData } from "./extractData";
import { gpaCalc } from "./gpaCalc";
import { init } from "./init";
import { renderChanges } from "./renderChanges";

void (async () => {
	/*console.log(
		gpaCalc([
			{ grade: 93, classTitle: "a" },
			{ grade: 98, classTitle: "a" },
			{ grade: 97, classTitle: "a" },
			{ grade: 89, classTitle: "a" },
			{ grade: 96, classTitle: "a" },
			{ grade: 99, classTitle: "a" },
			{ grade: 94, classTitle: "a" },
			{ grade: 99, classTitle: "a" },
		])
	);*/

	init();
	await contentLoader();
	const currentGrades = extractData();
	const changes = calcChanges(currentGrades);

	console.log(gpaCalc(currentGrades));

	renderChanges(changes);

	console.log("done");
})();

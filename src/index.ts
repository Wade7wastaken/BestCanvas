import { contentLoader } from "./contentLoader";
import { calcChanges } from "./extractData";
import { init } from "./init";
import { renderChanges } from "./renderChanges";

import "./content/styles.css";

void (async () => {
	init();
	await contentLoader();
	const changes = calcChanges();

	renderChanges(changes);

	console.log("done");
})();

import { contentLoader } from "./contentLoader";
import { calcChanges } from "./extractData";
import { init } from "./init";

import "./content/styles.css";

void (async () => {
	init();
	await contentLoader();
	calcChanges();

	console.log("done");
})();

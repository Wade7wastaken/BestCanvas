import { contentLoader } from "./contentLoader";
import { init } from "./init";

import "./content/styles.css";
import "./content/appStyles.css";

void (async () => {
	init();
	await contentLoader();

	console.log("done");
})();

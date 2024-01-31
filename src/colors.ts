import { LocalStorageWrapper } from "./helpers/lsWrapper";
import { panic } from "./helpers/utils";
import header from "./resources/cssHeader.css";

const initStyle = (): void => {
	const $style = $("#app-style style");

	const currentCss = $style.text();

	const replaced = currentCss
		// pri normal
		.replaceAll("#004a97", "var(--pri-100)")
		.replaceAll("#4077b1", "var(--pri-75)")
		.replaceAll("#80a4cb", "var(--pri-50)")
		.replaceAll("#bfd2e5", "var(--pri-25)")
		.replaceAll("#d9e4ef", "var(--pri-15)")
		// sec normal
		.replaceAll("#65b2e9", "var(--sec-100)")
		.replaceAll("#8cc5ee", "var(--sec-75)")
		.replaceAll("#b2d8f4", "var(--sec-50)")
		.replaceAll("#d8ecfa", "var(--sec-25)")
		.replaceAll("#e8f3fc", "var(--sec-15)")
		.replaceAll(
			"background-image: linear-gradient(top,",
			"background-image: linear-gradient(to bottom,"
		);

	const content = header + replaced;

	$style.text(content);
};

const DEFAULT_HUE = "211";

export const initColorSlider = (): void => {
	initStyle();
	const storage = new LocalStorageWrapper("themeColor", "211");

	const setColor = (val: string): void => {
		document.documentElement.style.setProperty("--main-hue", val);
		storage.set(val);
	};

	setColor(storage.value);

	const hueSlider = $("#hueRange");

	hueSlider.on("input", () => {
		const val = hueSlider.val();

		if (typeof val !== "string") {
			return panic("slider value wasn't a string!");
		}

		console.log(`changing hue to ${val}`);
		setColor(val);
	});

	$("#themeReset").on("click", () => {
		setColor(DEFAULT_HUE);
		hueSlider.val(DEFAULT_HUE);
	});
};

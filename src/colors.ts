import { LocalStorageWrapper } from "./helpers/lsWrapper";
import { AlertPanic } from "./helpers/utils";
import header from "./resources/cssHeader.scss";

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
	const lsHue = new LocalStorageWrapper("themeColor", DEFAULT_HUE);
	const lsLightness = new LocalStorageWrapper("lightness", "180");
	const lsColored = new LocalStorageWrapper("colored", "1");

	const setTheme = (sliderVal: string, colored: string): void => {
		document.documentElement.style.setProperty("--main-hue", sliderVal);
		document.documentElement.style.setProperty("--colored", colored);
		document.documentElement.style.setProperty(
			"--lightness",
			(colored === "1" ? "180" : sliderVal) + "%"
		);
		lsHue.set(sliderVal);
		lsLightness.set(sliderVal);
		lsColored.set(colored);
	};

	const hueSlider = $("#hueRange");

	setTheme(lsHue.value, lsColored.value);
	hueSlider.val(lsHue.value);

	hueSlider.on("input", () => {
		const val = hueSlider.val();

		if (typeof val !== "string")
			throw new AlertPanic("slider value wasn't a string!");

		console.log(`changing hue to ${val}`);
		setTheme(val, lsColored.value);
	});

	$("#themeReset").on("click", () => {
		setTheme(DEFAULT_HUE, "1");
		hueSlider.val(DEFAULT_HUE);
	});

	$("#grayscale").on("change", function () {
		lsColored.set(lsColored.value === "0" ? "1" : "0");
		setTheme(lsHue.value, lsColored.value);
	});
};

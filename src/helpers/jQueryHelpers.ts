import { WAIT_FOR_ELEMENT_DELAY } from "../config";

import { AlertPanic } from "./utils";

// add exists to the jquery interface
declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface JQuery {
		exists(): boolean;
	}
}

export const checkJQuery = async (): Promise<void> => {
	while (typeof jQuery === "undefined") {
		await new Promise((r) => setTimeout(r, WAIT_FOR_ELEMENT_DELAY));
	}
	// if (typeof jQuery === "undefined") {
	// 	// for some reason we don't have jquery, so we load our own
	// 	console.error("jQuery was undefined, trying to load from cdn");
	// 	const el = document.createElement("script");
	// 	el.src = "https://code.jquery.com/jquery-3.7.1.min.js";
	// 	el.integrity = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=";
	// 	el.crossOrigin = "anonymous";
	// 	el.async = false;
	// 	document.head.append(el);
	// 	if (typeof jQuery === "undefined") {
	// 		throw new AlertPanic("Couldn't initialize jQuery");
	// 	}
	// }
};

export const setUpJQuery = (): void => {
	jQuery.fn.exists = function (): boolean {
		return this.length > 0;
	};
};

export async function waitForElement(selector: string): Promise<void> {
	while (!$(selector).exists())
		await new Promise((r) => setTimeout(r, WAIT_FOR_ELEMENT_DELAY));
}

export function getFirstElementSafe(selector: string): HTMLElement {
	const el = $(selector)[0];
	if (el === undefined)
		throw new AlertPanic(`Couldn't find element ${selector}`);
	return el;
}

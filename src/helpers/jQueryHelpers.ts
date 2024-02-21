import { WAIT_FOR_ELEMENT_DELAY } from "../config";

import { AlertPanic } from "./utils";

// add exists to the jquery interface
declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface JQuery {
		exists(): boolean;
	}
}

export const checkJQuery = (): void => {
	if (typeof jQuery === "undefined")
		throw new AlertPanic("This script is only meant to run on mySFHS.");
};

jQuery.fn.exists = function (): boolean {
	return this.length > 0;
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

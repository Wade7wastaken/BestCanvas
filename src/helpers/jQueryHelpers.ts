import { locationWarning } from "../data/strings";

import { panic } from "./utils";

declare global {
	interface JQuery {
		exists(): boolean;
	}
}

if (typeof jQuery === "undefined") panic(locationWarning);

jQuery.fn.exists = function () {
	return this.length > 0;
};

export async function waitForElement(selector: string): Promise<void> {
	if ($(selector).exists()) return;
	else await new Promise((r) => setTimeout(r, 100));
}

export function getFirstElementSafe(selector: string): HTMLElement {
	const el = $(selector)[0];
	if (!el) {
		panic(`Couldn't find element ${selector}`);
		throw new Error("a");
	}
	return el;
}

import { panic } from "./utils";

declare global {
	interface JQuery {
		exists(): boolean;
	}
}

if (typeof jQuery === "undefined")
	panic("This script is only meant to run on mySFHS.");

jQuery.fn.exists = function () {
	return this.length > 0;
};

export async function waitForElement(selector: string): Promise<void> {
	while (!$(selector).exists()) {
		await new Promise((r) => setTimeout(r, 100));
	}
}

export function getFirstElementSafe(selector: string): HTMLElement {
	const el = $(selector)[0];
	if (el === undefined) {
		panic(`Couldn't find element ${selector}`);
		throw new Error("a");
	}
	return el;
}

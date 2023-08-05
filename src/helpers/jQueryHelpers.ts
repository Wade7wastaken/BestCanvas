import { panic } from "./utils";

declare global {
	interface JQuery {
		exists(): boolean;
	}
}

jQuery.fn.exists = function () {
	return this.length > 0;
};

export function getFirstElementSafe(selector: string): HTMLElement {
	const el = $(selector)[0];
	if (!el) panic(`Couldn't find element ${selector}`);
	return el;
}

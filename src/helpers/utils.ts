export class AlertPanic extends Error {
	public constructor(message: string) {
		super(message);
		alert("OCP: Something has gone wrong. See the developer console for more information.")
	}
}

const OCPDebug = process.env.NODE_ENV === "development";

export const debug = (message: string): void => {
	if (OCPDebug) console.log(message);
};

const formatResult = (
	value: number,
	unit: string,
	includeAgo = true
): string => {
	return `${Math.round(value)} ${unit}${value === 1 ? "" : "s"}${
		includeAgo ? " ago" : ""
	}`;
};

export const formatDuration = (minutes: number): string => {
	if (minutes < 1) {
		return "less than a minute ago";
	} else if (minutes < 60) {
		return formatResult(minutes, "minute");
	} else if (minutes % 60 === 0) {
		return formatResult(minutes / 60, "hour");
	} else {
		return `${formatResult(
			(minutes - (minutes % 60)) / 60,
			"hour",
			false
		)} and ${formatResult(minutes % 60, "minute")}`;
	}
};

export const clamp = (num: number, min: number, max: number): number =>
	Math.max(min, Math.min(num, max));

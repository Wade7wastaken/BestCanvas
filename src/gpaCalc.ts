import { clamp } from "./helpers/utils";
import { gpaMap } from "./resources/gpaMap";

import type { ClassInfo } from "./types";

export const isWeightedClass = (classTitle: string): boolean =>
	classTitle.endsWith("-H");

export const gpaCalc = (currentGrades: ClassInfo[], weighted = true): number =>
	currentGrades.reduce(
		(accumulator, currentValue) =>
			accumulator +
			((gpaMap[clamp(Math.floor(currentValue.grade), 70, 99)] ?? 0) +
				(weighted && isWeightedClass(currentValue.classTitle) ? 1 : 0)),
		0
	) / currentGrades.length;

import { clamp } from "./helpers/utils";
import { gpaMap } from "./resources/gpaMap";

import type { Course as CourseInfo } from "./types";

const base_gpa = (grade: number): number =>
	gpaMap[clamp(Math.floor(grade), 70, 99)] ?? 0;

const isWeightedClass = (title: string): boolean => title.endsWith("-H");

const weight = (weighted: boolean, title: string): number =>
	weighted && isWeightedClass(title) ? 1 : 0;

export const gpaCalc = (courses: CourseInfo[], weighted = true): number =>
	courses
		.map(({ grade, title }) => base_gpa(grade) + weight(weighted, title))
		.reduce((acc, n) => acc + n, 0) / courses.length;

export const maxGpaCalc = (courses: CourseInfo[], weighted = true): number =>
	courses
		.map(({ title }) => base_gpa(99) + weight(weighted, title))
		.reduce((acc, n) => acc + n, 0) / courses.length;

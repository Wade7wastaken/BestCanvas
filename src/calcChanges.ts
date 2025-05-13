import { LSWrapper } from "./helpers/lsWrapper";

import type { Course, GradeChange, GradeChanges } from "./types";

type CoursesSnapshot = {
	courses: Course[];
	timestamp: number | undefined;
};

type LSData = {
	old: CoursesSnapshot;
	prev: CoursesSnapshot;
};

const DEFAULT_LS_DATA = {
	old: { courses: [], timestamp: undefined },
	prev: { courses: [], timestamp: undefined },
};

const compare = (a: Course[], b: Course[]): GradeChange[] => {
	const changes: GradeChange[] = [];

	for (const currentCourse of a) {
		const oldCourse = b.find(({ title }) => title === currentCourse.title);
		if (
			oldCourse !== undefined &&
			oldCourse.grade !== currentCourse.grade
		) {
			changes.push({
				title: currentCourse.title,
				newGrade: currentCourse.grade,
				oldGrade: oldCourse.grade,
			});
		}
	}

	return changes;
};

export const calcChanges = (currentCourses: Course[]): GradeChanges => {
	const oldCourses = new LSWrapper<LSData>("oldGrades", DEFAULT_LS_DATA);

	const now = Date.now();

	const {
		value: { prev },
	} = oldCourses;

	return {
		changes: compare(currentCourses, prev.courses),
		now,
		timeSaved: prev.timestamp,
	};

	// if (now - (prev.timestamp ?? 0) > 1000 * 60 * 10) {
	// 	const changes = compare(currentCourses, prev.courses);
	// 	oldCourses.set({
	// 		prev: { courses: currentCourses, timestamp: now },
	// 		old: prev,
	// 	});
	// 	return {
	// 		changes,
	// 		now,
	// 		timeSaved: prev.timestamp,
	// 	};
	// } else {
	// 	const changes = compare(currentCourses, old.courses);
	// 	oldCourses.set({
	// 		prev: { courses: currentCourses, timestamp: now },
	// 		old,
	// 	});
	// 	return {
	// 		changes,
	// 		now,
	// 		timeSaved: old.timestamp,
	// 	};
	// }
};

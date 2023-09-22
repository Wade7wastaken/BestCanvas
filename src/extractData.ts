import { LocalStorageWrapper } from "./helpers/lsWrapper";
import { ClassInfo, GradeChange } from "./types";

const extractData = (): ClassInfo[] => {
	return $("#coursesContainer > .row")
		.map((_, e) => {
			const elem = $(e);
			const grade = elem.find("h3.showGrade");
			return {
				classTitle: elem.find("a > h3").text().split(" -")[0] ?? "",
				grade:
					Number.parseFloat(
						grade.text().trim().replaceAll(/[%-]/g, "")
					) || 0,
			};
		})
		.toArray();
};

export const calcChanges = (): GradeChange[] => {
	const oldGrades = new LocalStorageWrapper<ClassInfo[]>("oldGrades", []);
	const currentGrades = extractData();

	const changes: GradeChange[] = [];

	for (const currentClass of currentGrades) {
		const oldClass = oldGrades.value.find(
			({ classTitle }) => classTitle === currentClass.classTitle
		);
		if (oldClass !== undefined && oldClass.grade !== currentClass.grade) {
			changes.push({
				classTitle: currentClass.classTitle,
				newGrade: currentClass.grade,
				oldGrade: oldClass.grade,
			});
		}
	}

	oldGrades.set(currentGrades);
	return changes;
};

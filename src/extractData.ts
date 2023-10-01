import { LocalStorageWrapper } from "./helpers/lsWrapper";
import { ClassInfo, GradeChange } from "./types";

export const extractData = (): ClassInfo[] =>
	$("#coursesContainer > .row")
		.map((_, row) => ({
			classTitle: $(row).find("a > h3").text().split(" -")[0] ?? "",
			grade:
				Number.parseFloat(
					$(row)
						.find("h3.showGrade")
						.text()
						.trim()
						.replaceAll(/[%-]/g, "")
				) || 0,
		}))
		.toArray();

export const calcChanges = (currentGrades: ClassInfo[]): GradeChange[] => {
	const oldGrades = new LocalStorageWrapper<ClassInfo[]>("oldGrades", []);

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

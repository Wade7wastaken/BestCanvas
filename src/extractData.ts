import { LocalStorageWrapper } from "./lsWrapper";
import { ClassInfo, GradeChange } from "./types";

const extractData = (): ClassInfo[] => {
	return $("#coursesContainer > .row")
		.map((_, elem) => {
			return {
				classTitle: $(elem).find("a > h3").text().split(" -")[0] ?? "",
				grade:
					Number.parseFloat(
						$(elem)
							.find("h3.showGrade")
							.text()
							.trim()
							.replaceAll(/[%-]/g, "")
					) || 0,
			};
		})
		.toArray();
};

export const calcChanges = (): void => {
	const oldGrades = new LocalStorageWrapper<ClassInfo[]>("oldGrades", []);
	const currentGrades = extractData();

	for (const grade of currentGrades) {
		grade.classTitle;
	}

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

	console.log(changes);

	oldGrades.set(currentGrades);
};

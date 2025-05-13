import type { Course } from "./types";

export const extractData = (): Course[] =>
	$("#coursesContainer > .row")
		.map((_, row) => ({
			title: $(row).find("a > h3").text().split(" -")[0] ?? "",
			grade: Number.parseFloat(
				$(row)
					.find("h3.showGrade")
					.text()
					.trim()
					.replaceAll(/[%-]/g, "")
			),
		}))
		.toArray()
		.filter((c) => !Number.isNaN(c.grade));

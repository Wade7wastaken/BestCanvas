import { DEFAULT_GRADE } from "./config";

import type { ClassInfo } from "./types";

export const extractData = (): ClassInfo[] =>
	$("#coursesContainer > .row")
		.map((_, row) => ({
			classTitle: $(row).find("a > h3").text().split(" -")[0] ?? "",
			grade: Number.parseFloat(
				$(row)
					.find("h3.showGrade")
					.text()
					.trim()
					.replaceAll(/[%-]/g, "")
			),
		}))
		.toArray()
		.filter((c) => !isNaN(c.grade));

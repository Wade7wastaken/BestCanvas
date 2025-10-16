import type { Course } from "./types";

export const extractData = (): Course[] =>
	$(".ic-DashboardCard__header")
		.map((_, row) => ({
			title: $(row).find(".ic-DashboardCard__header-title").text().trim(),
			grade: Number.parseFloat(
				$(row)
					.find(".bettercanvas-card-grade")
					.text()
					.trim()
					.slice(0, -1)
			),
		}))
		.filter((_, { grade }) => !Number.isNaN(grade))
		.toArray();

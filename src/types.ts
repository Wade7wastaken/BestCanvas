export type Course = {
	title: string;
	grade: number;
};

export type GradeChanges = {
	changes: GradeChange[];
	timeSaved: number | undefined;
	now: number;
};

export type GradeChange = {
	title: string;
	oldGrade: number;
	newGrade: number;
};

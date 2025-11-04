export type Course = {
    title: string;
    grade: number;
};

export type CoursesSnapshot = {
    courses: Course[];
    timestamp: number | undefined;
};

export type GradeChange = {
    title: string;
    oldGrade: number;
    newGrade: number;
};

export type GradeChanges = {
    changes: GradeChange[];
    timeSaved: number | undefined;
    now: number;
};

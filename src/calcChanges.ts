import { LOCALSTORAGE_GRADES_KEY } from "./config";
import { LSWrapper } from "./helpers/lsWrapper";

import type {
    Course,
    CoursesSnapshot,
    GradeChange,
    GradeChanges,
} from "./types";

const DEFAULT_LS_DATA: CoursesSnapshot = {
    courses: [],
    timestamp: undefined,
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
    const snapshotLS = new LSWrapper<CoursesSnapshot>(
        LOCALSTORAGE_GRADES_KEY,
        DEFAULT_LS_DATA
    );
    const snapshot = snapshotLS.get();

    const now = Date.now();

    const result = {
        changes: compare(currentCourses, snapshot.courses),
        now,
        timeSaved: snapshot.timestamp,
    };

    snapshotLS.set({ courses: currentCourses, timestamp: now });

    return result;
};

import { LOCALSTORAGE_GRADES_KEY } from "../config";
import { LSWrapper } from "../lsWrapper";

import type {
    Course,
    CoursesSnapshot,
    GradeChange,
    GradeReport,
} from "./grades";

const DEFAULT_LS_DATA: CoursesSnapshot = {
    courses: [],
    timestamp: undefined,
};

const compare = (a: Course[], b: Course[]): GradeChange[] => {
    const changes: GradeChange[] = [];

    for (const current of a) {
        const old = b.find(({ title }) => title === current.title);
        if (old === undefined || old.grade === current.grade) {
            continue;
        }
        changes.push({
            title: current.title,
            newGrade: current.grade,
            oldGrade: old.grade,
        });
    }

    return changes;
};

export const generateReport = (currentCourses: Course[]): GradeReport => {
    const snapshotLS = new LSWrapper<CoursesSnapshot>(
        LOCALSTORAGE_GRADES_KEY,
        DEFAULT_LS_DATA
    );
    const snapshot = snapshotLS.get();

    const now = Date.now();

    snapshotLS.set({ courses: currentCourses, timestamp: now });

    return {
        changes: compare(currentCourses, snapshot.courses),
        now,
        timeSaved: snapshot.timestamp,
    };
};

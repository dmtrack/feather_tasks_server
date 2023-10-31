import { Grade } from '../db/models/grade';
import { Subject } from '../db/models/subject';
import { User } from '../db/models/user';
import { DBError } from '../exceptions/db-error';
import mokeData from '../utils/moke.json';

export const createMokeData = async () => {
    try {
        await User.create({
            name: mokeData.users.user1.name,
            lastname: mokeData.users.user1.lastname,
        });

        await User.create({
            name: mokeData.users.user2.name,
            lastname: mokeData.users.user2.lastname,
        });

        await Subject.create({
            name: mokeData.subjects.subject1.name,
        });
        await Subject.create({
            name: mokeData.subjects.subject2.name,
        });
        await Subject.create({
            name: mokeData.subjects.subject3.name,
        });
        await Subject.create({
            name: mokeData.subjects.subject4.name,
        });
        await Subject.create({
            name: mokeData.subjects.subject5.name,
        });
        await Subject.create({
            name: mokeData.subjects.subject6.name,
        });

        await Grade.create({
            userId: mokeData.grades.grade1.userId,
            subjectId: mokeData.grades.grade1.subjectId,
            grade: mokeData.grades.grade1.grade,
            date: mokeData.grades.grade1.date,
        });

        await Grade.create({
            userId: mokeData.grades.grade2.userId,
            subjectId: mokeData.grades.grade2.subjectId,
            grade: mokeData.grades.grade2.grade,
            date: mokeData.grades.grade2.date,
        });

        await Grade.create({
            userId: mokeData.grades.grade3.userId,
            subjectId: mokeData.grades.grade3.subjectId,
            grade: mokeData.grades.grade3.grade,
            date: mokeData.grades.grade3.date,
        });

        await Grade.create({
            userId: mokeData.grades.grade4.userId,
            subjectId: mokeData.grades.grade4.subjectId,
            grade: mokeData.grades.grade4.grade,
            date: mokeData.grades.grade4.date,
        });

        await Grade.create({
            userId: mokeData.grades.grade5.userId,
            subjectId: mokeData.grades.grade5.subjectId,
            grade: mokeData.grades.grade5.grade,
            date: mokeData.grades.grade5.date,
        });

        await Grade.create({
            userId: mokeData.grades.grade6.userId,
            subjectId: mokeData.grades.grade6.subjectId,
            grade: mokeData.grades.grade6.grade,
            date: mokeData.grades.grade6.date,
        });

        await Grade.create({
            userId: mokeData.grades.grade7.userId,
            subjectId: mokeData.grades.grade7.subjectId,
            grade: mokeData.grades.grade7.grade,
            date: mokeData.grades.grade7.date,
        });

        await Grade.create({
            userId: mokeData.grades.grade8.userId,
            subjectId: mokeData.grades.grade8.subjectId,
            grade: mokeData.grades.grade8.grade,
            date: mokeData.grades.grade8.date,
        });

        await Grade.create({
            userId: mokeData.grades.grade9.userId,
            subjectId: mokeData.grades.grade9.subjectId,
            grade: mokeData.grades.grade9.grade,
            date: mokeData.grades.grade9.date,
        });
    } catch (e: unknown) {
        if (e instanceof DBError) {
            return new DBError('data base error', e);
        } else {
            return new Error('unknown error was occured');
        }
    }
};

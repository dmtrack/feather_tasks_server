import { Transaction } from 'sequelize';
import connection from '../db/config';
import { Grade } from '../db/models/grade';
import { Subject } from '../db/models/subject';
import { DBError } from '../exceptions/db-error';
import mokeData from '../utils/moke.json';

const LogService = require('../services/log.service');

export const createMokeData = async () => {
    await connection.transaction(async (t: Transaction) => {
        try {
            await Subject.create(
                {
                    name: mokeData.subjects.subject1.name,
                },
                { transaction: t }
            );
            await Subject.create(
                {
                    name: mokeData.subjects.subject2.name,
                },
                { transaction: t }
            );
            await Subject.create(
                {
                    name: mokeData.subjects.subject3.name,
                },
                { transaction: t }
            );
            await Subject.create(
                {
                    name: mokeData.subjects.subject4.name,
                },
                { transaction: t }
            );
            await Subject.create(
                {
                    name: mokeData.subjects.subject5.name,
                },
                { transaction: t }
            );
            await Subject.create(
                {
                    name: mokeData.subjects.subject6.name,
                },
                { transaction: t }
            );

            await LogService.create(mokeData.users.user1);
            await LogService.create(mokeData.users.user2);

            await Grade.create(
                {
                    userId: mokeData.grades.grade1.userId,
                    subjectId: mokeData.grades.grade1.subjectId,
                    grade: mokeData.grades.grade1.grade,
                    date: mokeData.grades.grade1.date,
                },
                { transaction: t }
            );

            await Grade.create(
                {
                    userId: mokeData.grades.grade2.userId,
                    subjectId: mokeData.grades.grade2.subjectId,
                    grade: mokeData.grades.grade3.grade,
                    date: mokeData.grades.grade4.date,
                },
                { transaction: t }
            );

            await Grade.create(
                {
                    userId: mokeData.grades.grade3.userId,
                    subjectId: mokeData.grades.grade4.subjectId,
                    grade: mokeData.grades.grade4.grade,
                    date: mokeData.grades.grade4.date,
                },
                { transaction: t }
            );

            await Grade.create(
                {
                    userId: mokeData.grades.grade3.userId,
                    subjectId: mokeData.grades.grade4.subjectId,
                    grade: mokeData.grades.grade4.grade,
                    date: mokeData.grades.grade4.date,
                },
                { transaction: t }
            );

            await Grade.create(
                {
                    userId: mokeData.grades.grade5.userId,
                    subjectId: mokeData.grades.grade5.subjectId,
                    grade: mokeData.grades.grade5.grade,
                    date: mokeData.grades.grade5.date,
                },
                { transaction: t }
            );

            await Grade.create(
                {
                    userId: mokeData.grades.grade6.userId,
                    subjectId: mokeData.grades.grade6.subjectId,
                    grade: mokeData.grades.grade6.grade,
                    date: mokeData.grades.grade6.date,
                },
                { transaction: t }
            );

            await Grade.create(
                {
                    userId: mokeData.grades.grade7.userId,
                    subjectId: mokeData.grades.grade7.subjectId,
                    grade: mokeData.grades.grade7.grade,
                    date: mokeData.grades.grade7.date,
                },
                { transaction: t }
            );

            await Grade.create(
                {
                    userId: mokeData.grades.grade8.userId,
                    subjectId: mokeData.grades.grade8.subjectId,
                    grade: mokeData.grades.grade8.grade,
                    date: mokeData.grades.grade8.date,
                },
                { transaction: t }
            );

            await Grade.create(
                {
                    userId: mokeData.grades.grade9.userId,
                    subjectId: mokeData.grades.grade9.subjectId,
                    grade: mokeData.grades.grade9.grade,
                    date: mokeData.grades.grade9.date,
                },
                { transaction: t }
            );
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            } else {
                return new Error('unknown error was occured');
            }
        }
    });
};

import { Grade } from '../db/models/grade';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { Model, Op } from 'sequelize';
import { User } from '../db/models/user';
import { Sequelize } from 'sequelize-typescript';
import { Subject } from '../db/models/subject';

export class StatService {
    async create(props: Grade) {
        try {
            let { userId, subjectId, date, grade } = props;
            const user = await User.findOne({ where: { id: userId } });

            if (user) {
                const newGrade: Grade = await Grade.create({
                    userId: +userId,
                    subjectId: subjectId,
                    grade: +grade,
                    date: date,
                });
                return newGrade;
            }
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            } else {
                return new Error('unknown error was occured');
            }
        }
    }

    async getUserStatistic(id: number) {
        const student = await User.findOne({
            where: { id: id },
        });

        if (!student) {
            return new EntityError(
                ` студент с указанным персональным кодом: ${id} не найден`
            );
        }

        const grades = await Grade.findAll({
            where: { userId: id },
            attributes: [
                'subjectId',
                [Sequelize.fn('AVG', Sequelize.col('grade')), 'avgGrade'],
                [Sequelize.fn('MAX', Sequelize.col('grade')), 'maxGrade'],
                [Sequelize.fn('MIN', Sequelize.col('grade')), 'minGrade'],
                [
                    Sequelize.fn('count', Sequelize.col('subjectId')),
                    'totalGrades',
                ],
            ],
            include: [{ model: Subject, as: 'subject', attributes: ['name'] }],
            raw: true,
            group: ['name', 'subjectId'],
        });

        const gradeIds = grades.map((grade) => Number(grade.subjectId));
        const subjects = await Subject.findAll();
        let noGrades = await subjects.filter((subject) => {
            return gradeIds.every((id) => Number(subject.id) !== id);
        });
        const updatedGrades = noGrades.map((grade) => {
            return {
                subjectId: grade.id,
                subjectName: grade.name,
                totalGrades: 0,
            };
        });
        const allGrades = { ...grades, ...updatedGrades };

        return { student: student, statistics: allGrades };
    }
}
module.exports = new StatService();

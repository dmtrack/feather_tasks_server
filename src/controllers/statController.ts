import { RequestHandler } from 'express';
import { Grade } from '../db/models/grade';
import { Subject } from '../db/models/subject';
import { EntityError } from '../exceptions/entity-error';

const statService = require('../services/stat.service');

class StatController {
    create: RequestHandler = async (req, res, next) => {
        try {
            const { userId, subjectId, grade, date } = req.body;

            const response: Grade = await statService.create({
                userId,
                subjectId,
                grade,
                date,
            });

            if (!(response instanceof EntityError)) {
                res.status(200).json({
                    id: response.id,
                    userId: response.userId,
                    subject: response.subjectId,
                    date: response.date,
                });
            } else {
                res.status(500).json('server error');
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getUserStatistic: RequestHandler = async (req, res) => {
        const id = req.params.id;
        try {
            const response = await statService.getUserStatistic(id);

            if (!(response instanceof EntityError)) {
                res.status(200).json({
                    response,
                });
            } else {
                res.status(400).json(
                    `студент с указанным персональным кодом: ${id} не найден`
                );
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getSubjects: RequestHandler = async (req, res) => {
        try {
            const response = await Subject.findAll();
            console.log(response, 'response');
            res.status(200).json({
                response,
            });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };
}

module.exports = new StatController();

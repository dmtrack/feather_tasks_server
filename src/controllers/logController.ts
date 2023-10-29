import { RequestHandler } from 'express';
import { User } from '../db/models/user';
import { EntityError } from '../exceptions/entity-error';

const logService = require('../services/log.service');
class LogController {
    create: RequestHandler = async (req, res, next) => {
        const { name, lastname } = req.body;
        try {
            const response: User = await logService.create({
                name: name,
                lastname: lastname,
            });

            res.json({
                name: response.name,
                lastname: response.lastname,
            });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getUsers: RequestHandler = async (req, res, next) => {
        try {
            const users = await logService.getUsers();
            return res.json({ data: users });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };
    getUserLog: RequestHandler = async (req, res) => {
        let query = req.query;
        if (query.date?.length) {
            const date = query.date;
            query.date = new Date(date as string).toISOString();
        }
        console.log(query);

        try {
            const response = await logService.getUserLog(query);

            if (!(response instanceof EntityError)) {
                res.status(200).json({
                    response,
                });
            } else {
                res.status(400).json(`по выбранным параметрам нет оценок`);
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };
}

export default new LogController();

import { RequestHandler } from 'express';
import { User } from '../db/models/user';
import { EntityError } from '../exceptions/entity-error';

const userService = require('../services/user.service');
class UserController {
    create: RequestHandler = async (req, res, next) => {
        const { name, email } = req.body;
        try {
            const response: User = await userService.create({
                name: name,
                email: email,
                vip: true,
            });

            res.json({
                name: response.name,
                vip: response.vip,
                email: response.email,
            });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };
    getUserStatus: RequestHandler = async (req, res) => {
        const id = req.params.id;

        try {
            const status = await userService.getUserStatus(id);

            if (!(status instanceof EntityError)) {
                res.status(200).json({
                    vip: status,
                });
            } else {
                res.status(400).json(`there is no user with such id:${id}`);
            }

            return res.status(200).json({ vip: status });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getUsers: RequestHandler = async (req, res, next) => {
        try {
            const users = await userService.getUsers();
            return res.json({ data: users });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };
}

export default new UserController();

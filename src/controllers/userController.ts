import { RequestHandler } from 'express';
import { User } from '../db/models/user';

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
        } catch (e) {
            next(e);
        }
    };

    getUsers: RequestHandler = async (req, res, next) => {
        try {
            const users = await userService.getUsers();
            return res.json({ data: users });
        } catch (e) {
            next(e);
        }
    };
}

module.exports = new UserController();

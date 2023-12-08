import { RequestHandler } from 'express';
import { User } from '../db/models/user';
import { EntityError } from '../exceptions/entity-error';

const userService = require('../services/user.service');

class UserController {
    create: RequestHandler = async (req, res, next) => {
        try {
            const { name, lastname, email } = req.body;

            const response: User = await userService.create({
                name,
                lastname,
                email,
            });

            if (!(response instanceof EntityError)) {
                res.status(200).json({
                    id: response.id,
                    name: response.name,
                    email: response.email,
                });
            } else {
                res.status(500).json('server error');
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getUsers: RequestHandler = async (req, res) => {
        try {
            const response = await userService.getUsers();
            res.status(200).json({
                response,
            });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getUserById: RequestHandler = async (req, res) => {
        const id = req.params.id;
        try {
            const response = await userService.getUserById(id);
            if (!(response instanceof EntityError)) {
                res.status(200).json({
                    response,
                });
            } else {
                res.status(400).json(
                    `пользователь с указанным персональным кодом: ${id} не найден`
                );
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };
    destroyUser: RequestHandler = async (req, res) => {
        const id = req.params.id;
        try {
            const response = await userService.destroyUser(id);

            if (!(response instanceof EntityError)) {
                res.status(200).json(response);
            } else {
                `пользователь с указанным персональным кодом: ${id} не найден`
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };
}

module.exports = new UserController();

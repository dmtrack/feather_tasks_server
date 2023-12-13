import { RequestHandler } from 'express';
import { User } from '../db/models/user';
import { AuthError } from '../exceptions/auth-error';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { TokenError } from '../exceptions/token-error';
import { IUserDTO } from '../types/user.interface';
import { createUserDto } from '../utils/helpers/helpers';

const userService = require('../services/user.service');

class UserController {
    create: RequestHandler = async (req, res) => {
        try {
            const { name, password, login } = req.body;

            const response: User = await userService.create({
                name,
                login,
                password,
            });

            if (!(response instanceof EntityError)) {
                res.status(200).json({
                    _id: response._id,
                    name: response.login,
                    email: response.password,
                });
            } else {
                res.status(500).json('server error');
            }
        } catch (e: unknown) {
            if (
                e instanceof EntityError ||
                e instanceof DBError ||
                e instanceof AuthError ||
                e instanceof TokenError
            ) {
                res.status(e.statusCode).send({
                    statusCode: e.statusCode,
                    message: e.message,
                });
            } else {
                res.status(500).send({
                    statusCode: 500,
                    message: 'unknown user error was occured',
                });
            }
        }
    };

    getUsers: RequestHandler = async (req, res) => {
        try {
            const response: User[] = await userService.getUsers();
            const users: IUserDTO[] = response.map((u) => createUserDto(u));

            res.status(200).send(users);
        } catch (e: unknown) {
            if (
                e instanceof EntityError ||
                e instanceof DBError ||
                e instanceof AuthError ||
                e instanceof TokenError
            ) {
                res.status(e.statusCode).send({
                    statusCode: e.statusCode,
                    message: e.message,
                });
            } else {
                res.status(500).send({
                    statusCode: 500,
                    message: 'unknown user error was occured',
                });
            }
        }
    };

    getUserById: RequestHandler = async (req, res) => {
        const { id } = req.params;

        try {
            const response = await userService.getUserById(id);
            if (!(response instanceof EntityError)) {
                const user = await createUserDto(response);

                res.status(200).send({
                    name: user.name,
                    login: user.login,
                    _id: user._id,
                    avatar: user.avatar,
                });
            } else {
                res.status(400).json(
                    `пользователь с указанным персональным кодом: ${id} не найден`,
                );
            }
        } catch (e: unknown) {
            if (
                e instanceof EntityError ||
                e instanceof DBError ||
                e instanceof AuthError ||
                e instanceof TokenError
            ) {
                res.status(e.statusCode).send({
                    name: e.name,
                    statusCode: e.statusCode,
                    message: e.message,
                });
            } else {
                res.status(500).send({
                    statusCode: 500,
                    message: 'unknown user error was occured',
                });
            }
        }
    };

    destroyUser: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await userService.destroyUser(id);

            if (!(response instanceof EntityError)) {
                res.status(200).json(response);
            } else {
                return `пользователь с указанным персональным кодом: ${id} не найден`;
            }
        } catch (e: unknown) {
            if (
                e instanceof EntityError ||
                e instanceof DBError ||
                e instanceof AuthError ||
                e instanceof TokenError
            ) {
                res.status(e.statusCode).send({
                    name: e.name,
                    statusCode: e.statusCode,
                    message: e.message,
                });
            } else {
                res.status(500).send({
                    statusCode: 500,
                    message: 'unknown user error was occured',
                });
            }
        }
    };
}

module.exports = new UserController();

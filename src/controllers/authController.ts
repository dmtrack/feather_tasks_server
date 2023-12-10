import { RequestHandler } from 'express';
import { User } from '../db/models/user';
import { EntityError } from '../exceptions/entity-error';
import { checkBody, createError } from '../services/error.service';

const authService = require('../services/auth.service');

class AuthController {
    signUp: RequestHandler = async (req, res) => {
        const bodyError = checkBody(req.body, ['name', 'login', 'password']);
        if (bodyError) {
            return res
                .status(400)
                .send(createError(400, `bad request: ${bodyError}`));
        }
        const { login, name, password } = req.body;

        try {
            const response: User = await authService.create({
                name,
                login,
                password,
            });

            if (!(response instanceof EntityError)) {
                res.status(200).json({
                    id: response.id,
                    name: response.name,
                    email: response.login,
                });
            } else {
                res.status(500).json('server error');
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    signIn: RequestHandler = async (req, res) => {
        try {
            const response = await authService.getUsers();
            res.status(200).json({
                response,
            });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    logOut: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await authService.getUserById(id);
            if (!(response instanceof EntityError)) {
                res.status(200).json({
                    response,
                });
            } else {
                res.status(400).json(
                    `пользователь с указанным персональным кодом: ${id} не найден`,
                );
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    check: RequestHandler = async (req, res) =>
        res.status(200).send(createError(200, 'success'));
}
export default new AuthController();

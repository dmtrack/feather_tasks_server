import { RequestHandler } from 'express';
import { EntityError } from '../exceptions/entity-error';
import { checkBody, createError } from '../services/error.service';
import { checkPassword, hashPassword } from '../services/hash.service';

const authService = require('../services/auth.service');
const userService = require('../services/user.service');

class AuthController {
    signUp: RequestHandler = async (req, res) => {
        const bodyError = checkBody(req.body, ['name', 'login', 'password']);
        if (bodyError) {
            return res
                .status(400)
                .send(createError(400, `bad request: ${bodyError}`));
        }
        const { login, name, password } = req.body;

        const foundedUser = await userService.getUserByLogin(login);

        if (!(foundedUser instanceof EntityError)) {
            res.status(409).send(createError(409, 'Login already exist'));
        }

        const hashedPassword = await hashPassword(password);
        try {
            const newUser = await userService.create({
                login,
                name,
                password: hashedPassword,
            });
            res.json(newUser);
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    signIn: RequestHandler = async (req, res) => {
        const bodyError = checkBody(req.body, ['login', 'password']);
        if (bodyError) {
            return res
                .status(400)
                .send(createError(400, 'bad request: ' + bodyError));
        }

        const { login, password } = req.body;

        try {
            const foundedUser = await userService.findOneUser({ login });
            if (foundedUser) {
                const isCorrectPassword = await checkPassword(
                    password,
                    foundedUser.password,
                );
                if (isCorrectPassword) {
                    return res.json(foundedUser);
                }
            }

            return res
                .status(401)
                .send(createError(401, 'Authorization error'));
        } catch (e: unknown) {
            if (e instanceof Error) {
                res.status(400).send(createError(401, 'Authorization error'));
            }
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

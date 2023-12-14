import { RequestHandler } from 'express';
import { User } from '../db/models/user';
import { AuthError } from '../exceptions/auth-error';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { TokenError } from '../exceptions/token-error';
import { checkBody, createError } from '../services/error.service';
import { checkPassword, hashPassword } from '../services/hash.service';
import { IUserAfterSignIn } from '../types/user.interface';

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
        try {
            let { login, name, password, avatarUrl } = req.body;
            if (!avatarUrl) {
                avatarUrl =
                    'https://github.com/dmtrack/collections_client/blob/dev-client/public/defaultAvatarFinal.png?raw=true';
            }
            const foundedUser: User | null =
                await userService.getUserByLogin(login);

            if (foundedUser) {
                throw new AuthError(
                    'user with this login is already registered',
                    409,
                );
            }
            const hashedPassword = await hashPassword(password);

            const response: IUserAfterSignIn = await authService.signUp({
                login,
                name,
                password: hashedPassword,
                avatarUrl,
            });

            res.cookie('refreshToken', response.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'none',
                domain: process.env.CORS_ORIGIN,
            })
                .status(200)
                .send({
                    token: response.accessToken,
                });
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
                    message: 'unknown error was occured',
                });
            }
        }
    };

    signIn: RequestHandler = async (req, res) => {
        const bodyError = checkBody(req.body, ['login', 'password']);
        if (bodyError) {
            return res
                .status(400)
                .send(createError(400, 'bad request: ' + bodyError));
        }

        try {
            const { login, password } = req.body;

            const foundedUser = await userService.getUserByLogin(login);
            if (!foundedUser) {
                throw new AuthError(
                    'user with this login is not registered',
                    401,
                );
            }

            const isCorrectPassword = await checkPassword(
                password,
                foundedUser.password,
            );
            if (!isCorrectPassword) {
                throw new AuthError('wrong password', 400);
            }

            const response = await authService.signIn(foundedUser);

            res.cookie('refreshToken', response.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'none',
                domain: process.env.CORS_ORIGIN,
            })
                .status(200)
                .send({
                    token: response.accessToken,
                });
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
                    message: 'unknown server error is occured',
                });
            }
        }
    };

    logOut: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const foundedUser = await authService.getUserById(id);

            if (!foundedUser) {
                throw new EntityError('user with this id is not found', 400);
            }

            res.status(200).send(`user with id: ${id} is logged out`);
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
                    message: 'unknown error was occured',
                });
            }
        }
    };

    check: RequestHandler = async (req, res) =>
        res.status(200).send(createError(200, 'success'));
}
export default new AuthController();

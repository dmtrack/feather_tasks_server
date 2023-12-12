"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_error_1 = require("../exceptions/auth-error");
const db_error_1 = require("../exceptions/db-error");
const entity_error_1 = require("../exceptions/entity-error");
const token_error_1 = require("../exceptions/token-error");
const error_service_1 = require("../services/error.service");
const hash_service_1 = require("../services/hash.service");
const authService = require('../services/auth.service');
const userService = require('../services/user.service');
class AuthController {
    constructor() {
        this.signUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const bodyError = (0, error_service_1.checkBody)(req.body, ['name', 'login', 'password']);
            if (bodyError) {
                return res
                    .status(400)
                    .send((0, error_service_1.createError)(400, `bad request: ${bodyError}`));
            }
            try {
                let { login, name, password, avatarUrl } = req.body;
                if (!avatarUrl) {
                    avatarUrl =
                        'https://github.com/dmtrack/collections_client/blob/dev-client/public/defaultAvatarFinal.png?raw=true';
                }
                const foundedUser = yield userService.getUserByLogin(login);
                if (foundedUser) {
                    throw new auth_error_1.AuthError('user with this login is already registered', 409);
                }
                const hashedPassword = yield (0, hash_service_1.hashPassword)(password);
                const response = yield authService.signUp({
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
                    .json(response.user);
            }
            catch (e) {
                if (e instanceof entity_error_1.EntityError ||
                    e instanceof db_error_1.DBError ||
                    e instanceof auth_error_1.AuthError ||
                    e instanceof token_error_1.TokenError) {
                    res.status(e.statusCode).send({
                        name: e.name,
                        statusCode: e.statusCode,
                        message: e.message,
                    });
                }
                else {
                    res.status(500).send({
                        statusCode: 500,
                        message: 'unknown error was occured',
                    });
                }
            }
        });
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const bodyError = (0, error_service_1.checkBody)(req.body, ['login', 'password']);
            if (bodyError) {
                return res
                    .status(400)
                    .send((0, error_service_1.createError)(400, 'bad request: ' + bodyError));
            }
            try {
                const { login, password } = req.body;
                const foundedUser = yield userService.getUserByLogin(login);
                if (!foundedUser) {
                    throw new auth_error_1.AuthError('user with this login is not registered', 401);
                }
                const isCorrectPassword = yield (0, hash_service_1.checkPassword)(password, foundedUser.password);
                if (!isCorrectPassword) {
                    throw new auth_error_1.AuthError('wrong password', 400);
                }
                const response = yield authService.signIn(foundedUser);
                res.cookie('refreshToken', response.refreshToken, {
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    sameSite: 'none',
                    domain: process.env.CORS_ORIGIN,
                })
                    .status(200)
                    .json(response.user);
            }
            catch (e) {
                if (e instanceof entity_error_1.EntityError ||
                    e instanceof db_error_1.DBError ||
                    e instanceof auth_error_1.AuthError ||
                    e instanceof token_error_1.TokenError) {
                    res.status(e.statusCode).send({
                        name: e.name,
                        statusCode: e.statusCode,
                        message: e.message,
                    });
                }
                else {
                    res.status(500).send({
                        statusCode: 500,
                        message: 'unknown server error is occured',
                    });
                }
            }
        });
        this.logOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const foundedUser = yield authService.getUserById(id);
                if (!foundedUser) {
                    throw new entity_error_1.EntityError('user with this id is not found', 400);
                }
                res.status(200).send(`user with id: ${id} is logged out`);
            }
            catch (e) {
                if (e instanceof entity_error_1.EntityError ||
                    e instanceof db_error_1.DBError ||
                    e instanceof auth_error_1.AuthError ||
                    e instanceof token_error_1.TokenError) {
                    res.status(e.statusCode).send({
                        name: e.name,
                        statusCode: e.statusCode,
                        message: e.message,
                    });
                }
                else {
                    res.status(500).send({
                        statusCode: 500,
                        message: 'unknown error was occured',
                    });
                }
            }
        });
        this.check = (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).send((0, error_service_1.createError)(200, 'success')); });
    }
}
exports.default = new AuthController();

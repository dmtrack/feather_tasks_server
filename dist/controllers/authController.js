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
const entity_error_1 = require("../exceptions/entity-error");
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
            const { login, name, password } = req.body;
            const foundedUser = yield userService.getUserByLogin({ login });
            if (foundedUser) {
                return res
                    .status(409)
                    .send((0, error_service_1.createError)(409, 'Login already exist'));
            }
            const hashedPassword = yield (0, hash_service_1.hashPassword)(password);
            try {
                const newUser = yield userService.create({
                    login,
                    name,
                    password: hashedPassword,
                });
                res.json(newUser);
            }
            catch (e) {
                if (e instanceof Error)
                    res.status(400).json(e.message);
            }
        });
        this.signIn = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const bodyError = (0, error_service_1.checkBody)(req.body, ['login', 'password']);
            if (bodyError) {
                return res
                    .status(400)
                    .send((0, error_service_1.createError)(400, 'bad request: ' + bodyError));
            }
            const { login, password } = req.body;
            try {
                const foundedUser = yield userService.findOneUser({ login });
                if (foundedUser) {
                    const isCorrectPassword = yield (0, hash_service_1.checkPassword)(password, foundedUser.password);
                    if (isCorrectPassword) {
                        return res.send({
                            token: signToken(foundedUser._id, login),
                        });
                    }
                }
                return res
                    .status(401)
                    .send((0, error_service_1.createError)(401, 'Authorization error'));
            }
            catch (e) {
                if (e instanceof Error)
                    res.status(400).send((0, error_service_1.createError)(401, 'Authorization error'));
            }
        });
        this.logOut = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const response = yield authService.getUserById(id);
                if (!(response instanceof entity_error_1.EntityError)) {
                    res.status(200).json({
                        response,
                    });
                }
                else {
                    res.status(400).json(`пользователь с указанным персональным кодом: ${id} не найден`);
                }
            }
            catch (e) {
                if (e instanceof Error)
                    res.status(400).json(e.message);
            }
        });
        this.check = (req, res) => __awaiter(this, void 0, void 0, function* () { return res.status(200).send((0, error_service_1.createError)(200, 'success')); });
    }
}
exports.default = new AuthController();
function signToken(_id, login) {
    throw new Error('Function not implemented.');
}

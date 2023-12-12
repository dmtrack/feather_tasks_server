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
const userService = require('../services/user.service');
class UserController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, password, login } = req.body;
                const response = yield userService.create({
                    name,
                    login,
                    password,
                });
                if (!(response instanceof entity_error_1.EntityError)) {
                    res.status(200).json({
                        id: response.id,
                        name: response.login,
                        email: response.password,
                    });
                }
                else {
                    res.status(500).json('server error');
                }
            }
            catch (e) {
                if (e instanceof entity_error_1.EntityError ||
                    e instanceof db_error_1.DBError ||
                    e instanceof auth_error_1.AuthError ||
                    e instanceof token_error_1.TokenError) {
                    res.status(e.statusCode).send({
                        statusCode: e.statusCode,
                        message: e.message,
                    });
                }
                else {
                    res.status(500).send({
                        statusCode: 500,
                        message: 'unknown user error was occured',
                    });
                }
            }
        });
        this.getUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield userService.getUsers();
                res.status(200).json({
                    response,
                });
            }
            catch (e) {
                if (e instanceof entity_error_1.EntityError ||
                    e instanceof db_error_1.DBError ||
                    e instanceof auth_error_1.AuthError ||
                    e instanceof token_error_1.TokenError) {
                    res.status(e.statusCode).send({
                        statusCode: e.statusCode,
                        message: e.message,
                    });
                }
                else {
                    res.status(500).send({
                        statusCode: 500,
                        message: 'unknown user error was occured',
                    });
                }
            }
        });
        this.getUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const response = yield userService.getUserById(id);
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
                        message: 'unknown user error was occured',
                    });
                }
            }
        });
        this.destroyUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const response = yield userService.destroyUser(id);
                if (!(response instanceof entity_error_1.EntityError)) {
                    res.status(200).json(response);
                }
                else {
                    return `пользователь с указанным персональным кодом: ${id} не найден`;
                }
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
                        message: 'unknown user error was occured',
                    });
                }
            }
        });
    }
}
module.exports = new UserController();

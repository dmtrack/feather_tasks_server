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
const taskService = require('../services/task.service');
class TaskController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, login } = req.body;
            try {
                const response = yield taskService.create({
                    name,
                    login,
                });
                res.json({
                    name: response.name,
                    lastname: response.login,
                });
            }
            catch (e) {
                if (e instanceof Error)
                    res.status(400).json(e.message);
            }
        });
        this.getTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield taskService.getTodos();
                return res.status(200).json(response);
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
                        message: 'unknown task error was occured',
                    });
                }
            }
        });
        this.getUserTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const response = yield taskService.getUserTasks(id);
                if (!(response instanceof entity_error_1.EntityError)) {
                    res.status(200).json(response);
                }
                else {
                    throw new entity_error_1.EntityError(`there is no tasks for user with id: ${id}`, 404);
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
                        message: 'unknown task_controller error was occured',
                    });
                }
            }
        });
        this.destroyTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const response = yield taskService.destroyTodo(id);
                if (!(response instanceof entity_error_1.EntityError)) {
                    res.status(200).json(response);
                }
                else {
                    throw new entity_error_1.EntityError(`there is no task with id: ${id}`, 404);
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
                        message: 'unknown task error was occured',
                    });
                }
            }
        });
    }
}
exports.default = new TaskController();

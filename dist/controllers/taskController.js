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
                const todos = yield taskService.getTodos();
                return res.json(todos);
            }
            catch (e) {
                if (e instanceof Error)
                    res.status(400).json(e.message);
            }
        });
        this.getUserTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const response = yield taskService.getUserTodo(id);
                if (!(response instanceof entity_error_1.EntityError)) {
                    res.status(200).json({
                        response,
                    });
                }
                else {
                    res.status(400).json(`у пользователя с id:${id} нет задач`);
                }
            }
            catch (e) {
                if (e instanceof Error)
                    res.status(400).json(e.message);
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
                    res.status(400).json(`задачи с id:${id} не существует`);
                }
            }
            catch (e) {
                if (e instanceof Error)
                    res.status(400).json(e.message);
            }
        });
    }
}
exports.default = new TaskController();

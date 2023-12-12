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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../db/config"));
const task_1 = require("../db/models/task");
const user_1 = require("../db/models/user");
const db_error_1 = require("../exceptions/db-error");
const entity_error_1 = require("../exceptions/entity-error");
class TaskService {
    create(task) {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { userId, name, description, finished } = task;
                    const newTask = yield task_1.Task.create({
                        userId,
                        name,
                        description,
                        finished,
                    }, { transaction: t });
                    return newTask;
                }
                catch (e) {
                    if (e instanceof db_error_1.DBError) {
                        return new db_error_1.DBError('data base error', 501, e);
                    }
                    return new Error('unknown error was occured');
                }
            }));
        });
    }
    getUserTasks(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield config_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    const user = yield user_1.User.findByPk(id);
                    if (!user) {
                        return new entity_error_1.EntityError(`there is no user with id:${id} in data-base`, 400);
                    }
                    const tasks = yield task_1.Task.findAll({
                        where: { userId: id },
                        transaction: t,
                    });
                    return tasks;
                }));
                return result;
            }
            catch (e) {
                if (e instanceof db_error_1.DBError) {
                    return new db_error_1.DBError('data base error', 501, e);
                }
                return new Error('unknown error was occured');
            }
        });
    }
    getTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todos = yield task_1.Task.findAll();
                return todos;
            }
            catch (e) {
                if (e instanceof db_error_1.DBError) {
                    return new db_error_1.DBError('data base error', 501, e);
                }
                return new Error('unknown error was occured');
            }
        });
    }
    destroyTodo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const todo = yield task_1.Task.findByPk(id);
                if (!todo) {
                    return new entity_error_1.EntityError(`there is no todo with id:${id} in data-base`, 400);
                }
                yield task_1.Task.destroy({ where: { id } });
                return `task with id:${id} is deleted`;
            }
            catch (e) {
                if (e instanceof db_error_1.DBError) {
                    return new db_error_1.DBError('data base error', 501, e);
                }
                return new Error('unknown error was occured');
            }
        });
    }
}
module.exports = new TaskService();

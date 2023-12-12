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
exports.createMokeData = exports.createUserDto = void 0;
const db_error_1 = require("../../exceptions/db-error");
const moke_json_1 = __importDefault(require("../moke.json"));
const TaskService = require('../../services/task.service');
const UserService = require('../../services/user.service');
const createMokeData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield UserService.create(moke_json_1.default.users.user1);
        yield UserService.create(moke_json_1.default.users.user2);
        yield TaskService.create(moke_json_1.default.todos.todo1);
        yield TaskService.create(moke_json_1.default.todos.todo2);
        yield TaskService.create(moke_json_1.default.todos.todo3);
    }
    catch (e) {
        if (e instanceof db_error_1.DBError) {
            return new db_error_1.DBError('data base error', 501, e);
        }
        return new Error('unknown error was occured');
    }
    return '';
});
exports.createMokeData = createMokeData;
const createUserDto = (dbUser) => {
    return {
        id: dbUser.id,
        name: dbUser.name,
        login: dbUser.login,
        avatar: dbUser.avatarUrl,
    };
};
exports.createUserDto = createUserDto;

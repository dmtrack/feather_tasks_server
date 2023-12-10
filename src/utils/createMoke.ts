import { DBError } from '../exceptions/db-error';
import mokeData from './moke.json';

const TodoService = require('../services/todo.service');
const UserService = require('../services/user.service');

export const createMokeData = async () => {
    try {
        await UserService.create(mokeData.users.user1);
        await UserService.create(mokeData.users.user2);

        await TodoService.create(mokeData.todos.todo1);
        await TodoService.create(mokeData.todos.todo2);
        await TodoService.create(mokeData.todos.todo3);
    } catch (e: unknown) {
        if (e instanceof DBError) {
            return new DBError('data base error', e);
        }
        return new Error('unknown error was occured');
    }
    return '';
};

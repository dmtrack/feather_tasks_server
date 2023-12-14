import jwt from 'jsonwebtoken';
import { User } from '../../db/models/user';
import { IUserDTO } from '../../types/user.interface';
import { DBError } from '../../exceptions/db-error';
import mokeData from '../moke.json';
import { Column } from '../../db/models/column';
import { IColumnDTO } from '../../types/column.interface';
import { ITaskDTO } from '../../types/task.interface';
import { Task } from '../../db/models/task';

const UserService = require('../../services/user.service');
const ColumnService = require('../../services/column.service');
const TaskService = require('../../services/task.service');

const createMokeData = async () => {
    try {
        await UserService.create(mokeData.users.user1);
        await UserService.create(mokeData.users.user2);

        // await ColumnService.create(mokeData.columns.column1);
        // await ColumnService.create(mokeData.columns.column2);
        // await ColumnService.create(mokeData.columns.column3);
        // await ColumnService.create(mokeData.columns.column4);
        // await ColumnService.create(mokeData.columns.column5);
        // await ColumnService.create(mokeData.columns.column6);

        // await TaskService.create(mokeData.todos.todo1);
        // await TaskService.create(mokeData.todos.todo2);
        // await TaskService.create(mokeData.todos.todo3);
        // await TaskService.create(mokeData.todos.todo4);
        // await TaskService.create(mokeData.todos.todo5);
        // await TaskService.create(mokeData.todos.todo6);
    } catch (e: unknown) {
        if (e instanceof DBError) {
            return new DBError('data base error', 501, e);
        }
        return new Error('unknown error was occured');
    }
    return '';
};

const createUserDto = (dbUser: User): IUserDTO => {
    return {
        _id: dbUser._id,
        name: dbUser.name,
        login: dbUser.login,
        avatar: dbUser.avatarUrl,
    };
};

export const createColumnDto = (column: Column): IColumnDTO => {
    return {
        _id: column._id,
        title: column.title,
        userId: column.userId,
        order: column.order,
    };
};

export const createTaskDto = (task: Task): ITaskDTO => {
    return {
        _id: task._id,
        title: task.title,
        description: task.description,
        columnId: task.columnId,
        userId: task.userId,
    };
};

const SECRET_KEY = process.env.JWT_ACCESS_SECRET;

export const checkToken = (token: string) => {
    try {
        jwt.verify(token, SECRET_KEY as string);
        return true;
    } catch (error) {
        return false;
    }
};

export { createUserDto, createMokeData };

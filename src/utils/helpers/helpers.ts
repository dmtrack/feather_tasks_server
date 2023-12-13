import jwt from 'jsonwebtoken';
import { User } from '../../db/models/user';
import { IUserDto } from '../../types/user.interface';
import { DBError } from '../../exceptions/db-error';
import mokeData from '../moke.json';

const TaskService = require('../../services/task.service');
const UserService = require('../../services/user.service');

const createMokeData = async () => {
    try {
        await UserService.create(mokeData.users.user1);
        await UserService.create(mokeData.users.user2);
        await TaskService.create(mokeData.todos.todo1);
        await TaskService.create(mokeData.todos.todo2);
        await TaskService.create(mokeData.todos.todo3);
    } catch (e: unknown) {
        if (e instanceof DBError) {
            return new DBError('data base error', 501, e);
        }
        return new Error('unknown error was occured');
    }
    return '';
};

const createUserDto = (dbUser: User): IUserDto => {
    return {
        id: dbUser.id,
        name: dbUser.name,
        login: dbUser.login,
        avatar: dbUser.avatarUrl,
    };
};

const SECRET_KEY = process.env.JWT_ACCESS_SECRET;

export const signToken = (
    id: string,
    login: string,
    name: string,
    avatarUrl: string,
    accessToken: string,
) => {
    return jwt.sign(
        { id, login, name, avatarUrl, accessToken },
        SECRET_KEY as string,
        { expiresIn: '720m' },
    );
};

export const checkToken = (token: string) => {
    try {
        jwt.verify(token, SECRET_KEY as string);
        return true;
    } catch (error) {
        return false;
    }
};

export { createUserDto, createMokeData };

import { Transaction } from 'sequelize';
import connection from '../db/config';
import { Task } from '../db/models/task';
import { User } from '../db/models/user';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';

class TaskService {
    async create(task: Task) {
        await connection.transaction(async (t: Transaction) => {
            try {
                const { userId, name, description, finished } = task;

                const newTask: Task = await Task.create(
                    {
                        userId,
                        name,
                        description,

                        finished,
                    },
                    { transaction: t },
                );
                return newTask;
            } catch (e: unknown) {
                if (e instanceof DBError) {
                    return new DBError('data base error', e);
                }
                return new Error('unknown error was occured');
            }
        });
    }

    async getUserTasks(id: number) {
        try {
            const result = await connection.transaction(
                async (t: Transaction) => {
                    const user = await User.findByPk(id);
                    if (!user) {
                        return new EntityError(
                            `there is no user with id:${id} in data-base`,
                        );
                    }

                    const tasks = await Task.findAll({
                        where: { userId: id },
                        transaction: t,
                    });

                    return tasks;
                },
            );
            return result;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            }
            return new Error('unknown error was occured');
        }
    }

    async getTodos() {
        try {
            const todos = await Task.findAll();
            return todos;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            }
            return new Error('unknown error was occured');
        }
    }

    async destroyTodo(id: number) {
        try {
            const todo = await Task.findByPk(id);
            if (!todo) {
                return new EntityError(
                    `there is no todo with id:${id} in data-base`,
                );
            }
            await Task.destroy({ where: { id } });
            return `задача с id:${id} удалена`;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            }
            return new Error('unknown error was occured');
        }
    }
}

module.exports = new TaskService();

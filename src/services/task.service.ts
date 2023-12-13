import { Transaction } from 'sequelize';
import connection from '../db/config';
import { Column } from '../db/models/column';
import { Task } from '../db/models/task';
import { User } from '../db/models/user';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { ICreateTask, IUpdateTask } from '../types/task.interface';

class TaskService {
    async create(task: ICreateTask) {
        try {
            const { columnId, title, description, userId, order } = task;

            const newTask: Task = await Task.create({
                columnId: +columnId,
                title,
                description,
                userId,
                order,
            });

            return newTask;
        } catch (e: unknown) {
            return new DBError('data base error', 501, e);
        }
    }

    async getUserTasks(_id: number) {
        try {
            const result = await connection.transaction(
                async (t: Transaction) => {
                    const user = await User.findByPk(_id);
                    if (!user) {
                        return new EntityError(
                            `there is no user with id:${_id} in data-base`,
                            400,
                        );
                    }

                    const tasks = await Task.findAll({
                        where: { userId: _id },
                        transaction: t,
                    });
                    return tasks;
                },
            );
            return result;
        } catch (e: unknown) {
            return new DBError('data base error', 501, e);
        }
    }

    async getTasks(columnId: number, userId: number) {
        try {
            const tasks = await Task.findAll({
                where: { columnId, userId },
            });
            if (!tasks) {
                return new EntityError(
                    'there is no tasks with this params in data-base',
                    400,
                );
            }
            return tasks;
        } catch (e: unknown) {
            return new DBError('data base error', 501, e);
        }
    }

    async updateTask(task: IUpdateTask) {
        try {
            const { id } = task;
            const foundedTask = await Task.findByPk(id);
            if (!foundedTask) {
                return new EntityError(
                    `there is no task with id:${id} in data-base`,
                    400,
                );
            }
            const updatedTask = Task.update(task, { where: { _id: id } });
            return updatedTask;
        } catch (e: unknown) {
            return new DBError('data base error', 501, e);
        }
    }

    async deleteTask(_id: number) {
        try {
            const task = await Task.findByPk(_id);
            if (!task) {
                return new EntityError(
                    `there is no task with id:${_id} in data-base`,
                    400,
                );
            }
            await Task.destroy({ where: { _id } });

            return `task with id:${_id} is deleted`;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', 501, e);
            }
            return new Error('unknown error was occured');
        }
    }
}

module.exports = new TaskService();

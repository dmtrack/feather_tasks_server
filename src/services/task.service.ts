import { Transaction } from 'sequelize';
import connection from '../db/config';
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

    async getUserTasks(id: number) {
        try {
            const result = await connection.transaction(
                async (t: Transaction) => {
                    const user = await User.findByPk(id);
                    if (!user) {
                        return new EntityError(
                            `there is no user with id:${id} in data-base`,
                            400,
                        );
                    }

                    const tasks = await Task.findAll({
                        where: { columnId: id },
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

    async getTasks() {
        try {
            const tasks = await Task.findAll();
            return tasks;
        } catch (e: unknown) {
            return new DBError('data base error', 501, e);
        }
    }

    async updateTask(task: IUpdateTask) {
        try {
            const { id } = task;
            const foundedTask = Task.findByPk(id);

            if (!foundedTask) {
                return new EntityError(
                    `there is no task with id:${id} in data-base`,
                    400,
                );
            }
            const updatedTask = Task.update(task, { where: { id } });
            return updatedTask;
        } catch (e: unknown) {
            return new DBError('data base error', 501, e);
        }
    }

    async deleteTask(id: number) {
        try {
            const task = await Task.findByPk(id);
            if (!task) {
                return new EntityError(
                    `there is no task with id:${id} in data-base`,
                    400,
                );
            }
            await Task.destroy({ where: { id } });

            return `task with id:${id} is deleted`;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', 501, e);
            }
            return new Error('unknown error was occured');
        }
    }
}

module.exports = new TaskService();

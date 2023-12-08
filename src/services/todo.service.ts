import { Transaction } from 'sequelize';
import connection from '../db/config';
import { Todo } from '../db/models/todo';
import { User } from '../db/models/user';
import { AuthError } from '../exceptions/auth-error';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';

interface IQuery {
    [key: string]: string;
}
class todoService {
    async create(todo: Todo) {
        await connection.transaction(async (t: Transaction) => {
            try {
                let {
                    userId,
                    name,
                    description,
                    dateStart,
                    dateEnd,
                    finished,
                } = todo;

                const newTodo: Todo = await Todo.create(
                    {
                        userId: userId,
                        name: name,
                        description: description,
                        dateStart: dateStart,
                        dateEnd: dateEnd,
                        finished: finished,
                    },
                    { transaction: t }
                );
                return newTodo;
            } catch (e: unknown) {
                if (e instanceof DBError) {
                    return new DBError('data base error', e);
                } else {
                    return new Error('unknown error was occured');
                }
            }
        });
    }

    async getUserTodo(id: number) {
        try {
            const result = await connection.transaction(
                async (t: Transaction) => {
                    const user = await User.findByPk(id);
                    if (!user) {
                        return new EntityError(
                            `there is no user with id:${id} in data-base`
                        );
                    }

                    const todos = await Todo.findAll({
                        where: { userId: id },
                        transaction: t,
                        order: [['dateStart', 'DESC']],
                    });

                    return todos;
                }
            );
            return result;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            } else {
                return new Error('unknown error was occured');
            }
        }
    }

    async getTodos() {
        try {
            const todos = await Todo.findAll();
            return todos;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            } else {
                return new Error('unknown error was occured');
            }
        }
    }

    async destroyTodo(id: number) {
        try {
            const todo = await Todo.findByPk(id);
            if (!todo) {
                return new EntityError(
                    `there is no todo with id:${id} in data-base`
                );
            }
            await Todo.destroy({ where: { id } });
            return `задача с id:${id} удалена`;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            } else {
                return new Error('unknown error was occured');
            }
        }
    }
}

module.exports = new todoService();

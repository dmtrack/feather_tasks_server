import { Transaction } from 'sequelize';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { User } from '../db/models/user';
import connection from '../db/config';

export class UserService {
    async create(props: User) {
        try {
            const result = await connection.transaction(
                async (t: Transaction) => {
                    const { name, login, password } = props;
                    const user = await User.findOne({
                        where: { login },
                        transaction: t,
                    });
                    if (!user) {
                        const newUser: User = await User.create(
                            {
                                name,
                                login,
                                password,
                            },
                            { transaction: t },
                        );
                        return newUser;
                    }
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

    async getUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            }
            return new Error('unknown error was occured');
        }
    }

    async getUserById(id: number) {
        try {
            const user = await User.findOne({
                where: { id },
            });

            if (!user) {
                return new EntityError(
                    `пользователь с указанным персональным кодом: ${id} не найден`,
                );
            }

            return user;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            }
            return new Error('unknown error was occured');
        }
    }

    async getUserByLogin(login: string) {
        try {
            const user = await User.findOne({
                where: { login },
            });

            if (!user) {
                return new EntityError(
                    `пользователь с указанным логином: ${login} не найден`,
                );
            }

            return user;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            }
            return new Error('unknown error was occured');
        }
    }

    async destroyUser(id: number) {
        try {
            const todo = await User.findByPk(id);
            if (!todo) {
                return new EntityError(
                    `there is no user with id:${id} in data-base`,
                );
            }
            await User.destroy({ where: { id } });
            return `пользователь с id:${id} удален`;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            }
            return new Error('unknown error was occured');
        }
    }
}
module.exports = new UserService();

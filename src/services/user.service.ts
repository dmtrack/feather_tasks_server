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
                return new DBError('user/service data base error', 501, e);
            }
            return new Error('unknown user/service error was occured');
        }
    }

    async getUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', 501, e);
            }
            return new Error('unknown user/service error was occured');
        }
    }

    async getUserById(id: number) {
        try {
            const user = await User.findOne({
                where: { id },
            });

            return user;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('user/service data base error', 501, e);
            }
            return new Error('unknown user/service error is occured');
        }
    }

    async getUserByLogin(login: string) {
        try {
            const user = await User.findOne({
                where: { login },
            });

            return user;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('user/service data base error', 501, e);
            }
            return new Error('unknown user/service error was occured');
        }
    }

    async destroyUser(id: number) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return new EntityError(
                    `there is no user with id:${id} in data-base`,
                    400,
                );
            }
            await User.destroy({ where: { id } });
            return `пользователь с id:${id} удален`;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('user/service data base error', 501, e);
            }
            return new Error('unknown user/service error was occured');
        }
    }
}
module.exports = new UserService();

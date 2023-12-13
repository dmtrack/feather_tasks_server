import { Transaction } from 'sequelize';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { User } from '../db/models/user';
import connection from '../db/config';
import { hashPassword } from './hash.service';

export class UserService {
    async create(props: User) {
        try {
            const result = await connection.transaction(
                async (t: Transaction) => {
                    let { name, login, password } = props;

                    const user = await User.findOne({
                        where: { login },
                        transaction: t,
                    });
                    if (!user) {
                        if (password === '12345678') {
                            password = await hashPassword(password);
                        }
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
            return new DBError('user/service create db error', 501, e);
        }
    }

    async getUsers() {
        try {
            const users = await User.findAll();
            return users;
        } catch (e: unknown) {
            return new DBError('user/service getusers db error', 501, e);
        }
    }

    async getUserById(id: number) {
        try {
            const user = await User.findOne({
                where: { id },
            });

            return user;
        } catch (e: unknown) {
            return new DBError('user/service getuserbyid db error', 501, e);
        }
    }

    async getUserByLogin(login: string) {
        try {
            const user = await User.findOne({
                where: { login },
            });

            return user;
        } catch (e: unknown) {
            return new DBError('user/service getuserbylogin db error', 501, e);
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
            return new DBError('user/service deleteuser db error', 501, e);
        }
    }
}
module.exports = new UserService();

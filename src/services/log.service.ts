import { Transaction } from 'sequelize';
import connection from '../db/config';
import { Grade } from '../db/models/grade';
import { User } from '../db/models/user';
import { AuthError } from '../exceptions/auth-error';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';

interface IQuery {
    [key: string]: string;
}
class LogService {
    async create(user: User) {
        await connection.transaction(async (t: Transaction) => {
            try {
                let { name, lastname } = user;
                const candidate: User | null = await User.findOne({
                    where: { lastname: lastname },
                    transaction: t,
                });
                if (candidate) {
                    return new AuthError(
                        'User with this lastname is already registered'
                    );
                }
                const newUser: User = await User.create(
                    {
                        name: name,
                        lastname: lastname,
                    },
                    { transaction: t }
                );
                return newUser;
            } catch (e: unknown) {
                if (e instanceof DBError) {
                    return new DBError('data base error', e);
                } else {
                    return new Error('unknown error was occured');
                }
            }
        });
    }

    async getUserLog(query: IQuery) {
        try {
            const result = await connection.transaction(
                async (t: Transaction) => {
                    const grades = await Grade.findAll({
                        where: query,
                        transaction: t,
                        attributes: ['date', 'subjectId', 'grade'],
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'name', 'lastname'],
                            },
                        ],
                        order: [['date', 'ASC']],
                        raw: false,
                    });
                    if (!grades || grades.length === 0) {
                        return new EntityError(
                            `по выбранным параметрам нет оценок`
                        );
                    }

                    return grades;
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

    async getUsers() {
        try {
            const result = await connection.transaction(
                async (t: Transaction) => {
                    const users = await User.findAll({ transaction: t });
                    return users;
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

    async deleteUser(id: number) {
        try {
            await connection.transaction(async (t: Transaction) => {
                const user = await User.findByPk(id);
                if (!user) {
                    return new EntityError(
                        `there is no user with id:${id} in data-base`
                    );
                }
                await User.destroy({ where: { id }, transaction: t });
            });
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            } else {
                return new Error('unknown error was occured');
            }
        }
    }
}

module.exports = new LogService();

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
        try {
            let { name, lastname } = user;
            const candidate: User | null = await User.findOne({
                where: { lastname: lastname },
            });

            if (candidate) {
                return new AuthError(
                    'User with this lastname is already registered'
                );
            }
            const newUser: User = await User.create({
                name: name,
                lastname: lastname,
            });
            return newUser;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            } else {
                return new Error('unknown error was occured');
            }
        }
    }

    async getUserLog(query: IQuery) {
        try {
            const grades = await Grade.findAll({
                where: query,
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

            if (!grades) {
                return new EntityError(` запрос не содержит нужной информации`);
            }

            return grades;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            } else {
                return new Error('unknown error was occured');
            }
        }
    }

    async getUsers() {
        const users = await User.findAll();
        return users;
    }

    async deleteUser(id: number) {
        const user = await User.findByPk(id);
        if (!user) {
            return new EntityError(
                `there is no user with id:${id} in data-base`
            );
        }
        await User.destroy({ where: { id } });
    }
}

module.exports = new LogService();

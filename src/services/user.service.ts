import { User } from '../db/models/user';
import { AuthError } from '../exceptions/auth-error';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';

class UserService {
    async create(user: User) {
        try {
            let { name, vip, email } = user;
            const candidate: User | null = await User.findOne({
                where: { email: email },
            });

            if (candidate) {
                return new AuthError(
                    'User with this email is already registered'
                );
            }
            const newUser: User = await User.create({
                name: name,
                email: email,
                vip: vip,
            });

            return newUser;
        } catch (e: any) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return new AuthError(`${e.errors[0].path} already exists`);
            } else return new DBError('Register user error', e);
        }
    }

    async getUsers() {
        const users = await User.findAll();
        return users;
    }

    async getOneUser(id: number) {
        const user = await User.findOne({
            where: { id: id },
        });
        if (!user) {
            return new EntityError(
                `there is no user with id:${id} in data-base`
            );
        }
        return user;
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

module.exports = new UserService();

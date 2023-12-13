import { Transaction } from 'sequelize';
import { User } from '../db/models/user';
import connection from '../db/config';
import { IToken, ITokenCouple } from '../types/token.interface';
import { createUserDto } from '../utils/helpers/helpers';
import { DBError } from '../exceptions/db-error';

const tokenService = require('../services/token.service');

export class AuthService {
    async signUp(props: User) {
        try {
            const result = await connection.transaction(
                async (t: Transaction) => {
                    const { name, login, password, avatarUrl } = props;

                    const newUser: User = await User.create(
                        {
                            name,
                            login,
                            password,
                            avatarUrl,
                        },
                        { transaction: t },
                    );

                    const user = await createUserDto(newUser);

                    const tokens: ITokenCouple =
                        await tokenService.generateTokens({
                            ...user,
                        });

                    const token: IToken = await tokenService.saveToken(
                        newUser.id,
                        tokens.refreshToken,
                        t,
                    );

                    await User.update(
                        { tokenId: token.id },
                        { where: { id: newUser.id }, transaction: t },
                    );
                    const userWithToken = {
                        ...user,
                    };

                    return {
                        user: userWithToken,
                        refreshToken: tokens.refreshToken,
                        accessToken: tokens.accessToken,
                    };
                },
            );
            return result;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', 501, e);
            }
            return new Error('unknown auth_service/signup error is occured');
        }
    }

    async signIn(foundedUser: User) {
        try {
            const result = await connection.transaction(
                async (t: Transaction) => {
                    const user = await createUserDto(foundedUser);

                    const tokens: ITokenCouple =
                        await tokenService.generateTokens({
                            ...user,
                        });

                    await tokenService.saveToken(
                        user.id,
                        tokens.refreshToken,
                        t,
                    );

                    return {
                        user,
                        refreshToken: tokens.refreshToken,
                        accessToken: tokens.accessToken,
                    };
                },
            );
            return result;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', 501, e);
            }
            return new Error(
                'unknown auth_service/sign_in is error is occured',
            );
        }
    }
}
module.exports = new AuthService();

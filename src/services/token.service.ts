import { Transaction } from 'sequelize';
import connection from '../db/config';
import { DBError } from '../exceptions/db-error';
import { TokenError } from '../exceptions/token-error';
import { ITokenCouple } from '../types/token.interface';
import { IUserDto } from '../types/user.interface';
import { Token } from './../db/models/token';

const jwt = require('jsonwebtoken');

export class TokenService {
    async generateTokens(payload: IUserDto) {
        const accessToken = await jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: 60 * 30,
            },
        );
        const refreshToken = await jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: 60 * 60 * 24 * 30,
            },
        );

        return { accessToken, refreshToken };
    }

    async validateAccessToken(token: string) {
        try {
            const userData = await jwt.verify(
                token,
                process.env.JWT_ACCESS_SECRET,
            );
            return userData;
        } catch (e: unknown) {
            return new Error(
                'unknown error in token.service / validateAccessToken is occured',
            );
        }
    }

    async validateRefreshToken(token: string) {
        try {
            const userData = await jwt.verify(
                token,
                process.env.JWT_REFRESH_SECRET,
            );
            return userData;
        } catch (e: unknown) {
            return new Error(
                'unknown error in token.service / validateRefreshToken is occured',
            );
        }
    }

    async saveToken(userId: number, refreshToken: string, t?: Transaction) {
        let token;
        try {
            const foundToken = await Token.findOne({
                where: { userId },
                transaction: t,
            });
            if (foundToken) {
                token = await Token.update(
                    { refreshToken },
                    { where: { userId }, transaction: t },
                );
            } else {
                token = await Token.create(
                    {
                        userId,
                        refreshToken,
                    },
                    { transaction: t },
                );
                if (!token) {
                    return new TokenError('token creation DB-error', 500);
                }
            }
            return token;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', 501, e);
            } else if (e instanceof TokenError) {
                return new TokenError(
                    'token error in token.service / saveToken is occured',
                    501,
                    e,
                );
            }
            return new Error(
                'unknown error in token.service / saveToken is occured',
            );
        }
    }

    async removeToken(refreshToken: string) {
        const response = await Token.destroy({ where: { refreshToken } });
        return response;
    }

    async findToken(refreshToken: string) {
        const token = await Token.findOne({ where: { refreshToken } });
        return token;
    }
}

module.exports = new TokenService();

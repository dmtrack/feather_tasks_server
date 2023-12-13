import { NextFunction, Request, Response } from 'express';
import { AuthError } from '../exceptions/auth-error';

const tokenService = require('../services//token.service');

interface IMiddlewareRequest extends Request {
    user: string;
}

export const Authmiddleware = (
    req: IMiddlewareRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(AuthError.UnauthorizedError('invalid token', 403));
        }
        const accessToken = authorizationHeader?.split(' ')[1];
        if (!accessToken) {
            return next(AuthError.UnauthorizedError('invalid token', 403));
        }
        const userData = tokenService.validateAccessToken(accessToken);

        if (!userData) {
            return next(AuthError.UnauthorizedError('invalid token', 403));
        }
        req.user = userData;
        next();
    } catch (e) {
        return next(AuthError.UnauthorizedError('other error', 404));
    }
};

import { NextFunction, Request, Response } from 'express';
import { AuthError } from '../exceptions/auth-error';

export interface IApiError extends Error {
    status: number;
    message: string;
    errors: [];
}

module.exports = function ApiError(
    err: IApiError,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    console.log({ err });

    if (err instanceof AuthError) {
        res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
        });
    }
    return res.status(403).json({ message: err.message });
};

import { STATUS_CODES } from 'http';

export class AuthError extends Error {
    name: 'AuthorizationError' = 'AuthorizationError';

    error: unknown;

    statusCode: number;

    constructor(message: string, statusCode: number, error?: unknown) {
        super();
        this.statusCode = statusCode;

        this.message = message;

        this.error = error;
    }

    static UnauthorizedError(message: string, statusCode: number) {
        return new AuthError(message, statusCode);
    }

    static badRequest(message: string, statusCode: number) {
        return new AuthError(message, statusCode);
    }
}

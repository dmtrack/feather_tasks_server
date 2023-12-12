export class DBError extends Error {
    name: 'DataBaseError' = 'DataBaseError';

    error: unknown;

    statusCode: number;

    constructor(message: string, statusCode: number, error?: unknown) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}

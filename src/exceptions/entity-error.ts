export class EntityError extends Error {
    name: 'EntityError' = 'EntityError';

    error: unknown;

    statusCode: number;

    constructor(message: string, statusCode: number, error?: unknown) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}

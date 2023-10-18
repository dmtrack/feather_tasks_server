export class DBError extends Error {
    name: 'DataBaseError' = 'DataBaseError';
    error: unknown;
    constructor(message: string, error?: unknown) {
        super();
        this.message = message;
        this.error = error;
    }
}

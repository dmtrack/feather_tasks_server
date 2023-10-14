export class EntityError extends Error {
    name: 'EntityError' = 'EntityError';
    error: unknown;
    constructor(message: string, error?: unknown) {
        super();
        this.message = message;
        this.error = error;
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityError = void 0;
class EntityError extends Error {
    constructor(message, statusCode, error) {
        super();
        this.name = 'EntityError';
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}
exports.EntityError = EntityError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
class AuthError extends Error {
    constructor(message, statusCode, error) {
        super();
        this.name = 'AuthorizationError';
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}
exports.AuthError = AuthError;

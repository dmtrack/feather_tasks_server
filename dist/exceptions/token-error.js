"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenError = void 0;
class TokenError extends Error {
    constructor(message, statusCode, error) {
        super();
        this.name = 'TokenError';
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}
exports.TokenError = TokenError;

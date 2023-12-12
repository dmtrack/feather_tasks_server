"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBError = void 0;
class DBError extends Error {
    constructor(message, statusCode, error) {
        super();
        this.name = 'DataBaseError';
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}
exports.DBError = DBError;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBError = void 0;
class DBError extends Error {
    constructor(message, error) {
        super();
        this.name = 'DataBaseError';
        this.message = message;
        this.error = error;
    }
}
exports.DBError = DBError;

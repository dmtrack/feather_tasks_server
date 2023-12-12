"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const config_1 = __importDefault(require("../db/config"));
const db_error_1 = require("../exceptions/db-error");
const token_error_1 = require("../exceptions/token-error");
const token_1 = require("./../db/models/token");
const jwt = require('jsonwebtoken');
class TokenService {
    generateTokens(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = yield jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
                expiresIn: '30m',
            });
            const refreshToken = yield jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
                expiresIn: '30d',
            });
            return { accessToken, refreshToken };
        });
    }
    validateAccessToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield jwt.verify(token, process.env.JWT_ACCESS_SECRET);
                return userData;
            }
            catch (e) {
                return new Error('unknown error in token.service / validateAccessToken is occured');
            }
        });
    }
    validateRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield jwt.verify(token, process.env.JWT_REFRESH_SECRET);
                return userData;
            }
            catch (e) {
                return new Error('unknown error in token.service / validateRefreshToken is occured');
            }
        });
    }
    createTokens(userDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield config_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    const tokens = yield this.generateTokens(userDto);
                    yield this.saveToken(userDto.id, tokens.refreshToken, t);
                    return tokens;
                }));
                return result;
            }
            catch (e) {
                if (e instanceof db_error_1.DBError) {
                    return new db_error_1.DBError('db error in token.service / createToken is occured', 501, e);
                }
                else if (e instanceof token_error_1.TokenError) {
                    return new token_error_1.TokenError('token error in token.service / createToken is occured', 501, e);
                }
                else {
                    return new Error('unknown error in token.service / createToken is occured');
                }
            }
        });
    }
    saveToken(userId, refreshToken, t) {
        return __awaiter(this, void 0, void 0, function* () {
            let token;
            try {
                const foundToken = yield token_1.Token.findOne({
                    where: { userId },
                    transaction: t,
                });
                if (foundToken) {
                    token = yield token_1.Token.update({ refreshToken }, { where: { userId }, transaction: t });
                }
                else {
                    token = yield token_1.Token.create({
                        userId,
                        refreshToken,
                    }, { transaction: t });
                    if (!token) {
                        return new token_error_1.TokenError('token creation DB-error', 500);
                    }
                }
                return token;
            }
            catch (e) {
                if (e instanceof db_error_1.DBError) {
                    return new db_error_1.DBError('data base error', 501, e);
                }
                else if (e instanceof token_error_1.TokenError) {
                    return new token_error_1.TokenError('token error in token.service / saveToken is occured', 501, e);
                }
                return new Error('unknown error in token.service / saveToken is occured');
            }
        });
    }
    removeToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield token_1.Token.destroy({ where: { refreshToken } });
            return response;
        });
    }
    findToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield token_1.Token.findOne({ where: { refreshToken } });
            return token;
        });
    }
}
exports.TokenService = TokenService;
module.exports = new TokenService();

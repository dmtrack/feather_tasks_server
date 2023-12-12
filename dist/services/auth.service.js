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
exports.AuthService = void 0;
const user_1 = require("../db/models/user");
const config_1 = __importDefault(require("../db/config"));
const helpers_1 = require("../utils/helpers/helpers");
const db_error_1 = require("../exceptions/db-error");
const tokenService = require('../services/token.service');
class AuthService {
    signUp(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield config_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    const { name, login, password, avatarUrl } = props;
                    const newUser = yield user_1.User.create({
                        name,
                        login,
                        password,
                        avatarUrl,
                    }, { transaction: t });
                    const tokens = yield tokenService.generateTokens(Object.assign({}, newUser));
                    const token = yield tokenService.saveToken(newUser.id, tokens.refreshToken, t);
                    yield user_1.User.update({ tokenId: token.id }, { where: { id: newUser.id }, transaction: t });
                    const user = yield (0, helpers_1.createUserDto)(newUser);
                    const userWithToken = Object.assign(Object.assign({}, user), { accessToken: tokens.accessToken });
                    return {
                        user: userWithToken,
                        refreshToken: tokens.refreshToken,
                    };
                }));
                return result;
            }
            catch (e) {
                if (e instanceof db_error_1.DBError) {
                    return new db_error_1.DBError('data base error', 501, e);
                }
                return new Error('unknown auth_service/signup error is occured');
            }
        });
    }
    signIn(foundedUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield config_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    const tokens = yield tokenService.generateTokens(Object.assign({}, foundedUser));
                    yield tokenService.saveToken(foundedUser.id, tokens.refreshToken, t);
                    const user = yield (0, helpers_1.createUserDto)(foundedUser);
                    const userWithToken = Object.assign(Object.assign({}, user), { accessToken: tokens.accessToken });
                    return {
                        user: userWithToken,
                        refreshToken: tokens.refreshToken,
                    };
                }));
                return result;
            }
            catch (e) {
                if (e instanceof db_error_1.DBError) {
                    return new db_error_1.DBError('data base error', 501, e);
                }
                return new Error('unknown auth_service/sign_in is error is occured');
            }
        });
    }
}
exports.AuthService = AuthService;
module.exports = new AuthService();

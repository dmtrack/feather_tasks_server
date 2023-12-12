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
exports.UserService = void 0;
const db_error_1 = require("../exceptions/db-error");
const entity_error_1 = require("../exceptions/entity-error");
const user_1 = require("../db/models/user");
const config_1 = __importDefault(require("../db/config"));
const hash_service_1 = require("./hash.service");
class UserService {
    create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield config_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    let { name, login, password } = props;
                    if (password === '12345678') {
                        password = yield (0, hash_service_1.hashPassword)(password);
                    }
                    const user = yield user_1.User.findOne({
                        where: { login },
                        transaction: t,
                    });
                    if (!user) {
                        const newUser = yield user_1.User.create({
                            name,
                            login,
                            password,
                        }, { transaction: t });
                        return newUser;
                    }
                }));
                return result;
            }
            catch (e) {
                if (e instanceof db_error_1.DBError) {
                    return new db_error_1.DBError('user/service data base error', 501, e);
                }
                return new Error('unknown user/service error was occured');
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.User.findAll();
                return users;
            }
            catch (e) {
                if (e instanceof db_error_1.DBError) {
                    return new db_error_1.DBError('data base error', 501, e);
                }
                return new Error('unknown user/service error was occured');
            }
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({
                    where: { id },
                });
                return user;
            }
            catch (e) {
                if (e instanceof db_error_1.DBError) {
                    return new db_error_1.DBError('user/service data base error', 501, e);
                }
                return new Error('unknown user/service error is occured');
            }
        });
    }
    getUserByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({
                    where: { login },
                });
                return user;
            }
            catch (e) {
                if (e instanceof db_error_1.DBError) {
                    return new db_error_1.DBError('user/service data base error', 501, e);
                }
                return new Error('unknown user/service error was occured');
            }
        });
    }
    destroyUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findByPk(id);
                if (!user) {
                    return new entity_error_1.EntityError(`there is no user with id:${id} in data-base`, 400);
                }
                yield user_1.User.destroy({ where: { id } });
                return `пользователь с id:${id} удален`;
            }
            catch (e) {
                if (e instanceof db_error_1.DBError) {
                    return new db_error_1.DBError('user/service data base error', 501, e);
                }
                return new Error('unknown user/service error was occured');
            }
        });
    }
}
exports.UserService = UserService;
module.exports = new UserService();

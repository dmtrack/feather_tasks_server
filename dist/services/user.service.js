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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = require("../db/models/user");
const auth_error_1 = require("../exceptions/auth-error");
const db_error_1 = require("../exceptions/db-error");
const entity_error_1 = require("../exceptions/entity-error");
class UserService {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { name, vip, email } = user;
                const candidate = yield user_1.User.findOne({
                    where: { email: email },
                });
                if (candidate) {
                    return new auth_error_1.AuthError('User with this email is already registered');
                }
                const newUser = yield user_1.User.create({
                    name: name,
                    email: email,
                    vip: vip,
                });
                return newUser;
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    return new auth_error_1.AuthError(`${e.errors[0].path} already exists`);
                }
                else
                    return new db_error_1.DBError('Register user error', e);
            }
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.User.findAll();
            return users;
        });
    }
    getOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({
                where: { id: id },
            });
            if (!user) {
                return new entity_error_1.EntityError(`there is no user with id:${id} in data-base`);
            }
            return user;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByPk(id);
            if (!user) {
                return new entity_error_1.EntityError(`there is no user with id:${id} in data-base`);
            }
            yield user_1.User.destroy({ where: { id } });
        });
    }
}
exports.UserService = UserService;
module.exports = new UserService();

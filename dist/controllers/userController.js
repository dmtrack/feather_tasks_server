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
const userService = require('../services/user.service');
class UserController {
    constructor() {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { name, email } = req.body;
            try {
                const response = yield userService.create({
                    name: name,
                    email: email,
                    vip: true,
                });
                res.json({
                    name: response.name,
                    vip: response.vip,
                    email: response.email,
                });
            }
            catch (e) {
                next(e);
            }
        });
        this.getUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.getUsers();
                return res.json({ data: users });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = new UserController();

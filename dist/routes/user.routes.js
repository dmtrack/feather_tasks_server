"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const userRouter = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *            - id
 *            - name
 *            - email
 *            - vip
 *        properties:
 *            id:
 *              type: number
 *              description: the auto-generated if of the user
 *            name:
 *              type: string
 *              description: the user name
 *            email:
 *              type: string
 *              description: the user email
 *            vip:
 *              type: boolean
 *              description: the user's status
 *            example:
 *              id: 1
 *              name: Pavel
 *              email: storm
 *              vip: true
 *
 *
 */
userRouter.post('/create', userController_1.default.create);
userRouter.get('/getusers', userController_1.default.getUsers);
exports.default = userRouter;

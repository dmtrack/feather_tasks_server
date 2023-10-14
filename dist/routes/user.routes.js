"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
const userController = require('../controllers/userController');
userRouter.post('/create', userController.create);
userRouter.get('/getusers', userController.getUsers);
exports.default = userRouter;

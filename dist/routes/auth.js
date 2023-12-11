"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const jsonParser = express_1.default.json();
const authRouter = express_1.default.Router();
authRouter.post('/signin', jsonParser, authController_1.default.signIn);
authRouter.post('/signup', jsonParser, authController_1.default.signUp);
authRouter.get('/check', authController_1.default.check);
exports.default = authRouter;

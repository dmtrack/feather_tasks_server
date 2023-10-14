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
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./db/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const createMoke_1 = require("./utils/createMoke");
const cors = require('cors');
const http = require('http');
exports.app = (0, express_1.default)();
exports.server = http.createServer(exports.app);
dotenv_1.default.config();
exports.app.options('*', cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }));
exports.app.use(cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }));
exports.app.use((0, body_parser_1.json)());
exports.app.use((0, body_parser_1.urlencoded)({ extended: true }));
exports.app.use('/user', user_routes_1.default);
// app.use('/room', roomRouter);
config_1.default
    .sync({ force: true })
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    (0, createMoke_1.createMokeData)();
    console.log('Database synced successfully, lets go!');
}))
    .catch((err) => {
    console.log('Err', err);
});

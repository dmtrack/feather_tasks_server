'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const sequelize_typescript_1 = require('sequelize-typescript');
const reservation_1 = require('./models/reservation');
const room_1 = require('./models/room');
const dotenv_1 = __importDefault(require('dotenv'));
const user_1 = require('./models/user');
dotenv_1.default.config();
const connection = new sequelize_typescript_1.Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    todoging: false,
    models: [room_1.Room, reservation_1.Reservation, user_1.User],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        native: true,
    },
});
exports.default = connection;

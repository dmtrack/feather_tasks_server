import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from './models/user';
import { Task } from './models/task';
import { Token } from './models/token';

dotenv.config();

const connection = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    models: [User, Task, Token],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        native: true,
    },
});

export default connection;

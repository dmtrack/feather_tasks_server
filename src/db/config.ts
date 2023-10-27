import { Sequelize } from 'sequelize-typescript';
import { Grade } from './models/grade';
import dotenv from 'dotenv';
import { User } from './models/user';
import { Subject } from './models/subject';
dotenv.config();

const connection = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    models: [Grade, User, Subject],
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false,
    //     },
    //     native: true,
    // },
});

export default connection;

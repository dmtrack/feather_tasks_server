import { Sequelize } from 'sequelize-typescript';
import { Reservation } from './models/grade';
import { Room } from './models/room';
import dotenv from 'dotenv';
import { User } from './models/user';
dotenv.config();

const connection = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    models: [Room, Reservation, User],
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
        native: true,
    },
});

export default connection;

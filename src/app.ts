import express from 'express';
import connection from './db/config';
import dotenv from 'dotenv';
import { urlencoded, json } from 'body-parser';
import userRouter from './routes/user.routes';
import { createMokeData } from './utils/createMoke';

const cors = require('cors');
const http = require('http');

export const app = express();
export const server = http.createServer(app);

dotenv.config();
app.options(
    '*',
    cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 })
);
app.use(cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/user', userRouter);
// app.use('/room', roomRouter);

connection
    .sync({ force: true })
    .then(async () => {
        createMokeData();
        console.log('Database synced successfully, lets go!');
    })
    .catch((err) => {
        console.log('Err', err);
    });

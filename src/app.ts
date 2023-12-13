import express from 'express';
import dotenv from 'dotenv';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import http from 'http';
import connection from './db/config';

import userRouter from './routes/user';
import { columnRouter } from './routes/columns';
import todoRouter from './routes/task';
import authRouter from './routes/auth';
import { createMokeData } from './utils/helpers/helpers';

export const app = express();
export const server = http.createServer(app);

dotenv.config();
app.options(
    '*',
    cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }),
);

app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        optionsSuccessStatus: 200,
    }),
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/task', todoRouter);
app.use('/auth', authRouter);
app.use('/column', columnRouter);

connection
    .sync({ force: true })
    .then(async () => {
        await createMokeData();
        console.log('Database synced successfully, lets go!');
    })
    .catch((err) => {
        console.log('Err', err);
    });

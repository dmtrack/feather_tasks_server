import express from 'express';
import connection from './db/config';
import dotenv from 'dotenv';
import { urlencoded, json } from 'body-parser';
import userRouter from './routes/user';
import { createMokeData } from './utils/createMoke';
import cors from 'cors';
import http from 'http';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

export const app = express();
export const server = http.createServer(app);

dotenv.config();
app.options(
    '*',
    cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 })
);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Booking service API',
            version: '1.0.0',
            description: 'This is API implementation for test-task',
        },

        servers: [
            {
                url: 'http://localhost:8000',
            },
        ],
    },
    apis: [`${__dirname}/routes/*.ts`],
};

const specs = swaggerJsDoc(options);

app.use(cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(specs, { explorer: true })
);
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

import express from 'express';
import connection from './db/config';
import dotenv from 'dotenv';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import http from 'http';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import logRouter from './routes/log';
import { createMokeData } from './utils/createMoke';
import statRouter from './routes/stat';
const natsService = require('./services/nats.service');

export const app = express();
export const server = http.createServer(app);
const CSS_URL =
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';

dotenv.config();
app.options(
    '*',
    cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 })
);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Stat service API',
            version: '1.0.0',
            description: 'This is API implementation for test-task',
        },

        servers: [
            {
                url: `${process.env.SERVER}:${process.env.PORT}`,
            },
        ],
    },
    apis: [`${__dirname}/routes/*.ts`],
};

const specs = swaggerJsDoc(options);

app.use(cors({ origin: process.env.CLIENT_URL, optionsSuccessStatus: 200 }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/statistic', statRouter);
app.use('/log', logRouter);
app.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(specs, { explorer: true, customCss: CSS_URL })
);

connection
    .sync({ force: true })
    .then(async () => {
        await createMokeData();
        // natsService.gradeEmitter(5000);
        // natsService.stream();
        console.log('Database synced successfully, lets go!');
    })
    .catch((err) => {
        console.log('Err', err);
    });

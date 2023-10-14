import express from 'express';
import connection from './db/config';
import dotenv from 'dotenv';
import { urlencoded, json } from 'body-parser';
import handleError from './middleware/error-middleware';
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
app.use(handleError);

connection
    .sync({ alter: true })
    .then(async () => {
        console.log('Database synced successfully, lets go!');
    })
    .catch((err) => {
        console.log('Err', err);
    });

import { RequestHandler } from 'express';
import { Column } from '../db/models/column';
import { AuthError } from '../exceptions/auth-error';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { TokenError } from '../exceptions/token-error';
import { checkBody, createError } from '../services/error.service';

const columnService = require('../services/column.service');

class ColumnController {
    getUserColumns: RequestHandler = async (req, res) => {
        const { id } = req.params;

        try {
            const response = await columnService.getUserColumns(id);
            if (!(response instanceof EntityError)) {
                res.status(200).json(response);
            } else {
                throw new EntityError(
                    `there is no columns for user with id: ${id}`,
                    404,
                );
            }
        } catch (e: unknown) {
            if (
                e instanceof EntityError ||
                e instanceof DBError ||
                e instanceof AuthError ||
                e instanceof TokenError
            ) {
                res.status(e.statusCode).send({
                    name: e.name,
                    statusCode: e.statusCode,
                    message: e.message,
                });
            } else {
                res.status(500).send({
                    statusCode: 500,
                    message: 'unknown column_controller error is occured',
                });
            }
        }
    };

    getColumnById: RequestHandler = async (req, res) => {
        const { id } = req.params;

        try {
            const response = await columnService.getColumnById(id);
            if (!(response instanceof EntityError)) {
                res.status(200).json(response);
            } else {
                throw new EntityError(`there is no column with id: ${id}`, 404);
            }
        } catch (e: unknown) {
            if (
                e instanceof EntityError ||
                e instanceof DBError ||
                e instanceof AuthError ||
                e instanceof TokenError
            ) {
                res.status(e.statusCode).send({
                    name: e.name,
                    statusCode: e.statusCode,
                    message: e.message,
                });
            } else {
                res.status(500).send({
                    statusCode: 500,
                    message: 'unknown column_controller error is occured',
                });
            }
        }
    };

    create: RequestHandler = async (req, res) => {
        const bodyError = checkBody(req.body, ['title', 'order']);
        if (bodyError) {
            return res
                .status(400)
                .send(createError(400, 'bad request: ' + bodyError));
        }
        const userId = req.baseUrl.split('/')[2];

        const { title, order } = req.body;

        try {
            const response: Column = await columnService.create({
                title,
                order,
                userId,
            });

            console.log({ response });

            res.json(response);
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getColumns: RequestHandler = async (req, res) => {
        try {
            const response = await columnService.getColumns();

            return res.status(200).json(response);
        } catch (e: unknown) {
            if (
                e instanceof EntityError ||
                e instanceof DBError ||
                e instanceof AuthError ||
                e instanceof TokenError
            ) {
                res.status(e.statusCode).send({
                    name: e.name,
                    statusCode: e.statusCode,
                    message: e.message,
                });
            } else {
                res.status(500).send({
                    statusCode: 500,
                    message: 'unknown column_controller error is occured',
                });
            }
        }
    };

    updateColumn: RequestHandler = async (req, res) => {
        const bodyError = checkBody(req.body, ['title', 'order']);
        if (bodyError) {
            return res
                .status(400)
                .send(createError(400, 'bad request: ' + bodyError));
        }
        const { title, order } = req.body;

        const { id } = req.params;

        try {
            const response = await columnService.updateTask({
                id,
                title,
                order,
            });
            res.json(response);
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    deleteColumn: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await columnService.deleteColumn(id);

            if (response instanceof DBError) {
                res.status(response.statusCode).send({
                    name: response.name,
                    statusCode: response.statusCode,
                    message: response.message,
                });
            } else {
                return res.status(200).json(response);
            }
        } catch (e: unknown) {
            if (
                e instanceof EntityError ||
                e instanceof DBError ||
                e instanceof AuthError ||
                e instanceof TokenError
            ) {
                res.status(e.statusCode).send({
                    name: e.name,
                    statusCode: e.statusCode,
                    message: e.message,
                });
            } else {
                res.status(500).send({
                    statusCode: 500,
                    message: 'unknown column_controller error is occured',
                });
            }
        }
    };
}

export default new ColumnController();

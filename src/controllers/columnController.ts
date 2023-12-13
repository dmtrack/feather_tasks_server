import { RequestHandler } from 'express';
import { Column } from '../db/models/column';
import { AuthError } from '../exceptions/auth-error';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { TokenError } from '../exceptions/token-error';

const columnService = require('../services/column.service');

class ColumnController {
    create: RequestHandler = async (req, res) => {
        const { name, order, userId } = req.body;
        try {
            const response: Column = await columnService.create({
                userId,
                name,
                order,
            });

            res.json({
                name: response.name,
                order: response.order,
                userId: response.userId,
            });
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

    getUserColumns: RequestHandler = async (req, res) => {
        const { userId } = req.params;

        try {
            const response = await columnService.getUserColumns(userId);

            if (!(response instanceof EntityError)) {
                res.status(200).json(response);
            } else {
                throw new EntityError(
                    `there is no columns for user with id: ${userId}`,
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

    destroyColumn: RequestHandler = async (req, res) => {
        const { userId } = req.params;
        try {
            const response = await columnService.destroyColumn(userId);

            if (!(response instanceof EntityError)) {
                res.status(200).json(response);
            } else {
                throw new EntityError(
                    `there is no task with id: ${userId}`,
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
}

export default new ColumnController();

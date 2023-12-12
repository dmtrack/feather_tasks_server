import { RequestHandler } from 'express';
import { User } from '../db/models/user';
import { AuthError } from '../exceptions/auth-error';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { TokenError } from '../exceptions/token-error';

const taskService = require('../services/task.service');

class TaskController {
    create: RequestHandler = async (req, res) => {
        const { name, login } = req.body;
        try {
            const response: User = await taskService.create({
                name,
                login,
            });

            res.json({
                name: response.name,
                lastname: response.login,
            });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getTasks: RequestHandler = async (req, res) => {
        try {
            const response = await taskService.getTodos();

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
                    message: 'unknown task error was occured',
                });
            }
        }
    };

    getUserTasks: RequestHandler = async (req, res) => {
        const { id } = req.params;

        try {
            const response = await taskService.getUserTasks(id);

            if (!(response instanceof EntityError)) {
                res.status(200).json(response);
            } else {
                throw new EntityError(
                    `there is no tasks for user with id: ${id}`,
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
                    message: 'unknown task_controller error was occured',
                });
            }
        }
    };

    destroyTask: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await taskService.destroyTodo(id);

            if (!(response instanceof EntityError)) {
                res.status(200).json(response);
            } else {
                throw new EntityError(`there is no task with id: ${id}`, 404);
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
                    message: 'unknown task error was occured',
                });
            }
        }
    };
}

export default new TaskController();

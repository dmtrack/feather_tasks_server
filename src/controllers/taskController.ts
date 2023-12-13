import { RequestHandler } from 'express';
import { Task } from '../db/models/task';
import { User } from '../db/models/user';
import { AuthError } from '../exceptions/auth-error';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { TokenError } from '../exceptions/token-error';
import { checkBody, createError } from '../services/error.service';
import { ITaskDTO } from '../types/task.interface';
import { createTaskDto } from '../utils/helpers/helpers';

const taskService = require('../services/task.service');

class TaskController {
    create: RequestHandler = async (req, res) => {
        const columnId = req.baseUrl.split('/')[2];
        const bodyError = checkBody(req.body, [
            'title',
            'order',
            'description',
            'userId',
        ]);
        if (bodyError) {
            return res
                .status(400)
                .send(createError(400, 'bad request: ' + bodyError));
        }

        const { title, order, description, userId } = req.body;

        try {
            const newTask: Task = await taskService.create({
                title,
                order,
                description,
                userId,
                columnId,
            });

            const taskDto = createTaskDto(newTask);

            res.json(taskDto);
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getTasks: RequestHandler = async (req, res) => {
        const userId = req.baseUrl.split('/')[4];
        const columnId = req.baseUrl.split('/')[2];

        try {
            const response: Task[] = await taskService.getTasks(
                userId,
                columnId,
            );

            const taskDto: ITaskDTO[] = response.map((t) => createTaskDto(t));

            return res.status(200).json(taskDto);
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

    updateTask: RequestHandler = async (req, res) => {
        const bodyError = checkBody(req.body, [
            'title',
            'description',
            'userId',
            'columnId',
        ]);
        if (bodyError) {
            return res
                .status(400)
                .send(createError(400, 'bad request: ' + bodyError));
        }

        const { id } = req.params;
        const { title, order, description, userId, columnId } = req.body;

        try {
            const response = await taskService.updateTask({
                id,
                title,
                order,
                description,
                userId,
                columnId,
            });
            res.json(response);
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    deleteTask: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await taskService.deleteTask(id);

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

import { RequestHandler } from 'express';
import { User } from '../db/models/user';
import { EntityError } from '../exceptions/entity-error';

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
            const todos = await taskService.getTodos();

            return res.json(todos);
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getUserTasks: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await taskService.getUserTasks(id);
            if (!(response instanceof EntityError)) {
                res.status(200).json({
                    response,
                });
            } else {
                res.status(400).json(`у пользователя с id:${id} нет задач`);
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    destroyTask: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const response = await taskService.destroyTodo(id);

            if (!(response instanceof EntityError)) {
                res.status(200).json(response);
            } else {
                res.status(400).json(`задачи с id:${id} не существует`);
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };
}

export default new TaskController();

import { RequestHandler } from 'express';
import { User } from '../db/models/user';
import { EntityError } from '../exceptions/entity-error';

const todoService = require('../services/todo.service');
class todoController {
    create: RequestHandler = async (req, res, next) => {
        const { name, lastname } = req.body;
        try {
            const response: User = await todoService.create({
                name: name,
                lastname: lastname,
            });

            res.json({
                name: response.name,
                lastname: response.lastname,
            });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getTodos: RequestHandler = async (req, res, next) => {
        try {
            const todos = await todoService.getTodos();

            return res.json(todos);
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };
    getUserTodo: RequestHandler = async (req, res) => {
        const id = req.params.id;
        try {
            const response = await todoService.getUserTodo(id);

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

    destroyTodo: RequestHandler = async (req, res) => {
        const id = req.params.id;
        try {
            const response = await todoService.destroyTodo(id);

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

export default new todoController();

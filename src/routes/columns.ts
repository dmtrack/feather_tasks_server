import express, { Router } from 'express';
import columnController from '../controllers/columnController';
import { taskRouter } from './task';

const jsonParser = express.json();
export const columnRouter = Router();

columnRouter.use('/:columnId/task', taskRouter);

columnRouter.get('/', jsonParser, columnController.getUserColumns);

columnRouter.get('/:id', columnController.getColumnById);

columnRouter.post('/', jsonParser, columnController.create);

columnRouter.put('/:columnId', jsonParser, columnController.updateColumn);

columnRouter.delete('/:id', columnController.deleteColumn);

export default columnRouter;

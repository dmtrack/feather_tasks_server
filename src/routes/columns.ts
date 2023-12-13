import express, { Router } from 'express';
import columnController from '../controllers/columnController';
import { taskRouter } from './task';

const jsonParser = express.json();
export const columnRouter = Router();

columnRouter.use('/:columnId/task', taskRouter);

columnRouter.get('/getcolumns', columnController.getColumns);

columnRouter.get('/:id', columnController.getColumnById);

columnRouter.post('/', jsonParser, columnController.create);

columnRouter.get('/getusercolumns/:id', columnController.getUserColumns);

columnRouter.put('/:Id', jsonParser, columnController.updateColumn);

columnRouter.delete('/:id', columnController.deleteColumn);

export default columnRouter;

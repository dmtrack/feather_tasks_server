import { Router } from 'express';
import columnController from '../controllers/columnController';
import { taskRouter } from './task';

const columnRouter = Router();

columnRouter.get('/getcolumns', columnController.getColumns);

columnRouter.post('/create', columnController.create);

columnRouter.use('/:columnId/task', taskRouter);

columnRouter.get('/getusercolumns/:id', columnController.getUserColumns);

columnRouter.get('/:id', columnController.getColumnById);

columnRouter.delete('/destroy/:id', columnController.destroyColumn);

export default columnRouter;

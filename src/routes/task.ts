import express, { Router } from 'express';
import taskController from '../controllers/taskController';

export const taskRouter = Router();
const jsonParser = express.json();

taskRouter.get('/gettasks', taskController.getTasks);

taskRouter.post('/', jsonParser, taskController.create);

taskRouter.get('/getusertasks/:id', taskController.getUserTasks);

taskRouter.put('/:id', jsonParser, taskController.updateTask);

taskRouter.delete('/:id', taskController.deleteTask);

export default taskRouter;

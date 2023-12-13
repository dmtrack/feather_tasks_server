import express, { Router } from 'express';
import { columnRouter } from './columns';

const jsonParser = express.json();

const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.use('/:userId/column', jsonParser, columnRouter);

userRouter.post('/create', userController.create);

userRouter.get('/getusers', userController.getUsers);

userRouter.get('/:id', userController.getUserById);

userRouter.delete('/destroyuser/:id', userController.destroyUser);

export default userRouter;

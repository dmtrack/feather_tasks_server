import { Router } from 'express';

const userRouter = Router();
const userController = require('../controllers/userController');

userRouter.post('/create', userController.create);
userRouter.get('/getusers', userController.getUsers);

export default userRouter;

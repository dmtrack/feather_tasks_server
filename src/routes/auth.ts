import express from 'express';

import authController from '../controllers/authController';

const jsonParser = express.json();
const authRouter = express.Router();

authRouter.post('/signin', jsonParser, authController.signIn);
authRouter.post('/signup', jsonParser, authController.signUp);
authRouter.get('/check', authController.check);

export default authRouter;

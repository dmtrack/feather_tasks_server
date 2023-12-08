import { Router } from 'express';
const userController = require('../controllers/userController');

const userRouter = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *            - id
 *            - name
 *            - lastname
 *        properties:
 *            id:
 *              type: integer
 *              description: the auto-generated if of the user
 *            name:
 *              type: string
 *              description: the user name
 *            lastname:
 *              type: string
 *              description: the user lastname
 *        example:
 *              id: 1
 *              name: Dmitriy
 *              lastname: Maslov
 */

/**
 * @swagger
 * tags:
 *  name: User
 */

/** @swagger
 * components:
 *    schemas:
 *      Grade:
 *        type: object
 *        required:
 *            - id
 *            - subjectId
 *            - userId
 *            - grade
 *            - date
 *        properties:
 *            id:
 *              type: integer
 *              description: the auto-generated id of the grade
 *            subjectId:
 *              type: integer
 *              description: link to subject
 *            userId:
 *              type: integer
 *              description:  link to user
 *            grade:
 *              type: integer
 *              description: user's grade for particular subject
 *            date:
 *              type: string
 *              format: date
 *              description: date of the grade
 *        example:
 *              subjectId: 1
 *              userId: 1
 *              grade: 3
 *              date: 2023-10-05
 */

/**
 * @swagger
 * tags:
 *  name: Grade
 */

/**
 * @swagger
 * /statistic/create:
 *  post:
 *    summary: creates the new grade
 *    tags: [Grade]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                required:
 *                 - userId
 *                 - subjectId
 *                 - grade
 *                 - date
 *                properties:
 *                  userId:
 *                    type: integer
 *                    description: the user's id
 *                  subjectId:
 *                    type: integer
 *                    description: the subject's id
 *                  dateStart:
 *                    type: string
 *                    format: date
 *                    description: start date
 *                  date:
 *                    type: string
 *                    format: date
 *                    description: grade's date
 *                example:
 *                    userId: 1
 *                    subjectId: 1
 *                    grade: 3
 *                    date: 2023-10-14
 *
 *    responses:
 *      200:
 *        description: grade was created
 *        content:
 *           application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Grade'
 *      500:
 *        description: error while creating grades has occured
 *
 */

userRouter.post('/create', userController.create);

/**
 * @swagger
 * /statistic/{id}:
 *   get:
 *     summary: Get user's statistic by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     responses:
 *       200:
 *         description: user's statistic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *       500:
 *         description:  there is no user with such id
 */
userRouter.get('/getusers', userController.getUsers);
userRouter.get('/:id', userController.getUserById);

userRouter.delete('/destroyuser/:id', userController.destroyUser);

export default userRouter;

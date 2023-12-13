import { Router } from 'express';
import columnController from '../controllers/columnController';

const columnRouter = Router();

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
 *  /todo/getusers:
 *    get:
 *      summary: returns the list of all the users
 *      tags: [User]
 *      responses:
 *        200:
 *          description: the list of the users
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/User'
 */
columnRouter.get('/getcolumns', columnController.getColumns);

/**
 * @swagger
 * /todo/create:
 *  post:
 *    summary: creates the new user
 *    tags: [User]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                required:
 *                 - name
 *                 - email
 *                 - vip
 *                properties:
 *                  name:
 *                    type: string
 *                    description: the user name
 *                  lastname:
 *                    type: string
 *                    description: the user email
 *                example:
 *                    name: Olga
 *                    lastname: Orlova
 *
 *    responses:
 *      200:
 *        description: created user
 *        content:
 *           application/json:
 *               schema:
 *                  $ref: '#/components/schemas/User'
 *      500:
 *        description: server error while creating user
 *
 */
columnRouter.post('/create', columnController.create);

/**
 * @swagger
 * /todo:
 *   get:
 *      summary: get grades by prefered query params
 *      tags: [Grade]
 *      parameters:
 *      - in: query
 *        name: subjectId
 *        required: false
 *        schema:
 *          type: string
 *          format: date
 *        description: parameter of the subject
 *      - in: query
 *        name: userId
 *        required: false
 *        schema:
 *          type: string
 *        description: parameter of the user
 *      - in: query
 *        name: grade
 *        required: false
 *        schema:
 *          type: string
 *        description: grade parameter
 *      - in: query
 *        name: date
 *        required: false
 *        schema:
 *          type: string
 *          format: date
 *        description: parameter of the subject date
 *      responses:
 *       200:
 *         description: grades list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Grade'
 *       404:
 *         description:  there are no such grades, sorry
 */

columnRouter.get('/getusercolumns/:id', columnController.getUserColumns);

columnRouter.delete('/destroy/:id', columnController.destroyColumn);

export default columnRouter;

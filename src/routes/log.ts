import { Router } from 'express';
import logController from '../controllers/logController';

const logRouter = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *            - id
 *            - name
 *            - email
 *            - vip
 *        properties:
 *            id:
 *              type: integer
 *              description: the auto-generated if of the user
 *            name:
 *              type: string
 *              description: the user name
 *            email:
 *              type: string
 *              description: the user email
 *            vip:
 *              type: boolean
 *              description: the user's status
 *        example:
 *              id: 1
 *              name: Pavel
 *              email: storm@gmail.com
 *              vip: true
 */

/**
 * @swagger
 * tags:
 *  name: User
 */

/**
 * @swagger
 *  /user/getusers:
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
logRouter.get('/getusers', logController.getUsers);

/**
 * @swagger
 * /user/create:
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
 *                  email:
 *                    type: string
 *                    description: the user email
 *                  vip:
 *                    type: boolean
 *                    description: the user's status
 *                example:
 *                    name: Olga
 *                    email: baby@gmail.com
 *                    vip: true
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

logRouter.post('/create', logController.create);

export default logRouter;

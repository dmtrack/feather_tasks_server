import { Router } from 'express';
const roomController = require('../controllers/roomController');

const roomRouter = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      Room:
 *        type: object
 *        required:
 *            - id
 *            - name
 *            - image
 *        properties:
 *            id:
 *              type: integer
 *              description: the auto-generated if of the room
 *            name:
 *              type: string
 *              description: room's name
 *            image:
 *              type: string
 *              description: room's image link
 *            reservations:
 *              type: boolean
 *              description: the user's status
 *        example:
 *              id: 1
 *              name: Pavel
 *              image: storm@gmail.com
 *              reservations: true
 */

/**
 * @swagger
 * tags:
 *  name: Room
 */

/**
 * @swagger
 *  /room/getrooms:
 *    get:
 *      summary: returns the list of all the rooms
 *      tags: [Room]
 *      responses:
 *        200:
 *          description: the list of the rooms
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Room'
 */
roomRouter.get('/getrooms', roomController.getRooms);
roomRouter.post('/create', roomController.create);

export default roomRouter;

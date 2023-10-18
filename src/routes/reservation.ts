import { Router } from 'express';
const reservationController = require('../controllers/reservationController');

const reservationRouter = Router();

/**
 * @swagger
 * components:
 *    schemas:
 *      Reservation:
 *        type: object
 *        required:
 *            - id
 *            - roomId
 *            - userId
 *            - dateStart
 *            - dateEnd
 *        properties:
 *            id:
 *              type: integer
 *              description: the auto-generated id of the reservation
 *            roomId:
 *              type: integer
 *              description: the link to roomId
 *            userId:
 *              type: integer
 *              description: the link to userId
 *            dateStart:
 *              type: string
 *              format: date
 *              description: the reservation's start date
 *            dateEnd:
 *              type: string
 *              format: date
 *              description: the reservation's end date
 *            vip:
 *              type: boolean
 *              description: status of the user
 *        example:
 *              roomId: 1
 *              userId: 1
 *              dateStart: 2023/10/12
 *              dateEnd: 2023/10/14
 *              vip: true
 */

/**
 * @swagger
 * tags:
 *  name: Reservation
 */

/**
 * @swagger
 *  /reservation/getreservations:
 *    get:
 *      summary: returns the list of all the reservations
 *      tags: [Reservation]
 *      responses:
 *        200:
 *          description: the list of the reservations
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Reservation'
 */

reservationRouter.get(
    '/getreservations',
    reservationController.getReservations
);

reservationRouter.get(
    '/getbydates',
    reservationController.getReservationByDates
);

/**
 * @swagger
 * /reservation/getfreerooms:
 *   get:
 *      summary: get free rooms by prefered start and end dates
 *      tags: [Reservation]
 *      parameters:
 *      - in: query
 *        name: dateStart
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: parameter fo start date
 *      - in: query
 *        name: dateEnd
 *        required: true
 *        schema:
 *          type: string
 *          format: date
 *        description: parameter fo end date
 *      responses:
 *       200:
 *         description: get
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Reservation'
 *       404:
 *         description:  there are no free rooms, sorry
 */

reservationRouter.get(
    '/getfreerooms',
    reservationController.getFreeRoomsForDates
);

/**
 * @swagger
 * /reservation/create:
 *  post:
 *    summary: creates the new reservation
 *    tags: [Reservation]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                required:
 *                 - roomId
 *                 - userId
 *                 - dateStart
 *                 - dateEnd
 *                properties:
 *                  name:
 *                    roomId: integer
 *                    description: the room's id
 *                  userId:
 *                    type: integer
 *                    description: the user's id
 *                  dateStart:
 *                    type: string
 *                    format: date
 *                    description: start date
 *                  dateEnd:
 *                    type: string
 *                    format: date
 *                    description: end date
 *                example:
 *                    roomId: 1
 *                    userId: 1
 *                    dateStart: 2023/10/12
 *                    dateEnd: 2023/10/14
 *
 *    responses:
 *      200:
 *        description: reservation was created
 *        content:
 *           application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Reservation'
 *      400:
 *        description: room is occupied on these dates
 *
 */

reservationRouter.post('/create', reservationController.create);

/**
 * @swagger
 * /reservation/delete/{id}:
 *   delete:
 *     summary: Remove the reservation by id
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation id
 *
 *     responses:
 *       200:
 *         description: The reservation with id was successfully deleted
 *       404:
 *         description: there is no reservation with id in data-base
 */

reservationRouter.delete(
    '/delete/:id',
    reservationController.deleteReservation
);

export default reservationRouter;

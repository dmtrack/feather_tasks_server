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
 *              description: the reservation's start date
 *            dateEnd:
 *              type: string
 *              description: the reservation's end date
 *        example:
 *              roomId: 1
 *              userId: 1
 *              dateStart: 2023/11/1
 *              dateEnd: 2023/11/30
 */

/**
 * @swagger
 * tags:
 *  name: Reservation
 */

reservationRouter.get(
    '/getreservations',
    reservationController.getReservations
);

reservationRouter.get(
    '/getbydates',
    reservationController.getReservationByDates
);

reservationRouter.get(
    '/getfreerooms',
    reservationController.getFreeRoomsForDates
);

reservationRouter.post('/create', reservationController.create);

export default reservationRouter;

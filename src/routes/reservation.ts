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
 *              id: 1
 *              roomId: 1
 *              userId: 2
 *              dateStart: 35435435435
 *              dateEnd: 365435345435
 */

/**
 * @swagger
 * tags:
 *  name: Reservation
 */

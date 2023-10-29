import { Router } from 'express';
const statController = require('../controllers/statController');

const statRouter = Router();

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
 *              description: the auto-generated id of the reservation
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
 *        description: reservation was created
 *        content:
 *           application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Reservation'
 *      400:
 *        description: room is occupied on these dates
 *
 */

statRouter.post('/create', statController.create);

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

// reservationRouter.delete(
//     '/delete/:id',
//     reservationController.deleteReservation
// );

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

statRouter.get('/:id', statController.getUserStatistic);

export default statRouter;

import { RequestHandler } from 'express';
import { Grade } from '../db/models/grade';
import { Subject } from '../db/models/subject';
import { EntityError } from '../exceptions/entity-error';

const statService = require('../services/stat.service');

class StatController {
    create: RequestHandler = async (req, res, next) => {
        try {
            const { userId, subjectId, grade, date } = req.body;

            const response: Grade = await statService.create({
                userId,
                subjectId,
                grade,
                date,
            });

            if (!(response instanceof EntityError)) {
                res.status(200).json({
                    id: response.id,
                    userId: response.userId,
                    subject: response.subjectId,
                    date: response.date,
                });
            } else {
                res.status(400).json('room is occupied on these dates');
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getUserStatistic: RequestHandler = async (req, res) => {
        const id = req.params.id;
        try {
            const response = await statService.getUserStatistic(id);

            if (!(response instanceof EntityError)) {
                res.status(200).json({
                    response,
                });
            } else {
                res.status(400).json(
                    `студент с указанным персональным кодом: ${id} не найден`
                );
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getSubjects: RequestHandler = async (req, res) => {
        try {
            const response = await Subject.findAll();
            console.log(response, 'response');
            res.status(200).json({
                response,
            });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };
    // getReservationByDates: RequestHandler = async (req, res, next) => {
    //     try {
    //         const dateStart = req.query.dateStart as string;
    //         const dateEnd = req.query.dateEnd as string;
    //         if (new Date(dateStart) > new Date(dateEnd))
    //             throw new Error(
    //                 'wrong date format.It should be like: startDate: 2023/11/1  endDate: 2023/11/20. Also check is start date less then end'
    //             );
    //         const reservations = await reservationService.getReservationByDates(
    //             dateStart,
    //             dateEnd
    //         );
    //         console.log(reservations, 'controller');
    //         return res.json({ reservations });
    //     } catch (e: unknown) {
    //         if (e instanceof Error) res.status(500).json(e.message);
    //     }
    // };

    // getFreeRoomsForDates: RequestHandler = async (req, res, next) => {
    //     try {
    //         const dateStart = req.query.dateStart as string;
    //         const dateEnd = req.query.dateEnd as string;
    //         if (new Date(dateStart) > new Date(dateEnd))
    //             throw new Error(
    //                 'wrong date format.It should be like: startDate: 2023/11/1  endDate: 2023/11/20. Also check is start date less then end'
    //             );

    //         const freeRooms: Reservation =
    //             await reservationService.getFreeRoomsForDates({
    //                 dateStart,
    //                 dateEnd,
    //             });
    //         if (!(freeRooms instanceof EntityError)) {
    //             res.status(200).json({
    //                 freeRooms: freeRooms,
    //             });
    //         } else {
    //             res.status(404).json('there are no free rooms, sorry');
    //         }
    //     } catch (e: unknown) {
    //         if (e instanceof Error) res.status(400).json(e.message);
    //     }
    // };

    // deleteReservation: RequestHandler = async (req, res, next) => {
    //     const id = req.params.id;
    //     try {
    //         const response = await reservationService.deleteReservation(id);

    //         if (!(response instanceof EntityError)) {
    //             res.status(200).send(`reservation with id: ${id}  was deleted`);
    //         } else {
    //             res.status(404).json(
    //                 `there is no reservation with id:${id}  in data-base`
    //             );
    //         }
    //     } catch (e: unknown) {
    //         if (e instanceof Error) res.status(404).json(e.message);
    //     }
    // };
}

module.exports = new StatController();

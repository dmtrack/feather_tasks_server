import { RequestHandler } from 'express';
import { Reservation } from '../db/models/grade';
import { EntityError } from '../exceptions/entity-error';

const reservationService = require('../services/reservation.service');

class ReservationController {
    create: RequestHandler = async (req, res, next) => {
        try {
            const { userId, roomId, dateStart, dateEnd } = req.body;
            if (new Date(dateStart) > new Date(dateEnd))
                throw new Error(
                    'wrong date format.It should be like: startDate: 2023/11/1  endDate: 2023/11/20. Also check is start date less then end'
                );

            const response: Reservation = await reservationService.create({
                userId,
                roomId,
                dateStart,
                dateEnd,
            });

            if (!(response instanceof EntityError)) {
                res.status(200).json({
                    id: response.id,
                    roomId: response.roomId,
                    userId: response.userId,
                    dateStart: response.dateStart,
                    dateEnd: response.dateEnd,
                });
            } else {
                res.status(400).json('room is occupied on these dates');
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getReservations: RequestHandler = async (req, res, next) => {
        try {
            const reservations = await reservationService.getReservations();
            return res.json({ reservations: reservations });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(500).json(e.message);
        }
    };
    getReservationByDates: RequestHandler = async (req, res, next) => {
        try {
            const dateStart = req.query.dateStart as string;
            const dateEnd = req.query.dateEnd as string;
            if (new Date(dateStart) > new Date(dateEnd))
                throw new Error(
                    'wrong date format.It should be like: startDate: 2023/11/1  endDate: 2023/11/20. Also check is start date less then end'
                );
            const reservations = await reservationService.getReservationByDates(
                dateStart,
                dateEnd
            );
            console.log(reservations, 'controller');
            return res.json({ reservations });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(500).json(e.message);
        }
    };

    getFreeRoomsForDates: RequestHandler = async (req, res, next) => {
        try {
            const dateStart = req.query.dateStart as string;
            const dateEnd = req.query.dateEnd as string;
            if (new Date(dateStart) > new Date(dateEnd))
                throw new Error(
                    'wrong date format.It should be like: startDate: 2023/11/1  endDate: 2023/11/20. Also check is start date less then end'
                );

            const freeRooms: Reservation =
                await reservationService.getFreeRoomsForDates({
                    dateStart,
                    dateEnd,
                });
            if (!(freeRooms instanceof EntityError)) {
                res.status(200).json({
                    freeRooms: freeRooms,
                });
            } else {
                res.status(404).json('there are no free rooms, sorry');
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    deleteReservation: RequestHandler = async (req, res, next) => {
        const id = req.params.id;
        try {
            const response = await reservationService.deleteReservation(id);

            if (!(response instanceof EntityError)) {
                res.status(200).send(`reservation with id: ${id}  was deleted`);
            } else {
                res.status(404).json(
                    `there is no reservation with id:${id}  in data-base`
                );
            }
        } catch (e: unknown) {
            if (e instanceof Error) res.status(404).json(e.message);
        }
    };
}

module.exports = new ReservationController();

import { RequestHandler } from 'express';
import { Reservation } from '../db/models/reservation';
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
        } catch (e: any) {
            res.status(400).json(e.message);
            // next(e);
        }
    };

    getReservations: RequestHandler = async (req, res, next) => {
        try {
            const reservations = await reservationService.getReservations();
            return res.json({ reservations: reservations });
        } catch (e: any) {
            res.status(500).json(e.message);
        }
    };
    getReservationByDates: RequestHandler = async (req, res, next) => {
        try {
            const { dateStart, dateEnd } = req.body;
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
        } catch (e: any) {
            console.log('error');
            res.status(500).json(e.message);
        }
    };

    getFreeRoomsForDates: RequestHandler = async (req, res, next) => {
        try {
            const { userId, roomId, dateStart, dateEnd } = req.body;
            if (new Date(dateStart) > new Date(dateEnd))
                throw new Error(
                    'wrong date format.It should be like: startDate: 2023/11/1  endDate: 2023/11/20. Also check is start date less then end'
                );

            const freeRooms: Reservation =
                await reservationService.getFreeRoomsForDates({
                    userId,
                    roomId,
                    dateStart,
                    dateEnd,
                });
            if (!(freeRooms instanceof EntityError)) {
                res.status(200).json({
                    freeRooms: freeRooms,
                });
            } else {
                res.status(400).json('there are no free rooms, sorry');
            }
        } catch (e: any) {
            res.status(400).json(e.message);
            // next(e);
        }
    };

    deleteReservation: RequestHandler = async (req, res, next) => {
        const { dateStart, dateEnd } = req.body;
        try {
            const response = await reservationService.deleteReservation(
                dateStart,
                dateEnd
            );
            return res
                .status(200)
                .send(
                    `reservation with dateStart: ${dateStart} and dateEnd: ${dateEnd} was deleted`
                );
        } catch (e) {
            next(e);
        }
    };
}

module.exports = new ReservationController();

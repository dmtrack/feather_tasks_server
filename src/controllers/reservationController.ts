import { RequestHandler } from 'express';
import { Reservation } from '../db/models/reservation';

const reservationService = require('../services/reservation.service');

class ReservationController {
    create: RequestHandler = async (req, res, next) => {
        const { userId, roomId, dateStart, dateEnd } = req.body;
        try {
            const response: Reservation = await reservationService.create({
                userId,
                roomId,
                dateStart,
                dateEnd,
            });

            res.status(200).json({
                id: response.id,
                roomId: response.roomId,
                userId: response.userId,
                dateStart: response.dateStart,
                dateEnd: response.dateEnd,
            });
        } catch (e: any) {
            res.status(500).json(e.message);
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
        const { dateStart, dateEnd } = req.body;
        try {
            const reservations = await reservationService.getReservationByDates(
                dateStart,
                dateEnd
            );
            return res.status(200).json({ data: reservations });
        } catch (e: any) {
            res.status(500).json(e.message);
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

import { RequestHandler } from 'express';
import { Reservation } from '../db/models/reservation';

const reservationService = require('../services/reservation.service');

class ReservationController {
    create: RequestHandler = async (req, res, next) => {
        const { name, email } = req.body;
        try {
            const response: Reservation = await reservationService.create({
                name: name,
                email: email,
                vip: true,
            });

            res.json({
                id: response.id,
                roomId: response.roomId,
                userId: response.userId,
                dateStart: response.dateStart,
                dateEnd: response.dateEnd,
            });
        } catch (e) {
            next(e);
        }
    };

    getReservations: RequestHandler = async (req, res, next) => {
        try {
            const users = await reservationService.getUsers();
            return res.json({ data: users });
        } catch (e) {
            next(e);
        }
    };
}

module.exports = new ReservationController();

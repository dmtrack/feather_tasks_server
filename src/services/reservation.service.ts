import { Reservation } from './../db/models/reservation';
import { AuthError } from '../exceptions/auth-error';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';

export class ReservationService {
    async create(reserv: Reservation) {
        try {
            let { roomId, userId, dateStart, dateEnd } = reserv;
            const dateStartNum = new Date(dateStart).getTime();
            const dateEndNum = new Date(dateEnd).getTime();
            const newReserv: Reservation = await Reservation.create({
                roomId: +roomId,
                userId: +userId,
                dateStart: dateStartNum,
                dateEnd: dateEndNum,
            });
            return newReserv;
        } catch (e: any) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return new AuthError(`${e.errors[0].path} already exists`);
            } else return new DBError('Register reservation error', e);
        }
    }

    async getReservations() {
        const reservations = await Reservation.findAll();
        return reservations;
    }

    async getReservationByDate(dateStart: string, dateEnd: string) {
        const reserv = await Reservation.findOne({
            where: { dateStart: dateStart, dateEnd: dateEnd },
        });
        if (!reserv) {
            return new EntityError(
                `there is no reservation with dateStart:${dateStart} and dateEnd: ${dateEnd} in data-base`
            );
        }
        return reserv;
    }

    async deleteReservation(dateStart: string, dateEnd: string) {
        const reserv = await Reservation.findOne({
            where: { dateStart: dateStart, dateEnd: dateEnd },
        });
        if (!reserv) {
            return new EntityError(
                `there is no reservation with dateStart:${dateStart} and dateEnd: ${dateEnd} in data-base`
            );
        }
        await Reservation.destroy({ where: { id: reserv.id } });
    }
}

module.exports = new ReservationService();

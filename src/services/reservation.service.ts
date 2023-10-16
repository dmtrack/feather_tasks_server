import { Reservation } from './../db/models/reservation';
import { AuthError } from '../exceptions/auth-error';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';

export class ReservationService {
    async create(reserv: Reservation) {
        try {
            let { roomId, userId, dateStart, dateEnd } = reserv;
            // const reservation: Reservation | null = await Reservation.findOne({
            //     where: { email: email },
            // });

            // if (candidate) {
            //     return new AuthError(
            //         'User with this email is already registered'
            //     );
            // }
            const newReserv: Reservation = await Reservation.create({
                roomId,
                userId,
                dateStart,
                dateEnd,
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

    async deleteReservation(id: number) {
        const reserv = await Reservation.findByPk(id);
        if (!reserv) {
            return new EntityError(
                `there is no reservation with id:${id} in data-base`
            );
        }
        await Reservation.destroy({ where: { id } });
    }
}

export default new ReservationService();

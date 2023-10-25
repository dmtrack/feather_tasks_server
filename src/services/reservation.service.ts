import { Reservation } from '../db/models/grade';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { Op } from 'sequelize';
import { addDays } from '../utils/dates';
import { Room } from '../db/models/room';
import { User } from '../db/models/user';

export class ReservationService {
    async create(reserv: Reservation) {
        try {
            let { roomId, userId, dateStart, dateEnd } = reserv;
            const dateStartCorrect = addDays(dateStart, 1);
            const dateEndCorrect = addDays(dateEnd, 1);
            const user = await User.findOne({ where: { id: userId } });

            if (user) {
                const isBusy = await Reservation.findOne({
                    where: {
                        roomId: roomId,
                        [Op.or]: {
                            dateStart: {
                                [Op.between]: [
                                    dateStartCorrect,
                                    dateEndCorrect,
                                ],
                            },
                            dateEnd: {
                                [Op.between]: [
                                    dateStartCorrect,
                                    dateEndCorrect,
                                ],
                            },
                        },
                    },
                });
                if (!!isBusy) {
                    return new EntityError(
                        'this room is occupied already on these dates'
                    );
                } else {
                    const newReserv: Reservation = await Reservation.create({
                        roomId: +roomId,
                        userId: +userId,
                        vip: user.vip,
                        dateStart: dateStartCorrect,
                        dateEnd: dateEndCorrect,
                    });
                    return newReserv;
                }
            }
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            } else {
                return new Error('unknown error was occured');
            }
        }
    }

    async getReservations() {
        const reservations = await Reservation.findAll();
        return reservations;
    }

    async getReservationByDates(dateStart: string, dateEnd: string) {
        const dateStartNum = new Date(dateStart).getTime();
        const dateEndNum = new Date(dateEnd).getTime();
        const reserv = await Reservation.findOne({
            where: { dateStart: dateStartNum, dateEnd: dateEndNum },
        });
        if (!reserv) {
            return new EntityError(
                `there is no reservation with dateStart:${dateStart} and dateEnd: ${dateEnd} in data-base`
            );
        }
        return reserv;
    }

    async getFreeRoomsForDates(reserv: Reservation) {
        try {
            let { dateStart, dateEnd } = reserv;
            const dateStartCorrect = addDays(dateStart, 1);
            const dateEndCorrect = addDays(dateEnd, 1);
            const occupiedRooms = await Reservation.findAll({
                where: {
                    [Op.or]: {
                        dateStart: {
                            [Op.between]: [dateStartCorrect, dateEndCorrect],
                        },
                        dateEnd: {
                            [Op.between]: [dateStartCorrect, dateEndCorrect],
                        },
                    },
                },
                raw: true,
            });
            const allRooms = await Room.findAll({ raw: true });

            let freeRooms = allRooms.filter((room) =>
                occupiedRooms.every(
                    (occupiedRoom) => occupiedRoom.roomId !== room.id
                )
            );

            if (freeRooms.length > 0) {
                console.log('there are freeRooms');
                return freeRooms;
            } else {
                console.log('ooops');
                return new EntityError(
                    'there are no free rooms for these dates, sorry..check other dates, please!'
                );
            }
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            } else {
                return new Error('unknown error was occured');
            }
        }
    }

    async deleteReservation(id: string) {
        const reserv = await Reservation.findOne({
            where: { id },
        });
        if (!reserv) {
            return new EntityError(
                `there is no reservation with id:${id}  in data-base`
            );
        }
        await Reservation.destroy({ where: { id: reserv.id } });
    }
}

module.exports = new ReservationService();

import mokeData from '../utils/moke.json';

const UserService = require('../services/user.service');
const RoomService = require('../services/room.service');
const ReservationService = require('../services/reservation.service');

export const createMokeData = async () => {
    await UserService.create(mokeData.users.user1);
    await UserService.create(mokeData.users.user2);
    await RoomService.create(mokeData.rooms.room1);
    await RoomService.create(mokeData.rooms.room2);
    await ReservationService.create(mokeData.reservations.reservation1);
};

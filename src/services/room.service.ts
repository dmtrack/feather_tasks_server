import { DBError } from '../exceptions/db-error';
import { Room } from '../db/models/room';

export class RoomService {
    async create(room: Room) {
        try {
            let { name } = room;

            const newRoom: Room = await Room.create({
                name,
            });

            return newRoom;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            } else {
                return new Error('unknown error was occured');
            }
        }
    }

    async getRooms() {
        try {
            const rooms = await Room.findAll();
            return rooms;
        } catch (e: unknown) {
            if (e instanceof DBError) {
                return new DBError('data base error', e);
            } else {
                return new Error('unknown error was occured');
            }
        }
    }
}

module.exports = new RoomService();

import { AuthError } from '../exceptions/auth-error';
import { DBError } from '../exceptions/db-error';
import { EntityError } from '../exceptions/entity-error';
import { Room } from '../db/models/room';

export class RoomService {
    async create(room: Room) {
        try {
            let { name } = room;

            const newRoom: Room = await Room.create({
                name,
            });

            return newRoom;
        } catch (e: any) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return new AuthError(`${e.errors[0].path} already exists`);
            } else return new DBError('Register room error', e);
        }
    }

    async getRooms() {
        const rooms = await Room.findAll();
        return rooms;
    }

    async deleteRoom(id: number) {
        const room = await Room.findByPk(id);
        if (!room) {
            return new EntityError(
                `there is no room with id:${id} in data-base`
            );
        }
        await Room.destroy({ where: { id } });
    }
}

module.exports = new RoomService();

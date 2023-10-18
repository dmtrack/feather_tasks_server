import { RequestHandler } from 'express';
import { Room } from '../db/models/room';

const roomService = require('../services/room.service');
class RoomController {
    create: RequestHandler = async (req, res, next) => {
        const { name, image } = req.body;
        try {
            const response: Room = await roomService.create({
                name,
            });

            res.json({
                id: response.id,
                name: response.name,
            });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(400).json(e.message);
        }
    };

    getRooms: RequestHandler = async (req, res, next) => {
        try {
            const rooms = await roomService.getRooms();
            return res.json({ data: rooms });
        } catch (e: unknown) {
            if (e instanceof Error) res.status(500).json(e.message);
        }
    };
}
module.exports = new RoomController();

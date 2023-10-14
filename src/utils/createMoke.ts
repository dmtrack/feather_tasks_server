import mokeData from '../utils/moke.json';

const UserService = require('../services/user.service');

export const createMokeData = async () => {
    await UserService.create(mokeData.users.user1);
    await UserService.create(mokeData.users.user2);
};

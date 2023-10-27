import { Grade } from '../db/models/grade';
import { Subject } from '../db/models/subject';
import mokeData from '../utils/moke.json';

const LogService = require('../services/log.service');
const StatService = require('../services/stat.service');

export const createMokeData = async () => {
    await Subject.create({
        name: mokeData.subjects.subject1.name,
    });
    await Subject.create({
        name: mokeData.subjects.subject2.name,
    });
    await Subject.create({
        name: mokeData.subjects.subject3.name,
    });
    await Subject.create({
        name: mokeData.subjects.subject4.name,
    });
    await Subject.create({
        name: mokeData.subjects.subject5.name,
    });
    await Subject.create({
        name: mokeData.subjects.subject6.name,
    });

    await LogService.create(mokeData.users.user1);
    await LogService.create(mokeData.users.user2);

    await StatService.create(mokeData.grades.grade1);
    await StatService.create(mokeData.grades.grade2);
    await StatService.create(mokeData.grades.grade3);
    await StatService.create(mokeData.grades.grade4);
    await StatService.create(mokeData.grades.grade5);
    await StatService.create(mokeData.grades.grade6);
    await StatService.create(mokeData.grades.grade7);
    await StatService.create(mokeData.grades.grade8);
};

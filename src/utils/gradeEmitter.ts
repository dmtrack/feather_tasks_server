import { connect, JSONCodec } from 'nats';
import { Grade } from '../db/models/grade';
import { Subject } from '../db/models/subject';
import { User } from '../db/models/user';

const StatService = require('../services/stat.service');

export const gradeEmitter = async () => {
    const nc = await connect({ servers: ['localhost:4222'] });
    console.log('connected to NATS as PUBLISHER');
    const jc = JSONCodec();

    setInterval(async () => {
        const users = (await User.findAll()).length - 1;
        const userId = Math.ceil(Math.random() * users);
        const subjects = await Subject.findAll();
        const subjectsLength = (await Subject.findAll()).length - 1;
        const subjectId = Math.ceil(Math.random() * subjectsLength);
        const date = '2023-10-22';
        const grade = Math.ceil(Math.random() * 5);

        const newGrade: Grade = await StatService.create({
            userId,
            subjectId,
            date,
            grade,
        });
        console.log(newGrade.subjectId, 'id');
        const subjectObj = await subjects[`${newGrade.subjectId}`];
        const subjectName = subjectObj['name'];
        await nc.publish(
            'students.v1.graded',
            jc.encode({
                personalCode: newGrade.userId,
                grade: newGrade.grade,
                subject: subjectName,
            })
        );
    }, 15000);
};

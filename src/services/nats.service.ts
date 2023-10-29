import { connect, JSONCodec, StringCodec } from 'nats';
import { Grade } from '../db/models/grade';
import { Subject } from '../db/models/subject';
import { User } from '../db/models/user';
const StatService = require('../services/stat.service');
import dotenv from 'dotenv';
dotenv.config();
const natsServer = process.env.SERVER_NATS;
const natsPort = process.env.PORT_NATS;

interface IStreamPayload {
    personalCode: string;
}
export class NatsService {
    connect = connect({ servers: [`${natsServer}:${natsPort}`] });

    gradeEmitter = async (interval: number) => {
        const nc = await this.connect;
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
        }, interval);
    };

    stream = async () => {
        const nc = this.connect;
        console.log('connected to NATS streamer');

        const sub = (await nc).subscribe('students.v1.get', {
            callback: async (err, msg) => {
                if (err) {
                    console.log('subscription error', err.message);
                    return;
                }
                const payload: IStreamPayload = msg.json();

                if (typeof msg.json() === 'object') {
                    if (!payload.personalCode) {
                        msg.respond(
                            JSON.stringify({
                                code: 'ERR_VALIDATION_FAIL',
                                message: 'запрос не содержит нужной информации',
                            })
                        );
                    }
                    const user = await User.findByPk(payload.personalCode);
                    if (user) {
                        msg.respond(`take a user ${JSON.stringify(user)}`);
                    } else {
                        msg.respond(
                            JSON.stringify({
                                code: 'ERR_ENTITY_NOT_FOUND',
                                message:
                                    'студент с указанным персональным кодом не найден',
                            })
                        );
                    }
                } else {
                    msg.respond(
                        JSON.stringify({
                            code: 'ERR_WRONG_FORMAT',
                            message: 'запрос не в JSON-формате',
                        })
                    );
                }
            },
        });
    };
}
module.exports = new NatsService();

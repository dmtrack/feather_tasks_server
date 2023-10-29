import { connect } from 'nats';
import dotenv from 'dotenv';
dotenv.config();
const natsServer = process.env.SERVER_NATS;
const natsPort = process.env.PORT_NATS;

const subscriber = async () => {
    const nc = await connect({ servers: [`${natsServer}:${natsPort}`] });
    console.log(`connected to NATS as SUBCRIBER: ${process.pid}`);
    const sub = nc.subscribe('students.v1.graded', {
        callback: (_err, msg) => {
            console.log(
                `[${sub.getProcessed()}]: received message ${msg.data}`
            );
        },
    });
};

subscriber();

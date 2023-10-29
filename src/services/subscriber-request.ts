import { connect } from 'nats';
import dotenv from 'dotenv';
dotenv.config();

const natsServer = process.env.SERVER_NATS;
const natsPort = process.env.PORT_NATS;

const subscriberRequest = async () => {
    const nc = await connect({ servers: [`${natsServer}:${natsPort}`] });
    console.log(`STREAM SUBSCRIBER connected to NATS: ${process.pid}`);

    const payload = { personalCode: '10' };
    let response = await nc.request('students.v1.get', JSON.stringify(payload));
    console.log(response.string());
};

subscriberRequest();

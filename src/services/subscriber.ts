import { connect } from 'nats';

const subscriber = async () => {
    const nc = await connect({ servers: ['localhost:4222'] });
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

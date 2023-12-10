import { server } from './app';

const port = process.env.PORT;

const start = async () => {
    try {
        server.listen(port, () => {
            console.warn(`Server has succesfully started on port:${port}`);
        });
    } catch (e) {
        console.warn(e);
    }
};

start();

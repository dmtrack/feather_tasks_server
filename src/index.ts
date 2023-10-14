import { server } from './app';

const port = process.env.PORT;

const start = async () => {
    try {
        server.listen(port, () => {
            console.log(`Server has succesfully started on port:${port}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();

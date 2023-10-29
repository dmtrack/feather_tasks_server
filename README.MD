## students_service API

This is the test-task for the company

## Description

Service allows you to manage data on cloud data-base (postgre)

1. create / get all grades and students
2. get particular responce after req with query parameters
3. subscribe on new grades creating via NATS server
4. swagger test-station

> **Attention!** The backend and data-base are deployed on a free service render.com, so when you run the application for the first time, you need to wait a little bit. Thank you ✊🏻

## Stack

-   NodeJS
-   Express
-   Sequelize (postgreSQL)
-   Swagger
-   NATS

## Start instruction

video: https://disk.yandex.ru/i/vd3ht64DMnqFaA

1. run npm i command
2. create .env file and paste these db connection parameters:

```
SERVER_NATS=http://localhost
PORT_NATS=4222
SERVER=http://localhost
PORT=8080
DB_HOST=dpg-ckt70l8168ec73fl0a70-a.oregon-postgres.render.com
DB_USER=user
DB_PASSWORD=SJ1BZYEL4eeePT5L7EZaiXOiUUqCtobh
DB_NAME=students_nats

```

3. Dont forget to check nats-server connection parameters (at this config is using localhost server)

4. run npm run dev command
5. check swagger test-station at: http://localhost:8080/api-docs
6. to test nats-server uncomment at file app.ts at 61 and 62 lines

```
     natsService.gradeEmitter(5000);
     natsService.stream();

```

7. to test subscriptions run in another terminal window commands to start scripts:

```
    npx ts-node ./src/services/subscriber.ts
    npx ts-node ./src/services/subscriber-request.ts
```

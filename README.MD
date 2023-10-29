## students_service API

This is the test-task for the company

## Description

Service allows you to manage data on cloud data-base (postgre)

1. create / get all grades and students
2. get particular responce after req with query parameters
3. subscribe on new grades creating via NATS server
4. destroy reservations, room, users
5. swagger docs

> **Attention!** The backend and data-base are deployed on a free service render.com, so when you run the application for the first time, you need to wait a little bit. Thank you ✊🏻

## Preview

![Preview](./src/assets/preview.png)

## Stack

-   NodeJS
-   Express
-   Sequelize (postgreSQL)
-   Swagger
-   NATS

npx ts-node ./src/services/subscriber.ts

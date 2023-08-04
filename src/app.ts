import * as dotenv from "dotenv"
dotenv.config({path: __dirname+'/.env'});

import "reflect-metadata"
import express from 'express'
import loggerMiddleware from "./middleware/logger.middleware";
import { employeeRouter } from "./route/employee.route";
import dataSource from "./db/postgres.db";
import errorMiddleware from "./middleware/error.middleware";

const server = express();

server.use(express.json())
server.use(loggerMiddleware);
server.use('/employees', employeeRouter);

server.use(errorMiddleware);

(async () => {
    await dataSource.initialize()
    server.listen(3000, () => {
        console.log("server is listening to port 3000");
    })
})()
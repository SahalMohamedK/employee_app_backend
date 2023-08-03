import "reflect-metadata"
import express from 'express'
import loggerMiddleware from "./middleware/logger.middleware";
import { employeeRouter } from "./route/employee.route";
import dataSource from "./db/postgres.db";

const server = express();

server.use(express.json())
server.use(loggerMiddleware);
server.use('/employees', employeeRouter);

(async () => {
    await dataSource.initialize()
    server.listen(3000, () => {
        console.log("server is listening to port 3000");
    })
})()
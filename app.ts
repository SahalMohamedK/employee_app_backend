import express from 'express'
import employeeRouter from './employee_router';
import loggerMiddleware from './loggerMiddleware';

const server = express();

server.use(express.json())
server.use(loggerMiddleware);
server.use('/employees', employeeRouter);

server.listen(3000, () => {
    console.log("server is listening to port 3000");
})
import "reflect-metadata";
import express from "express";
import loggerMiddleware from "./middleware/logger.middleware";
import employeeRouter from "./route/employee.route";
import dataSource from "./db/postgres.db";
import errorMiddleware from "./middleware/error.middleware";
import departmentRouter from "./route/department.route";
import dataFormatter from "./middleware/dataFormatter.middleware";
import roleRouter from "./route/role.route";
import cors from "cors";

const server = express();

server.use(cors());
server.use(express.json());
server.use(loggerMiddleware);
server.use("/employees", employeeRouter);
server.use("/departments", departmentRouter);
server.use("/roles", roleRouter);

server.use(errorMiddleware);
server.use(dataFormatter);

(async () => {
  await dataSource.initialize();
  server.listen(5000, () => {
    console.log("server is listening to port 5000");
  });
})();

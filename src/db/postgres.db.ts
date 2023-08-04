import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entity/employee.entity";
import Address from "../entity/address.entity";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 8765,
  username: "postgres",
  password: "postgres",
  database: "employee_management",
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ["dist/entity/*.js"],
  migrations: ["dist/db/migrations/*.js"],
});

export default dataSource;

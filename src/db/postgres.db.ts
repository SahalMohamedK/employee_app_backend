import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ["dist/entity/*.js"],
  migrations: ["dist/db/migrations/*.js"],
});

export default dataSource;

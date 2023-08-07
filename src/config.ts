import * as dotenv from "dotenv"
dotenv.config({path: __dirname+'/.env'});

import { DataSourceOptions } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"

export const dataSourceOptions: DataSourceOptions = {
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
  }
  

export const JWT_SECRET_KET = process.env.JWT_SECRET_KEY
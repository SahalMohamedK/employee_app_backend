import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import Employee from "./Employee"

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 8877,
    username: "postgres",
    password: "postgres",
    database: "training",
    entities: [Employee],
    logging: true,
    namingStrategy: new SnakeNamingStrategy()
})

export default dataSource
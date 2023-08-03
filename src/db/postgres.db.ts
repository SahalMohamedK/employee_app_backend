import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import Employee from "../entity/employee.entity"

const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 8765,
    username: "postgres",
    password: "postgres",
    database: "employee_management",
    entities: [Employee],
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
    synchronize: true
})

export default dataSource
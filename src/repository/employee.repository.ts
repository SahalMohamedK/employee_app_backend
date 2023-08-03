import { DataSource, Repository, UpdateResult } from "typeorm";
import Employee from "../entity/employee.entity";
import dataSource from "../db/postgres.db";

class EmployeeRepository{
    constructor(
            private repository: Repository<Employee>
    ){}

    getAll(): Promise<Employee[]> {
        return this.repository.find();
    }

    getById(id: number): Promise<Employee> {
        return this.repository.findOneBy({id});
    }   

    create(employee: Employee): Promise<Employee> {
        return this.repository.save(employee)
    }

    update(employee: Employee): Promise<Employee> {
        return this.repository.save(employee)
    }

    softRemove(employee: Employee): Promise<Employee>{
        return this.repository.softRemove(employee)
    }
}

export default EmployeeRepository;
import { Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository{
    constructor(
            private repository: Repository<Employee>
    ){}

    getAll(): Promise<Employee[]> {
        return this.repository.find();
    }

    getById(id: number): Promise<Employee> {
        return this.repository.findOne({
            where: {id},
            relations: {
                address: true
            }
        });
    }   

    save(employee: Employee): Promise<Employee> {
        return this.repository.save(employee)
    }

    softRemove(employee: Employee): void{
        this.repository.softRemove(employee)
    }
}

export default EmployeeRepository;
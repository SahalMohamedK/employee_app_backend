import { FindOptionsWhere, Repository } from "typeorm";
import Employee from "../entity/employee.entity";

class EmployeeRepository {
  constructor(private repository: Repository<Employee>) {}

  getAll(): Promise<Employee[]> {
    return this.repository.find();
  }

  getBy(where: FindOptionsWhere<Employee>): Promise<Employee> {
    return this.repository.findOne({
      where: where,
      relations: {
        address: true,
      },
    });
  }

  save(employee: Employee): Promise<Employee> {
    return this.repository.save(employee);
  }

  softRemove(employee: Employee): void {
    this.repository.softRemove(employee);
  }
}

export default EmployeeRepository;

import Employee from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService{
    constructor(
        private repository: EmployeeRepository
    ) {}

    getAll(): Promise<Employee[]> | null{
        return this.repository.getAll();
    }

    getById(id: number): Promise<Employee> | null{
        return this.repository.getById(id);
    }

    create(name: string, email: string): Promise<Employee> {
        const employee = new Employee();
        employee.name = name;
        employee.email = email;

        return this.repository.create(employee)
    }

    async update(id: number, name: string, email: string){
        const employee = await this.repository.getById(id)

        employee.name = name;
        employee.email = email;

        return this.repository.update(employee);
    }

    async softRemove(id: number){
        const employee = await this.repository.getById(id)
        return this.repository.softRemove(employee)
    }
}

export default EmployeeService
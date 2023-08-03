import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import { AddressInput } from "../models/addressInput,model";
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

    create(name: string, email: string, address: AddressInput): Promise<Employee | null> {
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.address = newAddress

        return this.repository.save(newEmployee)
    }

    async update(id: number, name: string, email: string, address: AddressInput): Promise<Employee | null>{
        const employee = await this.repository.getById(id)

        employee.name = name;
        employee.email = email;
        employee.address.line1 = address.line1;
        employee.address.pincode = address.pincode;

        return this.repository.save(employee);
    }

    async softRemove(id: number): Promise<void>{
        const employee = await this.repository.getById(id)
        this.repository.softRemove(employee)
    }
}

export default EmployeeService
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import CreateEmplopyeeDto from "../dto/createEmployee.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import { AddressInput } from "../models/addressInput,model";
import EmployeeRepository from "../repository/employee.repository";
import LoginEmplopyeeDto from '../dto/loginEmployee.dto';

class EmployeeService {
  constructor(private repository: EmployeeRepository) {}

  async getEmployeeById(id: number){
    const employee = await this.repository.getBy({id})
    if (!employee) {
      throw new HttpException(400, `Employee not found with id: ${id}`);
    }

    return employee;
  }

  async login(loginDto: LoginEmplopyeeDto){

    const employee = await this.repository.getBy({email: loginDto.email})
    if (!employee) {
      throw new HttpException(401, `Incorrect email or password`);
    }

    const result = await bcrypt.compare(loginDto.password, employee.password)
    if(!result){
      throw new HttpException(401, "Incorrect email or password")
    }

    const payload = {
      name: employee.name,
      email: employee.email
    }

    const token = jsonwebtoken.sign(payload, "ABCDE", {expiresIn: "1h"})

    return {token}
  }

  getAll(): Promise<Employee[]> | null {
    return this.repository.getAll();
  }

  getById(id: number): Promise<Employee> | null {
    return this.getEmployeeById(id);
  }

  async create(createDto: CreateEmplopyeeDto): Promise<Employee | null> {
    const newAddress = new Address();
    newAddress.line1 = createDto.address.line1;
    newAddress.pincode = createDto.address.pincode;

    const newEmployee = new Employee();
    newEmployee.name = createDto.name;
    newEmployee.email = createDto.email;
    newEmployee.password = await bcrypt.hash(createDto.password, 10);
    newEmployee.address = newAddress;

    return this.repository.save(newEmployee);
  }

  async update(
    id: number,
    name: string,
    email: string,
    address: AddressInput
  ): Promise<Employee | null> {
    const employee = await this.getEmployeeById(id);

    employee.name = name;
    employee.email = email;
    employee.address.line1 = address.line1;
    employee.address.pincode = address.pincode;

    return this.repository.save(employee);
  }

  async softRemove(id: number): Promise<void> {
    const employee = await this.getEmployeeById(id);
    this.repository.softRemove(employee);
  }
}

export default EmployeeService;

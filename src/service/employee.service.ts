import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import CreateEmplopyeeDto from "../dto/createEmployee.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import { AddressInput } from "../models/addressInput,model";
import EmployeeRepository from "../repository/employee.repository";
import LoginEmplopyeeDto from '../dto/loginEmployee.dto';
import { jwtPayload } from '../utils/jwtPayload.type';
import { JWT_SECRET_KET } from '../config';

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

    const payload: jwtPayload = {
      name: employee.name,
      email: employee.email,
      role: employee.role
    }

    const token = jsonwebtoken.sign(payload, JWT_SECRET_KET, {expiresIn: "1h"})

    return {token}
  }

  getAll(): Promise<Employee[]> | null {
    return this.repository.getAll();
  }

  getById(id: number): Promise<Employee> | null {
    return this.getEmployeeById(id);
  }

  async create(employeeDto: CreateEmplopyeeDto): Promise<Employee | null> {
    const address = new Address();
    address.line1 = employeeDto.address.line1;
    address.pincode = employeeDto.address.pincode;

    const employee = new Employee();
    employee.name = employeeDto.name;
    employee.email = employeeDto.email;
    employee.role = employeeDto.role;
    employee.password = await bcrypt.hash(employeeDto.password, 10);
    employee.address = address;

    return this.repository.save(employee);
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

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import employeeDto from "../dto/employee.dto";
import Address from "../entity/address.entity";
import Employee from "../entity/employee.entity";
import HttpException from "../exception/http.exception";
import EmployeeRepository from "../repository/employee.repository";
import LoginemployeeDto from "../dto/login.dto";
import { jwtPayload } from "../utils/jwtPayload.type";
import { JWT_SECRET_KET } from "../config";

class EmployeeService {
  constructor(private repository: EmployeeRepository) {}

  async getEmployeeById(id: string): Promise<Employee | null> {
    const employee = await this.repository.getBy({ id });
    if (!employee) {
      throw new HttpException(400, `Employee not found with id: ${id}`);
    }

    return employee;
  }

  async isEmployeeAlreadyExists(email: string): Promise<boolean>{
    const employee = await this.repository.getBy({ email });
    return (employee !== null)
  }

  async login(loginDto: LoginemployeeDto) {
    const employee = await this.repository.getBy({ email: loginDto.email});
    if (!employee) {
      throw new HttpException(401, `Incorrect email or password`);
    }

    const result = await bcrypt.compare(loginDto.password, employee.password);
    if (!result) {
      throw new HttpException(401, "Incorrect email or password");
    }

    const payload: jwtPayload = {
      name: employee.name,
      email: employee.email,
      role: employee.role,
    };

    const token = jsonwebtoken.sign(payload, JWT_SECRET_KET, {
      expiresIn: "1h",
    });

    return { token, employeeDetails: employee };
  }

  getAll(): Promise<Employee[]> | null {
    return this.repository.getAll();
  }

  getById(id: string): Promise<Employee> | null {
    return this.getEmployeeById(id);
  }

  async create(employeeDto: employeeDto): Promise<Employee | null> {
    const alreadyExists = await this.isEmployeeAlreadyExists(employeeDto.email);
    if(!alreadyExists){

      const address = new Address();
      address.addressLine1 = employeeDto.address.addressLine1;
      address.addressLine2 = employeeDto.address.addressLine2;
      address.city = employeeDto.address.city;
      address.state = employeeDto.address.state;
      address.country = employeeDto.address.country;
      address.pincode = employeeDto.address.pincode;
  
      const employee = new Employee();
      employee.name = employeeDto.name;
      employee.email = employeeDto.email;
      employee.role = employeeDto.role;
      employee.experience = employeeDto.experience;
      employee.departmentId = employeeDto.departmentId;
      employee.joiningDate = employeeDto.joiningDate;
      employee.isActive = employeeDto.isActive;
      employee.password = await bcrypt.hash(employeeDto.password, 10);
      employee.address = address;

      return this.repository.save(employee);
    }else{
      throw new HttpException(401, "An employee with the same email is already exists");
    }

  }

  async update(id: string, employeeDto: employeeDto): Promise<Employee | null> {
    const employee = await this.getEmployeeById(id);

    employee.name = employeeDto.name;
    employee.email = employeeDto.email;
    employee.role = employeeDto.role;
    employee.experience = employeeDto.experience;
    employee.departmentId = employeeDto.departmentId;
    employee.joiningDate = employeeDto.joiningDate;
    employee.isActive = employeeDto.isActive;
    employee.address.addressLine1 = employeeDto.address.addressLine1;
    employee.address.addressLine2 = employeeDto.address.addressLine2;
    employee.address.city = employeeDto.address.city;
    employee.address.state = employeeDto.address.state;
    employee.address.country = employeeDto.address.country;
    employee.address.pincode = employeeDto.address.pincode;

    return this.repository.save(employee);
  }

  async softRemove(id: string): Promise<void> {
    const employee = await this.getEmployeeById(id);
    this.repository.softRemove(employee);
  }
}

export default EmployeeService;

import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import { Role } from "../../utils/role.enum";
import Address from "../../entity/address.entity";
import bcrypt from "bcrypt";
import { plainToInstance } from "class-transformer";
import EmployeeDto from "../../dto/employee.dto";
import LoginDto from "../../dto/login.dto";
import { jwtPayload } from "../../utils/jwtPayload.type";
import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET_KET } from "../../config";


describe("Employee service tests", () => {
  let employeeService: EmployeeService;
  let employeeRepository: EmployeeRepository;

  let getAllMockFn = jest.fn();
  let getByMockFn = jest.fn();
  let saveMockFn = jest.fn();
  let softRemoveMockFn = jest.fn();

  beforeAll(() => {
    employeeRepository = {
      getAll: getAllMockFn,
      getBy: getByMockFn,
      save: saveMockFn,
      softRemove: softRemoveMockFn,
    } as unknown as EmployeeRepository;

    employeeService = new EmployeeService(employeeRepository);
  });

  describe('Test for login', () => {
    test('Test for invalid email and password', async() => {
      const email = "sahal@gmail.com"
      const password = "sahal@123"

      const mockEmployee: Employee = {
        name: "Sahal Mohamed",
        email,
        password: "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa",
        joiningDate: "11/02/2012",
        experience: 8,
        departmentId: "2",
        isActive: true,
        address: {
          addressLine1: "Kunnummal (H)",
          addressLine2: "Kunnumpuram",
          city: "Malappuram",
          state: "Kerala",
          country: "India",
          pincode: "676320",
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
        } as unknown as Address,
        role: Role.ADMIN,
        deletedAt: null,
        createdAt: new Date("2022-10-04T08:58:29.669Z"),
        updatedAt: new Date("2022-10-04T08:58:29.669Z"),
        id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
      } as unknown as Employee;

      const inputLogin = {
        email,
        password
      }

      // const matchData = {
      //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b206aWQiOiIxOTFhMmM4NS02MDRmLTRiNWQtYTJkMS01MjQzYTNiMzhhOGYiLCJjdXN0b206dXNlcm5hbWUiOiJhc2giLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjQ4OTM3NjcsImV4cCI6MTY2NDg5NzM2N30._F1o-KZAiy2QVN1XJFYWQFscT08tuaZq-YimrO9h2gE",
      //     "employeeDetails": {
      //       name: "Sahal Mohamed",
      //       email: "sahal@gmail.com",
      //       password:
      //         "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa",
      //       joiningDate: "11/02/2012",
      //       experience: 8,
      //       departmentId: "2",
      //       isActive: true,
      //       address: {
      //         addressLine1: "Edachira",
      //         addressLine2: "Kakkanad",
      //         city: "Ernakulam",
      //         state: "Kerala",
      //         country: "India",
      //         pincode: "682024",
      //         deletedAt: null,
      //         createdAt: new Date("2022-10-04T08:58:29.669Z"),
      //         updatedAt: new Date("2022-10-04T08:58:29.669Z"),
      //         id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
      //       } as unknown as Address,
      //       role: Role.ADMIN,
      //       deletedAt: null,
      //       createdAt: new Date("2022-10-04T08:58:29.669Z"),
      //       updatedAt: new Date("2022-10-04T08:58:29.669Z"),
      //       id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
      //     }
      // }

      const loginDto = plainToInstance(LoginDto, inputLogin);


      when(employeeRepository.getBy)
        .calledWith({ email: loginDto.email, password: loginDto.password})
        .mockResolvedValueOnce(null);

        const payload: jwtPayload = {
          name: mockEmployee.name,
          email: mockEmployee.email,
          role: mockEmployee.role,
        };

      const mockSign = jest.fn()
      when(mockSign).calledWith(payload, JWT_SECRET_KET, {
        expiresIn: "1h",
      }).mockReturnValueOnce("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b206aWQiOiIxOTFhMmM4NS02MDRmLTRiNWQtYTJkMS01MjQzYTNiMzhhOGYiLCJjdXN0b206dXNlcm5hbWUiOiJhc2giLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjQ4OTM3NjcsImV4cCI6MTY2NDg5NzM2N30._F1o-KZAiy2QVN1XJFYWQFscT08tuaZq-YimrO9h2gE");
      jsonwebtoken.sign = mockSign;

      expect(async () => await employeeService.login(loginDto)).rejects.toThrowError()
    })
  })

  describe("Test for getEmployeeById", () => {
    test('Test for throw error case if there is no department with the id "abcdefg".', () => {
      const id = "abcdefg";

      when(employeeRepository.getBy)
        .calledWith({ id })
        .mockResolvedValueOnce(null);
      expect(async () => {
        await employeeService.getEmployeeById(id);
      }).rejects.toThrowError();
    });
  });

  describe("Test for isEmployeeAlreadyExists", () => {
    test('Test for employee not already exists".', async () => {
      const email = "sahal@gmail.com";

      when(employeeRepository.getBy)
        .calledWith({ email })
        .mockResolvedValueOnce(null);

      const result = await employeeService.isEmployeeAlreadyExists(email);
      expect(result).toBe(false);
    });

    test('Test for employee already exists".', async () => {
      const email = "sahal@gmail.com";

      const mockEmployee: Employee = 
        {
          name: "Sahal Mohamed",
          email: "sahal@gmail.com",
          password:
            "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa",
          joiningDate: "11/02/2012",
          experience: 8,
          departmentId: "2",
          isActive: true,
          address: {
            addressLine1: "Edachira",
            addressLine2: "Kakkanad",
            city: "Ernakulam",
            state: "Kerala",
            country: "India",
            pincode: "682024",
            deletedAt: null,
            createdAt: new Date("2022-10-04T08:58:29.669Z"),
            updatedAt: new Date("2022-10-04T08:58:29.669Z"),
            id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
          } as unknown as Address,
          role: Role.ADMIN,
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
        } as unknown as Employee;

      when(employeeRepository.getBy)
        .calledWith({ email })
        .mockResolvedValueOnce(mockEmployee);

      const result = await employeeService.isEmployeeAlreadyExists(email);
      expect(result).toBe(true);
    });
  });

  describe("Test for getAll", () => {
    test("test for success case", async () => {
      const mockEmployees: Employee[] = [
        {
          name: "Sahal Mohamed",
          email: "sahal@gmail.com",
          password:
            "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa",
          joiningDate: "11/02/2012",
          experience: 8,
          departmentId: "2",
          isActive: true,
          address: {
            addressLine1: "Edachira",
            addressLine2: "Kakkanad",
            city: "Ernakulam",
            state: "Kerala",
            country: "India",
            pincode: "682024",
            deletedAt: null,
            createdAt: new Date("2022-10-04T08:58:29.669Z"),
            updatedAt: new Date("2022-10-04T08:58:29.669Z"),
            id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
          } as unknown as Address,
          role: Role.ADMIN,
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
        },
      ] as unknown as Employee[];

      const matchEmployees = [
        {
          name: "Sahal Mohamed",
          email: "sahal@gmail.com",
          password:
            "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa",
          joiningDate: "11/02/2012",
          experience: 8,
          departmentId: "2",
          isActive: true,
          address: {
            addressLine1: "Edachira",
            addressLine2: "Kakkanad",
            city: "Ernakulam",
            state: "Kerala",
            country: "India",
            pincode: "682024",
            deletedAt: null,
            createdAt: new Date("2022-10-04T08:58:29.669Z"),
            updatedAt: new Date("2022-10-04T08:58:29.669Z"),
            id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
          } as unknown as Address,
          role: Role.ADMIN,
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
        },
      ] as unknown as Employee[];

      getAllMockFn.mockResolvedValueOnce(mockEmployees);
      const outputEmployees = await employeeService.getAll();
      expect(outputEmployees).toMatchObject(matchEmployees);
    });

    test("Test for empty result", async () => {
      getAllMockFn.mockResolvedValueOnce([]);
      const outputEmployees = await employeeService.getAll();
      expect(outputEmployees).toMatchObject([]);
    });
  });

  describe("Test for getBy", () => {
    test("Test for getting employee by id", async () => {
      const id = "abcdef";

      const mockEmployee: Employee = {
        name: "Sahal Mohamed",
        email: "sahal@gmail.com",
        password:
          "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa",
        joiningDate: "11/02/2012",
        experience: 8,
        departmentId: "2",
        isActive: true,
        address: {
          addressLine1: "Kunnummal (H)",
          addressLine2: "Kunnumpuram",
          city: "Malappuram",
          state: "Kerala",
          country: "India",
          pincode: "676320",
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
        } as unknown as Address,
        role: Role.ADMIN,
        deletedAt: null,
        createdAt: new Date("2022-10-04T08:58:29.669Z"),
        updatedAt: new Date("2022-10-04T08:58:29.669Z"),
        id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
      } as unknown as Employee;

      const matchEmployee = {
        name: "Sahal Mohamed",
        email: "sahal@gmail.com",
        password:
          "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa",
        joiningDate: "11/02/2012",
        experience: 8,
        departmentId: "2",
        isActive: true,
        address: {
          addressLine1: "Kunnummal (H)",
          addressLine2: "Kunnumpuram",
          city: "Malappuram",
          state: "Kerala",
          country: "India",
          pincode: "676320",
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
        },
        role: Role.ADMIN,
        deletedAt: null,
        createdAt: new Date("2022-10-04T08:58:29.669Z"),
        updatedAt: new Date("2022-10-04T08:58:29.669Z"),
        id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
      };

      when(employeeRepository.getBy)
        .calledWith({ id })
        .mockResolvedValueOnce(mockEmployee);
      const outputDepartment = await employeeService.getById(id);
      expect(outputDepartment).toMatchObject(matchEmployee);
    });
  });

  describe("Test for create", () => {
    test("Test for success case", async () => {
      const name = "Sahal Mohamed";
      const email = "sahal@gmail.com";
      const password = "sahal@123";
      const joiningDate = "01/08/2023";
      const role = "admin";
      const experience = 8;
      const departmentId = "3ad1abbd-572f-48c1-9d6b-4c076c533892";
      const addressLine1 = "Kunnummal (H)";
      const addressLine2 = "Kunnumpuram";
      const city = "Malappuram";
      const state = "Kerala";
      const country = "India";
      const pincode = "676320";

      const hashPassword = "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa";

      const mockEmployee: Employee = {
        name,
        email,
        password: hashPassword,
        joiningDate,
        experience,
        departmentId,
        isActive: true,
        address: {
          addressLine1,
          addressLine2,
          city,
          state,
          country,
          pincode,
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
        } as unknown as Address,
        role,
        deletedAt: null,
        createdAt: new Date("2022-10-04T08:58:29.669Z"),
        updatedAt: new Date("2022-10-04T08:58:29.669Z"),
        id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
      } as unknown as Employee;

      const inputEmployee = {
        name,
        email,
        joiningDate,
        experience,
        departmentId,
        address: {
          addressLine1,
          addressLine2,
          city,
          state,
          country,
          pincode
        },
        role,
      }

      const matchEmployee =  {
        name: "Sahal Mohamed",
        email: "sahal@gmail.com",
        password:
          "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa",
        joiningDate:"01/08/2023",
        experience: 8,
        departmentId: "3ad1abbd-572f-48c1-9d6b-4c076c533892",
        isActive: true,
        address: {
          addressLine1: "Kunnummal (H)",
          addressLine2: "Kunnumpuram",
          city: "Malappuram",
          state: "Kerala",
          country: "India",
          pincode: "676320",
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
        },
        role: Role.ADMIN,
        deletedAt: null,
        createdAt: new Date("2022-10-04T08:58:29.669Z"),
        updatedAt: new Date("2022-10-04T08:58:29.669Z"),
        id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
      }
      const employeeDto = plainToInstance(EmployeeDto, inputEmployee);

      when(employeeRepository.getBy).calledWith({email: employeeDto.email}).mockResolvedValueOnce(null)

      saveMockFn.mockResolvedValueOnce(mockEmployee);

      const mockHashFn = jest.fn();
      when(mockHashFn).calledWith(password, 10).mockResolvedValueOnce(hashPassword);
      bcrypt.hash = mockHashFn

      const outputEmployee = await employeeService.create(employeeDto);
      expect(outputEmployee).toMatchObject(matchEmployee);
    });

    test('Test for throw error when a employee created with already existing email', async () => {
      const name = "Sahal Mohamed";
      const email = "sahal@gmail.com";
      const password = "sahal@123";
      const joiningDate = "01/08/2023";
      const role = "admin";
      const experience = 8;
      const departmentId = "3ad1abbd-572f-48c1-9d6b-4c076c533892";
      const addressLine1 = "Kunnummal (H)";
      const addressLine2 = "Kunnumpuram";
      const city = "Malappuram";
      const state = "Kerala";
      const country = "India";
      const pincode = "676320";

      const hashPassword = "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa";

      const mockEmployee: Employee = {
        name,
        email,
        password: hashPassword,
        joiningDate,
        experience,
        departmentId,
        isActive: true,
        address: {
          addressLine1,
          addressLine2,
          city,
          state,
          country,
          pincode,
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
        } as unknown as Address,
        role,
        deletedAt: null,
        createdAt: new Date("2022-10-04T08:58:29.669Z"),
        updatedAt: new Date("2022-10-04T08:58:29.669Z"),
        id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
      } as unknown as Employee;

      const inputEmployee = {
        name,
        email,
        joiningDate,
        experience,
        departmentId,
        address: {
          addressLine1,
          addressLine2,
          city,
          state,
          country,
          pincode
        },
        role,
      }

      const matchEmployee =  {
        name: "Sahal Mohamed",
        email: "sahal@gmail.com",
        password:
          "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa",
        joiningDate:"01/08/2023",
        experience: 8,
        departmentId: "3ad1abbd-572f-48c1-9d6b-4c076c533892",
        isActive: true,
        address: {
          addressLine1: "Kunnummal (H)",
          addressLine2: "Kunnumpuram",
          city: "Malappuram",
          state: "Kerala",
          country: "India",
          pincode: "676320",
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
        },
        role: Role.ADMIN,
        deletedAt: null,
        createdAt: new Date("2022-10-04T08:58:29.669Z"),
        updatedAt: new Date("2022-10-04T08:58:29.669Z"),
        id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
      }


      when(employeeRepository.getBy).calledWith({email}).mockResolvedValueOnce(mockEmployee)

      saveMockFn.mockRejectedValueOnce(null);

      const mockHashFn = jest.fn();
      when(mockHashFn).calledWith(password, 10).mockResolvedValueOnce(hashPassword);
      bcrypt.hash = mockHashFn

      const employeeDto = plainToInstance(EmployeeDto, inputEmployee);
      expect(async () => await employeeService.create(employeeDto)).rejects.toThrowError();
    })
  });

  describe('Test for update', () => {
    test("Test for success case", async () => {
      const id = "abcd"

      const name = "Sahal Mohamed";
      const email = "sahal@gmail.com";
      const joiningDate = "01/08/2023";
      const role = "admin";
      const experience = 8;
      const departmentId = "3ad1abbd-572f-48c1-9d6b-4c076c533892";
      const addressLine1 = "Kunnummal (H)";
      const addressLine2 = "Kunnumpuram";
      const city = "Malappuram";
      const state = "Kerala";
      const country = "India";
      const pincode = "676320";
      const isActive = true;

      const hashPassword = "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa";

      const mockEmployee: Employee = {
        name,
        email,
        password: hashPassword,
        joiningDate,
        experience,
        departmentId,
        isActive,
        address: {
          addressLine1,
          addressLine2,
          city,
          state,
          country,
          pincode,
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
        } as unknown as Address,
        role,
        deletedAt: null,
        createdAt: new Date("2022-10-04T08:58:29.669Z"),
        updatedAt: new Date("2022-10-04T08:58:29.669Z"),
        id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
      } as unknown as Employee;

      const inputEmployee = {
        name,
        email,
        joiningDate,
        experience,
        departmentId,
        isActive,
        address: {
          addressLine1,
          addressLine2,
          city,
          state,
          country,
          pincode
        },
        role,
      }

      const matchEmployee =  {
        name: "Sahal Mohamed",
        email: "sahal@gmail.com",
        password:
          "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa",
        joiningDate:"01/08/2023",
        experience: 8,
        departmentId: "3ad1abbd-572f-48c1-9d6b-4c076c533892",
        isActive: true,
        address: {
          addressLine1: "Kunnummal (H)",
          addressLine2: "Kunnumpuram",
          city: "Malappuram",
          state: "Kerala",
          country: "India",
          pincode: "676320",
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
        },
        role: Role.ADMIN,
        deletedAt: null,
        createdAt: new Date("2022-10-04T08:58:29.669Z"),
        updatedAt: new Date("2022-10-04T08:58:29.669Z"),
        id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
      }
      const employeeDto = plainToInstance(EmployeeDto, inputEmployee);

      when(employeeRepository.getBy).calledWith({id}).mockResolvedValueOnce(mockEmployee)

      saveMockFn.mockResolvedValueOnce(mockEmployee);

      const outputEmployee = await employeeService.update(id, employeeDto);
      expect(outputEmployee).toMatchObject(matchEmployee);
    });
  });

  describe('Test for softDelete', () => {
    test('Test for success', () => {
      const id = "abcd"
      const mockEmployee: Employee = {
        name: "Sahal Mohamed",
        email: "sahal@gmail.com",
        password:
          "$2b$10$BaPO4JD98lPNi6yDxpNTX.d30gZlyslAATuo/8ZwupTmlg7pA1LWa",
        joiningDate: "11/02/2012",
        experience: 8,
        departmentId: "2",
        isActive: true,
        address: {
          addressLine1: "Kunnummal (H)",
          addressLine2: "Kunnumpuram",
          city: "Malappuram",
          state: "Kerala",
          country: "India",
          pincode: "676320",
          deletedAt: null,
          createdAt: new Date("2022-10-04T08:58:29.669Z"),
          updatedAt: new Date("2022-10-04T08:58:29.669Z"),
          id: "5ab12a9c-c870-4593-85d3-238cbd8e2749",
        } as unknown as Address,
        role: Role.ADMIN,
        deletedAt: null,
        createdAt: new Date("2022-10-04T08:58:29.669Z"),
        updatedAt: new Date("2022-10-04T08:58:29.669Z"),
        id: "191a2c85-604f-4b5d-a2d1-5243a3b38a8f",
      } as unknown as Employee;

        when(employeeRepository.getBy)
        .calledWith({id})
        .mockResolvedValueOnce(mockEmployee);
        softRemoveMockFn.mockResolvedValueOnce(null);
        expect(async () => await employeeService.softRemove(id)).not.toThrowError()
    })
  });
});

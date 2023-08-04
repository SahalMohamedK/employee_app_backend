import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import dataSource from "../../db/postgres.db";
import { when } from "jest-when";
import e from "express";

describe('Employee service tests', () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;

    beforeAll(() => {
        employeeRepository = {
            getBy: jest.fn()
        } as unknown as EmployeeRepository;

        employeeService = new EmployeeService(employeeRepository)
    })

    describe('Test for getById', () => {
        test('test for throw error case if the employee is null', async () =>{
            when(employeeRepository.getBy).calledWith({id: 1}).mockResolvedValueOnce(null)
            expect(async()=>{ await employeeService.getById(1)}).rejects.toThrowError()
        })

        test('test for success case', async () => {
            const employee: Employee = {
                id: 1,
                name: "Name",
                email: "email@gmail.com",
                age: null,
                password: "test",
                address: {
                    id: 1,
                    line1: "test",
                    pincode: "12345",
                    createdAt: new Date("1/1/1998"),
                    updatedAt: new Date("1/1/1998"),
                    deletedAt: null
                },
                createdAt: new Date("1/1/1998"),
                updatedAt: new Date("1/1/1998"),
                deletedAt: null

            } as Employee;

            const checkEmp = {...employee}

            when(employeeRepository.getBy).calledWith({id: 1}).mockResolvedValueOnce(employee)
            const testEmp = await employeeService.getById(1)
            expect(testEmp).toMatchObject(checkEmp)
        })
    })
})
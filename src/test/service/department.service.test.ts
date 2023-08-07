import { when } from "jest-when";
import DepartmentRepository from "../../repository/department.repository";
import DepartmentService from "../../service/department.service";
import Department from "../../entity/department.entity";
import DepartmentDto from "../../dto/department.dto";
import { plainToInstance } from "class-transformer";

describe("Department service tests", () => {
  let departmentService: DepartmentService;
  let departmentRepository: DepartmentRepository;

  let getAllMockFn = jest.fn();
  let getByIdMockFn = jest.fn();
  let saveMockFn = jest.fn();
  let softRemoveMockFn = jest.fn();

  beforeAll(() => {
    departmentRepository = {
      getAll: getAllMockFn,
      getById: getByIdMockFn,
      save: saveMockFn,
      softRemove: softRemoveMockFn,
    } as unknown as DepartmentRepository;

    departmentService = new DepartmentService(departmentRepository);
  });

  describe("Test for getDepartmentById", () => {
    test('Test for throw error case if there is no department with the id "abcdefg".', () => {
      const id = "abcdefg";

      when(departmentRepository.getById)
        .calledWith(id)
        .mockResolvedValueOnce(null);
      expect(async () => {
        await departmentService.getById(id);
      }).rejects.toThrowError();
    });
  });

  describe("Test for getAll", () => {
    test("Test for success case", async () => {
      const mockDepartments: Department[] = [
        {
          createdAt: new Date("2022-10-04T09:05:26.989Z"),
          updatedAt: new Date("2022-10-04T09:05:26.989Z"),
          deletedAt: new Date("2022-10-04T09:05:26.989Z"),
          id: "abcd",
          name: "Hr",
        },
      ] as Department[];

      const matchDepartments = [
        {
          createdAt: new Date("2022-10-04T09:05:26.989Z"),
          updatedAt: new Date("2022-10-04T09:05:26.989Z"),
          deletedAt: new Date("2022-10-04T09:05:26.989Z"),
          id: "abcd",
          name: "Hr",
        },
      ];

      getAllMockFn.mockResolvedValueOnce(mockDepartments);
      const outputDepartments = await departmentService.getAll();
      expect(outputDepartments).toMatchObject(matchDepartments);
    });

    test("Test for empty result", async () => {
      getAllMockFn.mockResolvedValueOnce([]);
      const outputDepartments = await departmentService.getAll();
      expect(outputDepartments).toMatchObject([]);
    });
  });

  describe('Test for getById', () => {
    test("Test for success case", async () => {
      const id = "abcdef";

      const mockDepartment: Department = {
        createdAt: new Date("2022-10-04T09:05:26.989Z"),
        updatedAt: new Date("2022-10-04T09:05:26.989Z"),
        deletedAt: new Date("2022-10-04T09:05:26.989Z"),
        id: "abcd",
        name: "Hr",
      } as Department;

      const matchDepartment = {
        createdAt: new Date("2022-10-04T09:05:26.989Z"),
        updatedAt: new Date("2022-10-04T09:05:26.989Z"),
        deletedAt: new Date("2022-10-04T09:05:26.989Z"),
        id: "abcd",
        name: "Hr",
      };

      when(departmentRepository.getById)
        .calledWith(id)
        .mockResolvedValueOnce(mockDepartment);
      const outputDepartment = await departmentService.getById(id);
      expect(outputDepartment).toMatchObject(matchDepartment);
    });
  } )

  describe("Test for create", () => {
    test("Test for success case", async () => {
      const name = "Hr";

      const mockDepartment: Department = {
        createdAt: new Date("2022-10-04T09:05:26.989Z"),
        updatedAt: new Date("2022-10-04T09:05:26.989Z"),
        deletedAt: null,
        id: "abcd",
        name: name,
      } as unknown as Department;

      const inputDepartment = {
        name: name,
      };

      const matchDepartment = {
        createdAt: new Date("2022-10-04T09:05:26.989Z"),
        updatedAt: new Date("2022-10-04T09:05:26.989Z"),
        deletedAt: null,
        id: "abcd",
        name: "Hr",
      };

      const departmentDto: DepartmentDto = plainToInstance(
        DepartmentDto,
        inputDepartment
      );

      saveMockFn.mockResolvedValueOnce(mockDepartment);
      const outputDepartment = await departmentService.create(departmentDto);
      expect(outputDepartment).toMatchObject(matchDepartment);
    });

    test("Test for if repository.save gives null", async () => {
      const matchDepartment = { name: "Hr" };

      const departmentDto: DepartmentDto = plainToInstance(
        DepartmentDto,
        matchDepartment
      );

      saveMockFn.mockResolvedValueOnce(null);
      const outputDepartment = await departmentService.create(departmentDto);
      expect(outputDepartment).toBe(null);
    });
  });

  describe("Test for update", () => {
    test("Test for success case", async () => {
      const name = "Hr";
      const id = "abcdef";

      const mockDepartment: Department = {
        createdAt: new Date("2022-10-04T09:05:26.989Z"),
        updatedAt: new Date("2022-10-04T09:05:26.989Z"),
        deletedAt: null,
        id,
        name,
      } as unknown as Department;

      const inputDepartment = { name };

      const matchDepartment = {
        createdAt: new Date("2022-10-04T09:05:26.989Z"),
        updatedAt: new Date("2022-10-04T09:05:26.989Z"),
        deletedAt: null,
        id: "abcdef",
        name: "Hr",
      };

      const departmentDto: DepartmentDto = plainToInstance(
        DepartmentDto,
        inputDepartment
      );

      when(departmentRepository.getById)
        .calledWith(id)
        .mockResolvedValueOnce(mockDepartment);
      saveMockFn.mockResolvedValueOnce(mockDepartment);
      const outputDepartment = await departmentService.update(
        id,
        departmentDto
      );
      expect(outputDepartment).toMatchObject(matchDepartment);
    });
  });

  describe('Test for delete', () => {
    test('Test for success case', () => {
        const id = "abcd"
        const mockDepartment: Department = {
            createdAt: new Date("2022-10-04T09:05:26.989Z"),
            updatedAt: new Date("2022-10-04T09:05:26.989Z"),
            deletedAt: null,
            id,
            name: "test",
          } as unknown as Department;

        when(departmentRepository.getById)
        .calledWith(id)
        .mockResolvedValueOnce(mockDepartment);
        softRemoveMockFn.mockResolvedValueOnce(null);
        expect(async () => await departmentService.softRemove(id)).not.toThrowError()
    })
  })
});

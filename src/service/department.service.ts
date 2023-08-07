import DepartmentDto from "../dto/department.dto";
import Department from "../entity/department.entity";
import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService{
    constructor(private repository: DepartmentRepository){}

    async getDepartmentById(id: string): Promise<Department | null>{
        const department = await this.repository.getById(id)
        if (!department) {
          throw new HttpException(400, `Department not found with id: ${id}`);
        }
        return department;
      }

    getAll(): Promise<Department[]>{
        return this.repository.getAll()
    }

    getById(id: string): Promise<Department>{
        return this.getDepartmentById(id)
    }

    create(departmentDto: DepartmentDto): Promise<Department | null>{
        const department = new Department();
        department.name = departmentDto.name;
        return this.repository.save(department)
    }

    async update(id:  string, departmentDto: DepartmentDto): Promise<Department | null>{
        const department = await this.getDepartmentById(id);
        department.name = departmentDto.name;
        return this.repository.save(department)
    }

    async softRemove(id: string){
        const department = await this.getDepartmentById(id);
        this.repository.softRemove(department);
    }
}

export default DepartmentService;
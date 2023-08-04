import { Repository } from "typeorm";
import Department from "../entity/department.entity";

class DepartmentRepository {
  constructor(private repository: Repository<Department>) {}

  getAll(): Promise<Department[]> {
    return this.repository.find();
  }

  getById(id: number): Promise<Department> {
    return this.repository.findOneBy({id});
  }

  save(department: Department): Promise<Department> {
    return this.repository.save(department);
  }

  softRemove(department: Department): void {
    this.repository.softRemove(department);
  }
}

export default DepartmentRepository;

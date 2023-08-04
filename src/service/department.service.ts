import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService{
    constructor(private repository: DepartmentRepository){}

    getAll(): Promise<Department[]>{
        return this.repository.getAll()
    }

    getById(id: number): Promise<Department>{
        return this.repository.getById(id)
    }

    create(){

    }

    update(id:  number): Promise<Department | null>{
        return
    }

    softRemove(id: number){

    }
}
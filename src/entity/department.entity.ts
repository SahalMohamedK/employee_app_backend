import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Employee from "./employee.entity";
import AbstractEntity from "./abstract.entity";

@Entity()
class Department extends AbstractEntity{
    @Column()
    name: string;

    @OneToMany(() => Employee, employee => employee.department)
    employees: Employee[];
}

export default Department;
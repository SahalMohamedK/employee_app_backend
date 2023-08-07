import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne
} from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract.entity";
import { Role } from "../utils/role.enum";
import Department from "./department.entity";

@Entity()
class Employee extends AbstractEntity{

  @Column()
  name: string;

  @Column({unique: true })
  email: string;

  @Column()
  password: string; 

  @Column({ nullable: true })
  age: number;

  @OneToOne(() => Address, (address) => address.employee, { cascade: true })
  address: Address;

  @Column({default: Role.DEVELOPER})
  role: Role;

  @Column()
  experience: number;

  @ManyToOne(() => Department, department => department.employees)
  @JoinColumn()
  department: Department

  @Column()
  departmentId: string;

  @Column({type: 'date'})
  joiningDate: string

  @Column({default: true})
  isActive: boolean;
}

export default Employee;

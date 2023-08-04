import {
  Column,
  Entity,
  OneToOne
} from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract.entity";
import { Role } from "../utils/role.enum";

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
}

export default Employee;

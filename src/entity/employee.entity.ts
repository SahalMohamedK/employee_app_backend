import {
  Column,
  Entity,
  OneToOne,
  Unique,
} from "typeorm";
import Address from "./address.entity";
import AbstractEntity from "./abstract.entity";

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
}

export default Employee;

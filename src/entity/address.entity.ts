import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from "typeorm";
import Employee from "./employee.entity";
import AbstractEntity from "./abstract.entity";

@Entity()
class Address extends AbstractEntity{
  @OneToOne(() => Employee, (employee) => employee.address)
  @JoinColumn()
  employee: Employee;

  @Column()
  line1: string;

  @Column()
  pincode: string;
}

export default Address;

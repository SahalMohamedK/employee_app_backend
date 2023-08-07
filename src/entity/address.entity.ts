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

  @Column({default: ''})
  addressLine1: string;

  @Column({default: ''})
  addressLine2: string;

  @Column({default: ''})
  city: string;

  @Column({default: ''})
  state: string;

  @Column({default: ''})
  country: string;

  @Column({default: ''})
  pincode: string;
}

export default Address;

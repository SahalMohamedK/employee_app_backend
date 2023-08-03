import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Employee from "./employee.entity";

@Entity()
class Address{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Employee, employee => employee.address)
    @JoinColumn()
    employee: Employee

    @Column()
    line1: string;

    @Column()
    pincode: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;
}

export default Address
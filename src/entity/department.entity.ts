import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Department{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}

export default Department;
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import addressDto from "./asdress.dto";
import { Role } from "../utils/role.enum";

class EmployeeDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNumber()
    @IsOptional()
    age: number;

    @IsNotEmpty()
    @ValidateNested({each: true})
    @Type(() => addressDto)
    address: Address;

    @IsNotEmpty()
    @IsString()
    departmentId: string;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role;

    @IsNotEmpty()
    @IsNumber()
    experience: number;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsString()
    @IsNotEmpty()
    joiningDate: string;
}

export default EmployeeDto
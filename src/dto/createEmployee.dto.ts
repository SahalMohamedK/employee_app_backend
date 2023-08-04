import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import Address from "../entity/address.entity";
import { Type } from "class-transformer";
import CreateAddressDto from "./createAddress.dto";
import { Role } from "../utils/role.enum";

class CreateEmplopyeeDto{
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
    @Type(() => CreateAddressDto)
    address: Address;

    @IsNotEmpty()
    @IsEnum(Role)
    role: Role
}

export default CreateEmplopyeeDto
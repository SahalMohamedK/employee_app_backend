import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class LoginEmplopyeeDto{
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export default LoginEmplopyeeDto
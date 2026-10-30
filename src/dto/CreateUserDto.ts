import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { USER_STATUSES, type UserStatus } from "../models/User.js";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    name: string;

    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsOptional()
    @IsIn(USER_STATUSES)
    status?: UserStatus;
}

import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    code: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsOptional()
    @IsString()
    description?: string | null;

    @IsInt()
    @IsPositive()
    userId: number;
}

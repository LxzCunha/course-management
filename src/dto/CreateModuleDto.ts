import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from "class-validator";

export class CreateModuleDto {
    @IsInt()
    @IsPositive()
    courseId: number;

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

import { IsInt, IsNotEmpty, IsPositive, IsString, MaxLength } from "class-validator";

export class CreateContentDto {
    @IsInt()
    @IsPositive()
    moduleId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}

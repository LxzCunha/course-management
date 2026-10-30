import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./CreateUserDto.js";

export class UpdateUserDto extends PartialType(CreateUserDto) {}

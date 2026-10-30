import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseDto } from "./CreateCourseDto.js";

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}

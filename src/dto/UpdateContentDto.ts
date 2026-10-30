import { PartialType } from "@nestjs/mapped-types";
import { CreateContentDto } from "./CreateContentDto.js";

export class UpdateContentDto extends PartialType(CreateContentDto) {}

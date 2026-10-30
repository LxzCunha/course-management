import { PartialType } from "@nestjs/mapped-types";
import { CreateModuleDto } from "./CreateModuleDto.js";

export class UpdateModuleDto extends PartialType(CreateModuleDto) {}

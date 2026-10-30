import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from "@nestjs/common";
import { CreateModuleDto } from "../dto/CreateModuleDto.js";
import { UpdateModuleDto } from "../dto/UpdateModuleDto.js";
import { ModulesService } from "../service/ModulesService.js";

@Controller("modules")
export class ModulesController {
    constructor(private readonly modulesService: ModulesService) {}

    @Get()
    findAll() {
        return this.modulesService.findAll();
    }

    @Get(":id")
    findById(@Param("id", ParseIntPipe) id: number) {
        return this.modulesService.findById(id);
    }

    @Post()
    create(@Body() body: CreateModuleDto) {
        return this.modulesService.create(body);
    }

    @Patch(":id")
    update(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateModuleDto) {
        return this.modulesService.update(id, body);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.modulesService.delete(id);
    }
}

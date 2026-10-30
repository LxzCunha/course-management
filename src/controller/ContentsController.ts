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
import { CreateContentDto } from "../dto/CreateContentDto.js";
import { UpdateContentDto } from "../dto/UpdateContentDto.js";
import { ContentsService } from "../service/ContentsService.js";

@Controller("contents")
export class ContentsController {
    constructor(private readonly contentsService: ContentsService) {}

    @Get()
    findAll() {
        return this.contentsService.findAll();
    }

    @Get(":id")
    findById(@Param("id", ParseIntPipe) id: number) {
        return this.contentsService.findById(id);
    }

    @Post()
    create(@Body() body: CreateContentDto) {
        return this.contentsService.create(body);
    }

    @Patch(":id")
    update(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateContentDto) {
        return this.contentsService.update(id, body);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.contentsService.delete(id);
    }
}

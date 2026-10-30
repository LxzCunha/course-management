import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { CreateCourseDto } from "../dto/CreateCourseDto.js";
import { UpdateCourseDto } from "../dto/UpdateCourseDto.js";
import { ParseIdPipe } from "../pipes/ParseIdPipe.js";
import { CoursesService } from "../service/CoursesService.js";

@Controller("courses")
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(":id")
    findById(@Param("id", ParseIdPipe) id: number) {
        return this.coursesService.findById(id);
    }

    @Post()
    create(@Body() body: CreateCourseDto) {
        return this.coursesService.create(body);
    }

    @Patch(":id")
    update(@Param("id", ParseIdPipe) id: number, @Body() body: UpdateCourseDto) {
        return this.coursesService.update(id, body);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIdPipe) id: number) {
        return this.coursesService.delete(id);
    }
}

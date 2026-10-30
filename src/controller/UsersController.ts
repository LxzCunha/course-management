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
import { CreateUserDto } from "../dto/CreateUserDto.js";
import { UpdateUserDto } from "../dto/UpdateUserDto.js";
import { UsersService } from "../service/UsersService.js";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(":id")
    findById(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.findById(id);
    }

    @Post()
    create(@Body() body: CreateUserDto) {
        return this.usersService.create(body);
    }

    @Patch(":id")
    update(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
        return this.usersService.update(id, body);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}

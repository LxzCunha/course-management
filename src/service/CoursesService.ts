import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import type { CreateCourseDto } from "../dto/CreateCourseDto.js";
import type { UpdateCourseDto } from "../dto/UpdateCourseDto.js";
import { isForeignKeyViolation, isUniqueViolation } from "../errors/DatabaseErrors.js";
import { CoursesRepository } from "../repository/CoursesRepository.js";

@Injectable()
export class CoursesService {
    constructor(private readonly coursesRepository: CoursesRepository) {}

    findAll() {
        return this.coursesRepository.findAll();
    }

    async findById(id: number) {
        const course = await this.coursesRepository.findById(id);
        if (!course) {
            throw new NotFoundException(`Course ${id} not found`);
        }
        return course;
    }

    create(data: CreateCourseDto) {
        return this.coursesRepository.create(data).catch((error) => this.rethrowConstraintError(error, data));
    }

    async update(id: number, data: UpdateCourseDto) {
        const course = await this.coursesRepository
            .update(id, data)
            .catch((error) => this.rethrowConstraintError(error, data));
        if (!course) {
            throw new NotFoundException(`Course ${id} not found`);
        }
        return course;
    }

    async delete(id: number) {
        const deleted = await this.coursesRepository.delete(id);
        if (!deleted) {
            throw new NotFoundException(`Course ${id} not found`);
        }
    }

    private rethrowConstraintError(error: unknown, data: UpdateCourseDto): never {
        if (isUniqueViolation(error)) {
            throw new ConflictException(`Course code ${data.code} is already in use`);
        }
        if (isForeignKeyViolation(error)) {
            throw new BadRequestException(`User ${data.userId} does not exist`);
        }
        throw error;
    }
}

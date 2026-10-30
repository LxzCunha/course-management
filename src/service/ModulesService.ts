import { BadRequestException, Injectable } from "@nestjs/common";
import type { CreateModuleDto } from "../dto/CreateModuleDto.js";
import type { UpdateModuleDto } from "../dto/UpdateModuleDto.js";
import { getConstraintName, isForeignKeyViolation } from "../errors/DatabaseErrors.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ModulesRepository } from "../repository/ModulesRepository.js";

@Injectable()
export class ModulesService {
    constructor(private readonly modulesRepository: ModulesRepository) {}

    findAll() {
        return this.modulesRepository.findAll();
    }

    async findById(id: number) {
        const module = await this.modulesRepository.findById(id);
        if (!module) {
            throw new NotFoundError("Module", id);
        }
        return module;
    }

    create(data: CreateModuleDto) {
        return this.modulesRepository.create(data).catch((error) => this.rethrowConstraintError(error, data));
    }

    async update(id: number, data: UpdateModuleDto) {
        const module = await this.modulesRepository
            .update(id, data)
            .catch((error) => this.rethrowConstraintError(error, data));
        if (!module) {
            throw new NotFoundError("Module", id);
        }
        return module;
    }

    async delete(id: number) {
        const deleted = await this.modulesRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError("Module", id);
        }
    }

    private rethrowConstraintError(error: unknown, data: UpdateModuleDto): never {
        if (isForeignKeyViolation(error)) {
            const constraint = getConstraintName(error);
            if (constraint === "modules_course_id_foreign") {
                throw new BadRequestException(`Course ${data.courseId} does not exist`);
            }
            if (constraint === "modules_user_id_foreign") {
                throw new BadRequestException(`User ${data.userId} does not exist`);
            }
        }
        throw error;
    }
}

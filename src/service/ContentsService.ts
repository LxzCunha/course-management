import { BadRequestException, Injectable } from "@nestjs/common";
import type { CreateContentDto } from "../dto/CreateContentDto.js";
import type { UpdateContentDto } from "../dto/UpdateContentDto.js";
import { isForeignKeyViolation } from "../errors/DatabaseErrors.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ContentsRepository } from "../repository/ContentsRepository.js";

@Injectable()
export class ContentsService {
    constructor(private readonly contentsRepository: ContentsRepository) {}

    findAll() {
        return this.contentsRepository.findAll();
    }

    async findById(id: number) {
        const content = await this.contentsRepository.findById(id);
        if (!content) {
            throw new NotFoundError("Content", id);
        }
        return content;
    }

    create(data: CreateContentDto) {
        return this.contentsRepository.create(data).catch((error) => this.rethrowConstraintError(error, data));
    }

    async update(id: number, data: UpdateContentDto) {
        const content = await this.contentsRepository
            .update(id, data)
            .catch((error) => this.rethrowConstraintError(error, data));
        if (!content) {
            throw new NotFoundError("Content", id);
        }
        return content;
    }

    async delete(id: number) {
        const deleted = await this.contentsRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError("Content", id);
        }
    }

    private rethrowConstraintError(error: unknown, data: UpdateContentDto): never {
        if (isForeignKeyViolation(error)) {
            throw new BadRequestException(`Module ${data.moduleId} does not exist`);
        }
        throw error;
    }
}

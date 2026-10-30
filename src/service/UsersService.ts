import { ConflictException, Injectable } from "@nestjs/common";
import type { CreateUserDto } from "../dto/CreateUserDto.js";
import type { UpdateUserDto } from "../dto/UpdateUserDto.js";
import { isForeignKeyViolation, isUniqueViolation } from "../errors/DatabaseErrors.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { UsersRepository } from "../repository/UsersRepository.js";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    findAll() {
        return this.usersRepository.findAll();
    }

    async findById(id: number) {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new NotFoundError("User", id);
        }
        return user;
    }

    create(data: CreateUserDto) {
        return this.usersRepository
            .create({ ...data, status: data.status ?? "active" })
            .catch((error) => this.rethrowEmailConflict(error, data.email));
    }

    async update(id: number, data: UpdateUserDto) {
        const user = await this.usersRepository
            .update(id, data)
            .catch((error) => this.rethrowEmailConflict(error, data.email));
        if (!user) {
            throw new NotFoundError("User", id);
        }
        return user;
    }

    async delete(id: number) {
        const deleted = await this.usersRepository.delete(id).catch((error) => {
            if (isForeignKeyViolation(error)) {
                throw new ConflictException(`User ${id} has courses or modules and cannot be deleted`);
            }
            throw error;
        });
        if (!deleted) {
            throw new NotFoundError("User", id);
        }
    }

    private rethrowEmailConflict(error: unknown, email?: string): never {
        if (isUniqueViolation(error)) {
            throw new ConflictException(`Email ${email} is already in use`);
        }
        throw error;
    }
}

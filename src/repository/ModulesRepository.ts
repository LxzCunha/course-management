import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { PG_POOL } from "../database/DatabaseModule.js";
import type { CreateModuleData, Module, UpdateModuleData } from "../models/Module.js";

const MODULE_COLUMNS = `id, course_id AS "courseId", title, description, user_id AS "userId", created_at AS "createdAt", updated_at AS "updatedAt"`;

@Injectable()
export class ModulesRepository {
    constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

    async findAll(): Promise<Module[]> {
        const { rows } = await this.pool.query<Module>(`SELECT ${MODULE_COLUMNS} FROM modules ORDER BY id`);
        return rows;
    }

    async findById(id: number): Promise<Module | undefined> {
        const { rows } = await this.pool.query<Module>(`SELECT ${MODULE_COLUMNS} FROM modules WHERE id = $1`, [id]);
        return rows[0];
    }

    async create(data: CreateModuleData): Promise<Module> {
        const { rows } = await this.pool.query<Module>(
            `
            INSERT INTO modules (course_id, title, description, user_id)
            VALUES ($1, $2, $3, $4)
            RETURNING ${MODULE_COLUMNS}
            `,
            [data.courseId, data.title, data.description ?? null, data.userId],
        );
        return rows[0];
    }

    async update(id: number, data: UpdateModuleData): Promise<Module | undefined> {
        const { rows } = await this.pool.query<Module>(
            `
            UPDATE modules
            SET
                course_id = COALESCE($2, course_id),
                title = COALESCE($3, title),
                description = CASE WHEN $4::boolean THEN $5 ELSE description END,
                user_id = COALESCE($6, user_id),
                updated_at = NOW()
            WHERE id = $1
            RETURNING ${MODULE_COLUMNS}
            `,
            [
                id,
                data.courseId ?? null,
                data.title ?? null,
                data.description !== undefined,
                data.description ?? null,
                data.userId ?? null,
            ],
        );
        return rows[0];
    }

    async delete(id: number): Promise<boolean> {
        const { rowCount } = await this.pool.query("DELETE FROM modules WHERE id = $1", [id]);
        return rowCount === 1;
    }
}

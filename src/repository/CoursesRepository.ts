import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { PG_POOL } from "../database/DatabaseModule.js";
import type { Course, CreateCourseData, UpdateCourseData } from "../models/Course.js";

const COURSE_COLUMNS = `id, code, title, description, user_id AS "userId", created_at AS "createdAt", updated_at AS "updatedAt"`;

@Injectable()
export class CoursesRepository {
    constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

    async findAll(): Promise<Course[]> {
        const { rows } = await this.pool.query<Course>(`SELECT ${COURSE_COLUMNS} FROM courses ORDER BY id`);
        return rows;
    }

    async findById(id: number): Promise<Course | undefined> {
        const { rows } = await this.pool.query<Course>(`SELECT ${COURSE_COLUMNS} FROM courses WHERE id = $1`, [id]);
        return rows[0];
    }

    async create(data: CreateCourseData): Promise<Course> {
        const { rows } = await this.pool.query<Course>(
            `
            INSERT INTO courses (code, title, description, user_id)
            VALUES ($1, $2, $3, $4)
            RETURNING ${COURSE_COLUMNS}
            `,
            [data.code, data.title, data.description ?? null, data.userId],
        );
        return rows[0];
    }

    async update(id: number, data: UpdateCourseData): Promise<Course | undefined> {
        // description is nullable, so it is only changed when the field was sent: null clears it
        const { rows } = await this.pool.query<Course>(
            `
            UPDATE courses
            SET
                code = COALESCE($2, code),
                title = COALESCE($3, title),
                description = CASE WHEN $4::boolean THEN $5 ELSE description END,
                user_id = COALESCE($6, user_id),
                updated_at = NOW()
            WHERE id = $1
            RETURNING ${COURSE_COLUMNS}
            `,
            [
                id,
                data.code ?? null,
                data.title ?? null,
                data.description !== undefined,
                data.description ?? null,
                data.userId ?? null,
            ],
        );
        return rows[0];
    }

    async delete(id: number): Promise<boolean> {
        const { rowCount } = await this.pool.query("DELETE FROM courses WHERE id = $1", [id]);
        return rowCount === 1;
    }
}

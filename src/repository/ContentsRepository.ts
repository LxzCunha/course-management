import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { PG_POOL } from "../database/DatabaseModule.js";
import type { Content, CreateContentData, UpdateContentData } from "../models/Content.js";

const CONTENT_COLUMNS = `id, module_id AS "moduleId", title, content, created_at AS "createdAt", updated_at AS "updatedAt"`;

@Injectable()
export class ContentsRepository {
    constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

    async findAll(): Promise<Content[]> {
        const { rows } = await this.pool.query<Content>(`SELECT ${CONTENT_COLUMNS} FROM contents ORDER BY id`);
        return rows;
    }

    async findById(id: number): Promise<Content | undefined> {
        const { rows } = await this.pool.query<Content>(`SELECT ${CONTENT_COLUMNS} FROM contents WHERE id = $1`, [
            id,
        ]);
        return rows[0];
    }

    async create(data: CreateContentData): Promise<Content> {
        const { rows } = await this.pool.query<Content>(
            `
            INSERT INTO contents (module_id, title, content)
            VALUES ($1, $2, $3)
            RETURNING ${CONTENT_COLUMNS}
            `,
            [data.moduleId, data.title, data.content],
        );
        return rows[0];
    }

    async update(id: number, data: UpdateContentData): Promise<Content | undefined> {
        const { rows } = await this.pool.query<Content>(
            `
            UPDATE contents
            SET
                module_id = COALESCE($2, module_id),
                title = COALESCE($3, title),
                content = COALESCE($4, content),
                updated_at = NOW()
            WHERE id = $1
            RETURNING ${CONTENT_COLUMNS}
            `,
            [id, data.moduleId ?? null, data.title ?? null, data.content ?? null],
        );
        return rows[0];
    }

    async delete(id: number): Promise<boolean> {
        const { rowCount } = await this.pool.query("DELETE FROM contents WHERE id = $1", [id]);
        return rowCount === 1;
    }
}

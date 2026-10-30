import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { PG_POOL } from "../database/DatabaseModule.js";
import type { CreateUserData, UpdateUserData, User } from "../models/User.js";

const USER_COLUMNS = `id, name, email, status, created_at AS "createdAt", updated_at AS "updatedAt"`;

@Injectable()
export class UsersRepository {
    constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

    async findAll(): Promise<User[]> {
        const { rows } = await this.pool.query<User>(`SELECT ${USER_COLUMNS} FROM users ORDER BY id`);
        return rows;
    }

    async findById(id: number): Promise<User | undefined> {
        const { rows } = await this.pool.query<User>(`SELECT ${USER_COLUMNS} FROM users WHERE id = $1`, [id]);
        return rows[0];
    }

    async create(data: CreateUserData): Promise<User> {
        const { rows } = await this.pool.query<User>(
            `
            INSERT INTO users (name, email, status)
            VALUES ($1, $2, $3)
            RETURNING ${USER_COLUMNS}
            `,
            [data.name, data.email, data.status],
        );
        return rows[0];
    }

    async update(id: number, data: UpdateUserData): Promise<User | undefined> {
        const { rows } = await this.pool.query<User>(
            `
            UPDATE users
            SET
                name = COALESCE($2, name),
                email = COALESCE($3, email),
                status = COALESCE($4, status),
                updated_at = NOW()
            WHERE id = $1
            RETURNING ${USER_COLUMNS}
            `,
            [id, data.name ?? null, data.email ?? null, data.status ?? null],
        );
        return rows[0];
    }

    async delete(id: number): Promise<boolean> {
        const { rowCount } = await this.pool.query("DELETE FROM users WHERE id = $1", [id]);
        return rowCount === 1;
    }
}

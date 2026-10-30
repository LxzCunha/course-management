import { Inject, Injectable } from "@nestjs/common";
import { Pool } from "pg";
import { PG_POOL } from "../database/DatabaseModule.js";
import type {
    ContentViewer,
    ContentWithCourse,
    CourseContentCount,
    CourseOverview,
    UserCourseRanking,
} from "../models/ReportsTypes.js";

@Injectable()
export class ReportsRepository {
    constructor(@Inject(PG_POOL) private readonly pool: Pool) {}

    async findUsersWithMostCourses(): Promise<UserCourseRanking[]> {
        const { rows } = await this.pool.query<UserCourseRanking>(`
            SELECT
                u.id,
                u.name,
                u.email,
                COUNT(c.id) AS "courseCount",
                RANK() OVER (ORDER BY COUNT(c.id) DESC) AS rank
            FROM users u
            LEFT JOIN courses c ON c.user_id = u.id
            GROUP BY u.id
            ORDER BY rank, u.name
        `);
        return rows;
    }

    async findCoursesWithMostContents(): Promise<CourseContentCount[]> {
        const { rows } = await this.pool.query<CourseContentCount>(`
            SELECT
                c.id,
                c.code,
                c.title,
                COUNT(ct.id) AS "contentCount"
            FROM courses c
            JOIN modules m ON m.course_id = c.id
            JOIN contents ct ON ct.module_id = m.id
            GROUP BY c.id
            ORDER BY "contentCount" DESC
            FETCH FIRST 1 ROWS WITH TIES
        `);
        return rows;
    }

    async findCoursesOverview(): Promise<CourseOverview[]> {
        const { rows } = await this.pool.query<CourseOverview>(`
            SELECT
                c.id,
                c.code,
                c.title,
                COUNT(DISTINCT m.id) AS "moduleCount",
                COUNT(ct.id) AS "contentCount"
            FROM courses c
            LEFT JOIN modules m ON m.course_id = c.id
            LEFT JOIN contents ct ON ct.module_id = m.id
            GROUP BY c.id
            ORDER BY c.id
        `);
        return rows;
    }

    async findContentsWithCourse(): Promise<ContentWithCourse[]> {
        const { rows } = await this.pool.query<ContentWithCourse>(`
            SELECT
                ct.id,
                ct.title,
                m.title AS "moduleTitle",
                c.title AS "courseTitle"
            FROM contents ct
            JOIN modules m ON m.id = ct.module_id
            JOIN courses c ON c.id = m.course_id
            ORDER BY c.id, m.id, ct.id
        `);
        return rows;
    }

    async findContentViewers(contentId: number): Promise<ContentViewer[]> {
        const { rows } = await this.pool.query<ContentViewer>(
            `
            SELECT
                u.id,
                u.name,
                u.email,
                cv.viewed_at AS "viewedAt"
            FROM content_views cv
            JOIN users u ON u.id = cv.user_id
            WHERE cv.content_id = $1
            ORDER BY cv.viewed_at, u.name
            `,
            [contentId],
        );
        return rows;
    }

    async contentExists(contentId: number): Promise<boolean> {
        const { rowCount } = await this.pool.query("SELECT 1 FROM contents WHERE id = $1", [contentId]);
        return rowCount === 1;
    }
}

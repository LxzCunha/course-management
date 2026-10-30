import type { Knex } from "knex";

const modulesByCourse: Record<string, { title: string; description: string }[]> = {
    "NODE-101": [
        { title: "Introduction to Node.js", description: "What Node.js is, installation and the first script." },
        { title: "Modules and npm", description: "The module system and package management." },
        { title: "Asynchronous programming", description: "Callbacks, Promises and async/await." },
        { title: "File system", description: "Reading and writing files with the fs module." },
        { title: "Building an HTTP server", description: "A simple API with the http module." },
    ],
    "TS-101": [
        { title: "Basic types", description: "Primitive types, arrays and tuples." },
        { title: "Interfaces and types", description: "Modeling objects with interface and type." },
        { title: "Generics", description: "Reusable functions and types with generics." },
    ],
    "SQL-101": [
        { title: "Basic queries", description: "SELECT, WHERE and ORDER BY." },
        { title: "Relationships and JOINs", description: "Combining tables with INNER and LEFT JOIN." },
    ],
};

export async function seed(knex: Knex): Promise<void> {
    await knex.raw("TRUNCATE TABLE modules RESTART IDENTITY CASCADE");

    const courses = await knex("courses").select("id", "code", "user_id").orderBy("id");

    await knex("modules").insert(
        courses.flatMap((course) =>
            (modulesByCourse[course.code] ?? []).map((moduleData) => ({
                ...moduleData,
                course_id: course.id,
                user_id: course.user_id,
            })),
        ),
    );
}

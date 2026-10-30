import type { Knex } from "knex";

type ContentData = { title: string; content: string };

const contentsByCourse: Record<string, Record<string, ContentData[]>> = {
    "NODE-101": {
        "Introduction to Node.js": [
            {
                title: "What is Node.js",
                content: "Node.js is a runtime that executes JavaScript outside the browser, using the V8 engine.",
            },
        ],
        "Modules and npm": [
            {
                title: "Installing packages with npm",
                content: "npm installs the dependencies listed in package.json with the npm install command.",
            },
        ],
        "Asynchronous programming": [
            {
                title: "Understanding Promises",
                content: "A Promise represents a value that will be available in the future, or an error.",
            },
        ],
    },
    "TS-101": {
        "Basic types": [
            {
                title: "string, number and boolean",
                content: "TypeScript's primitive types match JavaScript's primitive types.",
            },
            {
                title: "Arrays and tuples",
                content: "Arrays hold many values of the same type; tuples have a fixed length and a type per position.",
            },
        ],
        "Interfaces and types": [
            {
                title: "Creating interfaces",
                content: "An interface describes the shape of an object: its properties and their types.",
            },
            {
                title: "type vs interface",
                content: "Both describe objects; type also supports unions and primitive types.",
            },
        ],
        Generics: [
            {
                title: "Generic functions",
                content: "Generics let a function work with many types without losing type safety.",
            },
        ],
    },
    "SQL-101": {
        "Basic queries": [
            {
                title: "SELECT and WHERE",
                content: "SELECT picks the columns and WHERE filters the rows returned by the query.",
            },
            {
                title: "Sorting with ORDER BY",
                content: "ORDER BY sorts the result by one or more columns, in ascending or descending order.",
            },
        ],
        "Relationships and JOINs": [
            {
                title: "INNER JOIN",
                content: "INNER JOIN returns only the rows that have a match in both tables.",
            },
            {
                title: "LEFT JOIN",
                content: "LEFT JOIN returns every row from the left table, even without a match.",
            },
        ],
    },
};

export async function seed(knex: Knex): Promise<void> {
    await knex.raw("TRUNCATE TABLE contents RESTART IDENTITY CASCADE");

    const modules = await knex("modules")
        .join("courses", "courses.id", "modules.course_id")
        .select("modules.id", "modules.title", "courses.code")
        .orderBy("modules.id");

    await knex("contents").insert(
        modules.flatMap((moduleRow) =>
            (contentsByCourse[moduleRow.code]?.[moduleRow.title] ?? []).map((contentData) => ({
                ...contentData,
                module_id: moduleRow.id,
            })),
        ),
    );
}

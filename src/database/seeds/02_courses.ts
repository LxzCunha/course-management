import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex.raw("TRUNCATE TABLE courses RESTART IDENTITY CASCADE");

    const users = await knex("users").select("id", "email");
    const userId = Object.fromEntries(users.map((user) => [user.email, user.id]));

    await knex("courses").insert([
        {
            code: "NODE-101",
            title: "Node.js from Scratch",
            description: "Node.js fundamentals for building server-side applications.",
            user_id: userId["ana.souza@example.com"],
        },
        {
            code: "TS-101",
            title: "TypeScript in Practice",
            description: "Static typing for JavaScript, from the basics to generics.",
            user_id: userId["bruno.lima@example.com"],
        },
        {
            code: "SQL-101",
            title: "SQL Fundamentals with PostgreSQL",
            description: "Queries, filters and relationships in relational databases.",
            user_id: userId["carla.mendes@example.com"],
        },
        {
            code: "GIT-101",
            title: "Git and GitHub",
            description: "Source control and team collaboration.",
            user_id: userId["diego.santos@example.com"],
        },
        {
            code: "DOCKER-101",
            title: "Docker for Developers",
            description: "Containers, images and Docker Compose in everyday work.",
            user_id: userId["ana.souza@example.com"],
        },
    ]);
}

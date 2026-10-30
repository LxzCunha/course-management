import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex.raw("TRUNCATE TABLE courses RESTART IDENTITY CASCADE");

    const users = await knex("users").select("id", "email");
    const userId = Object.fromEntries(users.map((user) => [user.email, user.id]));

    await knex("courses").insert([
        {
            code: "NODE-101",
            title: "Node.js do Zero",
            description: "Fundamentos do Node.js para construir aplicações no servidor.",
            user_id: userId["ana.souza@example.com"],
        },
        {
            code: "TS-101",
            title: "TypeScript na Prática",
            description: "Tipagem estática em JavaScript, do básico aos generics.",
            user_id: userId["bruno.lima@example.com"],
        },
        {
            code: "SQL-101",
            title: "Fundamentos de SQL com PostgreSQL",
            description: "Consultas, filtros e relacionamentos em bancos relacionais.",
            user_id: userId["carla.mendes@example.com"],
        },
        {
            code: "GIT-101",
            title: "Git e GitHub",
            description: "Versionamento de código e colaboração em equipe.",
            user_id: userId["diego.santos@example.com"],
        },
        {
            code: "DOCKER-101",
            title: "Docker para Desenvolvedores",
            description: "Containers, imagens e Docker Compose no dia a dia.",
            user_id: userId["ana.souza@example.com"],
        },
    ]);
}

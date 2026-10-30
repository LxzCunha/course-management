import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

    await knex("users").insert([
        { name: "Ana Souza", email: "ana.souza@example.com", status: "active" },
        { name: "Bruno Lima", email: "bruno.lima@example.com", status: "active" },
        { name: "Carla Mendes", email: "carla.mendes@example.com", status: "active" },
        { name: "Diego Santos", email: "diego.santos@example.com", status: "active" },
        { name: "Elisa Rocha", email: "elisa.rocha@example.com", status: "inactive" },
    ]);
}

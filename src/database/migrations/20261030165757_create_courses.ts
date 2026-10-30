import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("courses", (table) => {
        table.bigIncrements("id");
        table.string("code", 50).notNullable().unique();
        table.string("title", 255).notNullable();
        table.text("description");
        table
            .bigInteger("user_id")
            .notNullable()
            .index()
            .references("id")
            .inTable("users")
            .onDelete("RESTRICT");
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("courses");
}

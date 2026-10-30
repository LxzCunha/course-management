import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("contents", (table) => {
        table.bigIncrements("id");
        table
            .bigInteger("module_id")
            .notNullable()
            .index()
            .references("id")
            .inTable("modules")
            .onDelete("CASCADE");
        table.string("title", 255).notNullable();
        table.text("content").notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("contents");
}

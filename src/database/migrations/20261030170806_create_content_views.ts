import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("content_views", (table) => {
        table
            .bigInteger("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table
            .bigInteger("content_id")
            .notNullable()
            .index()
            .references("id")
            .inTable("contents")
            .onDelete("CASCADE");
        table.timestamp("viewed_at").notNullable().defaultTo(knex.fn.now());
        table.primary(["user_id", "content_id"]);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("content_views");
}

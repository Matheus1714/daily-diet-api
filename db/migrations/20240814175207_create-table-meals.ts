import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("meals", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("users");

    table.text("name").notNullable();
    table.text("description").nullable();
    table.timestamp("date");
    table.boolean("diet");

    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("meals");
}

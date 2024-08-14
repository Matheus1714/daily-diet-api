import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();

    table.uuid("code").notNullable();

    table.text("name").notNullable();
    table.text("email").notNullable();
    table.text("hash").notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("updated_at").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}

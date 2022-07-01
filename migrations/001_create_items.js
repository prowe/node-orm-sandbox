// import { Knex } from "knex";

/**
 * @param {Knex} knex
 */
export function up(knex) {
    return knex.schema.createTable('items', table => {
        table.string('id').primary();
        table.string('name').notNullable();
    });
}

/**
 * @param {Knex} knex
 */
export function down(knex) {
    return knex.schema.dropTable('items');
}
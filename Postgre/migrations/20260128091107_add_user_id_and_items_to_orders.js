exports.up = function (knex) {
  return knex.schema.alterTable("orders", (table) => {
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.json("items");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("orders", (table) => {
    table.dropColumn("user_id");
    table.dropColumn("items");
  });
};

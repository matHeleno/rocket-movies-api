
exports.up = knex => knex.schema.createTable("reviews", table => {
  table.increments("id")
  table.integer("movie_id").references("id").inTable("movies").onDelete("CASCADE")
  table.integer("user_id").references("id").inTable("users")
  table.integer("grade")
  table.text("comments")

  table.timestamp("created_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("reviews")
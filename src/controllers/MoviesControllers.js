const { request, response } = require("express")
const knex = require("../database/knex")

class MoviesController {

  async create(request, response) {
    const { title, description, grade, comments } = request.body
    const { user_id } = request.params

    const [movie_id] = await knex("movies").insert({
      title,
      description,
      user_id
    })

    await knex("reviews").insert({
      movie_id,
      user_id,
      grade,
      comments
    })

    response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const movie = await knex("movies").where({ id }).first()
    const review = await knex("reviews").where({ movie_id: id })

    return response.json({ movie, review })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("movies").where({ id }).delete()

    return response.json()
  }
}

module.exports = MoviesController
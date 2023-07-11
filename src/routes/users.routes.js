const { Router } = require("express")
const UserController = require("../controllers/UsersControllers")

const usersRoutes = Router()

const usersController = new UserController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/:id", usersController.update)
usersRoutes.get("/:id", usersController.show)

module.exports = usersRoutes
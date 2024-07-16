const { Router } = require("express")


const UserController = require("../controllers/UsersControllers")
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const usersRoutes = Router()

const usersController = new UserController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.get("/", ensureAuthenticated, usersController.show)

module.exports = usersRoutes
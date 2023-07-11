require("express-async-errors")
const sqliteConnection = require('./database/sqlite')
const AppError = require("./utils/AppError")

const express = require('express')

const routes = require("./routes")
sqliteConnection()

const app = express()
app.use(express.json())

app.use(routes)

app.use((error, request, response, nex) => {
  
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

const PORT = 3333

app.listen( PORT, () => {
  console.log(`A aplicação está na porta ${PORT}`)
})
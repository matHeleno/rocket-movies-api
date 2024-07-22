require("express-async-errors")
const sqliteConnection = require('./database/sqlite')
const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")


const express = require('express')
const cors = require('cors')

const routes = require("./routes")
sqliteConnection()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

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
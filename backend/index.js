const express = require('express');
const cors = require('cors')
require('dotenv').config()
const dbConnection = require('./db.connection')
const quiz = require('./routes/quiz')

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
dbConnection()
app.use(quiz)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
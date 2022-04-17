require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const markersRouter = require('./controllers/markers')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch(error => {
    console.log("Error connecting to MongoDB", error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/markers', markersRouter)

module.exports = app
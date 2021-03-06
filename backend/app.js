require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const markersRouter = require('./controllers/markers')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch(error => {
    console.log("Error connecting to MongoDB", error.message)
  })

app.use(cors())
//The 2MB is to allow some leeway for images, as some 1MB image files gave payload too large error
app.use(express.json({ limit: '2MB' }))
app.use('/api/markers', markersRouter)
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
})

module.exports = app
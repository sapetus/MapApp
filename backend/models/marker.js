const mongoose = require('mongoose')

const markerSchema = mongoose.Schema({
  lat: Number,
  lng: Number,
  placeName: {
    type: String,
    maxLength: 50
  },
  description: {
    type: String,
    maxLength: 500
  },
  image: String
})

module.exports = mongoose.model('Marker', markerSchema)
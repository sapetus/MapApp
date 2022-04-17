const markersRouter = require('express').Router()
const mongoose = require('mongoose')
const Marker = require('../models/marker')

//get all markers
markersRouter.get('/', async (request, response) => {
  const markers = await Marker.find({})

  response.json(markers)
})

//get a marker by id
markersRouter.get('/:id', async (request, response) => {
  const marker = await Marker.findById(request.params.id)

  response.json(marker)
})

//create a marker
markersRouter.post('/', async (request, response) => {
  const marker = new Marker(request.body)
  try {
    await marker.save()
    response.status(201).json(marker.toJSON())
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

//remove a marker
markersRouter.post('/:id', async (request, response) => {
  try {
    await Marker.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

//update a marker
markersRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const markerUpdate = { ...request.body }

  try {
    const data = await Marker.findByIdAndUpdate(id, markerUpdate, { new: true })
    response.status(200).json(data).end()
  } catch (error) {
    response.status(500).json({ error: error })
  }
})

module.exports = markersRouter
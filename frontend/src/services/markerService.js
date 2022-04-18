import axios from 'axios'
//this works ONLY in production. For this to work locally,
//change this to http://localhost:<backendPort>/api/markers
const baseUrl = '/api/markers'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const update = async (updateObject, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, updateObject)
  return response.data
}

const remove = async (id) => {
  const response = await axios.post(`${baseUrl}/${id}`)
  return response.data
}

//eslint-disable-next-line
export default {
  getAll,
  create,
  update,
  remove
}
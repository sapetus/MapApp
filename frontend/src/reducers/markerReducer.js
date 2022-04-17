import markerService from '../services/markerService'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE:MARKER':
      return [...state, action.data]
    case 'INIT:MARKERS':
      return action.data
    case 'UPDATE:MARKER':
      const updatedMarker = action.data
      return state.map(marker => marker._id !== updatedMarker._id ? marker : updatedMarker)
    case 'REMOVE:MARKER':
      const id = action.data
      return state.filter(marker => marker._id !== id)
    default:
      return state
  }
}

export const createMarker = (marker) => {
  return async dispatch => {
    const newMarker = await markerService.create(marker)
    dispatch({
      type: 'CREATE:MARKER',
      data: newMarker
    })
  }
}

export const updateMarker = (update, id) => {
  return async dispatch => {
    const marker = await markerService.update(update, id)
    dispatch({
      type: 'UPDATE:MARKER',
      data: marker
    })
  }
}

export const removeMarker = (id) => {
  return async dispatch => {
    await markerService.remove(id)
    dispatch({
      type: 'REMOVE:MARKER',
      data: id
    })
  }
}

export const initializeMarkers = () => {
  return async dispatch => {
    const markers = await markerService.getAll()
    dispatch({
      type: 'INIT:MARKERS',
      data: markers
    })
  }
}

export default reducer
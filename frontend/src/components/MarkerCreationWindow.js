import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { InfoWindow } from 'react-google-maps'

import { createMarker } from '../reducers/markerReducer'

const MarkerCreationWindow = ({ clickData, setClickData }) => {
  const [description, setDescription] = useState('')
  const [placeName, setPlaceName] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    setDescription('')
    setPlaceName('')
  }, [clickData])

  const create = (event) => {
    event.preventDefault()

    const marker = {
      lat: clickData.latLng.lat(),
      lng: clickData.latLng.lng(),
      placeName: placeName,
      description: description
    }
    dispatch(createMarker(marker))

    setDescription('')
    setPlaceName('')
    setClickData(null)
  }

  /* 
    InfoWindow element gives a 'ReactDOM.unstable_renderSubtreeIntoContainer()' warning 
    probably because the react-google-maps does not use React18
  */
  return (
    <InfoWindow
      position={{
        lat: clickData.latLng.lat(),
        lng: clickData.latLng.lng()
      }}
      onCloseClick={() => setClickData(null)}
    >
      <div className="editWindow">
        <h3>Create A Marker Here</h3>
        <form onSubmit={(event) => create(event)}>
          <input
            type="text"
            placeholder="Place name..."
            maxLength={50}
            onChange={(event) => setPlaceName(event.target.value)}
            value={placeName}
          />
          <textarea
            cols="30"
            rows="7"
            placeholder="Describe the place here..."
            maxLength={500}
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
          <button type="submit">Create Marker</button>
        </form>
      </div>
    </InfoWindow>
  )
}

export default MarkerCreationWindow
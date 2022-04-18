import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { InfoWindow } from 'react-google-maps'

import { createMarker } from '../reducers/markerReducer'

const MarkerCreationWindow = ({ clickData, setClickData }) => {
  const [description, setDescription] = useState('')
  const [placeName, setPlaceName] = useState('')
  const [image, setImage] = useState(null)
  const [imageData, setImageData] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    setDescription('')
    setPlaceName('')
  }, [clickData])

  useEffect(() => {
    if (image) {
      const file = document.getElementById("imageInput").files[0]
      if (file.size < 1000 * 1024) {
        const fileReader = new FileReader()
        fileReader.onload = (event) => {
          setImageData(event.target.result)
        }
        fileReader.readAsDataURL(file)
      } else {
        alert("Image is too large!")
      }
    }
  }, [image])

  const create = (event) => {
    event.preventDefault()

    const marker = {
      lat: clickData.latLng.lat(),
      lng: clickData.latLng.lng(),
      placeName: placeName,
      description: description,
      image: imageData
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
          <label>Maximum image size 1MB</label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.value)}
          />
          <button type="submit">Create Marker</button>
        </form>
      </div>
    </InfoWindow>
  )
}

export default MarkerCreationWindow
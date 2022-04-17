import React, { useEffect, useState } from 'react'
import { InfoWindow } from 'react-google-maps'
import { useDispatch } from 'react-redux'
import { updateMarker, removeMarker } from '../reducers/markerReducer'

const MarkerWindow = ({ clickedMarker, setClickedMarker }) => {
  const [editing, setEditing] = useState(false)
  const [updateDescription, setUpdateDescription] = useState('')
  const [updatePlaceName, setUpdatePlaceName] = useState('')
  const [image, setImage] = useState(null)
  const [imageData, setImageData] = useState(null)
  const dispatch = useDispatch()

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
        console.log("Maximum image size is 1MB")
      }
    }
  }, [image])

  const update = (event) => {
    event.preventDefault()

    const id = clickedMarker._id

    let marker = {
      placeName: updatePlaceName,
      description: updateDescription
    }

    if (imageData) {
      marker = { ...marker, image: imageData }
    }

    dispatch(updateMarker(marker, id))

    setUpdateDescription('')
    setUpdatePlaceName('')
    setEditing(false)
    /*
      This allows the deletion of the marker without
      having to close and re-open it after editing
    */
    setClickedMarker({ ...marker, _id: id })
  }

  const remove = () => {
    const id = clickedMarker._id

    dispatch(removeMarker(id))
    setClickedMarker(null)
  }

  const startEditing = () => {
    setUpdateDescription(clickedMarker.description)
    setUpdatePlaceName(clickedMarker.placeName)
    setEditing(true)
  }

  const cancelEditing = () => {
    setUpdateDescription('')
    setUpdatePlaceName('')
    setImage(null)
    setImageData(null)
    setEditing(false)
  }

  /* 
    InfoWindow element gives a 'ReactDOM.unstable_renderSubtreeIntoContainer()' warning 
    probably because the react-google-maps does not use React18
  */
  return (
    <InfoWindow
      position={{
        lat: clickedMarker.lat,
        lng: clickedMarker.lng
      }}
      onCloseClick={() => {
        setClickedMarker(null)
      }}
    >
      {editing
        ?
        <div className='editWindow'>
          <h3>Editing</h3>
          <form onSubmit={(event) => update(event)}>
            <input
              type="text"
              placeholder="Place name..."
              maxLength={50}
              onChange={(event) => setUpdatePlaceName(event.target.value)}
              value={updatePlaceName}
            />
            <textarea
              cols="30"
              rows="7"
              placeholder="Description of the place..."
              maxLength={500}
              onChange={(event) => setUpdateDescription(event.target.value)}
              value={updateDescription}
            />
            <label>Maximum image size 1MB</label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.value)}
            />
            <div className='buttons'>
              <button type="submit">Confirm</button>
              <button onClick={cancelEditing}>Cancel</button>
            </div>
          </form>
        </div>
        :
        <div className="infoWindow">
          <h3 className='wrap'>{clickedMarker.placeName}</h3>
          <p>{clickedMarker.description}</p>
          {clickedMarker?.image && <img src={clickedMarker.image} className="markerImage" alt="" />}
          <div className='buttons'>
            <button onClick={startEditing}>Edit</button>
            <button onClick={remove}>Delete</button>
          </div>
        </div>}
    </InfoWindow>
  )
}

export default MarkerWindow
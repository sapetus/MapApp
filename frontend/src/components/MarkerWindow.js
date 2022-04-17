import React, { useState } from 'react'
import { InfoWindow } from 'react-google-maps'
import { useDispatch } from 'react-redux'
import { updateMarker, removeMarker } from '../reducers/markerReducer'

const MarkerWindow = ({ clickedMarker, setClickedMarker }) => {
  const [editing, setEditing] = useState(false)
  const [updateDescription, setUpdateDescription] = useState('')
  const [updatePlaceName, setUpdatePlaceName] = useState('')
  const dispatch = useDispatch()

  const update = (event) => {
    event.preventDefault()

    const id = clickedMarker._id
    const marker = {
      placeName: updatePlaceName,
      description: updateDescription
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
          <div className='buttons'>
            <button onClick={startEditing}>Edit</button>
            <button onClick={remove}>Delete</button>
          </div>
        </div>}
    </InfoWindow>
  )
}

export default MarkerWindow
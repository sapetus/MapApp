import React, { useState } from 'react'
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from 'react-google-maps'
import { useSelector } from 'react-redux'
import MarkerCreationWindow from './MarkerCreationWindow'
import MarkerWindow from './MarkerWindow'

/*
  withScriptjs() and withGoogleMap() don't work properly with React18
*/
const Map = withScriptjs(withGoogleMap(() => {
  const [clickedMarker, setClickedMarker] = useState(null)
  const [clickData, setClickData] = useState(null)

  const markers = useSelector(state => state.markers)

  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 62.89238, lng: 27.67703 }}
      onClick={(data) => setClickData(data)}
    >
      {markers.map(marker => (
        <Marker
          key={marker._id}
          position={{
            lat: marker.lat,
            lng: marker.lng
          }}
          onClick={() => {
            setClickedMarker(marker)
          }}
        >
        </Marker>
      ))}
      {clickedMarker &&
        <MarkerWindow clickedMarker={clickedMarker} setClickedMarker={setClickedMarker} />
      }
      {clickData &&
        <MarkerCreationWindow clickData={clickData} setClickData={setClickData} />
      }
    </GoogleMap>
  )
}))

export default Map
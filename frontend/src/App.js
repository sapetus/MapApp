import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Map from './components/Map'
import List from './components/List'
import { initializeMarkers } from './reducers/markerReducer'

const App = () => {
  const [selectedView, setSelectedView] = useState('Map')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeMarkers())
  }, [dispatch])

  return (
    <div id="view">
      <h1 id="header">Map App</h1>
      <nav id="navbar">
        <button onClick={() => setSelectedView('List')}>List</button>
        <button onClick={() => setSelectedView('Map')}>Map</button>
      </nav>
      {selectedView === 'Map' &&
        <div id="map">
          <Map
            googleMapURL={
              `https://maps.googleapis.com/maps/api/js?v=3.exp&
               libraries=geometry,drawing,places&key=${process.env.REACT_APP_API_KEY}`
            }
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
          />
        </div>}
      {selectedView === 'List' &&
        <List />
      }
    </div>
  )
}

export default App;
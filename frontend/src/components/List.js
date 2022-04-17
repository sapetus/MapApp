import React from 'react'
import { useSelector } from 'react-redux'

const List = () => {
  const markers = useSelector(state => state.markers)

  return (
    <div id="list">
      <hr />
      <ul>
        {markers.map(marker => (
          <li className="markerInfo">
            <div className='markerInfo container'>
              <div className='markerInfo subcontainer'>
                <h3>{marker.placeName}</h3>
                <p>{marker.description}</p>
              </div>
              {marker?.image && <img src={marker.image} className="listImage" alt="" />}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
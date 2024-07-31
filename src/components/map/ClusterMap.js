import { useRadioGroup } from '@mui/material'
import React, { useEffect } from 'react'
import { getRooms } from '../../actions/room';
import { useValue } from '../../context/ContextProvider';
import ReactMapGl from 'react-map-gl';
const ClusterMap = () => {
  const {state:{rooms},dispatch}=useValue();
  useEffect(()=>{
    getRooms(dispatch)
  },[dispatch])
  return (
    <ReactMapGl
      initialViewState={{latitude: 37.7577, longitude: -122.4376, zoom: 8}}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      mapStyle='mapbox://styles/mapbox/streets-v11'
    >

    </ReactMapGl>
  )
}

export default ClusterMap
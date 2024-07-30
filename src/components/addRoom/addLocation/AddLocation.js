import React, { useEffect, useRef } from 'react'
import ReactMapGL,{GeolocateControl, Marker, NavigationControl} from 'react-map-gl';
import {Box} from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocoder from './Geocoder';

const AddLocation = () => {
  const {state:{location:{lng,lat}},dispatch}=useValue();
  const mapRef=useRef();
  // useEffect(()=>{
  //   navigator.geolocation.getCurrentPosition((position)=>{
  //     dispatch({type:'UPDATE_LOCATION',payload:{lng:position.coords.longitude,lat:position.coords.latitude}})
  //   })
  // }
  // ,[dispatch])
  useEffect(()=>{
    if(!lng && !lat){
      fetch('https://ipapi.co/json')
      .then((response)=>response.json())
      .then((data)=>{
        mapRef.current.flyTo({
          center:[data.longitude,data.latitude]
        });
        dispatch({type:'UPDATE_LOCATION',payload:{lng:data.longitude,lat:data.latitude}})})
    }
  },[])
  return (
    <Box sx={{
      height:400,
      position:'relative',
    }}>
      <ReactMapGL mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      initialViewState={{
        longitude:lng,
        latitude:lat,
        zoom:8}}
        mapStyle='mapbox://styles/mapbox/streets-v11'>
          <Marker 
          latitude={lat}
          longitude={lng}
          draggable
          onDragEnd={(e)=>dispatch({type:'UPDATE_LOCATION',payload:{lng:e.lngLat.lng,lat:e.lngLat.lat}})}
          />
          <NavigationControl position='bottom-right'/>
          <GeolocateControl
          position='top-left'
          trackUserLocation
          onGeolocate={(e)=>dispatch({type:'UPDATE_LOCATION',payload:{lng:e.coords.longitude,lat:e.coords.latitude}})}
          />
          <Geocoder mapRef={mapRef}/>
        </ReactMapGL>
    </Box>
  )
}

export default AddLocation
// // import { Box } from '@mui/material';
// // import ReactMapGL, {
// //   GeolocateControl,
// //   Marker,
// //   NavigationControl,
// // } from 'react-map-gl';
// // import { useValue } from '../../../context/ContextProvider';
// // import 'mapbox-gl/dist/mapbox-gl.css';
// // import { useEffect, useRef } from 'react';
// // import Geocoder from './Geocoder';

// // const AddLocation = () => {
// //   const {
// //     state: {
// //       location: { lng, lat },
// //     },
// //     dispatch,
// //   } = useValue();
// //   const mapRef = useRef();

// //   useEffect(() => {
// //     if (!lng && !lat) {
// //       fetch('https://ipapi.co/json')
// //         .then((response) => {
// //           return response.json();
// //         })
// //         .then((data) => {
// //           mapRef.current.flyTo({
// //             center: [data.longitude, data.latitude],
// //           });
// //           dispatch({
// //             type: 'UPDATE_LOCATION',
// //             payload: { lng: data.longitude, lat: data.latitude },
// //           });
// //         });
// //     }
// //   }, []);
// //   return (
// //     <Box
// //       sx={{
// //         height: 400,
// //         position: 'relative',
// //       }}
// //     >
// //       <ReactMapGL
// //         ref={mapRef}
// //         mapboxAccessToken='pk.eyJ1Ijoic2FtYXJ0aDIxMSIsImEiOiJjbHo0bHd3OTcyYmM4MmpwdnpjNWJ5d2V0In0.BY16xp_jFGDvcHDcE_Ub6A'
// //         initialViewState={{
// //           longitude: lng,
// //           latitude: lat,
// //           zoom: 8,
// //         }}
// //         mapStyle="mapbox://styles/mapbox/streets-v11"
// //       >
// //         <Marker
// //           latitude={lat}
// //           longitude={lng}
// //           draggable
// //           onDragEnd={(e) =>
// //             dispatch({
// //               type: 'UPDATE_LOCATION',
// //               payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
// //             })
// //           }
// //         />
// //         <NavigationControl position="bottom-right" />
// //         <GeolocateControl
// //           position="top-left"
// //           trackUserLocation
// //           onGeolocate={(e) =>
// //             dispatch({
// //               type: 'UPDATE_LOCATION',
// //               payload: { lng: e.coords.longitude, lat: e.coords.latitude },
// //             })
// //           }
// //         />
// //         <Geocoder />
// //       </ReactMapGL>
// //     </Box>
// //   );
// // };

// // export default AddLocation;
// import { Box } from '@mui/material';
// import {
//   GeolocateControl,
//   Marker,
//   NavigationControl,
// } from 'react-map-gl';
// import ReactMapGL from 'react-map-gl';
// import { useValue } from '../../../context/ContextProvider';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { useEffect, useRef } from 'react';
// import Geocoder from './Geocoder';

// const AddLocation = () => {
//   const MAP_TOKEN='pk.eyJ1Ijoic2FtYXJ0aDIxMSIsImEiOiJjbHo0cGo1aWwwbGxpMmpxMWVoOTF6NGh3In0.5WY-D1SCAOcqL6xaJA9w0g';
//   const {
//     state: {
//       location: { lng, lat },
//     },
//     dispatch,
//   } = useValue();
//   const mapRef = useRef();

//   useEffect(() => {
//     if (!lng && !lat) {
//       fetch('https://ipapi.co/json')
//         .then((response) => response.json())
//         .then((data) => {
//           mapRef.current.flyTo({
//             center: [data.longitude, data.latitude],
//           });
//           dispatch({
//             type: 'UPDATE_LOCATION',
//             payload: { lng: data.longitude, lat: data.latitude },
//           });
//         });
//     }
//   }, [lng, lat, dispatch]);

//   return (
//     <Box
//       sx={{
//         height: 400,
//         position: 'relative',
//       }}
//     >
//       <ReactMapGL
//         ref={mapRef}
//         mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
//         initialViewState={{
//           longitude: lng,
//           latitude: lat,
//           zoom: 8,
//         }}
//         mapStyle="mapbox://styles/mapbox/streets-v12"
//       >
//         <Marker
//           latitude={lat}
//           longitude={lng}
//           draggable
//           onDragEnd={(e) =>
//             dispatch({
//               type: 'UPDATE_LOCATION',
//               payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
//             })
//           }
//         />
//         {/* <GeolocateControl
//           position="top-left"
//           trackUserLocation
//           onGeolocate={(e) =>
//             dispatch({
//               type: 'UPDATE_LOCATION',
//               payload: { lng: e.coords.longitude, lat: e.coords.latitude },
//             })
//           } */}
//         {/* /> */}
//         <Geocoder mapRef={mapRef} />
//       </ReactMapGL>
//     </Box>
//   );
// };

// export default AddLocation;

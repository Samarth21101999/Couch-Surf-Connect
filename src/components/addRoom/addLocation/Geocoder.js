import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import { useValue } from '../../../context/ContextProvider';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
const Geocoder = () => {
  console.log('Mapbox Access Token:', process.env.REACT_APP_MAPBOX_TOKEN);

  const { dispatch } = useValue();
  const ctrl = new MapBoxGeocoder({
    accessToken: "pk.eyJ1Ijoic2FtYXJ0aDIxMSIsImEiOiJjbHo0cGo1aWwwbGxpMmpxMWVoOTF6NGh3In0.5WY-D1SCAOcqL6xaJA9w0g",
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on('result', (e) => {
    const coords = e.result.geometry.coordinates;
    dispatch({
      type: 'UPDATE_LOCATION',
      payload: { lng: coords[0], lat: coords[1] },
    });
  });
  return null;
};

export default Geocoder;

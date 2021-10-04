import React from 'react'
import { GoogleMap, useJsApiLoader , Marker} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};


function GoogleMaps({ lat, lng }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAFXMKnLTzbGyLpnKlxj9YiyhMkMs4nf0M"
  })

  const center = {
    lat: +lat,
    lng: +lng
  };
  
  
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(map)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      
    >
      <></>
    </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMaps)
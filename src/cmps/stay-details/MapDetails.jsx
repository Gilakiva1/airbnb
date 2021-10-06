import React from 'react'

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '475px',
}

const _Map = ({ lat, lng, google }) => {
    return (
        <>
            <Map
                google={google}
                zoom={10}
                initialCenter={{ lat, lng }}
                center={{ lat, lng }}
                containerStyle={containerStyle}
            >
            </Map>
        </>
    );

}


export const MapDetails = GoogleApiWrapper({ apiKey: ('AIzaSyAFXMKnLTzbGyLpnKlxj9YiyhMkMs4nf0M') })(_Map)




import React from 'react'

import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
class _Map extends React.Component {

    render() {
        const { lat, lng } = this.props
        console.log(lat, lng);
        const containerStyle = {
            position: 'relative',
            width: '100%',
            height: '475px',
        }

        return (
            <>
                <Map 
                    google={this.props.google}
                    zoom={10}
                    initialCenter={{ lat, lng }}
                    center={{ lat, lng }}
                    containerStyle={containerStyle}
                >
                </Map>
            </>
        );
    }
}


export const MapDetails = GoogleApiWrapper({ apiKey: ('AIzaSyAFXMKnLTzbGyLpnKlxj9YiyhMkMs4nf0M') })(_Map)




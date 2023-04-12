import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

import classes from './GoodleMap.module.css'

const GoogleMap = (props) => {
    return (
        <div className={classes.container}>
            <Map
               google={props.google}
               zoom={8}
               style={classes.mapStyles}
               initialCenter={{ lat: 47.444, lng: -122.176}}
             />
        </div>
    )
}

export default GoogleApiWrapper({
  apiKey: "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap&v=weekly"
}) (GoogleMap)

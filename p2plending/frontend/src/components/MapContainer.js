import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const config = require("../../config/index");
const location = config.location;
const library = config.library

class MapContainer extends Component {

  render() {
    return (
      
    <Map center={location} zoom={16}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={location}>
        <Popup>
          { library } <br />
        </Popup>
      </Marker>
    </Map>
    );
  }
}

export default MapContainer;
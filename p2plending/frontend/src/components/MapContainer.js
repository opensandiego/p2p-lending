import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

// eslint-disable-next-line react/prop-types
const CustomMarker = ({ emoji }) => (
  <div className="container p-0 m-0">
      <span role="img" aria-label="emoji" style={{fontSize: 30}}>
        { emoji }
      </span>
      <p className="w-100" style={{fontSize:"10px"}}> Linda Vista Library </p>
    </div>
);

class MapContainer extends Component {

  render() {
    return (
      <GoogleMap
        // eslint-disable-next-line no-undef
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        defaultCenter={{
          lat: 32.783588,
          lng: -117.170181
        }}
        defaultZoom={19}
        yesIWantToUseGoogleMapApiInternals={true}
      >
        <CustomMarker
            lat={32.783588}
            lng={-117.170181}
            emoji="📖"
          />
      </GoogleMap>
    );
  }
}

export default MapContainer;
import React, { Component, createRef } from 'react';

export class DisplayGoogleMap extends Component {
  constructor(props) {
    super(props);
    this.googleMapRef = createRef();
  }

  componentDidMount() {
    const map = new window.google.maps.Map(this.googleMapRef.current, {
      zoom: 15,
      center: {
        lat: parseFloat(this.props.location.split(',')[0]),
        lng: parseFloat(this.props.location.split(',')[1]),
      },
      disableDefaultUI: true,
      mapTypeId: 'hybrid',
    });

    new window.google.maps.Marker({
      position: {
        lat: parseFloat(this.props.location.split(',')[0]),
        lng: parseFloat(this.props.location.split(',')[1]),
      },
      map: map,
    });
  }

  render() {
    return (
      <div>
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ width: '400px', height: '300px' }}
        />
        <a
          id="getDirection"
          href={
            'https://www.google.com/maps/search/?api=1&query=' +
            parseFloat(this.props.location.split(',')[0]) +
            ',' +
            parseFloat(this.props.location.split(',')[1])
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3>Get Directions</h3>
        </a>
      </div>
    );
  }
}

import React, { Component, createRef } from 'react'

export class OnboardingGoogleMap extends Component {
  constructor() {
    super();
    this.googleMapRef = React.createRef();
    this.state = { lat: 0, lng: 0 }
    }

  componentDidMount() {
    const googleScript = document.createElement('script')
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAy5wTTEXTXkSbGnWvQNwD_fb-VaZc1qYk&libraries=places`
    window.document.body.appendChild(googleScript)

    googleScript.addEventListener('load', () => {
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const map = new window.google.maps.Map(this.googleMapRef.current, {
          zoom: 15,
          center: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          disableDefaultUI: true,
          mapTypeId: 'hybrid',
        });
  
        var marker = new window.google.maps.Marker({
          position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          map: map,
          draggable: true,
        });

        window.google.maps.event.addListener(
          marker,
          'drag',
          function() {
            this.setState({
              lat: marker.getPosition().getLat(),
              lng: marker.getPosition().getLng()
            });
          }
        );
        
      })
      } else {
        window.alert('Please enable location services.');
      }
    })
  }

  render() {
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
        style={{ width: '400px', height: '300px' }}
      />
    )
  }
}

export class DisplayGoogleMap extends Component {
  constructor(props) {
    super(props);
    this.googleMapRef = React.createRef();
    }

  componentDidMount() {
    const googleScript = document.createElement('script')
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAy5wTTEXTXkSbGnWvQNwD_fb-VaZc1qYk&libraries=places`
    window.document.body.appendChild(googleScript)

    googleScript.addEventListener('load', () => {
        const map = new window.google.maps.Map(this.googleMapRef.current, {
          zoom: 15,
          center: {
            lat: this.props.lat,
            lng: this.props.lng,
          },
          disableDefaultUI: true,
          mapTypeId: 'hybrid',
        });
  
        var marker = new window.google.maps.Marker({
          position: { lat: this.props.lat, lng: this.props.lng },
          map: map,
        });
      })
  }

  render() {
    return (
      <div>
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ width: '400px', height: '300px' }}
        />
        <a id='getDirection' href={'https://www.google.com/maps/search/?api=1&query=' + this.props.lat + ',' + this.props.lng} target="_blank"><h3>Get Directions</h3></a>
      </div>

    )
  }
}
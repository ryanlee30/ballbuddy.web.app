import React, { Component, createRef } from 'react'

export class OnboardingGoogleMap extends Component {
  constructor() {
    super();
    this.googleMapRef = React.createRef();
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
            console.log(marker.getPosition().lat());
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
            lat: parseFloat(this.props.location.split(',')[0]),
            lng: parseFloat(this.props.location.split(',')[1])
          },
          disableDefaultUI: true,
          mapTypeId: 'hybrid',
        });
  
        var marker = new window.google.maps.Marker({
          position: { lat: parseFloat(this.props.location.split(',')[0]), lng: parseFloat(this.props.location.split(',')[1]) },
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
        <a id='getDirection' href={'https://www.google.com/maps/search/?api=1&query=' + parseFloat(this.props.location.split(',')[0]) + ',' + parseFloat(this.props.location.split(',')[1])} target="_blank"><h3>Get Directions</h3></a>
      </div>

    )
  }
}
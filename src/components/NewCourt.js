import React from 'react';
import firebase from "./Firestore";
import { OnboardingGoogleMap } from './GoogleMap'

export class NewCourt extends React.Component {
  constructor() {
    super();
    this.state = {
     name: '',
     hoops: '',
     location: '',
     lights: '',
    };
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
          () => {
              this.setState({
                'location': parseFloat(marker.getPosition().lat()) + "," + parseFloat(marker.getPosition().lng())
              });
          }
        );
      })
      } else {
        window.alert('Please enable location services.');
      }
    })
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addUser = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection('Courts').add({
      name: this.state.name,
      hoops: this.state.hoops,
      location: this.state.location,
      lights: this.state.lights
    }); 
    this.setState({
      name: '',
      hoops: '',
      location: '',
      lights: ''
    });
  };

  render() {
    return (
        <form onSubmit={this.addUser}>
          <input type="text"
          name="name"
          placeholder="Court Name"
          onChange={this.updateInput}
          value={this.state.name}
          />
          <input type="text"
          name="hoops"
          placeholder="Hoops"
          onChange={this.updateInput}
          value={this.state.hoops}
          />
          <input type="text"
          name="lights"
          placeholder="Lights"
          onChange={this.updateInput}
          value={this.state.lights}
          />
          <input hidden type="text"
          name="location"
          placeholder="Location"
          onChange={this.updateInput}
          value={this.state.location}
          />
          <div
            id="google-map"
            ref={this.googleMapRef}
            style={{ width: '500px', height: '300px' }}
          />
          <button type="submit">Submit</button>
        </form>
        );
      }
   }

import React from 'react';
import firebase from './Firestore';
import { withRouter } from 'react-router-dom';

class NewCourt extends React.Component {
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
    const googleScript = document.createElement('script');
    googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAy5wTTEXTXkSbGnWvQNwD_fb-VaZc1qYk&libraries=places`;
    window.document.body.appendChild(googleScript);

    googleScript.addEventListener('load', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          this.setState({
            location:
              parseFloat(pos.coords.latitude) +
              ',' +
              parseFloat(pos.coords.longitude),
          });

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

          window.google.maps.event.addListener(marker, 'drag', () => {
            this.setState({
              location:
                parseFloat(marker.getPosition().lat()) +
                ',' +
                parseFloat(marker.getPosition().lng()),
            });
          });
        });
      } else {
        window.alert('Please enable location services.');
      }
    });
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  lightsTrue = () => {
    this.setState({
      lights: Boolean(1),
    });
  };

  lightsFalse = () => {
    this.setState({
      lights: Boolean(0),
    });
  };

  outdoorTrue = () => {
    this.setState({
      outdoor: Boolean(1),
    });
  };

  outdoorFalse = () => {
    this.setState({
      outdoor: Boolean(0),
    });
  };

  addUser = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    db.collection('courts').add({
      name: this.state.name,
      hoops: this.state.hoops,
      location: this.state.location,
      lights: this.state.lights,
      outdoor: this.state.outdoor,
    });
    this.setState({
      name: '',
      hoops: '',
      location: '',
      lights: false,
      outdoor: true,
    });
    this.props.history.push('/');
  };

  render() {
    return (
      <form onSubmit={this.addUser} className="new-court">
        <label for="hoops">what's the name of this court?</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.updateInput}
          required
        />
        <br></br>
        <label for="hoops">how many hoops at this court?</label>
        <input
          type="number"
          name="hoops"
          onChange={this.updateInput}
          value={this.state.hoops}
          min="1"
          max="12"
          step="1"
          required
        />
        <br></br>
        <input
          hidden
          type="text"
          name="location"
          onChange={this.updateInput}
          value={this.state.location}
          required
        />
        <label for="lights">are there lights at this court?</label>
        <label>
          <input
            type="radio"
            name="lights"
            checked={this.state.lights === true}
            onChange={this.lightsTrue}
            required
          />
          yes
        </label>
        <label>
          <input
            type="radio"
            name="lights"
            required
            onChange={this.lightsFalse}
            checked={this.state.lights === false}
          />
          no
        </label>
        <br></br>
        <label for="outdoor">is this court outdoors?</label>
        <label>
          <input
            type="radio"
            name="outdoor"
            checked={this.state.outdoor === true}
            onChange={this.outdoorTrue}
            required
          />
          yes
        </label>

        <label>
          <input
            type="radio"
            name="outdoor"
            required
            onChange={this.outdoorFalse}
            checked={this.state.outdoor === false}
          />
          no
        </label>
        <br></br>
        <label for="location">where's the court? (drag the pin)</label>
        <br></br>
        <div id="google-map" ref={this.googleMapRef} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default withRouter(NewCourt);

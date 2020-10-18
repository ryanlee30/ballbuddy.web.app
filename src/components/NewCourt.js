import React from 'react';
import firebase from "./Firestore";

export class NewCourt extends React.Component {
  constructor() {
    super();
    this.state = {
     name: '',
     hoops: '',
     location: '',
     lights: ''
    };
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  lightsTrue = () => {
    this.setState({
      lights: Boolean(1)
    })
  }

  lightsFalse = () => {
    this.setState({
      lights: Boolean(0)
    })
  }

  outdoorTrue = () => {
    this.setState({
      outdoor: Boolean(1)
    })
  }

  outdoorFalse = () => {
    this.setState({
      outdoor: Boolean(0)
    })
  }


  addUser = e => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    db.collection('courts').add({
      name: this.state.name,
      hoops: this.state.hoops,
      location: this.state.location,
      lights: this.state.lights,
      outdoor: this.state.outdoor
    }); 
    this.setState({
      name: '',
      hoops: '',
      location: '',
      lights: false,
      outdoor: true,
    });
  };

  render() {
    return (
        <form onSubmit={this.addUser}>
          <label for="hoops">
            Name of Court
          </label>
          <input 
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.updateInput}
            required
          />

          <label for="hoops">
            Number of Hoops
          </label>
            <input 
              type="number"
              name="hoops"
              onChange={this.updateInput}
              value={this.state.hoops}
              min= "1"
              max= "12"
              step="1"
              required
            />
          
          <label for="location">
            Location
          </label>
          <input 
            type="text"
            name="location"
            onChange={this.updateInput}
            value={this.state.location}
            required
          />
          
          <label for="lights">Lights?</label>
          <label>
            <input
             type="radio" 
             name="lights" 
             checked = {this.state.lights === true}
             onChange = {this.lightsTrue}
             required/> 
             Yes
          </label>
          
          <label>
          <input
             type="radio" 
             name="lights" 
             required
             onChange = {this.lightsFalse}
             checked = {this.state.lights === false}
             /> No
          </label>

          <label for="outdoor">Outdoor?</label>
          <label>
            <input
             type="radio" 
             name="outdoor" 
             checked = {this.state.outdoor === true}
             onChange = {this.outdoorTrue}
             required/> 
             Yes
          </label>
          
          <label>
          <input
             type="radio" 
             name="outdoor" 
             required
             onChange = {this.outdoorFalse}
             checked = {this.state.outdoor === false}
             /> No
          </label>

          <button type="submit">Submit</button>
        </form>
        );
      }
   }

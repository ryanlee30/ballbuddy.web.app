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
          name="location"
          placeholder="Location"
          onChange={this.updateInput}
          value={this.state.location}
          />
          <input type="text"
          name="lights"
          placeholder="Lights"
          onChange={this.updateInput}
          value={this.state.lights}
          />
          <button type="submit">Submit</button>
        </form>
        );
      }
   }

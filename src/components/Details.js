import React, { Component } from 'react';
import '../styles.scss';
import { withRouter } from 'react-router-dom';
import firebase from './Firestore';
import { DisplayGoogleMap } from './GoogleMap';
import Drawer from 'react-drag-drawer';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      open: false,
      name: null,
      number: null,
      waitlist: [],
    };
  }

  toggle = () => {
    let toggle = this.state.open;
    this.setState({ open: !toggle });
  };

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentWillMount = async e => {
    const db = firebase.firestore();
    const docRef = db.collection('courts').doc(this.props.match.params.id);
    const doc = await docRef.get();
    this.setState({ data: doc.data() });
    const colRef = db
      .collection('courts')
      .doc(this.props.match.params.id)
      .collection('waitlist');
    const col = await colRef.get();
    var wl = {};
    col.forEach(doc => {
      wl[doc.id] = doc.data();
    });
    this.setState({ waitlist: wl });
  };

  waitList = async e => {
    var today = new Date();
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true,
    });
    await db
      .collection('courts')
      .doc(this.props.match.params.id)
      .collection('waitlist')
      .add({
        name: this.state.name,
        number: this.state.number,
        timeAdded: today.getHours() + ':' + today.getMinutes(),
      });
    this.setState({
      name: '',
      hoops: '',
      location: '',
      lights: false,
      outdoor: true,
    });
    this.toggle();
    window.location.reload();
  };

  render() {
    const isData = this.state.data;
    return (
      <div>
        <Drawer
          modalElementClass="modal"
          open={this.state.open}
          onRequestClose={this.toggle}
        >
          <div>
            Waitlist Form
            <form onSubmit={this.waitList} className="wait-list">
              <label for="name">what's your name?</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.updateInput}
                required
              />

              <label for="number">what's your phone number?</label>
              <input
                type="text"
                name="number"
                value={this.state.number}
                onChange={this.updateInput}
                required
              />
              <button type="submit">Submit</button>
              <button onClick={this.toggle}>Close</button>
            </form>
          </div>
        </Drawer>
        {isData ? (
          <div className="details">
            <h1>{this.state.data.name}</h1>
            <h3>{this.state.data.hoops} hoops</h3>
            <h3>{this.state.data.outdoor ? 'Outdoor' : 'Indoor'}</h3>
            <h3>{this.state.data.lights ? 'Has' : 'No'} lights</h3>
            <DisplayGoogleMap location={this.state.data.location} />
            <button onClick={this.toggle}>Sign up for waitlist</button>
            <div className="waitlist">
              <h2>Waiting List</h2>
              <ul>name | number | time added </ul>
              {Object.values(this.state.waitlist).map(d => {
                return (
                  <ul>
                    {d.name} | {d.number} | {d.timeAdded}
                  </ul>
                );
              })}
            </div>
          </div>
        ) : (
          <h1>No details found! Did you come to the wrong place?</h1>
        )}
      </div>
    );
  }
}

export default withRouter(Details);

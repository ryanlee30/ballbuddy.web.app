import React, { Component } from 'react';
import '../styles.scss'
import {withRouter} from 'react-router-dom';
import firebase from "./Firestore";
import { DisplayGoogleMap } from './GoogleMap'


class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillMount = async (e) => {
    const db = firebase.firestore()
    const docRef = db.collection('courts').doc(this.props.match.params.id);
    const doc = await docRef.get();
    console.log(doc.data());
    this.setState({data: doc.data()});
  }

  render() {
    const isData = this.state.data;
    return(
      <div>
        {isData ? (
          <div>
          <h1>{this.state.data.name}</h1>
          <DisplayGoogleMap location={this.state.data.location} />
          </div>
        ) : (
          <h1>No details found! Did you come to the wrong place?</h1>
        )}
      </div>
    );
  }
}

export default withRouter(Details);

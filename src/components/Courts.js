import React, { Component } from 'react';
import firebase from "./Firestore";
import { GoogleMap } from './GoogleMap'
import CourtObject from '../components/CourtObject'
import '../styles.scss'

class Courts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount = async (e) => {
    const db = firebase.firestore()
    const colRef = db.collection('courts');
    const col = await colRef.get();
    var docData = {}
    col.forEach(doc => {
      docData[doc.id] = doc.data()
    });
    this.setState({data: docData});
  }

  render() {
    if(this.state.data == null)
    {
      return (
        <span></span>
      );
    }
    else
    {
      return (
        <div>
          <div className="court-container">
            {Object.keys(this.state.data).map((key) => {
              return(<CourtObject data={this.state.data[key]} id={key} key={key}/>);
            })}
          </div>
        </div>
      );
    }
  }
}

export default Courts

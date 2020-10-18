import React, { Component } from 'react';
import firebase from "./Firestore";
import CourtObject from '../components/CourtObject'
import '../styles.scss'

class Courts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ['test1', 'test2']
    };
  }

  componentDidMount = async (e) => {
    const db = firebase.firestore()
    const colRef = db.collection('courts');
    const col = await colRef.get();
    var docData = []
    col.forEach(doc => {
      docData.push(doc.data())
    });
    console.log(docData);
    this.setState({data: docData});
  }

  render() {
    // var data = this.state.data == null ? <h1>asdf</h1> : this.state.data
    if(this.state.data == null)
    {
      return (
        <h1>No Data!</h1>
      );
    }
    else
    {
      return (
        <div className="court-container">
          {Object.values(this.state.data).map((d) => {
            return(<CourtObject data={d}/>);
          })}
        </div>
      )
      
     
    }
  }
}

export default Courts

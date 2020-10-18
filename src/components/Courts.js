import React, { Component } from 'react';
import firebase from "./Firestore";
import './styles.css'

class Courts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillMount = async (e) => {
    console.log("test");
    const db = firebase.firestore()
    const docRef = db.collection('Courts').doc("7zd2HgX6OyIhicFfewlg");
    const doc = await docRef.get();
    console.log(doc.data())
    if (!doc.exists) {
      console.log('No such document!');
      this.setState({data: null});
    } else {
      console.log('Document data:', doc.data());
      this.setState({data: doc.data()});
    }
  }

  render() {
    let dataUI = this.state.data == null ? <h1>No Data</h1> : <pre>{JSON.stringify(this.state.data)}</pre>;
    return(
      <div className = "court">
        {dataUI}
      </div>
    );
  }
}

export default Courts

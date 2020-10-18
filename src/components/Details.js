import React, { Component } from 'react';
import '../styles.scss'
import {withRouter} from 'react-router-dom';
import firebase from "./Firestore";


class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount = async (e) => {
    const db = firebase.firestore()
    const docRef = db.collection('courts').doc(this.props.match.params.id);
    const doc = await docRef.get();
    console.log(doc.data());
    this.setState({data: doc.data()});
  }

  render() {
        if(this.state.data == null)
        {
            return(<h1>No details found! Did you come to the wrong place?</h1>);
        }
        else{
            return(
                <h1>{this.state.data.name}</h1>
            );
        }
  }
}

export default withRouter(Details);

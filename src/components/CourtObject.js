import React, { Component } from 'react';
import '../styles.scss';
import outdoor from '../outdoorcourt.jpg';
import indoor from '../indoorcourt.jpg';
import { withRouter } from 'react-router-dom';
import firebase from './Firestore';

class CourtObject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busy: 'EMPTY',
    };
  }
  componentWillMount = async e => {
    const db = firebase.firestore();
    const colRef = db
      .collection('courts')
      .doc(this.props.id)
      .collection('waitlist');
    const col = await colRef.get();
    if (col.empty) {
      this.setState({ busy: 'EMPTY' });
    } else if (col.size <= 5) {
      this.setState({ busy: 'OKAY' });
    } else {
      this.setState({ busy: 'BUSY' });
    }
  };

  handleClick = e => {
    this.props.history.push('/details/' + this.props.id);
  };

  render() {
    return (
      <div>
        <div className="line" />
        <div className="court-object" onClick={this.handleClick}>
          <img
            src={this.props.data.outdoor ? outdoor : indoor}
            alt="placeholder"
          />
          <div className="court-info">
            <div className="court-details">
              <h3>{this.props.data.outdoor ? 'Outdoor' : 'Indoor'}</h3>
              <h3>{this.props.data.hoops + ' hoops'}</h3>
            </div>

            <div className="court-name">
              <h2>{this.props.data.name}</h2>
            </div>
          </div>

          <div className="court-populated">
            <h3>
              <mark>Details</mark>
            </h3>
            <h3>{this.state.busy}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CourtObject);

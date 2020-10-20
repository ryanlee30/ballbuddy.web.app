import React, { Component } from 'react';
import '../styles.scss';
import { withRouter } from 'react-router-dom';

class Footer extends Component {
  clickHandler = e => {
    this.props.history.push('/');
  };
  render() {
    return (
      <footer onClick={this.clickHandler}>
        <span className="dot"></span>
        <h3>BallBuddy</h3>
      </footer>
    );
  }
}

export default withRouter(Footer);

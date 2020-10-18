import React, { Component } from 'react';
import '../styles.scss';
import image from '../placeholder-image.jpg';

class CourtObject extends Component {
  render() {
    return(
      <div className="court-object">
        <div className = "line"/>
        <img src = {image} alt="placeholder"/>
        <div className="court-info">
          <div className="court-details">
            <h3>{this.props.data.outdoor ? "Outdoor" : "Indoor"}</h3>
            <h3>{this.props.data.hoops + " hoops"}</h3>
          </div>
          
          <div className="court-name">
            <h2>{this.props.data.name}</h2>
          </div>
        </div>
        
        <div className="court-populated">
            <h3>500 m</h3>
            <h3><mark>BUSY</mark></h3>
        </div>

      </div>
    );
  }
}

export default CourtObject

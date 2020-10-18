import React, {Component} from 'react'
import '../styles.scss'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "Burnaby, BC"
        };
    }
    render(){
        return(
            <header>
                <h1>{this.state.location}</h1>
            </header>
        );
    }
}

export default Header


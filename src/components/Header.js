import React, {Component} from 'react'
import '../styles.scss'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "Loading..."
        };
    }

    componentDidMount() {
        const googleScript = document.createElement('script')
        googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAy5wTTEXTXkSbGnWvQNwD_fb-VaZc1qYk&libraries=places`
        window.document.body.appendChild(googleScript)

        googleScript.addEventListener('load', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const geocoder = new window.google.maps.Geocoder;
                    geocoder.geocode({ location: { lat: pos.coords.latitude, lng: pos.coords.longitude }}, (results, status) => {
                        if (status === "OK") {
                            let output = results.filter(e => e.types.includes('locality'))
                            this.setState({location: output[0].formatted_address})
                        } else {
                          window.alert("Geocoder failed due to: " + status);
                        }
                    });
                });
            }
        })
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


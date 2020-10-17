import { Button } from 'react-bootstrap'
import React, { Component } from 'react'
import { displaySounds } from '../controllers/soundController'
import './styles.css'

class SoundButtons extends Component {
    constructor(props) {
        super(props)
        this.state = { sounds: [] }
    }

    onClick(sound) {
        sound.play()
    }

    componentDidMount() {
        for (const [key, value] of Object.entries(displaySounds)) {
            value.onloadeddata = function () {
                var audDuration = value.duration
                let obj = {
                    name: key,
                    sound: value,
                    duration: audDuration,
                }
                this.setState({
                    sounds: [...this.state.sounds, obj],
                })
            }.bind(this)
        }
    }

    render() {
        return (
            <div>
                <h3>Click here to listen to sounds!</h3>
                <div className="buttons">
                    {this.state.sounds.map(s => (
                        <div key={s.name}>
                            <Button onClick={() => this.onClick(s.sound)} variant="info" size="lg">
                                {s.name}
                            </Button>
                            <h6>
                                <small className="text-muted">dur: {Math.round(s.duration * 100) / 100}s</small>
                            </h6>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
export default SoundButtons

import { Button } from 'react-bootstrap'
import React, { Component } from 'react'
import soundManager from '../controllers/soundManager'
import './styles.css'

// https://reactjs.org/docs/state-and-lifecycle.html
class PlayButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            playing: false,
            display: 'Play',
            time: 0,
            start: 0,
        }
    }

    playOrPause() {
        if (this.state.playing) {
            this.stopSounds()
        } else {
            this.playSounds()
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 100)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        let isAudioPlaying = soundManager.isPlaying()
        if (!isAudioPlaying) {
            clearInterval(this.timer)
            // this.setState({ time: 0 })
        }
        this.setState({
            playing: isAudioPlaying,
            display: isAudioPlaying ? 'Stop' : 'Play',
        })
    }

    // implement play pause button and maybe reset, and maybe render the red line
    playSounds() {
        if (Object.keys(soundManager.sounds).length) {
            soundManager.playSounds()
            this.setState({
                time: 0,
                start: Date.now(), //Date.now() - this.state.time
            })
            this.timer = setInterval(
                () =>
                    this.setState({
                        time: Date.now() - this.state.start,
                    }),
                10
            )
        }
    }

    stopSounds() {
        soundManager.stopSounds()
        clearInterval(this.timer)
    }

    displayTime() {
        return Math.round((this.state.time / 1000) * 100) / 100
    }

    render() {
        return (
            <div class="timerContainer">
                <Button
                    onClick={() => this.playOrPause()}
                    variant="success"
                    type="button"
                    style={{ marginRight: '20px' }}
                >
                    {this.state.display}
                </Button>
                <div class="timer"> {this.displayTime().toFixed(2)} seconds </div>
            </div>
        )
    }
}

export default PlayButton

import React, { Component } from 'react'
import soundManager from '../controllers/soundManager'
import { displaySounds } from '../controllers/soundController'
import { Line } from 'react-lineto'
import './styles.css'

class SoundTable extends Component {
    constructor(props) {
        super(props)

        this.state = { soundLines: [] }
        this.containerRef = React.createRef()
        this.getRectsInterval = undefined
    }

    componentDidMount() {
        this.getRectsInterval = setInterval(() => {
            const containerRect = this.containerRef.current.getBoundingClientRect()
            this.setState({
                soundLines: this.getSoundLines(containerRect),
            })
        }, 10) // This determines how often the polling occurs in milliseconds
    }

    componentWillUnmount() {
        clearInterval(this.getRectsInterval)
    }

    getSoundLines(containerRect) {
        // Each sound has a div, and each div has multiple lines
        return Object.keys(soundManager.sounds).map((key, i) => (
            <SoundLine sound={soundManager.sounds[key]} canvas={containerRect} index={i + 1} key={key} />
        ))
    }

    renderLines() {
        return Array(15)
            .fill(null)
            .map((el, i) => <VerticalLine left={i * 6.7} index={i} key={i} />)
    }

    render() {
        return (
            <div className="soundTable">
                <SoundLabels soundList={soundManager.sounds} />
                <div className="linesContainer" ref={this.containerRef}>
                    <div className="soundLabelPadding" />
                    {this.renderLines()}
                    {this.state.soundLines}
                </div>
            </div>
        )
    }
}

const VerticalLine = ({ left, index }) => {
    let pos = parseInt(index * 4)
    return (
        <div className="verticalLine" style={{ left: `${left}%` }}>
            <p className="time"> {pos}</p>
        </div>
    )
}

const SoundLine = ({ sound, canvas, index }) => {
    let lineData = getData(sound, canvas, index)
    return (
        <div className="soundLineRow">
            {lineData.map(data => (
                <Line
                    key="2"
                    x0={data.x0}
                    y0={data.y}
                    x1={data.x1}
                    y1={data.y}
                    borderColor={sound.color}
                    borderWidth={5}
                    borderStyle="outset"
                />
            ))}
        </div>
    )
}

const SoundLabels = ({ soundList }) => {
    return (
        <div className="soundLabelContainer">
            <div className="soundLabelPadding">Time</div>
            {Object.keys(soundList).map(key => (
                <div key={key} className="soundLabel">
                    {key}
                </div>
            ))}
        </div>
    )
}

function getData(sound, canvas, index) {
    if (!sound.soundBuffer) return []
    let scrollYOffset =
        window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    let dataList = [];

    // Get Pixel to Second conversion ratio
    let ratio = canvas.width / 60

    // Get Y Position
    let top = scrollYOffset + canvas.top
    let yOffset = canvas.height * 0.05 * index + canvas.height * 0.01
    let yPos = top + yOffset

    // Convert seconds into pixels
    let startPos = canvas.left + 2 + ratio * sound.pos
    let lengthWidth = ratio * sound.soundMods.length

    // calculate audio duration:
    let durationWidth = ratio * displaySounds[sound.id].duration / sound.soundMods.speed
    
    if (sound.soundMods.length && !sound.soundMods.interval) {
        durationWidth = lengthWidth
    }

    let endPosition = startPos + durationWidth;
    if (endPosition >= canvas.right) endPosition = canvas.right - 2;

    dataList.push({ x0: startPos, x1: endPosition, y: yPos })

    if (sound.soundMods.interval) {
        let intervalWidth = ratio * sound.soundMods.interval
        let maxWidth = startPos + lengthWidth
        if (maxWidth >= canvas.right) maxWidth = canvas.right - 2;
        for (let i = startPos + intervalWidth; i < maxWidth; i += intervalWidth) {
            endPosition = i + durationWidth >= maxWidth ? maxWidth : i + durationWidth
            dataList.push({ x0: i, x1: endPosition, y: yPos })
        }
    }

    return dataList
}

export default SoundTable

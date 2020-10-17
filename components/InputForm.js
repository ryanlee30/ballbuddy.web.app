import { Form, Button } from 'react-bootstrap'
import React, { Component } from 'react'
import { executeCommands } from '../controllers/commandController'
import soundManager from '../controllers/soundManager'
import SoundTable from './SoundTable'
import PlayButton from './PlayButton'
import './styles.css'

class InputForm extends Component {
    constructor(props) {
        super(props)
        this.state = { commandOutput: [], commandInput: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ commandInput: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        let output;
        try {
            executeCommands(this.state.commandInput)
            output = {
                time: new Date().toLocaleString(),
                text: event.target.DSLCommand.value,
                error: null,
            }
        } catch (e) {
            console.error(e)
            output = {
                time: new Date().toLocaleString(),
                text: event.target.DSLCommand.value,
                error: e,
            }
        }
        this.setState({
            commandOutput: [...this.state.commandOutput, output],
        })
        this.setState({ commandInput: '' })
    }

    playSounds() {
        soundManager.playSounds()
    }

    render() {
        return (
            <div className="allContent">
                <div className="flex-child-input">
                    <div className="inputform">
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="DSLCommand">
                                <Form.Label>Input DSL Command Here</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="10"
                                    type="text"
                                    name="DSLCommand"
                                    value={this.state.commandInput}
                                    onChange={this.handleChange}
                                />
                                <Form.Text className="text-muted">
                                    Please enter DSL text commands here
                                </Form.Text>
                            </Form.Group>
                            <Button variant="info" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                    <PlayButton/>
                    <br />
                    <h3>Commands History</h3>
                    <div className="commandsHistory">
                        {this.state.commandOutput.length == 0 && (
                            <h5>
                                <small className="text-muted">You have not executed any commands yet</small>
                            </h5>
                        )}
                        {this.state.commandOutput.slice().reverse().map(c => (
                            <div key={c}>
                                {!c.error && (
                                    <h5>
                                        <i>
                                            <small>{c.time}</small>{' '}
                                        </i>
                                        <small>{c.text}</small>
                                    </h5>
                                )}
                                {c.error && (
                                    <h5 className="text-danger">
                                        <i>
                                            <small>{c.time}</small>{' '}
                                        </i>
                                        <small>{c.error}</small>
                                    </h5>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <SoundTable class="flex-child-table"></SoundTable>
            </div>
        )
    }
}

export default InputForm

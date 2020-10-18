import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'

export class Navigation extends Component {
    render() {
        return (
            <Navbar bg="info" expand="lg">
                <Navbar.Brand className="text-white" href="/">
                    BallBuddy
                </Navbar.Brand>
                <Navbar.Brand className="text-white" href="/new-court/">
                    New Court
                </Navbar.Brand>
            </Navbar>
        )
    }
}

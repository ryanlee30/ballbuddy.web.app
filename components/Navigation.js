import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'

export class Navigation extends Component {
    render() {
        return (
            <Navbar bg="info" expand="lg">
                <Navbar.Brand className="text-white" href="/Audio-Mixer/">
                    SOUNDAPP
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav>
                    <Nav.Link className="d-inline p-2 text-white" href="/Audio-Mixer/#/dsl">
                        Our DSL
                    </Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

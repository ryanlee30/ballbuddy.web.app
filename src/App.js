import React from 'react'
import './App.css'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
// import Commands from './components/Commands'
// import { Navigation } from './components/Navigation'
// import DSLPage from './components/DSLPage'
import style from 'bootstrap/dist/css/bootstrap.css'

function App() {
    return (
        <Router basename="/Audio-Mixer">
            <div className="App">
                <Navigation />
                <div className="App-header">
                    <Switch>
                        <Route path="/" component={Commands} exact />
                        <Route path="/dsl" component={DSLPage} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App

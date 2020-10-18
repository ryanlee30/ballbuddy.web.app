import React from 'react'
import './App.css'
import { BrowserRouter, HashRouter as Router, Route, Switch} from 'react-router-dom'
import { Navigation } from './components/Navigation'
import Courts from './components/Courts'
import NewCourt from './components/NewCourt'
import style from 'bootstrap/dist/css/bootstrap.css'

function App() {
    return (
        <BrowserRouter basename="/gasbuddy-main">
            <div className="App">
                <Navigation />
                <div className="App-header">
                    <Switch>
                        <Route path="/" component={Courts} exact />
                        <Route path="/new-court" component={NewCourt} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App

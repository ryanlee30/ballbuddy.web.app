import React from 'react'
import './App.css'
import { BrowserRouter, HashRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import Courts from './components/Courts'
import { NewCourt } from './components/NewCourt'

function App() {
    return (
        <BrowserRouter basename="/ballbuddy-main">
            <div className="App">
                <Header/>

                <Switch>
                    <Route path="/" component={Courts} exact />
                    <Route path="/new-court" component={NewCourt} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App

import React from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Header'
import Courts from './components/Courts'
import NewCourt from './components/NewCourt'
import MapContainer from './components/GoogleMap'
import Details from './components/Details'
import Footer from './components/Footer'

function App() {
    return (
        <BrowserRouter basename="/">
            <div className="App">
                <Header/>
                <Route path="/" component={Courts} exact />
                <Route path="/new-court" component={NewCourt} />
                <Route path="/details/:id" component={Details}/>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default App

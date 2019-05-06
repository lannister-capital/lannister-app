import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './views/home'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">Lannister Capital</header>
        <Route path="/" exact component={Home} />
      </div>
    </Router>
  )
}

export default App

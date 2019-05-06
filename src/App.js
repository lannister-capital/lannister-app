import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Dashboard from './views/Dashboard'
import styled from 'styled-components'
import './App.css'

const Column = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

function App() {
  return (
    <Router>
      <div className="App">
        <Column>
          <Sidebar />
        </Column>
        <Column>
          <Route path="/" exact component={Dashboard} />
        </Column>
      </div>
    </Router>
  )
}

export default App

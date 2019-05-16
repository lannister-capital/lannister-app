import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Dashboard from './views/Dashboard'
import styled from 'styled-components'
import './App.css'
import './styles/typography.css'

const Column = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const LargeColumn = styled(Column)`
  flex: 1;
`

function App() {
  return (
    <Router>
      <div className="App">
        <Column>
          <Sidebar />
        </Column>
        <LargeColumn>
          <Route path="/" exact component={Dashboard} />
        </LargeColumn>
      </div>
    </Router>
  )
}

export default App

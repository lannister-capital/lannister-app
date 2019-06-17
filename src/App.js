import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as blockstack from 'blockstack'

import MainContainer from './components/MainContainer'
import Sidebar from './components/Sidebar'
import Dashboard from './views/Dashboard'
import Holdings from './views/Holdings'
import Holding from './views/Holding'
import styled from 'styled-components'
import './App.css'
import './styles/typography.css'
import './styles/modal.css'

const Column = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const LargeColumn = styled(Column)`
  flex: 1;
`

function App() {
  blockstack.signUserOut()
  const userSession = new blockstack.UserSession()
  const appDomain = 'https://lannister.capital'
  const transitPrivateKey = userSession.generateAndStoreTransitKey()
  const redirectURI = appDomain + '/redirect-web-localhost.html'
  const manifestURI = appDomain + '/manifest.json'
  const scopes = ['store_write']
  const authRequest = blockstack.makeAuthRequest(
    transitPrivateKey,
    redirectURI,
    manifestURI,
    scopes,
    appDomain
  )

  blockstack.redirectToSignInWithAuthRequest(authRequest)

  return (
    <Router>
      <div className="App">
        <Column>
          <Sidebar />
        </Column>
        <LargeColumn>
          <MainContainer>
            <Route path="/" exact component={Dashboard} />
            <Route path="/holdings" exact component={Holdings} />
            <Route path="/holdings/:id" exact component={Holding} />
          </MainContainer>
        </LargeColumn>
      </div>
    </Router>
  )
}

export default App

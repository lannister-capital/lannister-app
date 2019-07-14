import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import MainContainer from './components/MainContainer'
import Sidebar from './components/Sidebar'
import Dashboard from './views/Dashboard'
import Holdings from './views/Holdings'
import Holding from './views/Holding'
import Settings from './views/Settings'

import db from './db'
import { handleSignIn, syncDb } from './utils/blockstack'

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

const currencies = db.get('currencies').value()

const updateExchangeRates = () => {
  axios.get('https://api.exchangeratesapi.io/latest').then(response => {
    const rates = response.data.rates
    currencies.forEach(currency => {
      db.get('currencies')
        .find({ code: currency.code })
        .assign({ euro_rate: rates[currency.code] })
        .write()
    })
  })

  axios.get('https://api.cryptonator.com/api/ticker/eur-eth').then(response => {
    const rate = response.data.ticker.price
    db.get('currencies')
      .find({ code: 'ETH' })
      .assign({ euro_rate: rate })
      .write()
  })

  axios.get('https://api.cryptonator.com/api/ticker/eur-btc').then(response => {
    const rate = response.data.ticker.price
    db.get('currencies')
      .find({ code: 'BTC' })
      .assign({ euro_rate: rate })
      .write()
  })
}

function App() {
  useEffect(() => {
    handleSignIn()
    updateExchangeRates()
    syncDb()
  }, [])

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
            <Route path="/settings" exact component={Settings} />
          </MainContainer>
        </LargeColumn>
      </div>
    </Router>
  )
}

export default App

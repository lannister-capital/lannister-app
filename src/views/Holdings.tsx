import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import HoldingsList from '../components/Holdings/HoldingsList'
import db from '../db'

const Flex = styled.div`
  display: flex;
`

const Column = styled.div`
  flex: 1;
  flex-direction: column;
`

const LeftColumn = styled(Column)`
  margin-top: 20px;
  text-align: left;

  /* Need to remove this */
  & > div > a > div {
    margin-left: 0;
  }
`

const Holdings = () => {
  const [holdings, setHoldings] = useState([])

  useEffect(() => {
    setHoldings(db.read('holdings').value().holdings)
  }, [])

  return (
    <div>
      <h1>Holdings</h1>
      <Flex>
        <LeftColumn>
          <HoldingsList holdings={holdings} showTitle={false} />
        </LeftColumn>
        <Column />
      </Flex>
    </div>
  )
}

export default Holdings

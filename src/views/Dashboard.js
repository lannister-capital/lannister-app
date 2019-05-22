import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import HoldingsList from '../components/Holdings/HoldingsList'
import { PieChart, Pie, Cell } from 'recharts'
import db from '../db'

const Container = styled.div`
  padding: 58px;
  text-align: left;
  width: 100%;
`

const Flex = styled.div`
  display: flex;
`

const Column = styled.div`
  flex: 1;
  flex-direction: column;
`

const Dashboard = () => {
  const [holdings, setHoldings] = useState([])

  useEffect(() => {
    setHoldings(db.read('holdings').value().holdings)
  }, [])

  return (
    <Container>
      <h1>Total Portfolio Value</h1>

      <Flex>
        <Column>
          <PieChart width={400} height={400}>
            <Pie
              data={holdings}
              dataKey="amount"
              cx={200}
              cy={200}
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label>
              {holdings.map((holding, index) => (
                <Cell key={`cell-${index}`} fill={holding.color} />
              ))}
            </Pie>
          </PieChart>
        </Column>
        <Column>
          <HoldingsList holdings={holdings} />
        </Column>
      </Flex>
    </Container>
  )
}

export default Dashboard

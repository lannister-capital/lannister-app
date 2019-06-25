import React, { useState, useEffect } from 'react'
import accounting from 'accounting'
import styled from 'styled-components'
import HoldingsList from '../components/Holdings/HoldingsList'
import { Flex, Column } from '../components/Grid'
import { PieChart, Pie, Cell } from 'recharts'
import LongButton from '../components/LongButton'
import { getPrice } from '../data/price'
import db from '../db'

const TotalValue = styled.div`
  color: #2a364a;
  font-size: 28px;
`

const Dashboard = () => {
  const [holdings, setHoldings] = useState([])

  useEffect(() => {
    setHoldings(db.read('holdings').value().holdings)
  }, [])

  const totalHoldingsValue = holdings.reduce((a, b) => a + b.value, 0)

  return (
    <div>
      <h1>Total Portfolio Value</h1>

      <Flex>
        <Column>
          <TotalValue>
            {accounting.formatMoney(totalHoldingsValue, '€')}
          </TotalValue>
          <PieChart width={400} height={400}>
            <Pie
              data={holdings}
              dataKey="value"
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
          <LongButton text="See All" />
        </Column>
      </Flex>
    </div>
  )
}

export default Dashboard

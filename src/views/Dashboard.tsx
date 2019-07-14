import React, { useState, useEffect, useCallback } from 'react'
import accounting from 'accounting'
import styled from 'styled-components'
import HoldingsList from '../components/Holdings/HoldingsList'
import { Flex, Column } from '../components/Grid'
import { PieChart, Pie, Cell, Label } from 'recharts'
import LongButton from '../components/LongButton'
import db from '../db'
import { convertedValue } from '../utils/holding'

const TotalValue = styled.div`
  color: #2a364a;
  font-size: 28px;
`

const Dashboard = () => {
  const [percent, setPercent] = useState('%')
  const [holdings, setHoldings] = useState<Holding[]>([])

  // TODO: do not retrieve this everytime but allow immediate updates
  const currentGlobalCurrencyCode =
    localStorage.getItem('globalCurrencyCode') || 'EUR'
  const globalCurrency: Currency = db
    .get('currencies')
    .find({ code: currentGlobalCurrencyCode })
    .value()

  useEffect(() => {
    const allHoldings: [Holding] = db.read('holdings').value().holdings
    allHoldings.map((holding: Holding) => {
      holding.convertedValue = convertedValue(holding)
      return holding
    })
    allHoldings.sort((a: Holding, b: Holding) =>
      b.convertedValue! > a.convertedValue! ? 1 : -1
    )
    setHoldings(allHoldings)
  }, [])

  const handleMouseOver = useCallback(cell => {
    let value = (cell.percent * 100).toFixed(2) + '%'
    setPercent(value)
  }, [])

  const handleMouseOut = useCallback(() => {
    setPercent('%')
  }, [])

  const totalHoldingsValue = holdings.reduce((a, b) => a + convertedValue(b), 0)

  return (
    <div>
      <h1>Total Portfolio Value</h1>

      <Flex>
        <Column>
          <TotalValue>
            {accounting.formatMoney(
              totalHoldingsValue,
              globalCurrency ? globalCurrency.symbol : '€'
            )}
          </TotalValue>
          <PieChart width={400} height={400}>
            <Pie
              data={holdings}
              dataKey="convertedValue"
              cx={200}
              cy={200}
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label
              onMouseEnter={handleMouseOver}
              onMouseOut={handleMouseOut}>
              <Label fontSize="35" fill="#7686A2" offset={0} position="center">
                {percent}
              </Label>
              {holdings.map((holding, index) => (
                <Cell key={`cell-${index}`} fill={holding.color} />
              ))}
            </Pie>
          </PieChart>
        </Column>
        <Column>
          <HoldingsList holdings={holdings.slice(0, 5)} />
          <LongButton text="See All" />
        </Column>
      </Flex>
    </div>
  )
}

export default Dashboard

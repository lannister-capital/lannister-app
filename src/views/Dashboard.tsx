import React, { useState, useEffect, useCallback } from 'react'
import accounting from 'accounting'
import styled from 'styled-components'
import Button from '../components/Button'
import HoldingModal from '../components/Holdings/HoldingModal'
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

const EmptyCTAButton = styled(Button)`
  margin-top: 20px;
`

const Dashboard = () => {
  const [percent, setPercent] = useState('%')
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [openHoldingModal, setOpenHoldingModal] = useState(false)

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
    const filteredHoldings = allHoldings.filter(
      (holding: Holding) => holding.value !== null
    )
    setHoldings(filteredHoldings)
  }, [])

  const handleMouseOver = useCallback(cell => {
    let value = (cell.percent * 100).toFixed(2) + '%'
    setPercent(value)
  }, [])

  const handleMouseOut = useCallback(() => {
    setPercent('%')
  }, [])

  const totalHoldingsValue = holdings.reduce((a, b) => a + convertedValue(b), 0)

  let percentages: Number[] = []
  // Calling convertedValue here again, because we can't use holding.convertedValue
  // since it's optional in the interface
  holdings.forEach(holding => {
    percentages.push(
      Math.round(
        ((convertedValue(holding) / totalHoldingsValue) * 100 * 10) / 10
      )
    )
  })

  const holdingCreated = () => {
    setOpenHoldingModal(false)
    setHoldings(db.read('holdings').value().holdings)
  }

  const customLabel = ({ value }) => {
    return accounting.formatMoney(value, globalCurrency.symbol)
  }

  return (
    <div>
      <h1>Total Portfolio Value</h1>

      <Flex>
        <Column>
          {holdings.length > 0 ? (
            <>
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
                  label={customLabel}
                  onMouseEnter={handleMouseOver}
                  onMouseOut={handleMouseOut}>
                  <Label
                    fontSize="35"
                    fill="#7686A2"
                    offset={0}
                    position="center">
                    {percent}
                  </Label>
                  {holdings.map((holding, index) => (
                    <Cell key={`cell-${index}`} fill={holding.hex_color} />
                  ))}
                </Pie>
              </PieChart>
            </>
          ) : (
            <>
              <EmptyCTAButton onClick={() => setOpenHoldingModal(true)}>
                Create your first holding
              </EmptyCTAButton>
            </>
          )}
        </Column>
        {holdings.length > 0 && (
          <Column>
            <HoldingsList
              holdings={holdings.slice(0, 5)}
              percentages={percentages.slice(0, 5)}
            />
            <LongButton text="See All" />
          </Column>
        )}
      </Flex>

      <HoldingModal
        isOpen={openHoldingModal}
        onRequestClose={() => setOpenHoldingModal(false)}
        onCancel={() => setOpenHoldingModal(false)}
        onCreate={() => holdingCreated()}
      />
    </div>
  )
}

export default Dashboard

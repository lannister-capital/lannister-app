import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import accounting from 'accounting'
import { PieChart, Pie, Cell, Label } from 'recharts'
import Button from '../components/Button'
import { Flex, Column, RightAlignContainer } from '../components/Grid'
import db from '../db'
import HoldingModal from '../components/Holdings/HoldingModal'
import TransactionModal from '../components/Transactions/TransactionModal'
import TransactionItem from '../components/Transactions/TransactionItem'
import { convertedValue } from '../utils/holding'

const TotalValue = styled.div`
  color: #2a364a;
  font-size: 28px;
`

const ButtonWrapper = styled.div`
  display: inline-block;
  margin-left: 20px;
`

const Wrapper = styled.div`
  margin-top: 50px;
`

const Holding = (props: { match: { params: { id: string } } }) => {
  const id = props.match.params.id
  const [holding, setHolding] = useState<Holding>(
    db
      .get('holdings')
      .find({ id: id })
      .value()
  )
  const [openHoldingModal, setOpenHoldingModal] = useState(false)
  const [openTransactionModal, setOpenTransactionModal] = useState(false)
  const [percent, setPercent] = useState('%')

  const holdings = db.read('holdings').value().holdings
  const totalHoldingsValue = holdings.reduce(
    (a: number, b: Holding) => a + convertedValue(b),
    0
  )
  holding.convertedValue = convertedValue(holding)
  const currencySymbol = db
    .get('currencies')
    .find({ code: holding.currency_code })
    .value()

  const currentGlobalCurrencyCode =
    localStorage.getItem('globalCurrencyCode') || 'EUR'
  const globalCurrency: Currency = db
    .get('currencies')
    .find({ code: currentGlobalCurrencyCode })
    .value()
  const customLabel = ({ value }) => {
    return accounting.formatMoney(value, globalCurrency.symbol)
  }

  const handleMouseOver = useCallback(cell => {
    let value = (cell.percent * 100).toFixed(2) + '%'
    setPercent(value)
  }, [])

  const handleMouseOut = useCallback(() => {
    setPercent('%')
  }, [])

  const updateHolding = () => {
    setHolding(
      db
        .get('holdings')
        .find({ id: id })
        .value()
    )
  }

  return (
    <div>
      <Flex>
        <Column>
          <h1>{holding.name}</h1>
        </Column>
        <Column>
          <RightAlignContainer>
            <ButtonWrapper>
              <Button onClick={() => setOpenHoldingModal(true)}>
                Edit Holding
              </Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button onClick={() => setOpenTransactionModal(true)}>
                Add New Transaction
              </Button>
            </ButtonWrapper>
          </RightAlignContainer>
        </Column>
      </Flex>

      <Flex>
        <Column>
          <TotalValue>
            {accounting.formatMoney(holding.value, currencySymbol)}
          </TotalValue>
          <PieChart width={400} height={400}>
            <Pie
              data={[
                holding,
                { convertedValue: totalHoldingsValue - holding.convertedValue }
              ]}
              dataKey="convertedValue"
              cx={200}
              cy={200}
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              onMouseEnter={handleMouseOver}
              onMouseOut={handleMouseOut}
              label={customLabel}>
              <Label fontSize="35" fill="#7686A2" offset={0} position="center">
                {percent}
              </Label>
              <Cell fill={holding.hex_color} />
            </Pie>
          </PieChart>
        </Column>
        <Column>
          <Wrapper>
            {(holding.transactions || []).map((transaction: Transaction) => {
              return (
                <TransactionItem
                  holding={holding}
                  transaction={transaction}
                  currency_code={holding.currency_code}
                  key={transaction.name}
                  onDelete={updateHolding}
                />
              )
            })}
          </Wrapper>
        </Column>
      </Flex>

      <HoldingModal
        isOpen={openHoldingModal}
        onRequestClose={() => setOpenHoldingModal(false)}
        onCancel={() => setOpenHoldingModal(false)}
        onCreate={() => setOpenHoldingModal(false)}
        holding={holding}
      />

      <TransactionModal
        isOpen={openTransactionModal}
        onRequestClose={() => setOpenTransactionModal(false)}
        onCancel={() => setOpenTransactionModal(false)}
        onCreate={() => {
          setOpenTransactionModal(false)
          updateHolding()
        }}
        holding={holding}
      />
    </div>
  )
}

export default Holding

import React, { useState } from 'react'
import styled from 'styled-components'
import accounting from 'accounting'
import { PieChart, Pie, Cell } from 'recharts'
import Button from '../components/Button'
import { Flex, Column, RightAlignContainer } from '../components/Grid'
import db from '../db'
import HoldingModal from '../components/Holdings/HoldingModal'

const TotalValue = styled.div`
  color: #2a364a;
  font-size: 28px;
`

const ButtonWrapper = styled.div`
  display: inline-block;
  margin-left: 20px;
`

const Holding = (props: { match: { params: { id: string } } }) => {
  const id = props.match.params.id
  const [openHoldingModal, setOpenHoldingModal] = useState(false)

  const holdings = db.read('holdings').value().holdings
  const totalHoldingsValue = holdings.reduce((a, b) => a + b.value, 0)
  const holding = db
    .get('holdings')
    .find({ id: id })
    .value()
  const currencySymbol = db
    .get('currencies')
    .find({ code: holding.currency })
    .value()

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
              <Button>Add New Transaction</Button>
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
              data={[holding, { value: totalHoldingsValue - holding.value }]}
              dataKey="value"
              cx={200}
              cy={200}
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label>
              <Cell fill={holding.color} />
            </Pie>
          </PieChart>
        </Column>
      </Flex>

      <HoldingModal
        isOpen={openHoldingModal}
        onRequestClose={() => setOpenHoldingModal(false)}
        onCancel={() => setOpenHoldingModal(false)}
        onCreate={() => setOpenHoldingModal(false)}
        holding={holding}
      />
    </div>
  )
}

export default Holding

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import { Flex, Column } from '../components/Grid'
import HoldingModal from '../components/Holdings/HoldingModal'
import HoldingsList from '../components/Holdings/HoldingsList'
import db from '../db'
import { convertedValue } from '../utils/holding'

const RightAlignContainer = styled.div`
  text-align: right;
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
  const [openHoldingModal, setOpenHoldingModal] = useState(false)

  useEffect(() => {
    const allHoldings = db.read('holdings').value().holdings
    allHoldings.sort((a: Holding, b: Holding) =>
      convertedValue(b) > convertedValue(a) ? 1 : -1
    )
    const filteredHoldings = allHoldings.filter(
      (holding: Holding) => !!holding.value
    )
    setHoldings(filteredHoldings)
  }, [openHoldingModal])

  const holdingCreated = () => {
    setOpenHoldingModal(false)
  }

  const totalHoldingsValue = holdings.reduce((a, b) => a + convertedValue(b), 0)
  let percentages: Number[] = []
  // Calling convertedValue here again, because we can't use holding.convertedValue since it's optional in the interface
  holdings.forEach(holding => {
    percentages.push(
      Math.round(
        ((convertedValue(holding) / totalHoldingsValue) * 100 * 10) / 10
      )
    )
  })

  return (
    <div>
      <Flex>
        <Column>
          <h1>Holdings</h1>
        </Column>
        <Column>
          <RightAlignContainer>
            <Button onClick={() => setOpenHoldingModal(true)}>
              Add New Holding
            </Button>
          </RightAlignContainer>
        </Column>
      </Flex>
      <Flex>
        <LeftColumn>
          <HoldingsList
            holdings={holdings}
            percentages={percentages}
            showTitle={false}
          />
        </LeftColumn>
        <Column />
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

export default Holdings

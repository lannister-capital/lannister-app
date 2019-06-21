import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import { Flex, Column } from '../components/Grid'
import NewHoldingModal from '../components/Holdings/NewHoldingModal'
import HoldingsList from '../components/Holdings/HoldingsList'
import db from '../db'

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
    setHoldings(db.read('holdings').value().holdings)
  }, [])

  const holdingCreated = () => {
    setOpenHoldingModal(false)
    setHoldings(db.read('holdings').value().holdings)
  }

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
          <HoldingsList holdings={holdings} showTitle={false} />
        </LeftColumn>
        <Column />
      </Flex>

      <NewHoldingModal
        isOpen={openHoldingModal}
        onRequestClose={() => setOpenHoldingModal(false)}
        onCancel={() => setOpenHoldingModal(false)}
        onCreate={() => holdingCreated()}
      />
    </div>
  )
}

export default Holdings

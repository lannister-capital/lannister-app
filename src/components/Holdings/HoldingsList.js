import React from 'react'
import styled from 'styled-components'
import HoldingItem from './HoldingItem'

const Container = styled.div`
  text-align: center;
`

const holding = {
  name: 'Test',
  amount: 20000.0
}

const HoldingsList = () => {
  return (
    <Container>
      <h2>Holdings</h2>
      <HoldingItem holding={holding} />
    </Container>
  )
}

export default HoldingsList

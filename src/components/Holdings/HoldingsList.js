import React from 'react'
import styled from 'styled-components'
import HoldingItem from './HoldingItem'

const Container = styled.div`
  text-align: center;
`

const holdings = [
  {
    name: 'Test',
    amount: 20000.0,
    color: '#ffbf00'
  },
  {
    name: 'Another',
    amount: 50000.0,
    color: '#f00'
  }
]

const HoldingsList = () => {
  return (
    <Container>
      <h2>Holdings</h2>
      <HoldingItem holding={holdings[0]} />
      <HoldingItem holding={holdings[1]} />
    </Container>
  )
}

export default HoldingsList

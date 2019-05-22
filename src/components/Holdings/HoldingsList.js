import React from 'react'
import styled from 'styled-components'
import HoldingItem from './HoldingItem'

const Container = styled.div`
  text-align: center;
`

const HoldingsList = ({ holdings }) => {
  return (
    <Container>
      <h2>Holdings</h2>
      {holdings.map((holding, index) => {
        return <HoldingItem holding={holding} key={index} />
      })}
    </Container>
  )
}

export default HoldingsList

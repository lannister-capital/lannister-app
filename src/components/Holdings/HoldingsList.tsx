import React from 'react'
import styled from 'styled-components'
import HoldingItem from './HoldingItem'

const Container = styled.div`
  text-align: center;
`

interface HoldingsList {
  holdings: []
  showTitle: boolean
}

const HoldingsList = ({ holdings, showTitle = true }) => {
  return (
    <Container>
      {showTitle && <h2>Holdings</h2>}
      {holdings.map((holding, index: number) => {
        return <HoldingItem holding={holding} key={index} />
      })}
    </Container>
  )
}

export default HoldingsList

import React from 'react'
import styled from 'styled-components'
import HoldingItem from './HoldingItem'

const Container = styled.div`
  text-align: center;
`

interface HoldingsList {
  holdings: []
  percentages: []
  showTitle: boolean
}

const HoldingsList = ({ holdings, percentages, showTitle = true }) => {
  return (
    <Container>
      {showTitle && <h2>Holdings</h2>}
      {holdings.map((holding, index: number) => {
        console.log(percentages[index])
        return <HoldingItem holding={holding} key={index} percentage={percentages[index]}/>
      })}
    </Container>
  )
}

export default HoldingsList

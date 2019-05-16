import React from 'react'
import styled from 'styled-components'
import accounting from 'accounting'
// import { NavLink } from 'react-router-dom'

import forwardIcon from '../../assets/forward.png'

const ItemContainer = styled.div`
  background-color: #e8ebf4;
  border-radius: 4px;
  display: flex;
  margin: auto;
  max-width: 450px;
  min-height: 65px;
  overflow: hidden;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  width: 100%;
`

const ColorStrip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  background-color: #ffbf00;
`

const HoldingDetails = styled.div`
  padding-left: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
`

const VerticalMiddleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const HoldingTitle = styled(VerticalMiddleContainer)`
  color: #2a364a;
  font-size: 18px;
`

const HoldingTotal = styled(VerticalMiddleContainer)`
  color: #7686a2;
  font-size: 13px;
`

const Indicator = styled.div`
  align-items: flex-end;
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  padding-right: 10px;
  text-align: right;

  img {
    width: 8px;
    height: 14px;
  }
`

const HoldingItem = ({ holding }) => {
  return (
    <ItemContainer>
      <ColorStrip />
      <HoldingDetails>
        <HoldingTitle>{holding.name}</HoldingTitle>
        <HoldingTotal>{accounting.formatMoney(holding.amount)}</HoldingTotal>
      </HoldingDetails>
      <Indicator>
        <img src={forwardIcon} alt="Forward" />
      </Indicator>
    </ItemContainer>
  )
}

export default HoldingItem

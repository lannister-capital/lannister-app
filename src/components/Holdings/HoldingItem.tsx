import React from 'react'
import styled from 'styled-components'
import accounting from 'accounting'
import { Link } from 'react-router-dom'

import forwardIcon from '../../assets/forward.png'

const StylelessLink = styled(Link)`
  text-decoration: none;
`

const ColorStrip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  background-color: ${props => props.color || '#ffbf00'};
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

const ItemContainer = styled.div`
  background-color: #e8ebf4;
  border-radius: 4px;
  display: flex;
  margin: auto;
  margin-bottom: 10px;
  max-width: 450px;
  min-height: 65px;
  overflow: hidden;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  width: 100%;

  &:hover {
    background-color: #7686a2;
    color: #fff !important;
    cursor: pointer;

    ${HoldingTitle}, ${HoldingTotal}, ${Indicator} {
      color: #fff;
    }
  }
`

interface Holding {
  name: string
  amount: number
  color: string
}

const HoldingItem = ({
  holding: { name, amount, color }
}: {
  holding: Holding
}) => {
  return (
    <StylelessLink to={`/holdings/${name}`}>
      <ItemContainer>
        <ColorStrip color={color} />
        <HoldingDetails>
          <HoldingTitle>{name}</HoldingTitle>
          <HoldingTotal>{accounting.formatMoney(amount)}</HoldingTotal>
        </HoldingDetails>
        <Indicator>
          <img src={forwardIcon} alt="Forward" />
        </Indicator>
      </ItemContainer>
    </StylelessLink>
  )
}

export default HoldingItem

import React from 'react'
import styled from 'styled-components'
import accounting from 'accounting'
import {
  StylelessLink,
  Wrapper,
  VerticalMiddleContainer,
  Indicator,
  ItemContainer
} from '../LongItem'
import db from '../../db'

import forwardIcon from '../../assets/forward.png'

const ColorStrip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  background-color: ${props => props.color || '#ffbf00'};
`

const HoldingTitle = styled(VerticalMiddleContainer)`
  color: #2a364a;
  font-size: 18px;
`

const HoldingValues = styled.div`
  display: flex;  
  flex: 1;
  flex-direction: row
`

const HoldingTotal = styled.div`
  color: #7686a2;
  font-size: 13px;
`

const HoldingPercentage = styled.div`
  color: #7686a2;
  font-size: 13px;
  margin-left: 10px;
`

const HoldingItemContainer = styled(ItemContainer)`
  &:hover {
    background-color: #7686a2;
    color: #fff !important;
    cursor: pointer;

    ${HoldingTitle}, ${HoldingPercentage}, ${HoldingTotal}, ${Indicator} {
      color: #fff;
    }
  }
`

interface HoldingItem {
  holding : Holding
  percentage : Number
}

const HoldingItem = ({holding: {id, currency, color, name, value}, percentage}) => {
  const currencySymbol = db
    .get('currencies')
    .find({ code: currency })
    .value()

  return (
    <StylelessLink to={`/holdings/${id}`}>
      <HoldingItemContainer>
        <ColorStrip color={color} />
        <Wrapper>
          <HoldingTitle>{name}</HoldingTitle>
          <HoldingValues>
            <HoldingTotal>
              {accounting.formatMoney(value, currencySymbol)}
            </HoldingTotal>
            <HoldingPercentage>
              {percentage + '%'}
            </HoldingPercentage>
          </HoldingValues>
        </Wrapper>
        <Indicator>
          <img src={forwardIcon} alt="Forward" />
        </Indicator>
      </HoldingItemContainer>
    </StylelessLink>
  )
}

export default HoldingItem

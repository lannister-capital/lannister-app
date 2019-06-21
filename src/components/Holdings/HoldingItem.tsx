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

const HoldingTotal = styled(VerticalMiddleContainer)`
  color: #7686a2;
  font-size: 13px;
`

const HoldingItemContainer = styled(ItemContainer)`
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
  id: string
  name: string
  value: number
  color: string
  currency: string
}

const HoldingItem = ({
  holding: { id, name, value, color, currency }
}: {
  holding: Holding
}) => {
  const currencySymbol = db
    .get('currencies')
    .find({ code: currency })
    .value()
  console.log(currency)
  return (
    <StylelessLink to={`/holdings/${id}`}>
      <HoldingItemContainer>
        <ColorStrip color={color} />
        <Wrapper>
          <HoldingTitle>{name}</HoldingTitle>
          <HoldingTotal>
            {accounting.formatMoney(value, currencySymbol)}
          </HoldingTotal>
        </Wrapper>
        <Indicator>
          <img src={forwardIcon} alt="Forward" />
        </Indicator>
      </HoldingItemContainer>
    </StylelessLink>
  )
}

export default HoldingItem

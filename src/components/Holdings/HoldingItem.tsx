import React from 'react'
import styled from 'styled-components'
import accounting from 'accounting'
<<<<<<< HEAD
import { 
  StylelessLink, 
  Wrapper, 
=======
import {
  StylelessLink,
  Wrapper,
>>>>>>> upstream/master
  VerticalMiddleContainer,
  Indicator,
  ItemContainer
} from '../LongItem'
<<<<<<< HEAD
=======
import db from '../../db'
>>>>>>> upstream/master

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

const HoldingItem = ({
  holding: { id, name, value, color, currency }
}: {
  holding: Holding
}) => {
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

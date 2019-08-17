import React from 'react'
import styled from 'styled-components'
import accounting from 'accounting'
import {
  StylelessLink,
  Indicator,
  ItemContainer,
  ItemContentWrapper
} from '../LongItem'
import db from '../../db'

import forwardIcon from '../../assets/forward.png'

const ColorStrip = styled.div`
  width: 6px;
  background-color: ${props => props.color || '#ffbf00'};
`

const InfoContainer = styled.div`
  padding-left: 14px;
`

const HoldingTitle = styled.div`
  color: #2a364a;
  font-size: 18px;
  text-align: left;
`

const HoldingValues = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
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
  holding: Holding
  percentage: Number
}

const HoldingItem = ({
  holding: { id, currency_code, hex_color, name, value },
  percentage
}) => {
  const currencySymbol = db
    .get('currencies')
    .find({ code: currency_code })
    .value()

  return (
    <StylelessLink to={`/holdings/${id}`}>
      <HoldingItemContainer>
        <ColorStrip color={hex_color} />
        <ItemContentWrapper>
          <InfoContainer>
            <HoldingTitle>{name}</HoldingTitle>
            <HoldingValues>
              <HoldingTotal>
                {accounting.formatMoney(value, currencySymbol)}
              </HoldingTotal>
              <HoldingPercentage>{percentage + '%'}</HoldingPercentage>
            </HoldingValues>
          </InfoContainer>
          <Indicator>
            <img src={forwardIcon} alt="Forward" />
          </Indicator>
        </ItemContentWrapper>
      </HoldingItemContainer>
    </StylelessLink>
  )
}

export default HoldingItem

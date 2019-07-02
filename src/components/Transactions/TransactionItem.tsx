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

const ColorStrip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 100%;
  background-color: ${props => props.color || '#ffbf00'};
`

const TransactionTitle = styled(VerticalMiddleContainer)`
  color: #2a364a;
  font-size: 14px;
`

const TransactionTotal = styled(VerticalMiddleContainer)`
  color: #7686a2;
  font-size: 13px;
`

const TransactionItemContainer = styled(ItemContainer)`
  background-color: transparent;
  border-bottom: 1px solid #DCDCDC;
  border-radius: 0;
  float: right;
  margin-bottom: 0;
  max-width: 500px;

  &:hover {
    background-color: #7686a2;
    color: #fff !important;
    cursor: pointer;

    ${TransactionTitle}, ${TransactionTotal}, ${Indicator} {
      color: #fff;
    }
  }
`

const ValueWrapper = styled(Indicator)`
  color: ${props => props.color || '#00B382'};
`

const TransactionItem = ({
  transaction: { id, name, value, type, date },
  currency
}: {
  transaction: Transaction,
  currency: string
}) => {
  const currencySymbol = db
    .get('currencies')
    .find({ code: currency })
    .value()
  return (
    <StylelessLink>
      <TransactionItemContainer>
        <ColorStrip color={ type === 'credit' ? '#00B382' : '#E60243' } />
        <Wrapper>
          <TransactionTitle>{name}</TransactionTitle>
        </Wrapper>
        <ValueWrapper color={ type === 'credit' ? '#00B382' : '#E60243'}>
          {type === 'credit' ? '+ ' : '- '}
          {accounting.formatMoney(value, currencySymbol)}
        </ValueWrapper>
      </TransactionItemContainer>
    </StylelessLink>
  )
}

export default TransactionItem

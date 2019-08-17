import React from 'react'
import styled from 'styled-components'
import accounting from 'accounting'
import { Indicator, ItemContainer, ItemContentWrapper } from '../LongItem'
import db from '../../db'
import trashIcon from '../../assets/trash.svg'
import { uploadDb } from '../../utils/blockstack'

const TitleWrapper = styled.div`
  flex: 1;
  padding-left: 14px;
`

const ColorStrip = styled.div`
  width: 6px;
  background-color: ${props => props.color || '#ffbf00'};
`

const TransactionTitle = styled.div`
  color: #2a364a;
  font-size: 14px;
`

const TransactionTotal = styled.div`
  color: #7686a2;
  font-size: 13px;
`

const Options = styled.div`
  display: none;
  width: 30px;
  padding-right: 10px;
  text-align: right;

  img {
    cursor: pointer;
  }
`

const TransactionItemContainer = styled(ItemContainer)`
  background-color: transparent;
  border-bottom: 1px solid #DCDCDC;
  border-radius: 0;
  float: right;
  margin-bottom: 0;
  margin-top: 0;
  max-width: 500px;

  &:hover {
    background-color: #7686a2;
    color: #fff !important;

    ${TransactionTitle}, ${TransactionTotal}, ${Indicator} {
      color: #fff;
    }

    ${Options} {
      display: block;
    }
  }
`

const ValueWrapper = styled(Indicator)`
  color: ${props => props.color || '#00B382'};
`

const TransactionItem = ({
  holding,
  transaction: { id, name, value, type, date },
  currency_code,
  onDelete
}: {
  holding: Holding
  transaction: Transaction
  currency_code: string
  onDelete: Function
}) => {
  const currencySymbol = db
    .get('currencies')
    .find({ code: currency_code })
    .value()

  const deleteTransaction = () => {
    var dbHolding: Holding = db
      .get('holdings')
      .find({ id: holding.id })
      .value()

    const transactions = dbHolding.transactions.filter(
      (transaction: Transaction) => {
        return transaction.id !== id
      }
    )

    // Update transactions
    dbHolding.transactions = transactions

    // Update holding value
    if (type === 'credit') {
      dbHolding.value -= value
    } else {
      dbHolding.value += value
    }

    db.get('holdings')
      .find({ id: holding.id })
      .assign({ ...dbHolding })
      .write()

    uploadDb()
    onDelete()
  }

  return (
    <TransactionItemContainer>
      <ColorStrip color={type === 'credit' ? '#00B382' : '#E60243'} />
      <ItemContentWrapper>
        <TitleWrapper>
          <TransactionTitle>{name}</TransactionTitle>
        </TitleWrapper>
        <ValueWrapper color={type === 'credit' ? '#00B382' : '#E60243'}>
          {type === 'credit' ? '+ ' : '- '}
          {accounting.formatMoney(value, currencySymbol)}
        </ValueWrapper>
        <Options>
          <img
            src={trashIcon}
            onClick={() => deleteTransaction()}
            width="14"
            alt="Trash icon"
          />
        </Options>
      </ItemContentWrapper>
    </TransactionItemContainer>
  )
}

export default TransactionItem

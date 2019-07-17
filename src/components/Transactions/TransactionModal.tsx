import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import Button from '../Button'
import { FormGroup, Input, SelectInput } from '../Form'
import db from '../../db'
import shortid from 'shortid'
import { uploadDb } from '../../utils/blockstack'

ReactModal.setAppElement('#root')

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  content: {
    borderRadius: '8px',
    boxShadow: '0 9px 17px rgba(0, 0, 0, 0.2)',
    margin: 'auto',
    maxWidth: '730px',
    padding: '0',
    bottom: 'none'
  }
}

const ModalHeader = styled.div`
  border-bottom: 6px solid #7686a2;
  color: #7686a2;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 16px;
  text-align: center;
`

const CancelButton = styled.button`
  border: none;
  color: #7686a2;
  cursor: pointer;
  letter-spacing: 0.78px;
  font-size: 12px;
  font-weight: 600;
  outline: none;
  position: absolute;
  right: 30px;
  top: 20px;
`

const ModalBody = styled.div`
  padding: 40px;
`

interface ModalProps {
  transaction?: Transaction
  holding: Holding
  onCreate: Function
  onCancel: Function
  isOpen: boolean
}

const TransactionModal: React.SFC<ModalProps & ReactModal.Props> = (
  props: ModalProps
) => {
  const [transaction, setTransaction] = useState({
    name: '',
    value: 0,
    type: 'credit',
    date: new Date().toISOString()
  })

  useEffect(() => {
    if (props.transaction) {
      setTransaction(props.transaction)
    }
  }, [props.transaction])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget
    setTransaction({ ...transaction, [name]: value })
  }

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget
    setTransaction({ ...transaction, [name]: parseInt(value) })
  }

  const createTransaction = (event: React.SyntheticEvent) => {
    event.preventDefault()

    var dbHolding: Holding = db
      .get('holdings')
      .find({ id: props.holding.id })
      .value()

    // Add transaction to array
    if (!dbHolding.transactions) {
      dbHolding.transactions = []
    }
    dbHolding.transactions.push({ id: shortid.generate(), ...transaction })

    // Update holding value
    if (transaction.type === 'credit') {
      dbHolding.value += transaction.value
    } else {
      dbHolding.value -= transaction.value
    }

    db.get('holdings')
      .find({ id: props.holding.id })
      .assign({ ...dbHolding })
      .write()
    uploadDb()
    props.onCreate(transaction)
  }

  return (
    <ReactModal
      contentLabel="Transaction Modal"
      style={customStyles}
      closeTimeoutMS={300}
      {...props}>
      <ModalHeader>
        New Transaction
        <CancelButton
          onClick={() => {
            props.onCancel()
          }}>
          Cancel
        </CancelButton>
      </ModalHeader>

      <ModalBody>
        <form onSubmit={createTransaction}>
          <FormGroup>
            <label>Name of Transaction</label>
            <Input
              name="name"
              value={transaction.name}
              placeholder="Ex. June Dividends"
              type="text"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Type</label>
            <SelectInput
              name="type"
              onChange={e => handleInputChange(e)}
              value={transaction.type}>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </SelectInput>
          </FormGroup>
          <FormGroup>
            <label>Total Value</label>
            <Input
              name="value"
              type="number"
              onChange={handleValueChange}
              value={transaction.value}
            />
          </FormGroup>
          <div style={{ textAlign: 'center' }}>
            <Button primary type="submit">
              Save
            </Button>
          </div>
        </form>
      </ModalBody>
    </ReactModal>
  )
}

export default TransactionModal

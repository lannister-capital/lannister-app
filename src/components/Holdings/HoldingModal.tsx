import React, { useState, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { CirclePicker } from 'react-color'
import Button from '../Button'
import { FormGroup, Input, SelectInput } from '../Form'
import db from '../../db'
import shortid from 'shortid'
import { uploadDb } from '../../utils/blockstack'
import trashIcon from '../../assets/trashcan.svg'

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
  background-color: #ffffff;
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

const TrashCan = styled.img`
  position: absolute;
  right: 55px;
  bottom: 60px;
  cursor: pointer;
`

const ModalBody = styled.div`
  padding: 40px;
`

const ColorInputContainer = styled.div`
  margin-top: 10px;
`

const currencies: [Currency] = db.get('currencies').value()

interface ModalProps {
  holding?: Holding
  onCreate: Function
  onCancel: Function
  isOpen: boolean
  history: RouteComponentProps
}

const HoldingModal: React.SFC<ModalProps & ReactModal.Props> = (
  props: ModalProps
) => {
  const [holding, setHolding] = useState({
    name: '',
    currency: 'USD',
    value: 0,
    color: ''
  })

  useEffect(() => {
    if (props.holding) {
      setHolding(props.holding)
    }
  }, [props.holding])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget
    setHolding({ ...holding, [name]: value })
  }

  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget
    setHolding({ ...holding, [name]: parseInt(value) })
  }

  const handleColorChange = (color: { hex: string }) => {
    setHolding({ ...holding, color: color.hex })
  }

  const createHolding = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (props.holding) {
      // Update holding
      db.get('holdings')
        .find({ id: props.holding.id })
        .assign({ ...holding })
        .write()
    } else {
      // Create new holding
      db.get('holdings')
        .push({ id: shortid.generate(), ...holding })
        .write()
    }
    uploadDb()
    props.onCreate(holding)
  }

  const deleteHolding = () => {
    if (props.holding) {
      db.get('holdings')
        .remove({ id: props.holding.id })
        .write()
    }
    uploadDb()
    props.history.push('/holdings')
  }

  return (
    <ReactModal
      contentLabel="Holding Modal"
      style={customStyles}
      closeTimeoutMS={300}
      {...props}>
      <ModalHeader>
        New Holding
        <CancelButton
          onClick={() => {
            props.onCancel()
          }}>
          Cancel
        </CancelButton>
      </ModalHeader>

      <ModalBody>
        <form onSubmit={createHolding}>
          <FormGroup>
            <label>Name of Holding</label>
            <Input
              name="name"
              value={holding.name}
              placeholder="Ex. Coinbase"
              type="text"
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <label>Currency</label>
            <SelectInput
              name="currency"
              onChange={e => handleInputChange(e)}
              value={holding.currency}>
              {currencies.map((currency: Currency) => {
                return (
                  <option key={currency.code} value={currency.code}>
                    {currency.name} ({currency.symbol})
                  </option>
                )
              })}
            </SelectInput>
          </FormGroup>
          <FormGroup>
            <label>Total Value</label>
            <Input
              name="value"
              type="number"
              onChange={handleValueChange}
              value={holding.value}
            />
          </FormGroup>
          <FormGroup>
            <label>Color</label>
            <ColorInputContainer>
              <CirclePicker
                color={holding.color}
                onChangeComplete={handleColorChange}
                width="100%"
                circleSize={20}
                circleSpacing={10}
              />
            </ColorInputContainer>
          </FormGroup>
          <div style={{ textAlign: 'center' }}>
            <Button primary type="submit">
              Save
            </Button>
            {props.holding ? (
              <TrashCan
                src={trashIcon}
                onClick={() => deleteHolding()}
                alt="Icon"
              />
            ) : (
              ''
            )}
          </div>
        </form>
      </ModalBody>
    </ReactModal>
  )
}

export default withRouter(HoldingModal)

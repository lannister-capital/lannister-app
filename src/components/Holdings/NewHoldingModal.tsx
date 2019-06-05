import React, { useState } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { CirclePicker } from 'react-color'
import Button from '../Button'
import db from '../../db'
import shortid from 'shortid'

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

const FormGroup = styled.div`
  margin-bottom: 30px;
`

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #7686a2;
  color: #2a364a;
  display: block;
  font-size: 16px;
  margin-top: 4px;
  line-height: 26px;
  outline: none;
  padding: 3px 0;
  width: 100%;
`

const ColorInputContainer = styled.div`
  margin-top: 10px;
`

const NewHoldingModal = props => {
  const [holding, setHolding] = useState({
    name: '',
    currency: '',
    value: 0,
    color: ''
  })

  const handleInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setHolding({ ...holding, [name]: value })
  }

  const handleColorChange = (color: { hex: string }) => {
    setHolding({ ...holding, color: color.hex })
  }

  const createHolding = (event: React.SyntheticEvent) => {
    event.preventDefault()
    db.get('holdings')
      .push({ id: shortid.generate(), ...holding })
      .write()
    props.onCreate(holding)
  }

  return (
    <ReactModal
      contentLabel="Minimal Modal Example"
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
            <Input name="currency" type="text" onChange={handleInputChange} />
          </FormGroup>
          <FormGroup>
            <label>Total Value</label>
            <Input name="value" type="text" onChange={handleInputChange} />
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
          </div>
        </form>
      </ModalBody>
    </ReactModal>
  )
}

export default NewHoldingModal

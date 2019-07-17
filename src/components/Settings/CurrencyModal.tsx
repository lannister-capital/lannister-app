import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { FormGroup } from '../Form'
import db from '../../db'

ReactModal.setAppElement('#root')

export const StylelessLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

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

const CurrencyContainer = styled.div`
  border-bottom: 1px solid #7686a2;
  color: #2a364a;
  font-size: 18px;
  padding: 10px 0;
  text-transform: capitalize;
`

const ModalBody = styled.div`
  padding: 40px;
`

const currencies: [Currency] = db.get('currencies').value()

interface ModalProps {
  currency: Currency
  onSet: Function
  onCancel: Function
  isOpen: boolean
}

const CurrencyModal: React.SFC<ModalProps & ReactModal.Props> = props => {
  const setGlobalCurrency = (currency: Currency) => {
    localStorage.setItem('globalCurrencyCode', currency.code)
    props.onSet()
  }

  return (
    <ReactModal
      contentLabel="Currency Modal"
      style={customStyles}
      closeTimeoutMS={300}
      {...props}>
      <ModalHeader>
        Set Global Currency
        <CancelButton
          onClick={() => {
            props.onCancel()
          }}>
          Cancel
        </CancelButton>
      </ModalHeader>

      <ModalBody>
        <form>
          <FormGroup>
            {currencies.map(currency => (
              <CurrencyContainer key={currency.code}>
                <StylelessLink
                  to="#"
                  onClick={() => setGlobalCurrency(currency)}>
                  {currency.name} ({currency.symbol})
                </StylelessLink>
              </CurrencyContainer>
            ))}
          </FormGroup>
        </form>
      </ModalBody>
    </ReactModal>
  )
}

export default CurrencyModal

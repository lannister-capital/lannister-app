import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import Button from '../components/Button'
import HoldingsList from '../components/Holdings/HoldingsList'
import db from '../db'

const Flex = styled.div`
  display: flex;
`

const Column = styled.div`
  flex: 1;
  flex-direction: column;
`

const RightAlignContainer = styled.div`
  text-align: right;
`

const LeftColumn = styled(Column)`
  margin-top: 20px;
  text-align: left;

  /* Need to remove this */
  & > div > a > div {
    margin-left: 0;
  }
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
    padding: '0'
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

const Input = styled.input`
  border: none;
  border-bottom: 2px solid #7686a2;
  color: #2a364a;
  display: block;
  font-size: 16px;
  margin-top: 10px;
  line-height: 26px;
  outline: none;
  padding: 3px 0;
  width: 100%;
`

const Holdings = () => {
  const [holdings, setHoldings] = useState([])
  const [openHoldingModal, setOpenHoldingModal] = useState(false)

  useEffect(() => {
    setHoldings(db.read('holdings').value().holdings)
  }, [])

  return (
    <div>
      <Flex>
        <Column>
          <h1>Holdings</h1>
        </Column>
        <Column>
          <RightAlignContainer>
            <Button onClick={() => setOpenHoldingModal(true)}>
              Add New Holding
            </Button>
          </RightAlignContainer>
        </Column>
      </Flex>
      <Flex>
        <LeftColumn>
          <HoldingsList holdings={holdings} showTitle={false} />
        </LeftColumn>
        <Column />
      </Flex>

      <ReactModal
        isOpen={openHoldingModal}
        contentLabel="Minimal Modal Example"
        style={customStyles}
        onRequestClose={() => setOpenHoldingModal(false)}
        closeTimeoutMS={300}>
        <ModalHeader>
          New Holding
          <CancelButton onClick={() => setOpenHoldingModal(false)}>
            Cancel
          </CancelButton>
        </ModalHeader>

        <ModalBody>
          <form action="">
            <label>Name of Holding</label>
            <Input placeholder="Ex. Coinbase" type="text" />
          </form>
        </ModalBody>
      </ReactModal>
    </div>
  )
}

export default Holdings

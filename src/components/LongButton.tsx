import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import forwardIcon from '../assets/forward.png'

const StylelessLink = styled(Link)`
  text-decoration: none;
`

const VerticalMiddleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const TextWrapper = styled.div`
  padding-left: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
`

const TextTitle = styled(VerticalMiddleContainer)`
  color: #2a364a;
  font-size: 18px;
`
const Indicator = styled.div`
  align-items: flex-end;
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  padding-right: 10px;
  text-align: right;

  img {
    width: 8px;
    height: 14px;
  }
`

const ItemContainer = styled.div`
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  margin: auto;
  margin-bottom: 10px;
  max-width: 450px;
  min-height: 65px;
  overflow: hidden;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  width: 100%;

  border: 1px solid #E8EBF4;
  box-sizing: border-box;
  border-radius: 4px;

  &:hover {
    background-color: #f8f8ff;
    cursor: pointer;
  }
`

interface LongButton {
    text: String
}
  
const LongButton = ({text}) => {
  return (
    <StylelessLink to={`/holdings`}>
      <ItemContainer>
        <TextWrapper>
          <TextTitle>{text}</TextTitle>
        </TextWrapper>
        <Indicator>
          <img src={forwardIcon} alt="Forward" />
        </Indicator>
      </ItemContainer>
    </StylelessLink>
  )
}

export default LongButton;

import React from 'react'
import styled from 'styled-components'
import forwardIcon from '../assets/forward.png'
import {
  StylelessLink,
  Indicator,
  ItemContainer,
  ItemContentWrapper
} from './LongItem'

const TextTitle = styled.div`
  color: #2a364a;
  font-size: 18px;
  padding-left: 20px;
`
const HoverContainer = styled(ItemContainer)`
  &:hover {
    background-color: #f8f8ff;
    cursor: pointer;
  }
`

interface LongButton {
  text: String
}

const LongButton = ({ text }) => {
  return (
    <StylelessLink to={`/holdings`}>
      <HoverContainer>
        <ItemContentWrapper>
          <TextTitle>{text}</TextTitle>
          <Indicator>
            <img src={forwardIcon} alt="Forward" />
          </Indicator>
        </ItemContentWrapper>
      </HoverContainer>
    </StylelessLink>
  )
}

export default LongButton

import React from 'react'
import styled from 'styled-components'
import forwardIcon from '../assets/forward.png'
import { 
  StylelessLink, 
  Wrapper, 
  VerticalMiddleContainer,
  Indicator,
  ItemContainer
} from './LongItem'

const TextTitle = styled(VerticalMiddleContainer)`
  color: #2a364a;
  font-size: 18px;
`
const TextContainer = styled(ItemContainer)`
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
      <TextContainer>
        <Wrapper>
          <TextTitle>{text}</TextTitle>
        </Wrapper>
        <Indicator>
          <img src={forwardIcon} alt="Forward" />
        </Indicator>
      </TextContainer>
    </StylelessLink>
  )
}

export default LongButton;

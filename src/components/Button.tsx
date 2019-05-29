import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  border: 1px solid #2a364a;
  border-radius: 4px;
  color: #2a364a;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  padding: 20px 40px;
  outline: none;

  &:focus {
    box-shadow: 0px 0px 2px #2a364a;
  }

  &:active {
    box-shadow: 0px 2px 4px #2a364a;
  }
`

const Button = props => {
  return <StyledButton>{props.children}</StyledButton>
}

export default Button

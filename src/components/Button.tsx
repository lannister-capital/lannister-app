import React from 'react'
import styled, { css } from 'styled-components'

interface StyledButton {
  primary: boolean
}

const StyledButton = styled.button<StyledButton>`
  border: 1px solid #2a364a;
  border-radius: 4px;
  color: #2a364a;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  padding: 20px 40px;
  outline: none;
  background-color: #ffffff;

  &:focus {
    box-shadow: 0px 0px 2px #2a364a;
  }

  &:active {
    box-shadow: 0px 2px 4px #2a364a;
  }

  ${props =>
    props.primary &&
    css`
      background-color: #0938d3;
      color: #fff;
    `}
`

const Button = props => {
  return <StyledButton {...props}>{props.children}</StyledButton>
}

export default Button

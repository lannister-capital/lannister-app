import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 58px;
  padding-bottom: 0px;
  text-align: left;
  width: 100%;
`

const MainContainer = props => {
  return <Container>{props.children}</Container>
}

export default MainContainer

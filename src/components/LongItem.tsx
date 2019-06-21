import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StylelessLink = styled(Link)`
    text-decoration: none;
`

export const VerticalMiddleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const Wrapper = styled.div`
  padding-left: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
`

export const Indicator = styled.div`
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


export const ItemContainer = styled.div`
  background-color: #e8ebf4;
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
`
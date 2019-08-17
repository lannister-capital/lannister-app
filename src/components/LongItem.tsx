import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StylelessLink = styled(Link)`
  text-decoration: none;
`

export const Indicator = styled.div`
  flex: 1;
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
  flex-direction: row;
  margin: auto;
  max-width: 450px;
  min-height: 65px;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  width: 100%;
`

export const ItemContentWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

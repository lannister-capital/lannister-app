import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const ItemContainer = styled.div`
  margin: 20px 0;
  width: 100%;

  a {
    color: #2a364a;
    border-right: 4px solid transparent;
    display: inline-block;
    text-decoration: none;
    padding: 10px 0;
    width: 100%;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    &.selected {
      border-right: 4px solid #2a364a;
    }
  }

  img {
    width: 35px;
  }
`

const LinkTitle = styled.div`
  font-size: 16px;
  margin-top: 6px;
  padding: 0 20px;
`

const SidebarItem = ({ path, icon, exact, children }) => {
  return (
    <ItemContainer>
      <NavLink exact={exact} to={path} activeClassName="selected">
        <div>{icon && <img src={icon} alt="Icon" />}</div>
        <LinkTitle>{children}</LinkTitle>
      </NavLink>
    </ItemContainer>
  )
}

export default SidebarItem

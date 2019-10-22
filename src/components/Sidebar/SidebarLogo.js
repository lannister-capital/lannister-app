import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Logo = styled.div`
  position: absolute;
  top: 0;
  margin-top: 40px;

  img {
    width: 60px;
  }
`

const SidebarLogo = ({ icon }) => {
  return (
    <Logo>
      <Link to="/">{icon && <img src={icon} alt="Icon" />}</Link>
    </Logo>
  )
}

export default SidebarLogo

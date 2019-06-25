import React from 'react'
import styled from 'styled-components'

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
      <div>{icon && <img src={icon} alt="Icon" />}</div>
    </Logo>
  )
}

export default SidebarLogo

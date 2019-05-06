import React from 'react'
import styled from 'styled-components'
import SidebarItem from './SidebarItem'

import dashboardIcon from '../../assets/dashboard.png'
import holdingsIcon from '../../assets/holdings.png'
import recommendationsIcon from '../../assets/recommendations.png'
import settingsIcon from '../../assets/settings.png'

const SidebarContainer = styled.div`
  height: 100%;
  width: 100%;
`

const Container = styled.div`
  align-items: center;
  background-color: #e8ebf4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Container>
        <SidebarItem path="/" icon={dashboardIcon}>
          Overview
        </SidebarItem>
        <SidebarItem path="/holdings" icon={holdingsIcon}>
          Holdings
        </SidebarItem>
        <SidebarItem path="/recommendations" icon={recommendationsIcon}>
          Recommendations
        </SidebarItem>
        <SidebarItem path="/settings" icon={settingsIcon}>
          Settings
        </SidebarItem>
      </Container>
    </SidebarContainer>
  )
}

export default Sidebar

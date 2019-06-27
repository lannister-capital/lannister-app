import React from 'react'
import styled from 'styled-components'

import {
  Wrapper,
} from '../LongItem'

const StylelessTag = styled.a`
  text-decoration: none;
  display: flex;
`

const SettingsWrapper = styled(Wrapper)`
  padding-left: 15px;
  font-size: 18px;
  line-height: 28px;
  color: #2A364A;
`

const SettingsItemContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  max-width: 350px;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #7686A2
`

const SettingsIcon = styled.img`
  height: 30px;
  width: 30px;
`

const SettingsItem = ({text, link, icon}) => {
  return (
    <StylelessTag href={link}>
      <SettingsItemContainer>
        <SettingsIcon src={icon} alt="Icon" />
        <SettingsWrapper>
          <span>{text}</span>
        </SettingsWrapper>
      </SettingsItemContainer>
    </StylelessTag>
  )
}
  
export default SettingsItem
  
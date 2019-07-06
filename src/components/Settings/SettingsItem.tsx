import React from 'react'
import styled from 'styled-components'

import { Wrapper } from '../LongItem'

const StylelessTag = styled.a`
  text-decoration: none;
  display: flex;
`

const SettingsWrapper = styled(Wrapper)`
  color: #2a364a;
  padding-left: 15px;
  font-size: 18px;
  line-height: 28px;
`

const SettingsItemContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  max-width: 350px;
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #7686a2;
`

const SettingsIcon = styled.img`
  height: 30px;
  width: 30px;
`

const RightContainer = styled.div`
  color: #2a364a;
  flex: 1;
  font-size: 18px;
  line-height: 28px;
  padding-right: 10px;
  text-align: right;
`

const SettingsItem = ({
  text,
  link,
  icon,
  onClick,
  rightContent
}: {
  text: string
  link?: string
  icon: any
  onClick?: Function
  rightContent?: string
}) => {
  return (
    <StylelessTag href={link || '#'} onClick={() => (onClick ? onClick() : '')}>
      <SettingsItemContainer>
        <SettingsIcon src={icon} alt="Icon" />
        <SettingsWrapper>
          <span>{text}</span>
        </SettingsWrapper>
        <RightContainer>{rightContent}</RightContainer>
      </SettingsItemContainer>
    </StylelessTag>
  )
}

export default SettingsItem

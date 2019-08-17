import React from 'react'
import styled from 'styled-components'

const StylelessTag = styled.a`
  text-decoration: none;
  display: flex;
`

const SettingsWrapper = styled.div`
  color: #2a364a;
  padding-left: 16px;
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

const Subtext = styled.div`
  font-size: 11px;
  line-height: 12px;
`

const SettingsItem = ({
  text,
  subtext,
  link,
  icon,
  onClick,
  rightContent
}: {
  text: string
  subtext?: string
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
          <Subtext>{subtext}</Subtext>
        </SettingsWrapper>
        <RightContainer>{rightContent}</RightContainer>
      </SettingsItemContainer>
    </StylelessTag>
  )
}

export default SettingsItem

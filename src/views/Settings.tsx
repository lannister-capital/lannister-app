import React from 'react'
import styled from 'styled-components'
import { Flex, Column } from '../components/Grid'
import SettingsItem from '../components/Settings/SettingsItem'
import logoIcon from '../assets/lion.png'

const FlexColumn = styled(Flex)`
  flex-direction: column;
`

const LeftColumn = styled(Column)`
  margin-top: 20px;
  text-align: left;

  /* Need to remove this */
  & > div > a > div {
    margin-left: 0;
  }
`

const Holdings = () => {

  return (
    <div>
      <Flex>
        <Column>
          <h1>Settings</h1>
        </Column>
      </Flex>
      <FlexColumn>
        <LeftColumn>
          <h3>Local</h3>
          <SettingsItem text="Currency" link="http://www.google.com" icon={logoIcon} />
          <SettingsItem text="Sync with Blockstack" link="" icon={logoIcon} />
          <SettingsItem text="Export Data" link="" icon={logoIcon} />
        </LeftColumn>
        <LeftColumn>
          <h3>About</h3>
          <SettingsItem text="Twitter" link="https://github.com/lannister-capital/lannister-app" icon={logoIcon} />
          <SettingsItem text="Discord" link="https://github.com/lannister-capital" icon={logoIcon} />
          <SettingsItem text="Github" link="https://twitter.com/lannistercap" icon={logoIcon} />
        </LeftColumn>
        <Column />
      </FlexColumn>
    </div>
  )
}

export default Holdings

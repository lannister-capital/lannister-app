import React from 'react'
import styled from 'styled-components'
import { Flex, Column } from '../components/Grid'
import SettingsItem from '../components/Settings/SettingsItem'
import currencyIcon from '../assets/currency.svg'
import syncIcon from '../assets/sync.svg'
import exportIcon from '../assets/export.svg'
import twitterIcon from '../assets/twitter.svg'
import discordIcon from '../assets/discord.svg'
import githubIcon from '../assets/github.svg'

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
          <SettingsItem text="Currency" link="#" icon={currencyIcon} />
          <SettingsItem text="Sync with Blockstack" link="#" icon={syncIcon} />
          <SettingsItem text="Export Data" link="#" icon={exportIcon} />
        </LeftColumn>
        <LeftColumn>
          <h3>About</h3>
          <SettingsItem text="Twitter" link="https://twitter.com/lannistercap" icon={twitterIcon} />
          <SettingsItem text="Discord" link="https://discordapp.com/invite/6SrsfUf" icon={discordIcon} />
          <SettingsItem text="Github" link="https://github.com/lannister-capital/lannister-app" icon={githubIcon} />
        </LeftColumn>
        <Column />
      </FlexColumn>
    </div>
  )
}

export default Holdings

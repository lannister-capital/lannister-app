import React, { useState } from 'react'
import styled from 'styled-components'
import db from '../db'
import { Flex, Column } from '../components/Grid'
import CurrencyModal from '../components/Settings/CurrencyModal'
import SettingsItem from '../components/Settings/SettingsItem'
import currencyIcon from '../assets/currency.svg'
import syncIcon from '../assets/sync.svg'
import exportIcon from '../assets/export.svg'
import twitterIcon from '../assets/twitter.svg'
import discordIcon from '../assets/discord.svg'
import githubIcon from '../assets/github.svg'
import {
  loginWithBlockstack,
  logoutFromBlockstack,
  isLoggedIn
} from '../utils/blockstack'

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

const Settings = () => {
  const [openCurrencyModal, setOpenCurrencyModal] = useState(false)
  const currentGlobalCurrencyCode =
    localStorage.getItem('globalCurrencyCode') || 'EUR'
  const currency: Currency = db
    .get('currencies')
    .find({ code: currentGlobalCurrencyCode })
    .value()

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
          <SettingsItem
            text="Currency"
            onClick={() => setOpenCurrencyModal(true)}
            icon={currencyIcon}
            rightContent={currency.symbol}
          />
          {isLoggedIn() && (
            <SettingsItem
              text="Logout from Blockstack"
              onClick={() => logoutFromBlockstack()}
              icon={syncIcon}
            />
          )}
          {!isLoggedIn() && (
            <SettingsItem
              text="Sync with Blockstack"
              onClick={() => loginWithBlockstack()}
              icon={syncIcon}
            />
          )}
          <SettingsItem text="Export Data" link="#" icon={exportIcon} />
        </LeftColumn>
        <LeftColumn>
          <h3>About</h3>
          <SettingsItem
            text="Twitter"
            link="https://twitter.com/lannistercap"
            icon={twitterIcon}
          />
          <SettingsItem
            text="Discord"
            link="https://discordapp.com/invite/6SrsfUf"
            icon={discordIcon}
          />
          <SettingsItem
            text="Github"
            link="https://github.com/lannister-capital/lannister-app"
            icon={githubIcon}
          />
        </LeftColumn>
        <Column />
      </FlexColumn>

      <CurrencyModal
        currency={currency}
        isOpen={openCurrencyModal}
        onCancel={() => setOpenCurrencyModal(false)}
        onSet={() => setOpenCurrencyModal(false)}
      />
    </div>
  )
}

export default Settings

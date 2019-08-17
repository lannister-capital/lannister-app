import React from 'react'
import styled from 'styled-components'
import { Flex, Column } from '../components/Grid'

const Notice = styled.div`
  margin-top: 20px;
  font-size: 24px;
`

const Settings = () => {
  return (
    <div>
      <Flex>
        <Column>
          <h1>Recommendations</h1>
        </Column>
      </Flex>
      <Flex>
        <Notice>
          Coming soon...{' '}
          <span role="img" aria-label="Lion">
            🦁
          </span>
        </Notice>
      </Flex>
    </div>
  )
}

export default Settings
